import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

/*
 * Slices designs/Symbol library.svg into one symbol per plant and gem, and
 * inlines designs/Card back.svg. Output is markup strings with a `__P__`
 * placeholder in front of every id so each render can prefix its own defs.
 */

type Node = {
  tag: string;
  attrs: Record<string, string>;
  children: Node[];
  text?: string;
};

function parse(xml: string): Node {
  const body = xml.replace(/<\?xml[^>]*\?>/, "").replace(/<!DOCTYPE[^>]*>/, "");
  const root: Node = { tag: "#root", attrs: {}, children: [] };
  const stack = [root];
  const re = /<(\/?)([a-zA-Z][\w:.-]*)((?:\s+[\w:.-]+="[^"]*")*)\s*(\/?)>|([^<]+)/g;
  for (const m of body.matchAll(re)) {
    const top = stack[stack.length - 1]!;
    if (m[5] !== undefined) {
      if (m[5].trim()) top.children.push({ tag: "#text", attrs: {}, children: [], text: m[5] });
      continue;
    }
    if (m[1]) {
      stack.pop();
      continue;
    }
    const attrs: Record<string, string> = {};
    for (const a of m[3]!.matchAll(/([\w:.-]+)="([^"]*)"/g)) attrs[a[1]!] = a[2]!;
    const node: Node = { tag: m[2]!, attrs, children: [] };
    top.children.push(node);
    if (!m[4]) stack.push(node);
  }
  return root;
}

function serialize(node: Node): string {
  if (node.tag === "#text") return node.text!;
  const attrs = Object.entries(node.attrs)
    .filter(([k]) => !k.startsWith("serif:"))
    .map(([k, v]) => ` ${k}="${v}"`)
    .join("");
  const inner = node.children.map(serialize).join("");
  return inner ? `<${node.tag}${attrs}>${inner}</${node.tag}>` : `<${node.tag}${attrs}/>`;
}

function textOf(node: Node): string {
  return node.tag === "#text" ? node.text! : node.children.map(textOf).join("").trim();
}

/** Wrap `node` in its ancestors' transforms so it renders where it sat. */
function wrapInAncestors(node: Node, ancestors: Node[]) {
  let out = serialize(node);
  for (let i = ancestors.length - 1; i >= 0; i -= 1) {
    const t = ancestors[i]!.attrs.transform;
    if (t) out = `<g transform="${t}">${out}</g>`;
  }
  return out;
}

const SVG_OPEN = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`;

function bboxOf(markup: string) {
  const box = new Resvg(`${SVG_OPEN}${markup}</svg>`).getBBox();
  return box ? { x: box.x, y: box.y, w: box.width, h: box.height } : null;
}

type Box = { x: number; y: number; w: number; h: number };
type Leaf = { markup: string; box: Box };
type Label = { name: string; box: Box };

const MAX_SYMBOL = 400;

function collect(
  node: Node,
  ancestors: Node[],
  leaves: Leaf[],
  labels: Label[],
) {
  for (const child of node.children) {
    if (child.tag === "clipPath" || child.tag === "rect" || child.tag === "#text") continue;
    if (child.tag === "text") {
      const box = bboxOf(wrapInAncestors(child, ancestors));
      if (box) labels.push({ name: textOf(child), box });
      continue;
    }
    const markup = wrapInAncestors(child, ancestors);
    const hasText = /<text/.test(serialize(child));
    const box = bboxOf(markup);
    if (hasText || (box && (box.w > MAX_SYMBOL || box.h > MAX_SYMBOL))) {
      collect(child, [...ancestors, child], leaves, labels);
    } else if (box) {
      leaves.push({ markup, box });
    }
  }
}

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z]+/g, "-");
}

const LABEL_FIX: Record<string, string> = { EasternRedbud: "Eastern Redbud" };

/** Prefix ids so several copies of a symbol can live in one document. */
function scopeIds(markup: string, scope: string) {
  const referenced = new Set(
    [...markup.matchAll(/url\(#([^)]+)\)|href="#([^"]+)"/g)].map((m) => m[1] ?? m[2]),
  );
  return markup
    .replace(/ id="([^"]+)"/g, (_, id: string) =>
      referenced.has(id) ? ` id="__P__${scope}${id}"` : "",
    )
    .replace(/url\(#([^)]+)\)/g, `url(#__P__${scope}$1)`)
    .replace(/href="#([^"]+)"/g, `href="#__P__${scope}$1"`);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const library = parse(readFileSync(join(root, "designs/Symbol library.svg"), "utf8"));
const artboard = library.children[0]!;

const leaves: Leaf[] = [];
const labels: Label[] = [];
collect(artboard, [], leaves, labels);
for (const label of labels) {
  label.name = LABEL_FIX[label.name.replace(/\s+/g, "")] ?? label.name;
}

const groups = new Map<string, Leaf[]>();
for (const leaf of leaves) {
  const cx = leaf.box.x + leaf.box.w / 2;
  const cy = leaf.box.y + leaf.box.h / 2;
  let best: Label | null = null;
  let bestD = Infinity;
  for (const label of labels) {
    if (label.box.y < cy) continue;
    const lx = label.box.x + label.box.w / 2;
    const d = Math.abs(lx - cx) * 2 + (label.box.y - cy);
    if (d < bestD) {
      bestD = d;
      best = label;
    }
  }
  if (!best) throw new Error(`No label below leaf at ${cx},${cy}`);
  groups.set(best.name, [...(groups.get(best.name) ?? []), leaf]);
}

const symbols = [...groups.entries()]
  .map(([name, parts]) => {
    const x0 = Math.min(...parts.map((p) => p.box.x));
    const y0 = Math.min(...parts.map((p) => p.box.y));
    const x1 = Math.max(...parts.map((p) => p.box.x + p.box.w));
    const y1 = Math.max(...parts.map((p) => p.box.y + p.box.h));
    const id = slug(name);
    return {
      id,
      name,
      viewBox: [x0, y0, x1 - x0, y1 - y0].map((n) => +n.toFixed(2)).join(" "),
      markup: scopeIds(parts.map((p) => p.markup).join(""), `${id}-`),
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

if (symbols.length !== 16) {
  throw new Error(`Expected 16 symbols, got ${symbols.map((s) => s.name).join(", ")}`);
}

const back = parse(readFileSync(join(root, "designs/Card back.svg"), "utf8")).children[0]!;
const backMarkup = scopeIds(back.children.map(serialize).join(""), "back-");

const banner = [
  "// Generated by scripts/extract-symbols.ts from designs/. Do not edit.",
  "// Artwork © 2026 Janet Bell. All rights reserved. See ARTWORK-LICENSE.md.",
  "",
].join("\n");
writeFileSync(
  join(root, "src/assets/symbol-data.ts"),
  `${banner}\nexport const SYMBOL_DATA = ${JSON.stringify(
    Object.fromEntries(symbols.map((s) => [s.id, { viewBox: s.viewBox, markup: s.markup }])),
    null,
    2,
  )} as const;\n`,
);
writeFileSync(
  join(root, "src/assets/card-back-data.ts"),
  `${banner}\nexport const CARD_BACK_VIEWBOX = ${JSON.stringify(back.attrs.viewBox)};\n\nexport const CARD_BACK_MARKUP = ${JSON.stringify(backMarkup)};\n`,
);
console.log(`Wrote ${symbols.length} symbols: ${symbols.map((s) => s.id).join(", ")}`);
