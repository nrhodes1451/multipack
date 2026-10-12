import { LEXICON, LEXICON_MASTER, PLANTS, SUITS } from "../deck/constants.ts";
import { beanometerText, gemRules } from "../deck/encoding.ts";
import { SymbolMark } from "./SymbolMark.tsx";

function plantRange(p: (typeof PLANTS)[number]) {
  const si = SUITS.findIndex((u) => u.key === p.suit);
  const start = (p.deck === "A" ? 0 : 52) + si * 13 + 1;
  return `${SUITS[si]!.glyph} ${start}–${start + 12}`;
}

export function PlantKey() {
  return (
    <div>
      <div className="section-title">Plants · two per suit</div>
      <div className="plant-key">
        {PLANTS.map((p) => (
          <div key={p.id} className="plant-key-item">
            <svg viewBox="0 0 100 100" width="78" height="78">
              <SymbolMark id={p.id} width={100} />
            </svg>
            <span className="key-rule" />
            <span className="key-name">{p.name}</span>
            <span className="key-meta">{plantRange(p)}</span>
          </div>
        ))}
      </div>
      <p className="body-copy">
        Each plant stands for one suit in one copy of the pack: iris, tulip,
        hosta and monstera on 1–52, then clover, fuchsia, eastern redbud and
        anthurium on 53–104. The rank runs ace to king.
      </p>
    </div>
  );
}

export function GemKey() {
  return (
    <div>
      <div className="section-title">Gems · Bohnanza</div>
      <div className="gem-key">
        {gemRules().map((row) => (
          <div key={row.id} className="gem-key-item">
            <svg width="26" height="26" viewBox="0 0 26 26">
              <SymbolMark id={row.id} width={26} />
            </svg>
            <span className="key-name">{row.name}</span>
            <span className="key-meta">
              {row.rule} · {beanometerText(row.beanometer)}
            </span>
          </div>
        ))}
      </div>
      <p className="body-copy">
        The eight gems stand in for Bohnanza's beans: amber is the blue bean
        at twenty, ruby the garden bean at six. Both copies of a rank and suit
        carry the same gem. The beanometer reads the beans needed for one to
        four coins.
      </p>
    </div>
  );
}

export function LexiconKey() {
  return (
    <div>
      <div className="section-title">Lexicon · two standard decks</div>
      <div className="gem-key">
        {LEXICON.map((g) => (
          <div key={g.letters} className="gem-key-item">
            <span className="key-name">{g.letters.split("").join(" ")}</span>
            <span className="key-meta">
              ×{g.copies} · {g.value}
            </span>
          </div>
        ))}
        <div className="gem-key-item">
          <span className="key-name">{LEXICON_MASTER.letter} Master</span>
          <span className="key-meta">wild · {LEXICON_MASTER.value}</span>
        </div>
      </div>
      <p className="body-copy">
        Cards 1–52 and 53–104 each hold one full 52-card Lexicon deck, dealt by
        a fixed shuffle. The index is printed upside down, so turn the cards
        round to play. The value under the letter is its penalty.
      </p>
    </div>
  );
}
