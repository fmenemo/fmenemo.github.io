# Ticket 47, rendered checks

The last ticket of phase two: the record of the design, and the images that
carry it off the page. What jsdom cannot see here is the pictures themselves —
the face, the width axis, the palette and the composition of the two cards and
the icon — so they were looked at rather than asserted.

No component changed in this ticket, so the page is the one photographed under
`../ticket-43-rendered-checks/` and `../ticket-46-rendered-checks/`. What is new
is three binaries and one mark.

## The renders

All three came out of one run of `npm run render:assets`, which is the whole of
the command and renders both cards and the icon together (ADR 0004). They are
checked into `public/` rather than copied here, because that is where they are
read from and a second copy is a second thing to keep in step:

| File | What was looked at |
| --- | --- |
| `public/og-image.png` | The English card, 1200x630 |
| `public/og-image-es.png` | The Spanish card, 1200x630 |
| `public/apple-touch-icon.png` | The touch icon, 180x180 |
| `favicon-32.png` | The mark at the size a browser tab draws it, captured here at 4x so it can be seen |

## What was looked at

- **The face is the site's.** One variable face at both of the page's settings:
  the nameplate at the wide end of the width axis, the running head and the
  colophon row in the hand — narrow, tracked open, uppercase. Nothing on either
  card is set in a face the page does not use.
- **The palette is the Record's light composition**, and a card has no theme, so
  light is the only one it can be. The manila stock, the ink over it, the muted
  the hand is set in, the rule, and one warm accent on the address of the
  edition. Every value is a copy of a token, named beside it in
  `tools/assets/og-image.css`.
- **The composition is the page's own parts**: the running head over a hairline,
  the nameplate, the identity line under the heavy rule, and the colophon row on
  the rule at the foot, with the place on the left and the mode on the right.
- **The accents are drawn, not dropped**: "MENÉNDEZ" and "ESPAÑA" carry theirs at
  the wide setting and at the hand's tracking.
- **Each card carries its own edition's words.** The Spanish card is condensed
  from the Spanish identity line, and says `fmenemo.github.io/es`, which is the
  card saying which edition is being shared.
- **The icon and the mark.** The touch icon is the favicon screenshotted at
  180x180, so the palette reaches it from `public/favicon.svg`, which now carries
  the Record's ink and stock instead of the Swiss black and white. The letter
  still reads at 32px, which is the size that decides whether the mark works.

## After the merge

The deployed link preview is Fran's to look at: the new card for both editions,
in whatever unfurls it. A scraper caches by URL and the filenames did not change,
so a preview that still shows the Swiss card is a cache rather than a failed
render — the picture in `public/` is the one that shipped.
