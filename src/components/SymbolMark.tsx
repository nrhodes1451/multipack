import type { SymbolId } from "../assets/symbols.tsx";

type SymbolMarkProps = {
  id: SymbolId;
  width: number;
  height?: number;
  x?: number;
  y?: number;
  prefix?: string;
};

/** A plant or gem from the symbol sprite, fitted and centred in its box. */
export function SymbolMark({
  id,
  width,
  height = width,
  x = 0,
  y = 0,
  prefix = "",
}: SymbolMarkProps) {
  const href = `#${prefix}sym-${id}`;
  return (
    <use href={href} xlinkHref={href} x={x} y={y} width={width} height={height} />
  );
}
