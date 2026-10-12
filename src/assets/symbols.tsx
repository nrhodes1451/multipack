import type { ReactNode } from "react";
import { SYMBOL_DATA } from "./symbol-data.ts";

export type SymbolId = keyof typeof SYMBOL_DATA;

export const SYMBOL_IDS = Object.keys(SYMBOL_DATA) as SymbolId[];

/** Width over height of a symbol's drawn area. */
export function symbolAspect(id: SymbolId) {
  const [, , w, h] = SYMBOL_DATA[id].viewBox.split(" ").map(Number);
  return w! / h!;
}

export function scoped(markup: string, prefix: string) {
  return markup.replaceAll("__P__", prefix);
}

/** Every plant and gem as a `<symbol>`, ids `${prefix}sym-${id}`. */
export function symbolDefs(prefix = ""): ReactNode {
  return SYMBOL_IDS.map((id) => (
    <symbol
      key={id}
      id={`${prefix}sym-${id}`}
      viewBox={SYMBOL_DATA[id].viewBox}
      dangerouslySetInnerHTML={{ __html: scoped(SYMBOL_DATA[id].markup, prefix) }}
    />
  ));
}
