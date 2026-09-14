export type StoneShape =
  | { kind: "polygon"; points: string }
  | { kind: "circle"; cx: number; cy: number; r: number };

export const STONE_SHAPES: Record<string, StoneShape> = {
  QUARTZ: { kind: "polygon", points: "50,0 100,100 50,72 0,100" },
  AMETHYST: { kind: "polygon", points: "50,0 100,38 78,100 22,100 0,38" },
  JADE: { kind: "circle", cx: 50, cy: 50, r: 50 },
  OPAL: { kind: "polygon", points: "50,0 100,50 50,100 0,50" },
  SAPPHIRE: { kind: "polygon", points: "25,0 75,0 100,46 50,100 0,46" },
  EMERALD: {
    kind: "polygon",
    points: "18,0 82,0 100,22 100,78 82,100 18,100 0,78 0,22",
  },
  RUBY: { kind: "polygon", points: "50,0 93,25 93,75 50,100 7,75 7,25" },
  DIAMOND: { kind: "polygon", points: "20,0 80,0 100,34 50,100 0,34" },
};
