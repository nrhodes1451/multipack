import { describe, expect, it } from "vitest";
import fixture from "./deck-mapping.json" with { type: "json" };
import { STONES } from "./constants.ts";
import { buildDeck, cardFrom, toMappingRow } from "./encoding.ts";

describe("encoding", () => {
  const deck = buildDeck();

  it("builds 104 cards in canonical order", () => {
    expect(deck).toHaveLength(104);
    expect(deck[0]).toMatchObject({
      number: 1,
      deck: "A",
      rank: "A",
      suit: "S",
    });
    expect(deck[51]).toMatchObject({ number: 52, deck: "A", rank: "K", suit: "C" });
    expect(deck[52]).toMatchObject({ number: 53, deck: "B", rank: "A", suit: "S" });
    expect(deck[103]).toMatchObject({
      number: 104,
      deck: "B",
      rank: "K",
      suit: "C",
    });
  });

  it("matches the 10 of clubs worked example (card 49)", () => {
    const card = cardFrom("A", "C", "10");
    expect(card.number).toBe(49);
    expect(card.tarotName).toBe("TEN OF WANDS");
    expect(card.tarotIndex).toBe("MINOR");
    expect(card.flower).toBe("POPPY");
    expect(card.flowerId).toBe("fl-poppy");
    expect(card.flowerFill).toBe("ink");
    expect(card.rank).toBe("10");
    expect(card.stone).toBe("RUBY");
    expect(card.stoneCount).toBe(8);
  });

  it("matches the king of spades worked example (card 65)", () => {
    const card = cardFrom("B", "S", "K");
    expect(card.number).toBe(65);
    expect(card.tarotName).toBe("JUSTICE");
    expect(card.tarotIndex).toBe("MAJOR XI");
    expect(card.flower).toBe("ROSE");
    expect(card.flowerFill).toBe("primary");
    expect(card.rank).toBe("K");
    expect(card.stone).toBe("AMETHYST");
    expect(card.stoneCount).toBe(18);
  });

  it("has 78 tarot identities and 26 empty rails", () => {
    const withTarot = deck.filter((c) => c.tarotType !== "");
    expect(withTarot).toHaveLength(78);
    expect(deck.filter((c) => c.tarotType === "")).toHaveLength(26);
    expect(deck.filter((c) => c.tarotType === "major")).toHaveLength(22);
  });

  it("gives every card a flower species", () => {
    expect(deck.every((c) => c.flower.length > 0)).toBe(true);
  });

  it("sums stone counts to 104", () => {
    const sum = STONES.reduce((n, s) => n + s.count, 0);
    expect(sum).toBe(104);
    for (const stone of STONES) {
      expect(deck.filter((c) => c.stone === stone.name)).toHaveLength(
        stone.count,
      );
    }
  });

  it("matches the regenerated mapping fixture", () => {
    expect(fixture.cards).toEqual(deck.map(toMappingRow));
    expect(fixture.species).toEqual([
      "DAHLIA",
      "LILY",
      "TULIP",
      "POPPY",
      "ROSE",
      "LOTUS",
      "IRIS",
      "DAISY",
    ]);
  });
});
