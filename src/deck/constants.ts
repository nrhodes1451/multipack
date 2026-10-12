export const SUITS = [
  { key: "C", glyph: "♣", red: false },
  { key: "D", glyph: "♦", red: true },
  { key: "H", glyph: "♥", red: true },
  { key: "S", glyph: "♠", red: false },
] as const;

export const RANKS = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
] as const;

export const PLANTS = [
  { name: "Iris", deck: "A", suit: "C", id: "iris" },
  { name: "Tulip", deck: "A", suit: "D", id: "tulip" },
  { name: "Hosta", deck: "A", suit: "H", id: "hosta" },
  { name: "Monstera", deck: "A", suit: "S", id: "monstera" },
  { name: "Clover", deck: "B", suit: "C", id: "clover" },
  { name: "Fuchsia", deck: "B", suit: "D", id: "fuchsia" },
  { name: "Eastern Redbud", deck: "B", suit: "H", id: "eastern-redbud" },
  { name: "Anthurium", deck: "B", suit: "S", id: "anthurium" },
] as const;

/**
 * Bohnanza's eight beans, renamed as gems. `beanometer` is beans needed for
 * 1, 2, 3 and 4 coins; null where the bean has no step.
 */
export const GEMS = [
  { name: "Amber", id: "amber", bean: "Blue", count: 20, beanometer: [4, 6, 8, 10] },
  { name: "Topaz", id: "topaz", bean: "Chili", count: 18, beanometer: [3, 6, 8, 9] },
  { name: "Peridot", id: "peridot", bean: "Stink", count: 16, beanometer: [3, 5, 7, 8] },
  { name: "Quartz", id: "quartz", bean: "Green", count: 14, beanometer: [3, 5, 6, 7] },
  { name: "Citrine", id: "citrine", bean: "Soy", count: 12, beanometer: [2, 4, 6, 7] },
  { name: "Sapphire", id: "sapphire", bean: "Black-eyed", count: 10, beanometer: [2, 4, 5, 6] },
  { name: "Emerald", id: "emerald", bean: "Red", count: 8, beanometer: [2, 3, 4, 5] },
  { name: "Ruby", id: "ruby", bean: "Garden", count: 6, beanometer: [null, 2, 3, null] },
] as const;

export const CUTS = [10, 19, 27, 34, 40, 45, 49, 52] as const;

/** Standard 52-card Lexicon deck: letters, copies and penalty values. */
export const LEXICON = [
  { letters: "AEI", copies: 4, value: 10 },
  { letters: "OU", copies: 3, value: 8 },
  { letters: "HLRSTW", copies: 3, value: 8 },
  { letters: "CKMNP", copies: 1, value: 8 },
  { letters: "DJV", copies: 1, value: 6 },
  { letters: "GQY", copies: 1, value: 4 },
  { letters: "BFXZ", copies: 1, value: 2 },
] as const;

export const LEXICON_MASTER = { letter: "★", value: 15 } as const;

export const LEXICON_SEEDS = { A: 0x1e71c0, B: 0x2b0b5 } as const;

export type DeckLetter = "A" | "B";
export type SuitKey = (typeof SUITS)[number]["key"];
export type Rank = (typeof RANKS)[number];
export type PlantId = (typeof PLANTS)[number]["id"];
export type GemId = (typeof GEMS)[number]["id"];
export type ReadAsFocus =
  | "all"
  | "playing"
  | "lexicon"
  | "arboretum"
  | "bohnanza";

export const FOCUS_NOTES: Record<ReadAsFocus, string> = {
  all: "All four systems at full weight, as printed.",
  playing: "Only rank, suit and card number count.",
  lexicon: "Letter and value only, upside down. Turn the cards round to play.",
  arboretum: "Plant and name. Every card has one of eight species.",
  bohnanza: "Gem, name and beanometer. Both copies of a rank and suit share a gem.",
};
