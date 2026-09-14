# Handoff: Swiss Army Deck — card face, card back, and encoding

## Overview
A single 104-card physical deck that encodes four card systems at once, so one printed deck can play any of them:

1. **Playing cards** — two standard 52-card decks (deck A and deck B).
2. **Tarot** — the full 78-card tarot (56 minor arcana + 22 major arcana).
3. **Bohnanza** — the 104-card distribution, re-themed as eight **precious stones** (quartz ×20 down to diamond ×6).
4. **Arboretum** — eight **flower species** (suit × deck), each valued ace through king.

This bundle covers the agreed card face, the card back, and the eight flower and eight stone marks, plus the complete card-by-card mapping data.

## About the Design Files
The files here are **design references created in HTML** — prototypes that show the intended look, proportions and artwork. They are not production code to copy. The task is to **recreate these designs in the target environment** (a React/Vue web app, a print-generation pipeline, a canvas renderer, or a PDF/SVG exporter for the actual printed deck) using that environment's own patterns. If there is no environment yet, pick the one that fits the goal — for a physical deck, an SVG or PDF generator driven by the mapping data is the natural choice; the HTML is the visual spec.

The design artwork (flower and stone paths) **is** meant to be reused verbatim — the SVG path data is the deliverable, not a suggestion.

## Fidelity
**High-fidelity.** Final colours, typography, sizes, artwork and layout. The card face and back should be reproduced faithfully — positions below are given as exact pixel values on a 340 × 476 card box (see *Scaling* for print).

## Design system
The design follows the **Penrose design system** (modern art deco: geometric, symmetrical, high contrast, no shadows, no gradients, 0–2px radius, rules rather than boxes; one accent family per surface plus gold hairlines). Tokens used are listed under *Design tokens*. If your codebase already has Penrose tokens, use those variables rather than the hex values.

---

## Screens / Views

### 1. Card face (all 104 cards)
**Purpose:** a player reads whichever system they are playing without the other three getting in the way.

**Card box:** 340 × 476 px, `background: #FFFFFF` (paper), `outline: 1px solid #2F3D32` (ink). No radius in the mock; the printed card is a normal rounded playing card — the die-cut handles that. `position: relative`, all children absolutely positioned.

**Elements (exact positions on the 340 × 476 box):**

| # | Element | Position | Spec |
|---|---|---|---|
| 1 | Rank + suit index (top-left) | `top: 16px; left: 18px` | column, centred, `line-height: 0.96`. Rank: Roboto Condensed 900, 34px. Suit glyph: 26px. Colour = suit colour |
| 2 | Rank + suit index (bottom-right) | `bottom: 16px; right: 18px` | identical, `transform: rotate(180deg)` |
| 3 | Card number | `top: 16px; right: 18px` | Roboto Condensed 900, 30px, `line-height: 0.9`, tabular numerals, ink. Value 1–104. No “/104”, no deck letter |
| 4 | Tarot rail hairline | `left: 44px; top: 74px; bottom: 74px; width: 1px` | `background: #E9CB4F` (gold) |
| 5 | Tarot rail text | `left: 10px; top: 74px; bottom: 74px; width: 34px`, centred | `writing-mode: vertical-rl; transform: rotate(180deg)`, row with `gap: 12px`, `white-space: nowrap`. Name: Roboto Condensed 900, 14px, `letter-spacing: 0.2em`, `#7A104E` (primary). Index: Roboto Condensed 400, 11px, `letter-spacing: 0.24em`, ink |
| 6 | Species + value (centre) | `left: 60px; right: 22px; top: 86px; bottom: 104px` | flex row, centred, `gap: 18px`. Flower SVG 104 × 104. Value: Roboto Condensed 900, 86px, `line-height: 0.8`, tabular numerals, ink |
| 7 | Stone hairline | `left: 62px; right: 62px; bottom: 54px; height: 1px` | gold `#E9CB4F` |
| 8 | Stone row | `left: 62px; right: 62px; bottom: 20px` | **`transform: rotate(180deg)`** — deliberately inverted so it reads upright when the card is held the other way up. Flex row centred, `gap: 11px`: stone mark 22 × 22 (primary fill), name Roboto Condensed 700 14px `letter-spacing: 0.18em` primary, count Roboto Condensed 400 13px `letter-spacing: 0.1em` ink (e.g. `×8`) |

**Rules that produced this layout (worth preserving):**
- The foot band is inset to `62px` on both sides specifically to clear the bottom-right rotated index. Do not widen it.
- The species **name never appears on the card** — identity is carried by the flower silhouette alone.
- The centre value is the **rank glyph** (`A`, `2`–`10`, `J`, `Q`, `K`), not a number 1–13.
- Suit colour: spades and clubs = ink `#2F3D32`; hearts and diamonds = primary `#7A104E` (not scarlet — Penrose has no red ink).

**Worked examples (both in the mock):**

*10 of clubs, deck A — card 49*
- Index: `10` + `♣`, ink. Number: `49`.
- Rail: `TEN OF WANDS` / `MINOR`.
- Centre: poppy (♣ deck A, ink fill) + `10`.
- Foot: ruby, `×8`, inverted.

*King of spades, deck B — card 65*
- Index: `K` + `♠`, ink. Number: `65`.
- Rail: `JUSTICE` / `MAJOR XI` (deck B spades carry the majors).
- Centre: rose (♠ deck B, primary fill) + `K`.
- Foot: amethyst, `×18`, inverted.

### 2. Card back
**Purpose:** identical on every card; must give nothing away and must survive being held either way up (the artwork is uniform, so orientation is irrelevant).

- Card box 340 × 476, paper, `outline: 1px solid` ink, `overflow: hidden`.
- Primary panel: `inset: 14px`, `background: #7A104E`.
- Gold hairline frame: `inset: 22px`, `border: 1px solid #E9CB4F`.
- Pattern area: `inset: 30px`, CSS grid `repeat(4, minmax(0,1fr)) × repeat(5, minmax(0,1fr))`, `gap: 8px` — 20 cells, each a centred flex box with `min-width: 0; min-height: 0`.
- Cells alternate in a **checkerboard by row and column** (`(row + col) % 2`): flowers on the even squares, stones on the odd, so neither shade forms a contiguous column.
  - Flower cells: SVG at 82% of the cell, `fill: #FFFFFF`.
  - Stone cells: clip-path shape at 56% of the cell, `background: #FFCCE9` (primary-tint).
- Flowers cycle through the eight species in order, stones through the eight stones in order.
- **No text on the back**, no wordmark, no dividing rule, no rotated duplicate half.

> Implementation note: the mock renders flowers via `<use href="#fl-…">` against a shared `<symbol>` sprite. Inherited fill through `<use>` is dropped by some rasterisers/serialisers — set `fill` **on the `<use>` element itself** (or on the symbol’s children) when generating print assets, or inline the paths.

---

## Encoding rules (the part that must be exactly right)

Card order is canonical and drives everything: **deck A then deck B**, within a deck **♠ ♥ ♦ ♣**, within a suit **A 2 3 4 5 6 7 8 9 10 J Q K**.

- `suitIndex` (si): ♠=0, ♥=1, ♦=2, ♣=3
- `rankIndex` (ri): A=0 … K=12
- `deckIndex` (di): A=0, B=1
- `unit = si * 13 + ri` (0–51, identical for both decks)
- **Card number** = `di * 52 + unit + 1` → 1–104

### Playing cards
Deck A is cards 1–52, deck B is 53–104. The deck letter is not printed; the flower species identifies the deck (see below).

### Arboretum — eight flower species
Species = **suit × deck**, so every one of the 104 cards has a species. Value = the rank, ace through king.

| Species | Suit · deck | Fill |
|---|---|---|
| Dahlia | ♠ A | ink |
| Lily | ♥ A | ink |
| Tulip | ♦ A | ink |
| Poppy | ♣ A | ink |
| Rose | ♠ B | primary |
| Lotus | ♥ B | primary |
| Iris | ♦ B | primary |
| Daisy | ♣ B | primary |

Deck A species are ink, deck B primary — shape alone is sufficient, colour is reinforcement.

### Tarot
- **Deck A (all 52 cards)** = the minor arcana less the knights: ace, 2–10, page (J), queen (Q), king (K) of the suit’s tarot line. Suit → tarot line: ♠ swords, ♥ cups, ♦ pentacles, ♣ wands. Rail index reads `MINOR`.
- **Deck B jacks (4 cards)** = the four knights (`KNIGHT OF <line>`), completing the 78.
- **Deck B majors (22 cards)** — rail index reads `MAJOR <roman>`:
  - ♠ A,2,3,4,5,6,7,8,9,10 → majors 0–9 (The Fool … The Hermit)
  - ♠ Q,K → majors 10, 11 (Wheel of Fortune, Justice)
  - ♥ A–10 → majors 12–21 (The Hanged Man … The World)
  - (♠ J is the knight of swords, not a major)
- **Remaining 26 deck B cards** (♦ and ♣ non-jacks, ♥ J/Q/K) carry no tarot identity. In the mock they read `NO TAROT` / `—`; on the printed card, leave the rail empty.

### Bohnanza — eight precious stones
Stones ignore the deck letter: both copies of a card share a stone, so the eight bands are contiguous runs of `unit` read ♠→♣, A→K.

| Stone | Count | Band (`unit`) | Range |
|---|---|---|---|
| Quartz | 20 | 0–9 | ♠A–♠10 |
| Amethyst | 18 | 10–18 | ♠J–♥6 |
| Jade | 16 | 19–26 | ♥7–♦A |
| Opal | 14 | 27–33 | ♦2–♦8 |
| Sapphire | 12 | 34–39 | ♦9–♦K |
| Emerald | 10 | 40–44 | ♣A–♣5 |
| Ruby | 8 | 45–48 | ♣6–♣9 |
| Diamond | 6 | 49–51 | ♣10–♣K |

Cut points as code: `CUTS = [10, 19, 27, 34, 40, 45, 49, 52]`; `let bi = 0; while (unit >= CUTS[bi]) bi++;` indexes the stone list above. Counts sum to 104.

---

## Artwork

### Flowers (SVG, `viewBox="0 0 100 100"`, single fill)
Copy the `<symbol>` definitions verbatim from `Card Mockups.dc.html` (top of the template, ids `fl-dahlia`, `fl-lily`, `fl-tulip`, `fl-poppy`, `fl-rose`, `fl-lotus`, `fl-iris`, `fl-daisy`). Construction, for reference:

- **Dahlia** — 8 outer ellipses (`rx 7, ry 19`, cy 22) at 45° steps, 8 inner ellipses (`rx 6, ry 13`, cy 34) offset 22.5°, centre circle r 9.
- **Lily** — 3 large cupped petals at 120° steps + 3 smaller petals at 60° offset.
- **Tulip** — cup path, 6 × 12 stem, two arched leaves.
- **Poppy** — 4 elongated petals (`rx 13, ry 24`, cy 26) at 90° steps + centre circle r 9.
- **Rose** — 5 scalloped petals at 72° steps + 3 tighter inner petals at 36° offset.
- **Lotus** — 5 tiered pointed petals fanning from a single base point at (50, 88).
- **Iris** — 3 upright standards at 120° steps + 3 drooping falls at 60° offset.
- **Daisy** — 12 narrow ellipses (`rx 5, ry 20`, cy 22) at 30° steps + centre circle r 11.

### Stones (CSS `clip-path`, square box)
```
quartz    polygon(50% 0, 100% 100%, 50% 72%, 0 100%)
amethyst  polygon(50% 0, 100% 38%, 78% 100%, 22% 100%, 0 38%)
jade      circle(50% at 50% 50%)
opal      polygon(50% 0, 100% 50%, 50% 100%, 0 50%)
sapphire  polygon(25% 0, 75% 0, 100% 46%, 50% 100%, 0 46%)
emerald   polygon(18% 0, 82% 0, 100% 22%, 100% 78%, 82% 100%, 18% 100%, 0 78%, 0 22%)
ruby      polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)
diamond   polygon(20% 0, 80% 0, 100% 34%, 50% 100%, 0 34%)
```
For print output, convert each to the equivalent SVG polygon at the target size.

---

## Interactions & behaviour
The printed deck has none. The mock page is static; the only stateful thing in the wider project is the **“read as” switcher** on `Swiss Army Deck.dc.html`, which dims the three systems you are not playing (opacity 1 → 0.12, 120ms colour/opacity, `cubic-bezier(0.2,0,0,1)`). If you build a digital viewer, that is the one interaction worth keeping: a five-way segmented control (all / playing / tarot / arboretum / bohnanza) that lowers the opacity of the layers not in focus. No animation beyond that — Penrose allows 80–200ms colour swaps only.

## State management
For a generator: none beyond the derived card list. Build the 104-card array once from the canonical order and the rules above; every field on the face (`number`, `rank`, `suitGlyph`, `suitColour`, `tarotName`, `tarotIndex`, `speciesHref`, `speciesFill`, `stoneName`, `stoneShape`, `stoneCount`) is a pure function of `(deck, suit, rank)`. `deck-mapping.json` / `.csv` in this bundle are the precomputed table — use them as fixtures or as a test oracle.

## Design tokens
| Token | Hex | Use here |
|---|---|---|
| ink | `#2F3D32` | body text, indices, card outline, deck A flowers |
| paper | `#FFFFFF` | card face, back flowers |
| primary | `#7A104E` | red suits, tarot rail text, stone marks and names, deck B flowers, back panel |
| primary-lift | `#C23585` | hover only (18px+ text / UI) |
| primary-tint | `#FFCCE9` | back stone marks, selected rows |
| accent-gold | `#E9CB4F` | hairlines only (rail, foot band, back frame) |
| rule (row) | `rgba(47,61,50,0.25)` | key-list separators |

Type: **Roboto** (body) and **Roboto Condensed** (display, labels, all numerals). Uppercase for labels with `0.08–0.12em` tracking (rail uses `0.2em`/`0.24em`); hard weight contrast (400 vs 900), no 500–600 in display roles; tabular numerals on every figure.

Spacing: 8px scale with a 4px half-step. Border radius 0–2px. No shadows, no gradients, no borders on containers other than the stated hairlines.

## Scaling for print
The mock is 340 × 476 px = 2.5 : 3.5, i.e. a bridge/poker-size card at ~136 dpi. For a 2.5 × 3.5 in card at 300 dpi (750 × 1050 px), multiply every value above by **2.205**; add your printer’s bleed (usually 3 mm / 36 px) outside the card box and keep all content inside a 1/8 in safe margin — note the indices already sit 16–18px (≈3 mm at mock scale) from the edge, so check them against your printer’s spec before committing.

## Assets
No bitmaps, no icon font, no third-party assets. All artwork is inline SVG or CSS `clip-path` authored for this deck. Fonts are Roboto and Roboto Condensed (Google Fonts; self-host for print).

## Files in this bundle
| File | What |
|---|---|
| `Card Mockups.dc.html` | **The visual spec.** Signed-off face mocks (10♣, K♠) + card back + labelled flower and stone plates. Contains the authoritative SVG symbol definitions |
| `Swiss Army Deck.dc.html` | All 104 faces with the “read as” switcher. **Note: still on the previous face layout** — treat `Card Mockups.dc.html` as the source of truth for the face, this file for the full-deck overview and the mapping prose |
| `Contact Sheet.dc.html` | Print contact sheet, 8 landscape pages × 15 cards. Also still on the previous face layout |
| `deck-mapping.json` | Precomputed 104-card table (playing card, tarot, species, stone) |
| `deck-mapping.csv` | Same table as CSV |
| `support.js`, `doc-page.js` | Runtime files the HTML mocks need in order to open locally. Not part of the design |

Open `Card Mockups.dc.html` in a browser to view the mocks; keep the files in the same folder.

## Open items
- Two full-deck views (`Swiss Army Deck.dc.html`, `Contact Sheet.dc.html`) have not been rolled onto the new face yet. If you need all 104 faces in the new layout, that regeneration is outstanding.
- The 26 deck B cards with no tarot identity leave the rail empty; confirm that reads acceptably in a real fan before printing.
