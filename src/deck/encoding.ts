import {
  CUTS,
  GEMS,
  LEXICON,
  LEXICON_MASTER,
  LEXICON_SEEDS,
  PLANTS,
  RANKS,
  SUITS,
  type DeckLetter,
  type GemId,
  type PlantId,
  type Rank,
  type SuitKey,
} from "./constants.ts";

export type LexiconCard = { letter: string; value: number };

export type Card = {
  number: number;
  deck: DeckLetter;
  rank: Rank;
  suit: SuitKey;
  suitGlyph: string;
  suitRed: boolean;
  code: string;
  unit: number;
  plant: string;
  plantId: PlantId;
  gem: string;
  gemId: GemId;
  gemCount: number;
  gemIndex: number;
  bean: string;
  beanometer: readonly (number | null)[];
  lexiconLetter: string;
  lexiconValue: number;
};

export function lexiconCards(): LexiconCard[] {
  const cards: LexiconCard[] = [];
  for (const group of LEXICON) {
    for (const letter of group.letters) {
      for (let i = 0; i < group.copies; i += 1) {
        cards.push({ letter, value: group.value });
      }
    }
  }
  cards.push({ ...LEXICON_MASTER });
  return cards;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One Lexicon deck per plant deck, dealt over units 0–51 by a fixed shuffle. */
export function lexiconDeal(deck: DeckLetter): LexiconCard[] {
  const cards = lexiconCards();
  const rand = mulberry32(LEXICON_SEEDS[deck]);
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [cards[i], cards[j]] = [cards[j]!, cards[i]!];
  }
  return cards;
}

const DEALS = { A: lexiconDeal("A"), B: lexiconDeal("B") };

export function gemIndexForUnit(unit: number): number {
  let gi = 0;
  while (unit >= CUTS[gi]!) gi += 1;
  return gi;
}

export function cardFrom(deck: DeckLetter, suit: SuitKey, rank: Rank): Card {
  const si = SUITS.findIndex((s) => s.key === suit);
  const s = SUITS[si]!;
  const ri = RANKS.indexOf(rank);
  const di = deck === "A" ? 0 : 1;
  const plant = PLANTS[di * 4 + si]!;
  const unit = si * 13 + ri;
  const gemIndex = gemIndexForUnit(unit);
  const gem = GEMS[gemIndex]!;
  const lexicon = DEALS[deck][unit]!;

  return {
    number: di * 52 + unit + 1,
    deck,
    rank,
    suit,
    suitGlyph: s.glyph,
    suitRed: s.red,
    code: `${deck}${rank}${suit}`,
    unit,
    plant: plant.name,
    plantId: plant.id,
    gem: gem.name,
    gemId: gem.id,
    gemCount: gem.count,
    gemIndex,
    bean: gem.bean,
    beanometer: gem.beanometer,
    lexiconLetter: lexicon.letter,
    lexiconValue: lexicon.value,
  };
}

export function buildDeck(): Card[] {
  const cards: Card[] = [];
  for (const deck of ["A", "B"] as const) {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        cards.push(cardFrom(deck, suit.key, rank));
      }
    }
  }
  return cards;
}

export type MappingRow = {
  id: number;
  deck: DeckLetter;
  rank: Rank;
  suit: SuitKey;
  suit_glyph: string;
  code: string;
  plant: string;
  plant_id: PlantId;
  gem: string;
  gem_id: number;
  gem_count: number;
  bean: string;
  beanometer: string;
  lexicon_letter: string;
  lexicon_value: number;
};

export function beanometerText(beanometer: readonly (number | null)[]) {
  return beanometer.map((n) => (n === null ? "-" : String(n))).join("/");
}

export function toMappingRow(card: Card): MappingRow {
  return {
    id: card.number,
    deck: card.deck,
    rank: card.rank,
    suit: card.suit,
    suit_glyph: card.suitGlyph,
    code: card.code,
    plant: card.plant,
    plant_id: card.plantId,
    gem: card.gem,
    gem_id: card.gemIndex + 1,
    gem_count: card.gemCount,
    bean: card.bean,
    beanometer: beanometerText(card.beanometer),
    lexicon_letter: card.lexiconLetter,
    lexicon_value: card.lexiconValue,
  };
}

export function mappingCsv(rows: MappingRow[]): string {
  const headers = [
    "id",
    "deck",
    "rank",
    "suit",
    "suit_glyph",
    "code",
    "plant",
    "plant_id",
    "gem",
    "gem_id",
    "gem_count",
    "bean",
    "beanometer",
    "lexicon_letter",
    "lexicon_value",
  ] as const;
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => String(row[h])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

export function gemRules() {
  return GEMS.map((gem, i) => {
    const start = i === 0 ? 0 : CUTS[i - 1]!;
    const end = CUTS[i]! - 1;
    const startSi = Math.floor(start / 13);
    const startRi = start % 13;
    const endSi = Math.floor(end / 13);
    const endRi = end % 13;
    return {
      id: gem.id,
      name: gem.name,
      beanometer: gem.beanometer,
      rule: `×${gem.count} · ${SUITS[startSi]!.glyph}${RANKS[startRi]}–${SUITS[endSi]!.glyph}${RANKS[endRi]}`,
    };
  });
}

export function mappingDocument(cards: Card[]) {
  return {
    generated: "104-card Multipack",
    plants: PLANTS.map((p) => p.name),
    gems: GEMS.map((g) => ({ name: g.name, bean: g.bean, count: g.count })),
    cards: cards.map(toMappingRow),
  };
}
