import { flowerSymbols } from "../assets/flowers.tsx";

export function FlowerDefs({ prefix = "" }: { prefix?: string }) {
  return <defs>{flowerSymbols(prefix)}</defs>;
}

export function FlowerSprite() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      style={{ position: "absolute", overflow: "hidden" }}
    >
      <FlowerDefs />
    </svg>
  );
}
