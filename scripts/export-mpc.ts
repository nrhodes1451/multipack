import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { PDFDocument } from "pdf-lib";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CardBack } from "../src/components/CardBack.tsx";
import { CardFace } from "../src/components/CardFace.tsx";
import { buildDeck } from "../src/deck/encoding.ts";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  MPC_BLEED_PX,
  MPC_DPI,
  PRINT_SCALE_300DPI,
} from "../src/tokens.ts";

const require = createRequire(import.meta.url);
const { decompress } = require("wawoff2") as {
  decompress: (buffer: Buffer) => Promise<Uint8Array>;
};

const TRIM_W = Math.round(CARD_WIDTH * PRINT_SCALE_300DPI);
const TRIM_H = Math.round(CARD_HEIGHT * PRINT_SCALE_300DPI);
const CANVAS_W = TRIM_W + MPC_BLEED_PX * 2;
const CANVAS_H = TRIM_H + MPC_BLEED_PX * 2;
const PAGE_PT_W = (CANVAS_W / MPC_DPI) * 72;
const PAGE_PT_H = (CANVAS_H / MPC_DPI) * 72;

const FONT_SOURCES = [
  {
    pkg: "roboto-condensed",
    file: "roboto-condensed-latin-400-normal.woff2",
    family: "Roboto Condensed",
    weight: 400,
  },
  {
    pkg: "roboto-condensed",
    file: "roboto-condensed-latin-700-normal.woff2",
    family: "Roboto Condensed",
    weight: 700,
  },
  {
    pkg: "roboto-condensed",
    file: "roboto-condensed-latin-900-normal.woff2",
    family: "Roboto Condensed",
    weight: 900,
  },
  {
    pkg: "roboto",
    file: "roboto-latin-400-normal.woff2",
    family: "Roboto",
    weight: 400,
  },
] as const;

async function prepareFonts(root: string) {
  const fontDir = mkdtempSync(join(tmpdir(), "multipack-fonts-"));
  const fontFiles: string[] = [];
  const faces: string[] = [];
  for (const spec of FONT_SOURCES) {
    const src = join(
      root,
      "node_modules/@fontsource",
      spec.pkg,
      "files",
      spec.file,
    );
    const ttf = Buffer.from(await decompress(readFileSync(src)));
    const dest = join(fontDir, spec.file.replace(/\.woff2$/, ".ttf"));
    writeFileSync(dest, ttf);
    fontFiles.push(dest);
    faces.push(
      `@font-face{font-family:'${spec.family}';font-weight:${spec.weight};font-style:normal;src:url('data:font/ttf;base64,${ttf.toString("base64")}') format('truetype')}`,
    );
  }
  return { fontFiles, fontCss: faces.join("") };
}

function wrapSvg(markup: string, fontCss: string) {
  const inner = markup.replace(
    /^(<svg[^>]*)(>)/,
    `$1$2<style>${fontCss}</style>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_W}" height="${CANVAS_H}" viewBox="0 0 ${CANVAS_W} ${CANVAS_H}">
  <rect width="100%" height="100%" fill="#FFFFFF"/>
  <g transform="translate(${MPC_BLEED_PX} ${MPC_BLEED_PX})">${inner}</g>
</svg>
`;
}

function rasterize(svg: string, fontFiles: string[]) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: CANVAS_W },
    dpi: MPC_DPI,
    font: {
      fontFiles,
      loadSystemFonts: true,
      defaultFontFamily: "Roboto Condensed",
      sansSerifFamily: "Roboto Condensed",
    },
  });
  const png = resvg.render().asPng();
  if (resvg.width !== CANVAS_W || resvg.height !== CANVAS_H) {
    throw new Error(
      `Unexpected raster size ${resvg.width}×${resvg.height}, expected ${CANVAS_W}×${CANVAS_H}`,
    );
  }
  return png;
}

async function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const { fontFiles, fontCss } = await prepareFonts(root);
  const outDir = join(root, "export", "mpc");
  const facesDir = join(outDir, "faces");
  mkdirSync(facesDir, { recursive: true });

  const pdf = await PDFDocument.create();
  const cards = buildDeck();

  for (const card of cards) {
    const markup = renderToStaticMarkup(
      createElement(CardFace, {
        card,
        embedDefs: true,
        width: TRIM_W,
        height: TRIM_H,
      }),
    );
    const png = rasterize(wrapSvg(markup, fontCss), fontFiles);
    const id = String(card.number).padStart(3, "0");
    writeFileSync(join(facesDir, `${id}.png`), png);
    const img = await pdf.embedPng(png);
    const page = pdf.addPage([PAGE_PT_W, PAGE_PT_H]);
    page.drawImage(img, {
      x: 0,
      y: 0,
      width: PAGE_PT_W,
      height: PAGE_PT_H,
    });
  }

  const backMarkup = renderToStaticMarkup(
    createElement(CardBack, {
      embedDefs: true,
      width: TRIM_W,
      height: TRIM_H,
    }),
  );
  const backPng = rasterize(wrapSvg(backMarkup, fontCss), fontFiles);
  writeFileSync(join(outDir, "back.png"), backPng);
  const backImg = await pdf.embedPng(backPng);
  const backPage = pdf.addPage([PAGE_PT_W, PAGE_PT_H]);
  backPage.drawImage(backImg, {
    x: 0,
    y: 0,
    width: PAGE_PT_W,
    height: PAGE_PT_H,
  });

  writeFileSync(join(outDir, "multipack.pdf"), await pdf.save());
  console.log(
    `Wrote ${cards.length} faces + back + ${pdf.getPageCount()}-page PDF to export/mpc/ (${CANVAS_W}×${CANVAS_H} px, ${MPC_DPI} dpi, ${MPC_BLEED_PX}px bleed)`,
  );
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
