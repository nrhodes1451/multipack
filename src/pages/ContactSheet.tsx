import { useMemo } from "react";
import { CardBack } from "../components/CardBack.tsx";
import { CardFace } from "../components/CardFace.tsx";
import { StoneKey, FlowerKey } from "../components/Keys.tsx";
import { buildDeck } from "../deck/encoding.ts";

export function ContactSheet() {
  const cards = useMemo(() => buildDeck(), []);
  const pages: (typeof cards)[] = [];
  for (let i = 0; i < cards.length; i += 15) {
    pages.push(cards.slice(i, i + 15));
  }

  return (
    <main className="contact-root">
      {pages.map((page, i) => (
        <section key={i} className="sheet">
          <div className="sheet-head">
            <span>Multipack · Contact Sheet</span>
            <span>
              Sheet {i + 1} of {pages.length + 1}
            </span>
          </div>
          <div className="sheet-grid">
            {page.map((card) => (
              <CardFace key={card.number} card={card} />
            ))}
            {i === pages.length - 1 ? <CardBack /> : null}
          </div>
        </section>
      ))}
      <section className="sheet">
        <div className="sheet-head">
          <span>Multipack · Key</span>
          <span>Sheet {pages.length + 1} of {pages.length + 1}</span>
        </div>
        <div className="sheet-key">
          <FlowerKey />
          <StoneKey />
          <div>
            <div className="section-title">Tarot</div>
            <p className="body-copy">
              Cards 1–52 are the minor arcana less the knights: ace through
              ten, then page, queen, king, in swords, cups, pentacles and
              wands. Jacks 63, 76, 89 and 102 are the four knights.
            </p>
            <p className="body-copy">
              The 22 majors occupy cards 53–62 (spades ace–ten), 64–65 (queen
              and king of spades: the wheel and justice), and 66–75 (hearts
              ace–ten: the hanged man to the world).
            </p>
            <p className="body-copy">
              Twenty-six cards carry no tarot identity — empty rail. The rest
              of 53–104 outside the knights and majors.
            </p>
            <div className="section-title" style={{ marginTop: 14 }}>
              Face
            </div>
            <p className="body-copy">
              Corners: rank and suit. Top right: card number 1–104. Left rail:
              tarot. Centre: flower and rank. Foot: gem, inverted.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
