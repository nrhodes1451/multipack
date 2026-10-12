import { symbolDefs } from "../assets/symbols.tsx";

export function SymbolSprite() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      style={{ position: "absolute", overflow: "hidden" }}
    >
      <defs>{symbolDefs()}</defs>
    </svg>
  );
}
