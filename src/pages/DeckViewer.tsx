import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CardFace } from "../components/CardFace.tsx";
import { FlowerKey, StoneKey } from "../components/Keys.tsx";
import { FOCUS_NOTES, type ReadAsFocus } from "../deck/constants.ts";
import { DecoBand, ReadAsControl } from "../components/ReadAsControl.tsx";
import { buildDeck } from "../deck/encoding.ts";

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
          One 104-card pack: a double playing-card run, a full 78-card tarot,
          eight flowers valued ace through king, and eight gems.
        </p>
      </div>
      <hr className="rule" />
      <DecoBand />

      <ReadAsControl value={focus} onChange={setFocus} />
      <p className="focus-note">{FOCUS_NOTES[focus]}</p>

      <div className="keys-grid">
        <FlowerKey />
        <StoneKey />
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
            Cards 1–52 are the minor arcana less the knights. Jacks 63, 76, 89
            and 102 are the four knights. Majors occupy 53–62, 64–65 and 66–75.
          </p>
          <p className="body-copy">
            Flowers are eight silhouettes, two per suit. The centre value is
            the rank glyph. Species names are never printed.
          </p>
          <p className="body-copy">
            Both copies of a rank and suit share a gem, in contiguous runs
            from spades to clubs, ace to king.
          </p>
        </div>
        <div>
          <div className="section-title">Reading the face</div>
          <dl className="read-face">
            <dt>Corners</dt>
            <dd>Rank and suit, diagonally mirrored. Red suits in primary.</dd>
            <dt>Number</dt>
            <dd>1–104, top right. The flower marks which copy of the suit.</dd>
            <dt>Left rail</dt>
            <dd>Tarot name and index. Empty on the 26 silent cards.</dd>
            <dt>Centre</dt>
            <dd>Flower silhouette and rank glyph.</dd>
            <dt>Foot</dt>
            <dd>Gem mark and name, inverted for the other way up.</dd>
          </dl>
          <p className="body-copy">
            <Link to="/print">Contact sheet</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
