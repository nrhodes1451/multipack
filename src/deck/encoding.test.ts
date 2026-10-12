import { describe, expect, it } from "vitest";
import fixture from "./deck-mapping.json" with { type: "json" };
import { GEMS } from "./constants.ts";
import { buildDeck, cardFrom, lexiconCards, toMappingRow } from "./encoding.ts";

function letterCounts(letters: string[]) {
  const counts: Record<string, number> = {};
  for (const l of letters) counts[l] = (counts[l] ?? 0) + 1;
  return counts;
}

describe("encoding", () => {
  const deck = buildDeck();

  it("builds 104 cards in canonical order", () => {
    expect(deck).toHaveLength(104);
    expect(deck[0]).toMatchObject({ number: 1, deck: "A", rank: "A", suit: "C" });
    expect(deck[51]).toMatchObject({ number: 52, deck: "A", rank: "K", suit: "S" });
    expect(deck[52]).toMatchObject({ number: 53, deck: "B", rank: "A", suit: "C" });
    expect(deck[103]).toMatchObject({ number: 104, deck: "B", rank: "K", suit: "S" });
  });

  it("matches the 4 of iris mockup (card 4)", () => {
    const card = cardFrom("A", "C", "4");
    expect(card.number).toBe(4);
    expect(card.plant).toBe("Iris");
    expect(card.suitRed).toBe(false);
    expect(card.gem).toBe("Amber");
    expect(card.beanometer).toEqual([4, 6, 8, 10]);
  });

  it("matches the 2 of eastern redbud mockup (card 80)", () => {
    const card = cardFrom("B", "H", "2");
    expect(card.number).toBe(80);
    expect(card.plant).toBe("Eastern Redbud");
    expect(card.suitRed).toBe(true);
    expect(card.gem).toBe("Quartz");
    expect(card.gemCount).toBe(14);
  });

  it("pairs plants with suits per copy", () => {
    const plants = (d: "A" | "B") =>
      ["C", "D", "H", "S"].map((s) => deck.find((c) => c.deck === d && c.suit === s)!.plant);
    expect(plants("A")).toEqual(["Iris", "Tulip", "Hosta", "Monstera"]);
    expect(plants("B")).toEqual(["Clover", "Fuchsia", "Eastern Redbud", "Anthurium"]);
  });

  it("deals gems to Bohnanza counts summing to 104", () => {
    expect(GEMS.reduce((n, g) => n + g.count, 0)).toBe(104);
    for (const gem of GEMS) {
      expect(deck.filter((c) => c.gem === gem.name)).toHaveLength(gem.count);
    }
    for (const card of deck.slice(0, 52)) {
      expect(deck[card.number + 51]!.gem).toBe(card.gem);
    }
  });

  it("gives each copy exactly one standard Lexicon deck", () => {
    const standard = letterCounts(lexiconCards().map((c) => c.letter));
    expect(lexiconCards()).toHaveLength(52);
    for (const d of ["A", "B"] as const) {
      const letters = deck.filter((c) => c.deck === d).map((c) => c.lexiconLetter);
      expect(letterCounts(letters)).toEqual(standard);
    }
    expect(cardFrom("A", "C", "4").lexiconLetter).not.toBe("");
  });

  it("matches the regenerated mapping fixture", () => {
    expect(fixture.cards).toEqual(deck.map(toMappingRow));
    expect(fixture.plants).toEqual([
      "Iris",
      "Tulip",
      "Hosta",
      "Monstera",
      "Clover",
      "Fuchsia",
      "Eastern Redbud",
      "Anthurium",
    ]);
  });
});
