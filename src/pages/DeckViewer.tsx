import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CardFace } from "../components/CardFace.tsx";
import { GemKey, LexiconKey, PlantKey } from "../components/Keys.tsx";
import { FOCUS_NOTES, type ReadAsFocus } from "../deck/constants.ts";
import { DecoBand, ReadAsControl } from "../components/ReadAsControl.tsx";
import { buildDeck } from "../deck/encoding.ts";
import { ARTWORK_NOTICE } from "../tokens.ts";

export function DeckViewer() {
  const [focus, setFocus] = useState<ReadAsFocus>("all");
  const cards = useMemo(() => buildDeck(), []);

  return (
    <main className="page-wrap">
      <div className="hero">
        <div>
          <h1>Multipack</h1>
          <p className="kicker">104 cards · four systems on one face</p>
        </div>
        <p className="lede">
          One 104-card pack: a double playing-card run, two Lexicon decks,
          eight plants valued ace through king, and Bohnanza's eight beans as
          gems.
        </p>
      </div>
      <hr className="rule" />
      <DecoBand />

      <ReadAsControl value={focus} onChange={setFocus} />
      <p className="focus-note">{FOCUS_NOTES[focus]}</p>

      <div className="keys-grid">
        <PlantKey />
        <GemKey />
        <LexiconKey />
      </div>

      <section className="deck-section">
        <div className="deck-head">
          <h2>The pack · 104 cards</h2>
          <span>Canonical order, 1–104</span>
        </div>
        <div className="card-grid">
          {cards.map((card) => (
            <CardFace key={card.number} card={card} focus={focus} width={186} />
          ))}
        </div>
      </section>

      <div className="keys-grid footer-copy">
        <div>
          <div className="section-title">Mapping strategy</div>
          <p className="body-copy">
            Every identity is derived from the playing-card rank and suit.
            Suits run clubs, diamonds, hearts, spades; cards 1–52 are the
            first copy and 53–104 the second.
          </p>
          <p className="body-copy">
            Plants are eight species, two per suit, one for each copy. Gems
            follow Bohnanza's bean counts, in contiguous runs from clubs to
            spades, ace to king, so both copies of a rank and suit share one.
          </p>
          <p className="body-copy">
            Each copy carries a standard 52-card Lexicon deck, master card
            included, dealt by a fixed shuffle.
          </p>
        </div>
        <div>
          <div className="section-title">Reading the face</div>
          <dl className="read-face">
            <dt>Top left</dt>
            <dd>Rank and suit plant. Red suits in red.</dd>
            <dt>Top right</dt>
            <dd>Card number, 1–104.</dd>
            <dt>Centre</dt>
            <dd>Plant and its name in small caps.</dd>
            <dt>Bottom left</dt>
            <dd>Gem, name and beanometer, four coins down to one.</dd>
            <dt>Bottom right</dt>
            <dd>
              Lexicon letter and value, upside down. Turn the card round to
              play Lexicon.
            </dd>
          </dl>
          <p className="body-copy">
            <Link to="/print">Contact sheet</Link>
          </p>
          <p className="body-copy">{ARTWORK_NOTICE}</p>
        </div>
      </div>
    </main>
  );
}
