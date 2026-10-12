import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CardBack } from "../src/components/CardBack.tsx";
import { CardFace } from "../src/components/CardFace.tsx";
import { buildDeck } from "../src/deck/encoding.ts";
import { FONT_DIR, FONTS } from "./fonts.ts";
import {
  ARTWORK_NOTICE,
  CARD_HEIGHT,
  CARD_WIDTH,
  COLORS,
  MOCK_DPI,
  PRINT_SCALE_300DPI,
} from "../src/tokens.ts";

type Options = {
  dpi: number;
  bleedMm: number;
};

function parseArgs(argv: string[]): Options {
  let dpi = MOCK_DPI;
  let bleedMm = 0;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]!;
    if (arg === "--dpi") {
      dpi = Number(argv[++i]);
    } else if (arg.startsWith("--dpi=")) {
      dpi = Number(arg.slice(6));
    } else if (arg === "--bleed") {
      const raw = argv[++i] ?? "0";
      bleedMm = Number(String(raw).replace(/mm$/i, ""));
    } else if (arg.startsWith("--bleed=")) {
      bleedMm = Number(arg.slice(8).replace(/mm$/i, ""));
    }
  }
  if (dpi === 300) {
    /* keep explicit 300 */
  } else if (!Number.isFinite(dpi) || dpi <= 0) {
    dpi = MOCK_DPI;
  }
  if (!Number.isFinite(bleedMm) || bleedMm < 0) bleedMm = 0;
  return { dpi, bleedMm };
}

function scaleFor(dpi: number) {
  if (dpi === 300) return PRINT_SCALE_300DPI;
  if (dpi === MOCK_DPI) return 1;
  return dpi / MOCK_DPI;
}

const FONT_CSS = FONTS.map(
  (f) =>
    `@font-face{font-family:'${f.family}';font-weight:${f.weight};font-style:normal;src:url('../fonts/${f.file}') format('truetype')}`,
).join("\n");

function wrapSvg(markup: string, bleed: number, width: number, height: number) {
  const inner = markup.replace(
    /^(<svg[^>]*)(>)/,
    `$1$2<style>${FONT_CSS}</style>`,
  );
  if (bleed <= 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<!-- ${ARTWORK_NOTICE} -->\n${inner}\n`;
  }
  const totalW = width + bleed * 2;
  const totalH = height + bleed * 2;
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- ${ARTWORK_NOTICE} -->
<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">
  <rect width="100%" height="100%" fill="${COLORS.paper}"/>
  <g transform="translate(${bleed} ${bleed})">${inner}</g>
</svg>
`;
}

function copyFonts(outFonts: string) {
  mkdirSync(outFonts, { recursive: true });
  for (const f of FONTS) {
    copyFileSync(join(FONT_DIR, f.file), join(outFonts, f.file));
  }
  copyFileSync(join(FONT_DIR, "OFL.txt"), join(outFonts, "OFL.txt"));
}

const opts = parseArgs(process.argv.slice(2));
const scale = scaleFor(opts.dpi);
const width = Math.round(CARD_WIDTH * scale);
const height = Math.round(CARD_HEIGHT * scale);
const bleed = Math.round((opts.bleedMm / 25.4) * opts.dpi);

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "export");
const facesDir = join(outDir, "faces");
mkdirSync(facesDir, { recursive: true });
copyFonts(join(outDir, "fonts"));

const cards = buildDeck();
for (const card of cards) {
  const markup = renderToStaticMarkup(
    createElement(CardFace, {
      card,
      embedDefs: true,
      width,
      height,
    }),
  );
  const id = String(card.number).padStart(3, "0");
  writeFileSync(join(facesDir, `${id}.svg`), wrapSvg(markup, bleed, width, height));
}

const backMarkup = renderToStaticMarkup(
  createElement(CardBack, { width, height }),
);
writeFileSync(join(outDir, "back.svg"), wrapSvg(backMarkup, bleed, width, height));

console.log(
  `Wrote ${cards.length} faces + back to export/ (dpi=${opts.dpi}, scale=${scale}, bleed=${bleed}px)`,
);
