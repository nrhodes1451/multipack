import { COLORS } from "../tokens.ts";
import type { ReadAsFocus } from "../deck/constants.ts";

const OPTIONS: { id: ReadAsFocus; label: string }[] = [
  { id: "all", label: "ALL FOUR" },
  { id: "playing", label: "PLAYING" },
  { id: "tarot", label: "TAROT" },
  { id: "arboretum", label: "FLOWERS" },
  { id: "bohnanza", label: "GEMS" },
];

type ReadAsControlProps = {
  value: ReadAsFocus;
  onChange: (focus: ReadAsFocus) => void;
};

export function ReadAsControl({ value, onChange }: ReadAsControlProps) {
  return (
    <div className="read-as">
      <span className="read-as-label">Read as</span>
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={value === opt.id ? "seg primary" : "seg quiet"}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function DecoBand() {
  return (
    <svg
      className="deco-band"
      viewBox="0 0 1040 18"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: 26 }, (_, i) => {
        const x = i * 40;
        return (
          <path
            key={i}
            d={`M${x + 20} 1 L${x + 32} 9 L${x + 20} 17 L${x + 8} 9 Z`}
            fill={COLORS.primaryTint}
          />
        );
      })}
    </svg>
  );
}
