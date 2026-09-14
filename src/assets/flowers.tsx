import type { ReactNode } from "react";

export const FLOWER_IDS = [
  "fl-dahlia",
  "fl-lily",
  "fl-tulip",
  "fl-poppy",
  "fl-rose",
  "fl-lotus",
  "fl-iris",
  "fl-daisy",
] as const;

export function flowerSymbols(prefix = ""): ReactNode {
  const id = (name: string) => `${prefix}${name}`;
  return (
    <>
      <symbol id={id("fl-dahlia")} viewBox="0 0 100 100">
        <g>
          <g>
            <ellipse cx="50" cy="22" rx="7" ry="19" />
            <ellipse cx="50" cy="22" rx="7" ry="19" transform="rotate(45 50 50)" />
            <ellipse cx="50" cy="22" rx="7" ry="19" transform="rotate(90 50 50)" />
            <ellipse
              cx="50"
              cy="22"
              rx="7"
              ry="19"
              transform="rotate(135 50 50)"
            />
            <ellipse
              cx="50"
              cy="22"
              rx="7"
              ry="19"
              transform="rotate(180 50 50)"
            />
            <ellipse
              cx="50"
              cy="22"
              rx="7"
              ry="19"
              transform="rotate(225 50 50)"
            />
            <ellipse
              cx="50"
              cy="22"
              rx="7"
              ry="19"
              transform="rotate(270 50 50)"
            />
            <ellipse
              cx="50"
              cy="22"
              rx="7"
              ry="19"
              transform="rotate(315 50 50)"
            />
          </g>
          <g>
            <ellipse
              cx="50"
              cy="34"
              rx="6"
              ry="13"
              transform="rotate(22.5 50 50)"
            />
            <ellipse
              cx="50"
              cy="34"
              rx="6"
              ry="13"
              transform="rotate(67.5 50 50)"
            />
            <ellipse
              cx="50"
              cy="34"
              rx="6"
              ry="13"
              transform="rotate(112.5 50 50)"
            />
            <ellipse
              cx="50"
              cy="34"
              rx="6"
              ry="13"
              transform="rotate(157.5 50 50)"
            />
            <ellipse
              cx="50"
              cy="34"
              rx="6"
              ry="13"
              transform="rotate(202.5 50 50)"
            />
            <ellipse
              cx="50"
              cy="34"
              rx="6"
              ry="13"
              transform="rotate(247.5 50 50)"
            />
            <ellipse
              cx="50"
              cy="34"
              rx="6"
              ry="13"
              transform="rotate(292.5 50 50)"
            />
            <ellipse
              cx="50"
              cy="34"
              rx="6"
              ry="13"
              transform="rotate(337.5 50 50)"
            />
          </g>
          <circle cx="50" cy="50" r="9" />
        </g>
      </symbol>
      <symbol id={id("fl-lily")} viewBox="0 0 100 100">
        <g>
          <path d="M50 50 C34 36 30 16 50 4 C70 16 66 36 50 50 Z" />
          <path
            d="M50 50 C34 36 30 16 50 4 C70 16 66 36 50 50 Z"
            transform="rotate(120 50 50)"
          />
          <path
            d="M50 50 C34 36 30 16 50 4 C70 16 66 36 50 50 Z"
            transform="rotate(240 50 50)"
          />
          <path
            d="M50 52 C40 44 36 30 50 22 C64 30 60 44 50 52 Z"
            transform="rotate(60 50 50)"
          />
          <path
            d="M50 52 C40 44 36 30 50 22 C64 30 60 44 50 52 Z"
            transform="rotate(180 50 50)"
          />
          <path
            d="M50 52 C40 44 36 30 50 22 C64 30 60 44 50 52 Z"
            transform="rotate(300 50 50)"
          />
        </g>
      </symbol>
      <symbol id={id("fl-tulip")} viewBox="0 0 100 100">
        <g>
          <path d="M26 26 C26 26 32 76 50 88 C68 76 74 26 74 26 C66 40 58 22 50 38 C42 22 34 40 26 26 Z" />
          <rect x="47" y="86" width="6" height="12" />
          <path d="M47 96 C34 96 22 88 18 76 C34 76 45 84 47 96 Z" />
          <path d="M53 96 C66 96 78 88 82 76 C66 76 55 84 53 96 Z" />
        </g>
      </symbol>
      <symbol id={id("fl-poppy")} viewBox="0 0 100 100">
        <g>
          <ellipse cx="50" cy="26" rx="13" ry="24" />
          <ellipse
            cx="50"
            cy="26"
            rx="13"
            ry="24"
            transform="rotate(90 50 50)"
          />
          <ellipse
            cx="50"
            cy="26"
            rx="13"
            ry="24"
            transform="rotate(180 50 50)"
          />
          <ellipse
            cx="50"
            cy="26"
            rx="13"
            ry="24"
            transform="rotate(270 50 50)"
          />
          <circle cx="50" cy="50" r="9" />
        </g>
      </symbol>
      <symbol id={id("fl-rose")} viewBox="0 0 100 100">
        <g>
          <g>
            <path d="M50 54 C37 47 28 32 33 18 C38 7 62 7 67 18 C72 32 63 47 50 54 Z" />
            <path
              d="M50 54 C37 47 28 32 33 18 C38 7 62 7 67 18 C72 32 63 47 50 54 Z"
              transform="rotate(72 50 50)"
            />
            <path
              d="M50 54 C37 47 28 32 33 18 C38 7 62 7 67 18 C72 32 63 47 50 54 Z"
              transform="rotate(144 50 50)"
            />
            <path
              d="M50 54 C37 47 28 32 33 18 C38 7 62 7 67 18 C72 32 63 47 50 54 Z"
              transform="rotate(216 50 50)"
            />
            <path
              d="M50 54 C37 47 28 32 33 18 C38 7 62 7 67 18 C72 32 63 47 50 54 Z"
              transform="rotate(288 50 50)"
            />
          </g>
          <g>
            <path
              d="M50 46 C42 42 37 33 41 25 C46 18 58 20 60 28 C62 36 57 43 50 46 Z"
              transform="rotate(36 50 50)"
            />
            <path
              d="M50 46 C42 42 37 33 41 25 C46 18 58 20 60 28 C62 36 57 43 50 46 Z"
              transform="rotate(156 50 50)"
            />
            <path
              d="M50 46 C42 42 37 33 41 25 C46 18 58 20 60 28 C62 36 57 43 50 46 Z"
              transform="rotate(276 50 50)"
            />
          </g>
        </g>
      </symbol>
      <symbol id={id("fl-lotus")} viewBox="0 0 100 100">
        <g>
          <path d="M50 88 C22 84 4 68 2 48 C22 48 40 62 50 88 Z" />
          <path d="M50 88 C78 84 96 68 98 48 C78 48 60 62 50 88 Z" />
          <path d="M50 88 C30 78 20 58 24 34 C42 42 54 62 50 88 Z" />
          <path d="M50 88 C70 78 80 58 76 34 C58 42 46 62 50 88 Z" />
          <path d="M50 88 C38 72 36 40 50 14 C64 40 62 72 50 88 Z" />
        </g>
      </symbol>
      <symbol id={id("fl-iris")} viewBox="0 0 100 100">
        <g>
          <path d="M50 48 C42 34 42 16 50 2 C58 16 58 34 50 48 Z" />
          <path
            d="M50 48 C42 34 42 16 50 2 C58 16 58 34 50 48 Z"
            transform="rotate(120 50 50)"
          />
          <path
            d="M50 48 C42 34 42 16 50 2 C58 16 58 34 50 48 Z"
            transform="rotate(240 50 50)"
          />
          <path
            d="M50 50 C64 52 76 62 78 78 C62 78 50 66 50 50 Z"
            transform="rotate(60 50 50)"
          />
          <path
            d="M50 50 C64 52 76 62 78 78 C62 78 50 66 50 50 Z"
            transform="rotate(180 50 50)"
          />
          <path
            d="M50 50 C64 52 76 62 78 78 C62 78 50 66 50 50 Z"
            transform="rotate(300 50 50)"
          />
        </g>
      </symbol>
      <symbol id={id("fl-daisy")} viewBox="0 0 100 100">
        <g>
          <ellipse cx="50" cy="22" rx="5" ry="20" />
          <ellipse cx="50" cy="22" rx="5" ry="20" transform="rotate(30 50 50)" />
          <ellipse cx="50" cy="22" rx="5" ry="20" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="22" rx="5" ry="20" transform="rotate(90 50 50)" />
          <ellipse
            cx="50"
            cy="22"
            rx="5"
            ry="20"
            transform="rotate(120 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="5"
            ry="20"
            transform="rotate(150 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="5"
            ry="20"
            transform="rotate(180 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="5"
            ry="20"
            transform="rotate(210 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="5"
            ry="20"
            transform="rotate(240 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="5"
            ry="20"
            transform="rotate(270 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="5"
            ry="20"
            transform="rotate(300 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="5"
            ry="20"
            transform="rotate(330 50 50)"
          />
          <circle cx="50" cy="50" r="11" />
        </g>
      </symbol>
    </>
  );
}
