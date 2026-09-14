import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CardBack } from "../src/components/CardBack.tsx";
import { CardFace } from "../src/components/CardFace.tsx";
import { cardFrom } from "../src/deck/encoding.ts";
import { CARD_HEIGHT, CARD_WIDTH } from "../src/tokens.ts";

function wrap(markup: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n${markup}\n`;
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "docs");
mkdirSync(outDir, { recursive: true });

const face = renderToStaticMarkup(
  createElement(CardFace, {
    card: cardFrom("A", "C", "10"),
    embedDefs: true,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  }),
);
const back = renderToStaticMarkup(
  createElement(CardBack, {
    embedDefs: true,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  }),
);

writeFileSync(join(outDir, "face.svg"), wrap(face));
writeFileSync(join(outDir, "back.svg"), wrap(back));
console.log("Wrote docs/face.svg and docs/back.svg");
