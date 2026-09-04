# Ticket #33, what was checked in a browser

The prototype has no tests of its own by decision (#26, Testing Decisions), so
everything below was read off the running dev server rather than asserted:
Chrome headless over the DevTools protocol against `npm run dev` on 2026-09-04,
at the commit that adds the four screenshots beside this file.

| File | Viewport | Theme | Pixels |
| --- | --- | --- | --- |
| `variant-b-light-1280.png` | 1280 | light | 1280 x 6258 |
| `variant-b-dark-1280.png` | 1280 | dark | 1280 x 6258 |
| `variant-b-light-320.png` | 320 | light | 320 x 10171 |
| `variant-b-dark-320.png` | 320 | dark | 320 x 10171 |

Each is one continuous capture of the whole document at a device pixel ratio of
1, from the name at the top of the rail to the footer, and each pixel height is
the page's own height at that width. The ratio is 1 for the reason #32 recorded:
a full-page capture past roughly 16,000px comes back wrapped, and evidence that
silently loses its bottom half is worse than none. The switcher's pill is fixed
to the bottom of the viewport, so in a full-page capture it appears once,
partway down, over the record. That is the capture, not the design.

Before each capture the page is scrolled from top to bottom and back with
`scroll-behavior` forced to `auto`, because the sections are released by an
`IntersectionObserver` as the reader reaches them: a capture taken without
scrolling first shows four empty sections, which is what the first pair on this
branch showed before they were retaken.

## Variant B

- `?variant=b` renders the variant whole in both themes, with the bar at the
  bottom reading `B / Clean product`. The arrows and the arrow keys still cycle
  through all five keys, and `b` is now a drawn page rather than the placeholder.
- 320px: `document.documentElement.scrollWidth` is 320 in both themes, and no
  element in the body has its right edge past the viewport. The shell's left
  rail is a block at the top of the document at that width, with the index
  wrapping over two rows, and nothing scrolls sideways.
- 1280px: `scrollWidth` is 1280, the shell holds its two columns, the evidence
  holds a 62ch measure inside them, and the role title stays pinned beside its
  own evidence while that evidence scrolls past.
- The rendered face is `Archivo Variable`, self-hosted from
  `@fontsource-variable/archivo` and loaded only by the prototype stylesheet.
- Both themes are drawn from this variant's own tokens rather than inverted out
  of each other, and the page follows the class the pre-paint script sets.
- Figures are set in the ink colour at a heavier weight against body text a step
  lighter: `$2M+`, `850ms`, `34ms`, `100,000+`, `90%`, `23%`, `8-person`,
  `2 hours`, `1 minute`. `v2`, `v3`, `S3`, `GA4`, `BM25` and `p95` are left
  alone, which is what the lookbehind in `FIGURE` is for.
- Reduced motion, emulated: no element is left held back, the entrance
  animation resolves to `none`, and the switch and the reveal transitions are
  flattened. Everything on the page is at opacity 1 without a scroll.
- No console errors or warnings on either width or either theme. The only
  console output is Vite's connection notice and React's DevTools suggestion.
- The site itself is untouched: with no `variant` parameter `/` renders today's
  page, and `npm run build` produces a `dist` containing no `pb-` class, no
  `Archivo` reference and no variant module.

## What is on the ticket, and what is not

Posted to issue #33 with `GH_TOKEN` on 2026-09-04, at
<https://github.com/fmenemo/fmenemo.github.io/issues/33#issuecomment-5542983547>:
the table above, what was read in the browser, the design read and dials, and
the line the ticket asks for on what makes this variant structurally different,
which reads

> A is one centred serif column with every date in a left margin rail and the
> evidence set as prose; B is an off-centre two-column application shell in a
> tight grotesk, where the masthead is a pinned rail rather than a bar, the role
> titles stay pinned in a fixed column while their evidence scrolls past, the
> employer spans and recognition dates sit on the right edge, the evidence is
> ruled rows rather than paragraphs, the Shop programme is a subsystem panel of
> components rather than a passage between hairlines, and the contact routes are
> a grid rather than a list.

The same line is in the header of `VariantBCleanProduct.throwaway.tsx`, where
the ticket asks for the design read; the ticket is where the criterion asks for
this one, and the comment above is it.

The four PNGs are not on the ticket, and `GH_TOKEN` cannot put them there.
Attaching an image to an issue is a browser-session upload in the web UI, and
every route a token can reach was tried on 2026-09-04:

| Attempt | Result |
| --- | --- |
| `POST /repos/fmenemo/fmenemo.github.io/issues/33/assets` | 404, no such REST route |
| `POST uploads.github.com/repos/.../issues/33/assets` | 400; that host takes release assets only |
| `POST github.com/upload/policies/assets`, the endpoint the web UI posts to | 422, an HTML error page: it authenticates a session, not a token |
| GraphQL mutation list, searched for `attach`, `upload`, `asset` | no such mutation |

So the recording half of that criterion stands unmet by the branch rather than
unattempted by it. The probe table is on the ticket too, at
<https://github.com/fmenemo/fmenemo.github.io/issues/33#issuecomment-5543081138>.

### The three ways the images could still get there

1. **A signed-in browser.** Drag the four PNGs into the comment linked above.
   One step, no side effects, and the one this record recommends.
2. **The branch on the remote.** Once `sandcastle/issue-33` is pushed or merged,
   every capture has a raw URL and a comment can embed it with
   `![](https://github.com/fmenemo/fmenemo.github.io/raw/<ref>/.scratch/redesign/ticket-33-rendered-checks/variant-b-light-1280.png)`.
   A Run does not push its own branch, so this one arrives with the merge rather
   than before it, which is after the ticket needs it.
3. **A release asset.** `POST uploads.github.com/repos/:owner/:repo/releases/:id/assets`
   is the one image upload `GH_TOKEN` is allowed, and GitHub renders a
   `releases/download/` URL inline in a comment. It was not taken: this
   repository has no releases, so it means publishing one on a public site
   repository to host four throwaway prototype screenshots, which is a visible
   artefact the ticket did not ask for and which outlives the prototype it
   carries. It is Fran's call, not an agent's, and
   <https://github.com/fmenemo/fmenemo.github.io/issues/33#issuecomment-5543164266>
   asks him for it.
