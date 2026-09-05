# Ticket 43, rendered checks

The evidence as a record: the Experience and Independent work sections in the
running head, the ledger columns and the numbered entries variant E draws them
in. Checked on the dev server because jsdom sees none of it — a measure, a
column that lines up, tabular figures, two themes and 320px.

Chrome headless, `npm run dev`, both editions, both themes, 1280px and 320px.
The theme is set by emulating `prefers-color-scheme`, which is the branch of the
pre-paint script a first-time visitor takes.

Both editions are photographed at all four theme-by-width combinations rather
than at a sample of them: the Spanish edition is a document of its own and not a
mode of the English one (ADR 0004), so a combination checked on one edition is
not checked on the other.

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
| `en-light-1280-shop-programme.png` | The Shop programme at 1280px: entry `1`, its parts `1.1` to `1.9` |
| `en-light-320-shop-programme.png` | The same programme at 320px, where the ledger columns stack and the entry numbers do not |

The whole-page captures are at device pixel ratio 2 at 1280px and 1 at 320px.
A 320px page is 9584 CSS pixels tall in English and 11146 in Spanish, and at
ratio 2 that surface passes the size at which Chrome's capture tiles and repeats
the top of the page underneath itself. The first pass produced exactly that, and
the doubling is an artefact of the screenshot rather than of the page: the DOM
carries one `h1`, six sections and two independent-work entries at every width,
which is measured below.

## What was measured rather than looked at

Read out of the live page, on both editions, in both themes, at both widths:

- `scrollWidth === clientWidth` and no element's box crosses the right edge:
  no horizontal scroll at 320px, on either edition.
- The five running heads read `01 Experience`, `02 Independent work`,
  `03 Recognitions`, `04 Technologies` and `05 Contact`, and their
  Spanish equivalents. The numbers are the ones the contents index links by.
- The first entry of the Principal role is numbered `1` and its parts are
  numbered `1.1` through `1.9`, in order, at every width.
- Independent work is `01 Instagram Checker` and `02 Multi-agent delivery
  harness` (`02 Harness de entrega multiagente` on the Spanish edition), and
  the section holds no anchors at all.
- The hand computes to `font-stretch: 82%` on a running head, so the width axis
  is live in the new component rather than falling back.
- The evidence measure computes to 637px at 1280px and 224px at 320px. The
  container is wider than that at 1280px, so the cap is what holds the line
  rather than the page's own width.

## What the pictures are for

The two `shop-programme` captures are the one thing the whole-page shots cannot
show at a readable size: the arc reads as one entry with its parts under it, the
numbers hang in a column of their own, and the parts begin where their parent's
own text begins rather than indented away from it. At 320px the ledger columns
stack: an employer's span and a role's dates sit above what they label instead
of beside it. The entry numbers do not stack — an entry is two columns at every
width, so `1` and `1.1` stay beside their statements, which is what still says
which part belongs to which entry once the columns above them have folded.

## Motion and the pressed state

Neither is new in this ticket. The sections it draws carry no motion of their
own and no control: every link and button on the page, and so the whole of the
reduced-motion and pressed-state surface, is #41's and is recorded under
`.scratch/redesign/ticket-41-rendered-checks/`. Nothing here changed a
treatment either one covers.
