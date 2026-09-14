import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDeck, mappingCsv, mappingDocument } from "../src/deck/encoding.ts";

const dir = join(dirname(fileURLToPath(import.meta.url)), "../src/deck");
mkdirSync(dir, { recursive: true });
const cards = buildDeck();
const doc = mappingDocument(cards);
writeFileSync(join(dir, "deck-mapping.json"), `${JSON.stringify(doc, null, 1)}\n`);
writeFileSync(join(dir, "deck-mapping.csv"), mappingCsv(doc.cards));
console.log("Wrote src/deck/deck-mapping.json and .csv");
