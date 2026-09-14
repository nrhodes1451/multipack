import { STONE_SHAPES } from "../assets/stones.ts";

type StoneMarkProps = {
  name: string;
  fill: string;
  size: number;
  x?: number;
  y?: number;
};

export function StoneMark({
  name,
  fill,
  size,
  x = 0,
  y = 0,
}: StoneMarkProps) {
  const shape = STONE_SHAPES[name];
  if (!shape) return null;
  const scale = size / 100;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {shape.kind === "circle" ? (
        <circle cx={shape.cx} cy={shape.cy} r={shape.r} fill={fill} />
      ) : (
        <polygon points={shape.points} fill={fill} />
      )}
    </g>
  );
}
