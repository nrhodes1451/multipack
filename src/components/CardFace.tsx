import { flowerSymbols } from "../assets/flowers.tsx";
import { StoneMark } from "./StoneMark.tsx";
import type { ReadAsFocus } from "../deck/constants.ts";
import type { Card } from "../deck/encoding.ts";
import { CARD_HEIGHT, CARD_WIDTH, COLORS } from "../tokens.ts";

const DISPLAY = "'Roboto Condensed', sans-serif";
const EASE = "opacity 120ms cubic-bezier(0.2,0,0,1)";
const INDEX_X = 42;
const INDEX_Y = 16;
const RANK_SIZE = 44;
const RANK_BASELINE = 36;
const SUIT_SIZE = 44;
const SUIT_BASELINE = 70;
const FOOT_RULE_Y = CARD_HEIGHT - INDEX_Y - SUIT_BASELINE + SUIT_SIZE * 0.4 + 200;

function layerOpacity(focus: ReadAsFocus, layer: Exclude<ReadAsFocus, "all">) {
  return focus === "all" || focus === layer ? 1 : 0.12;
}

function textWidth(
  text: string,
  fontSize: number,
  trackingEm: number,
  factor = 0.52,
) {
  return (
    text.length * fontSize * factor +
    Math.max(0, text.length - 1) * trackingEm * fontSize
  );
}

function IndexCorner({ card }: { card: Card }) {
  const fill = COLORS[card.suitColor];
  return (
    <g transform={`translate(${INDEX_X} ${INDEX_Y})`} fill={fill}>
      <text
        y={RANK_BASELINE}
        textAnchor="middle"
        fontFamily={DISPLAY}
        fontWeight={900}
        fontSize={RANK_SIZE}
        fontVariant="tabular-nums"
      >
        {card.rank}
      </text>
      <text
        y={SUIT_BASELINE}
        textAnchor="middle"
        fontFamily={DISPLAY}
        fontSize={SUIT_SIZE}
      >
        {card.suitGlyph}
      </text>
    </g>
  );
}

type CardFaceProps = {
  card: Card;
  focus?: ReadAsFocus;
  embedDefs?: boolean;
  width?: number;
  height?: number;
};

export function CardFace({
  card,
  focus = "all",
  embedDefs = false,
  width = CARD_WIDTH,
  height = CARD_HEIGHT,
}: CardFaceProps) {
  const prefix = embedDefs ? `c${card.number}-` : "";
  const dP = layerOpacity(focus, "playing");
  const dT = layerOpacity(focus, "tarot");
  const dA = layerOpacity(focus, "arboretum");
  const dB = layerOpacity(focus, "bohnanza");
  const flowerFill = COLORS[card.flowerFill];
  const flowerSize = 104;
  const flowerX = (CARD_WIDTH - flowerSize) / 2;
  const nameW = textWidth(card.stone, 17, 0.16, 0.58);
  const gemSize = 28;
  const gemGap = 12;
  const footTotal = gemSize + gemGap + nameW;
  const footStart = -footTotal / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
      width={width}
      height={height}
      role="img"
      aria-label={`${card.rank}${card.suitGlyph} card ${card.number}`}
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

      <g style={{ opacity: dP, transition: EASE }}>
        <IndexCorner card={card} />
        <g transform={`rotate(180 ${CARD_WIDTH / 2} ${CARD_HEIGHT / 2})`}>
          <IndexCorner card={card} />
        </g>
        <text
          x={322}
          y={40}
          textAnchor="end"
          fontFamily={DISPLAY}
          fontWeight={900}
          fontSize={30}
          fill={COLORS.ink}
          fontVariant="tabular-nums"
        >
          {card.number}
        </text>
      </g>

      <g style={{ opacity: dT, transition: EASE }}>
        {card.tarotName ? (
          <text
            transform="translate(27 238) rotate(-90)"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily={DISPLAY}
          >
            <tspan
              fill={COLORS.primary}
              fontWeight={900}
              fontSize={14}
              letterSpacing="0.2em"
            >
              {card.tarotName}
            </tspan>
            <tspan
              dx={12}
              fill={COLORS.ink}
              fontWeight={400}
              fontSize={11}
              letterSpacing="0.24em"
            >
              {card.tarotIndex}
            </tspan>
          </text>
        ) : null}
      </g>

      <g style={{ opacity: dA, transition: EASE }}>
        <use
          href={`#${prefix}${card.flowerId}`}
          xlinkHref={`#${prefix}${card.flowerId}`}
          x={flowerX}
          y={177}
          width={flowerSize}
          height={flowerSize}
          fill={flowerFill}
        />
      </g>

      <g style={{ opacity: dB, transition: EASE }}>
        <rect x={62} y={FOOT_RULE_Y} width={216} height={1} fill={COLORS.gold} />
        <g transform="rotate(180 170 445)">
          <g transform="translate(170 445)">
            <StoneMark
              name={card.stone}
              fill={COLORS.primary}
              size={gemSize}
              x={footStart}
              y={-gemSize / 2}
            />
            <text
              x={footStart + gemSize + gemGap}
              y={6}
              fontFamily={DISPLAY}
              fontWeight={700}
              fontSize={17}
              letterSpacing="0.16em"
              fill={COLORS.primary}
            >
              {card.stone}
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
}
