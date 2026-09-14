# Multipack

104-card deck encoding playing cards, tarot, flowers, and gems.

## Scripts

- `npm run dev` — viewer (`/`, `/print`)
- `npm test` — encoding fixtures
- `npm run generate:mapping` — regenerate `src/deck/deck-mapping.json` / `.csv`
- `npm run export` — SVG faces + back in `export/`
  - `--dpi 300` scales by 2.205 (750×1050)
  - `--bleed 3mm` adds bleed outside the card box

Visual spec remains in `design_handoff_swiss_army_deck/`.
