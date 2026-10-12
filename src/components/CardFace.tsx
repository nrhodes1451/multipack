import { symbolAspect, symbolDefs } from "../assets/symbols.tsx";
import { SymbolMark } from "./SymbolMark.tsx";
import type { ReadAsFocus } from "../deck/constants.ts";
import type { Card } from "../deck/encoding.ts";
import { CARD_HEIGHT, CARD_WIDTH, COLORS, FONT_FAMILY } from "../tokens.ts";

const EASE = "opacity 120ms cubic-bezier(0.2,0,0,1)";
const EDGE = 18;
const RIGHT = CARD_WIDTH - EDGE;
const INDEX_SIZE = 84;
const INDEX_BASELINE = 75;
const CORNER_PLANT_H = 58;
const CORNER_PLANT_MAX_W = 66;
const CORNER_GAP = 8;
const NAME_SIZE = 22;
const NAME_BASELINE = 351;
const LEX_LETTER_SIZE = 94;
const LEX_LETTER_BASELINE = 81;
const LEX_VALUE_SIZE = 62;
const LEX_VALUE_BASELINE = 141;
const GEM_LABEL_SIZE = 21;
const BEAN_SIZE = 18;
const BEAN_BASE_Y = 386;
const BEAN_STEP = 17.5;
const SMALL_CAP_RATIO = 0.76;

/** Advance widths (em) of each rank in Linux Biolinum Bold. */
const RANK_ADVANCE: Record<string, number> = {
  A: 0.701,
  "10": 1.027,
  J: 0.373,
  Q: 0.799,
  K: 0.759,
};
const DIGIT_ADVANCE = 0.514;

function layerOpacity(focus: ReadAsFocus, layer: Exclude<ReadAsFocus, "all">) {
  return focus === "all" || focus === layer ? 1 : 0.12;
}

/** Small caps drawn by hand so the browser and resvg agree. */
function SmallCaps({ text, size }: { text: string; size: number }) {
  return text.split(" ").map((word, i) => (
    <tspan key={i}>
      {i > 0 ? " " : ""}
      <tspan fontSize={size}>{word[0]!.toUpperCase()}</tspan>
      <tspan fontSize={size * SMALL_CAP_RATIO}>{word.slice(1).toUpperCase()}</tspan>
    </tspan>
  ));
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
  const dL = layerOpacity(focus, "lexicon");
  const dA = layerOpacity(focus, "arboretum");
  const dB = layerOpacity(focus, "bohnanza");
  const indexFill = card.suitRed ? COLORS.red : COLORS.ink;
  const coinsHighToLow = [...card.beanometer].reverse();
  const rankWidth = (RANK_ADVANCE[card.rank] ?? DIGIT_ADVANCE) * INDEX_SIZE;
  const cornerW = Math.min(
    CORNER_PLANT_MAX_W,
    CORNER_PLANT_H * symbolAspect(card.plantId),
  );
  const cornerH = cornerW / symbolAspect(card.plantId);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
      width={width}
      height={height}
      role="img"
      aria-label={`${card.rank}${card.suitGlyph} ${card.plant}, card ${card.number}`}
      fontFamily={FONT_FAMILY}
    >
      {embedDefs ? <defs>{symbolDefs(prefix)}</defs> : null}
      <rect width={CARD_WIDTH} height={CARD_HEIGHT} fill={COLORS.paper} />

      <g style={{ opacity: dP, transition: EASE }}>
        <text
          x={EDGE}
          y={INDEX_BASELINE}
          fontWeight={700}
          fontSize={INDEX_SIZE}
          fill={indexFill}
        >
          {card.rank}
        </text>
        <SymbolMark
          id={card.plantId}
          prefix={prefix}
          x={EDGE + rankWidth + CORNER_GAP}
          y={18 + (CORNER_PLANT_H - cornerH) / 2}
          width={cornerW}
          height={cornerH}
        />
        <text
          x={RIGHT}
          y={INDEX_BASELINE}
          textAnchor="end"
          fontWeight={700}
          fontSize={INDEX_SIZE}
          fill={COLORS.ink}
        >
          {card.number}
        </text>
      </g>

      <g style={{ opacity: dA, transition: EASE }}>
        <SymbolMark
          id={card.plantId}
          prefix={prefix}
          x={62}
          y={123}
          width={216}
          height={192}
        />
        <text
          x={CARD_WIDTH / 2}
          y={NAME_BASELINE}
          textAnchor="middle"
          letterSpacing="0.04em"
          fill={COLORS.ink}
        >
          <SmallCaps text={card.plant} size={NAME_SIZE} />
        </text>
      </g>

      <g style={{ opacity: dB, transition: EASE }}>
        {coinsHighToLow.map((beans, i) =>
          beans === null ? null : (
            <text
              key={i}
              transform={`translate(${30 + i * BEAN_STEP} ${BEAN_BASE_Y}) rotate(-90)`}
              fontSize={BEAN_SIZE}
              fill={COLORS.ink}
            >
              {beans}
            </text>
          ),
        )}
        <g transform={`rotate(180 ${EDGE + 36} ${394 + 32})`}>
          <SymbolMark
            id={card.gemId}
            prefix={prefix}
            x={EDGE}
            y={394}
            width={72}
            height={64}
          />
        </g>
        <text
          transform={`translate(110 ${CARD_HEIGHT - 26}) rotate(-90)`}
          fontSize={GEM_LABEL_SIZE}
          letterSpacing="0.03em"
          fill={COLORS.ink}
        >
          {card.gem}
        </text>
      </g>

      <g style={{ opacity: dL, transition: EASE }} fill={COLORS.ink}>
        {/* Upside down: turn the card round and it reads as a Lexicon index. */}
        <g transform={`rotate(180 ${CARD_WIDTH / 2} ${CARD_HEIGHT / 2})`}>
          <text
            x={EDGE}
            y={LEX_LETTER_BASELINE}
            fontWeight={700}
            fontSize={LEX_LETTER_SIZE}
          >
            {card.lexiconLetter}
          </text>
          <text x={EDGE} y={LEX_VALUE_BASELINE} fontSize={LEX_VALUE_SIZE}>
            {card.lexiconValue}
          </text>
        </g>
      </g>
    </svg>
  );
}
