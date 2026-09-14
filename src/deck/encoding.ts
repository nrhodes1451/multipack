import {
  CUTS,
  MAJORS,
  RANKS,
  RANK_NAME,
  ROMAN,
  SPECIES,
  STONES,
  SUITS,
  type DeckLetter,
  type FlowerId,
  type Rank,
  type SuitKey,
  type TarotType,
} from "./constants.ts";

export type Card = {
  number: number;
  deck: DeckLetter;
  rank: Rank;
  suit: SuitKey;
  suitGlyph: string;
  suitColor: "ink" | "primary";
  code: string;
  unit: number;
  tarotType: TarotType;
  tarotName: string;
  tarotIndex: string;
  flower: string;
  flowerId: FlowerId;
  flowerFill: "ink" | "primary";
  stone: string;
  stoneCount: number;
  stoneIndex: number;
};

export function majorOfB(suit: SuitKey, rankIndex: number): number {
  if (suit === "S") {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 10, 11][rankIndex] ?? -1;
  }
  if (suit === "H" && rankIndex <= 9) return 12 + rankIndex;
  return -1;
}

export function stoneIndexForUnit(unit: number): number {
  let bi = 0;
  while (unit >= CUTS[bi]!) bi += 1;
  return bi;
}

export function cardFrom(deck: DeckLetter, suit: SuitKey, rank: Rank): Card {
  const si = SUITS.findIndex((s) => s.key === suit);
  const s = SUITS[si]!;
  const ri = RANKS.indexOf(rank);
  const di = deck === "A" ? 0 : 1;
  const species = SPECIES[di * 4 + si]!;
  const unit = si * 13 + ri;
  const stoneIndex = stoneIndexForUnit(unit);
  const stone = STONES[stoneIndex]!;

  let tarotType: TarotType = "";
  let tarotName = "";
  let tarotIndex = "";
  if (deck === "A") {
    tarotType = "minor";
    tarotName = `${RANK_NAME[rank] ?? rank} OF ${s.tarot}`;
    tarotIndex = "MINOR";
  } else if (rank === "J") {
    tarotType = "minor";
    tarotName = `KNIGHT OF ${s.tarot}`;
    tarotIndex = "MINOR";
  } else {
    const m = majorOfB(s.key, ri);
    if (m >= 0) {
      tarotType = "major";
      tarotName = MAJORS[m]!;
      tarotIndex = `MAJOR ${ROMAN[m]}`;
    }
  }

  return {
    number: di * 52 + unit + 1,
    deck,
    rank,
    suit,
    suitGlyph: s.glyph,
    suitColor: s.red ? "primary" : "ink",
    code: `${deck}${rank}${suit}`,
    unit,
    tarotType,
    tarotName,
    tarotIndex,
    flower: species.name,
    flowerId: species.id,
    flowerFill: species.deck === "A" ? "ink" : "primary",
    stone: stone.name,
    stoneCount: stone.count,
    stoneIndex,
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
  tarot_type: TarotType;
  tarot_index: string;
  tarot_name: string;
  flower: string;
  flower_id: FlowerId;
  stone: string;
  stone_id: number;
  stone_count: number;
};

export function toMappingRow(card: Card): MappingRow {
  return {
    id: card.number,
    deck: card.deck,
    rank: card.rank,
    suit: card.suit,
    suit_glyph: card.suitGlyph,
    code: card.code,
    tarot_type: card.tarotType,
    tarot_index: card.tarotIndex,
    tarot_name: card.tarotName,
    flower: card.flower,
    flower_id: card.flowerId,
    stone: card.stone,
    stone_id: card.stoneIndex + 1,
    stone_count: card.stoneCount,
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
    "tarot_type",
    "tarot_index",
    "tarot_name",
    "flower",
    "flower_id",
    "stone",
    "stone_id",
    "stone_count",
  ] as const;
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => String(row[h])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

export function stoneRules() {
  return STONES.map((stone, i) => {
    const start = i === 0 ? 0 : CUTS[i - 1]!;
    const end = CUTS[i]! - 1;
    const startSi = Math.floor(start / 13);
    const startRi = start % 13;
    const endSi = Math.floor(end / 13);
    const endRi = end % 13;
    return {
      name: stone.name,
      rule: `\u00d7${stone.count} \u00b7 ${SUITS[startSi]!.glyph}${RANKS[startRi]}\u2013${SUITS[endSi]!.glyph}${RANKS[endRi]}`,
    };
  });
}

export function mappingDocument(cards: Card[]) {
  return {
    generated: "104-card Multipack",
    species: SPECIES.map((s) => s.name),
    stones: STONES.map((s) => ({ name: s.name, count: s.count })),
    cards: cards.map(toMappingRow),
  };
}
