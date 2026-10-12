import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const FONT_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/assets/fonts",
);

export const FONTS = [
  { file: "LinBiolinum_R.ttf", family: "Linux Biolinum", weight: 400 },
  { file: "LinBiolinum_RB.ttf", family: "Linux Biolinum", weight: 700 },
] as const;
