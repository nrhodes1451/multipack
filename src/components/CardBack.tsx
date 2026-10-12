import { CARD_BACK_MARKUP, CARD_BACK_VIEWBOX } from "../assets/card-back-data.ts";
import { scoped } from "../assets/symbols.tsx";
import { CARD_HEIGHT, CARD_WIDTH } from "../tokens.ts";

type CardBackProps = {
  width?: number;
  height?: number;
};

/** The designed back from designs/Card back.svg, embedded as drawn. */
export function CardBack({
  width = CARD_WIDTH,
  height = CARD_HEIGHT,
}: CardBackProps) {
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
      <svg
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        viewBox={CARD_BACK_VIEWBOX}
        preserveAspectRatio="xMidYMid slice"
        dangerouslySetInnerHTML={{ __html: scoped(CARD_BACK_MARKUP, "") }}
      />
    </svg>
  );
}
