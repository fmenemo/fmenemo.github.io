# Ticket 45, rendered checks

Recognitions, education and technologies as variant E draws them: the date in
the left column and the recognition beside it, education under a heavier rule,
and the technologies as a numbered index rather than a set of chips. Checked on
the dev server because jsdom lays nothing out — a column that lines up with the
one above it, two columns of the index at 320px and five at 1280px, tabular
figures, two themes, and no horizontal scroll.

Chrome headless, `npm run dev`, both editions, both themes, 1280px and 320px.
The theme is set by emulating `prefers-color-scheme`, which is the branch of the
pre-paint script a first-time visitor takes.

Both editions are photographed at all four theme-by-width combinations rather
than at a sample of them: the Spanish edition is a document of its own and not a
mode of the English one (ADR 0004).

| File | What it is |
| --- | --- |
| `en-light-1280.png` | English, light, 1280px, whole page |
| `en-dark-1280.png` | English, dark, 1280px, whole page |
| `en-light-320.png` | English, light, 320px, whole page |
| `en-dark-320.png` | English, dark, 320px, whole page |
| `es-light-1280.png` | Spanish, light, 1280px, whole page |
| `es-dark-1280.png` | Spanish, dark, 1280px, whole page |
| `es-light-320.png` | Spanish, light, 320px, whole page |
| `es-dark-320.png` | Spanish, dark, 320px, whole page |
| `en-light-1280-recognitions-technologies.png` | The two sections alone at 1280px, light |
| `en-dark-1280-recognitions-technologies.png` | The same two at 1280px, dark |
| `en-light-320-recognitions-technologies.png` | The same two at 320px, where the ledger columns stack and the index runs in two |
| `es-light-320-recognitions-technologies.png` | The Spanish edition's two at 320px, where the names run longest |

`measurements.json` is the raw read behind the table below, one row per
combination, written by the same run that took the whole-page captures.

## What was measured rather than looked at

Read out of the live page, on both editions, in both themes, at both widths:

- **No horizontal scroll.** `documentElement.scrollWidth` equals `clientWidth`
  in all eight combinations: 320 at 320px and 1280 at 1280px. This is the
  measurement the criterion asks for; the pictures are what says the page is
  still legible once it fits.
- **Seven recognitions and fourteen technologies**, in every combination. The
  count is what says a column layout dropped nothing.
- **The index runs in two columns at 320px and five at 1280px**, counted as the
  number of distinct left edges among the fourteen rows rather than read off a
  class.
- **The date column is the record's column.** At 1280px a recognition's date
  starts at x=168 and its text at x=344, and the text of an experience entry
  starts at x=344 too: the two sections sit on the same vertical, which is what
  the shared `ledger` setting is for. At 320px both fall back to the gutter at
  x=24, stacked.
- **The figures are tabular.** `font-variant-numeric` on a date computes to
  `lining-nums tabular-nums`, so `MAY 2017` and `FEB 2019` are the same width.
- **The technologies are set in the narrow face**, `Archivo Variable`, which is
  the face the record names things in.
- **Both running heads carry their numbers**, read as the head's whole text:
  `03 Recognitions` and `04 Technologies` in English, `03 Reconocimientos y
  premios` and `04 Tecnologías` in Spanish.
- **Education carries all four of its fields** under the recognitions, in both
  editions, each edition's own: the years, the label, the degree with the
  institution, and the languages.

## What is not here

Reduced motion. Neither section animates anything — there is no transition, no
transform and no link in either of them — so there is nothing for the
preference to yield.
