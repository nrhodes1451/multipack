export const SUITS = [
  { key: "S", glyph: "\u2660", tarot: "SWORDS", red: false },
  { key: "H", glyph: "\u2665", tarot: "CUPS", red: true },
  { key: "D", glyph: "\u2666", tarot: "PENTACLES", red: true },
  { key: "C", glyph: "\u2663", tarot: "WANDS", red: false },
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

export const RANK_NAME: Record<string, string> = {
  A: "ACE",
  "2": "TWO",
  "3": "THREE",
  "4": "FOUR",
  "5": "FIVE",
  "6": "SIX",
  "7": "SEVEN",
  "8": "EIGHT",
  "9": "NINE",
  "10": "TEN",
  J: "PAGE",
  Q: "QUEEN",
  K: "KING",
};

export const SPECIES = [
  { name: "DAHLIA", deck: "A", suit: "S", id: "fl-dahlia" },
  { name: "LILY", deck: "A", suit: "H", id: "fl-lily" },
  { name: "TULIP", deck: "A", suit: "D", id: "fl-tulip" },
  { name: "POPPY", deck: "A", suit: "C", id: "fl-poppy" },
  { name: "ROSE", deck: "B", suit: "S", id: "fl-rose" },
  { name: "LOTUS", deck: "B", suit: "H", id: "fl-lotus" },
  { name: "IRIS", deck: "B", suit: "D", id: "fl-iris" },
  { name: "DAISY", deck: "B", suit: "C", id: "fl-daisy" },
] as const;

export const STONES = [
  { name: "QUARTZ", count: 20 },
  { name: "AMETHYST", count: 18 },
  { name: "JADE", count: 16 },
  { name: "OPAL", count: 14 },
  { name: "SAPPHIRE", count: 12 },
  { name: "EMERALD", count: 10 },
  { name: "RUBY", count: 8 },
  { name: "DIAMOND", count: 6 },
] as const;

export const CUTS = [10, 19, 27, 34, 40, 45, 49, 52] as const;

export const MAJORS = [
  "THE FOOL",
  "THE MAGICIAN",
  "THE HIGH PRIESTESS",
  "THE EMPRESS",
  "THE EMPEROR",
  "THE HIEROPHANT",
  "THE LOVERS",
  "THE CHARIOT",
  "STRENGTH",
  "THE HERMIT",
  "WHEEL OF FORTUNE",
  "JUSTICE",
  "THE HANGED MAN",
  "DEATH",
  "TEMPERANCE",
  "THE DEVIL",
  "THE TOWER",
  "THE STAR",
  "THE MOON",
  "THE SUN",
  "JUDGEMENT",
  "THE WORLD",
] as const;

export const ROMAN = [
  "0",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
  "XIII",
  "XIV",
  "XV",
  "XVI",
  "XVII",
  "XVIII",
  "XIX",
  "XX",
  "XXI",
] as const;

export type DeckLetter = "A" | "B";
export type SuitKey = (typeof SUITS)[number]["key"];
export type Rank = (typeof RANKS)[number];
export type FlowerId = (typeof SPECIES)[number]["id"];
export type StoneName = (typeof STONES)[number]["name"];
export type TarotType = "minor" | "major" | "";
export type ReadAsFocus =
  | "all"
  | "playing"
  | "tarot"
  | "arboretum"
  | "bohnanza";

export const FOCUS_NOTES: Record<ReadAsFocus, string> = {
  all: "All four systems at full weight — the printed state.",
  playing: "Only rank, suit and card number carry.",
  tarot: "Left rail only; empty on the 26 silent cards.",
  arboretum: "Flower silhouette; every card has a species.",
  bohnanza: "Foot band only; both copies of a rank and suit share a gem.",
};
