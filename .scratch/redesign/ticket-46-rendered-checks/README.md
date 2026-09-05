# Ticket 46, rendered checks

Contact and the footer: the four routes as fields of the record, and the
colophon on the heaviest rule the page draws. Checked on the dev server because
jsdom sees none of it — a label column that lines up with the one at the top of
the page, the hand, two themes and 320px.

Chrome headless, `npm run dev`, both editions, both themes, 1280px and 320px.
The theme is set by emulating `prefers-color-scheme`, which is the branch of the
pre-paint script a first-time visitor takes.

Every capture is the bottom of the page — the page scrolled to its end, which is
where Contact and the footer both are. The whole page in the new design is
photographed under `../ticket-43-rendered-checks/`; what is new here is the last
two screens of it.

Both editions are photographed at all four theme-by-width combinations rather
than at a sample of them: the Spanish edition is a document of its own and not a
mode of the English one (ADR 0004), so a combination checked on one edition is
not checked on the other.

| File | What it is |
| --- | --- |
| `en-light-1280.png` | English, light, 1280px, the bottom of the page |
| `en-dark-1280.png` | English, dark, 1280px, the bottom of the page |
| `en-light-320.png` | English, light, 320px, the bottom of the page |
| `en-dark-320.png` | English, dark, 320px, the bottom of the page |
| `es-light-1280.png` | Spanish, light, 1280px, the bottom of the page |
| `es-dark-1280.png` | Spanish, dark, 1280px, the bottom of the page |
| `es-light-320.png` | Spanish, light, 320px, the bottom of the page |
| `es-dark-320.png` | Spanish, dark, 320px, the bottom of the page |

The 1280px captures are at device pixel ratio 2, the 320px ones at 1.

## What was measured rather than looked at

Read out of the live page, on both editions, in both themes, at both widths:

- `scrollWidth === clientWidth` and no element's box crosses the right edge: no
  horizontal scroll at 320px, on either edition.
- Contact opens on `05 Contact`, and on `05 Contacto` in Spanish.
- Its four fields read `Email` / `fmenendezmoya@gmail.com`, `LinkedIn` /
  `linkedin.com/in/fmenemo`, `GitHub` / `github.com/fmenemo`, and
  `Location` / `Zaragoza, Spain / Remote` — `Ubicación` /
  `Zaragoza, España / Remoto` on the Spanish edition. `GitHub` is the same word
  in both, because a brand is not chrome.
- The three routes are the section's only anchors, and the whole page carries no
  other `mailto:`, `linkedin.com` or `github.com` link.
- At 1280px every field's value begins at x=304 in Contact **and** in the
  identification block at the top: one label column, top and bottom, which is
  what the shared field primitive is for. At 320px all four values begin at
  x=24, under their labels rather than beside them — the column stacks below the
  width it needs, as the primitive draws it.
- The footer's text is `Fran Menéndez` and `2026` and nothing else, it holds no
  anchors, and its two blocks sit on one baseline at both widths. It is set in
  the hand: `font-stretch: 82%`, 11px, `letter-spacing: 1.76px`, uppercase, in
  the muted ink, on a 2px rule.
- Landing on `/#contact` and clicking the contents index's fifth entry both end
  with the Contact section wholly inside the viewport. The page cannot put the
  section's head at the top of the screen because Contact is the last section
  and the document has nothing left to scroll — the scroll stops at its maximum,
  4285px at 1280px, with the section's top 488px down the screen and its rule,
  its four fields and the footer all in view.

## Motion and the pressed state

Neither is new in this ticket. The links Contact draws wear the page's one link
treatment, whose rule, hover, focus, pressed and reduced-motion behaviour are
#41's and are recorded under `.scratch/redesign/ticket-41-rendered-checks/`.
The footer now draws no control at all, so it has no state to check: the two
marks that had one are gone, and with them the last use of the `control`
treatment, which is deleted from `styles.ts`.
