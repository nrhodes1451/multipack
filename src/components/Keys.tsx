import { SPECIES, SUITS } from "../deck/constants.ts";
import { stoneRules } from "../deck/encoding.ts";
import { COLORS } from "../tokens.ts";
import { StoneMark } from "./StoneMark.tsx";

function speciesRange(s: (typeof SPECIES)[number]) {
  const si = SUITS.findIndex((u) => u.key === s.suit);
  const start = (s.deck === "A" ? 0 : 52) + si * 13 + 1;
  return `${SUITS[si]!.glyph} ${start}\u2013${start + 12}`;
}

export function FlowerKey() {
  return (
    <div>
      <div className="section-title">
        Flowers · eight species, values ace–king
      </div>
      <div className="flower-key">
        {SPECIES.map((s) => (
          <div key={s.id} className="flower-key-item">
            <svg viewBox="0 0 100 100" width="78" height="78">
              <use
                href={`#${s.id}`}
                xlinkHref={`#${s.id}`}
                fill={s.deck === "A" ? COLORS.ink : COLORS.primary}
              />
            </svg>
            <span className="key-rule" />
            <span className="key-name">{s.name}</span>
            <span className="key-meta">{speciesRange(s)}</span>
          </div>
        ))}
      </div>
      <p className="body-copy">
        Eight species, two per suit, so every card has one. The value beside
        it is the rank, ace through king. Ink for cards 1–52, primary for
        53–104. The name never appears on the card.
      </p>
    </div>
  );
}

export function StoneKey() {
  return (
    <div>
      <div className="section-title">Gems</div>
      <div className="stone-key">
        {stoneRules().map((row) => (
          <div key={row.name} className="stone-key-item">
            <svg width="26" height="26" viewBox="0 0 26 26">
              <StoneMark name={row.name} fill={COLORS.primary} size={26} />
            </svg>
            <span className="key-name">{row.name}</span>
            <span className="key-meta">{row.rule}</span>
          </div>
        ))}
      </div>
      <p className="body-copy">
        Quartz is the commonest at twenty and diamond the scarcest at six.
        Both copies of a rank and suit carry the same gem.
      </p>
    </div>
  );
}
