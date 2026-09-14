import { flowerSymbols } from "../assets/flowers.tsx";
import { SPECIES, STONES } from "../deck/constants.ts";
import { CARD_HEIGHT, CARD_WIDTH, COLORS } from "../tokens.ts";
import { StoneMark } from "./StoneMark.tsx";

function backCells() {
  const cells: Array<
    { kind: "flower"; id: string } | { kind: "stone"; name: string }
  > = [];
  let fi = 0;
  let bi = 0;
  for (let i = 0; i < 20; i += 1) {
    const row = Math.floor(i / 4);
    const col = i % 4;
    if ((row + col) % 2 === 0) {
      cells.push({ kind: "flower", id: SPECIES[fi % 8]!.id });
      fi += 1;
    } else {
      cells.push({ kind: "stone", name: STONES[bi % 8]!.name });
      bi += 1;
    }
  }
  return cells;
}

type CardBackProps = {
  embedDefs?: boolean;
  width?: number;
  height?: number;
};

export function CardBack({
  embedDefs = false,
  width = CARD_WIDTH,
  height = CARD_HEIGHT,
}: CardBackProps) {
  const prefix = embedDefs ? "back-" : "";
  const cellW = 64;
  const cellH = 76.8;
  const gap = 8;
  const flowerSize = Math.min(cellW, cellH) * 0.82;
  const stoneSize = Math.min(cellW, cellH) * 0.56;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
      width={width}
      height={height}
      role="img"
      aria-label="Card back"
    >
      {embedDefs ? <defs>{flowerSymbols(prefix)}</defs> : null}
      <rect
        x="0.5"
        y="0.5"
        width={CARD_WIDTH - 1}
        height={CARD_HEIGHT - 1}
        fill={COLORS.paper}
        stroke={COLORS.ink}
        strokeWidth={1}
      />
      <rect x={14} y={14} width={312} height={448} fill={COLORS.primary} />
      <rect
        x={22}
        y={22}
        width={296}
        height={432}
        fill="none"
        stroke={COLORS.gold}
        strokeWidth={1}
      />
      {backCells().map((cell, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const x = 30 + col * (cellW + gap);
        const y = 30 + row * (cellH + gap);
        if (cell.kind === "flower") {
          return (
            <use
              key={i}
              href={`#${prefix}${cell.id}`}
              xlinkHref={`#${prefix}${cell.id}`}
              x={x + (cellW - flowerSize) / 2}
              y={y + (cellH - flowerSize) / 2}
              width={flowerSize}
              height={flowerSize}
              fill={COLORS.paper}
            />
          );
        }
        return (
          <StoneMark
            key={i}
            name={cell.name}
            fill={COLORS.primaryTint}
            size={stoneSize}
            x={x + (cellW - stoneSize) / 2}
            y={y + (cellH - stoneSize) / 2}
          />
        );
      })}
    </svg>
  );
}
