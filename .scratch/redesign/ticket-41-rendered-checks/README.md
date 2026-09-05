# Ticket 41, rendered checks

The Record's tokens and type, checked on the dev server because jsdom cannot see
any of it: a face, a width axis, tabular figures, two themes, 320px, and the
states a link and a control answer in.

Chrome 1280x900 and an emulated 320x900 at DPR 2, `npm run dev`, both editions,
the theme set through the same `localStorage` key the pre-paint script reads.

Both editions are photographed at all four theme-by-width combinations, not at a
sample of them. Two of the Spanish four were missing on the first pass, which is
the shape this file exists to make visible: the Spanish edition is a document of
its own and not a mode of the English one (ADR 0004), so a combination checked
on one edition is not checked on the other.

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
| `en-light-1280-hover-cv.png` | The CV block under a pointer: the accent fills it |
| `en-light-1280-hover-link.png` | The email link under a pointer: the rule is drawn under it |
| `en-light-1280-focus-ring.png` | The second tab stop: the accent ring, and the rule drawn under the focused link |

## What was measured rather than looked at

Read out of the live page with the devtools protocol, on the English edition at
1280px:

- The face is `"Archivo Variable", ui-sans-serif, system-ui, sans-serif` and
  `document.fonts` holds nothing else. Inter and IBM Plex Mono are gone from the
  document as well as from `package.json`.
- The hand computes to `font-stretch: 82%` and the nameplate to `112%`, so the
  width axis is a live axis and not a fallback.
- Figures compute to `font-variant-numeric: lining-nums tabular-nums` on the
  body, so every figure inherits it.
- At 320px, `document.documentElement.scrollWidth` equals `clientWidth` on both
  editions and no element's box crosses the right edge: no horizontal scroll.

The 320px measurement is what caught the one sizing change in this ticket. The
nameplate is uppercase at the wide setting, and at any fixed size large enough
to be a nameplate at 1280px, "MENÉNDEZ" overran a 320px column by 9px. It is now
sized by the viewport, `clamp(2.25rem, 9.5vw, 4.5rem)`, which is how the
prototype drew it.

## The pressed state

Hover and focus are photographed above. The press is not: the devtools
connection can click, but it cannot hold a button down across a screenshot, and
a picture staged by any other means would not be a picture of the page.

What holds it instead is the compiled stylesheet, `dist/assets/App-*.css`:

- `.link-rule:hover,.link-rule:focus-visible,.link-rule:active{background-size:100% 1px}`,
  so a finger draws the rule that a pointer draws, with no hover to precede it.
- `.active\:text-ink:active`, `.active\:bg-accent:active`,
  `.active\:text-stock:active` and `.active\:translate-y-px:active`, which are
  what the `link` and `action` exports in `src/styles.ts` wear.

## Reduced motion

Also not photographable here: the emulation this connection offers has no
reduced-motion switch. The rule is in the compiled stylesheet, unlayered and
inside the media query, so it outranks the utility it overrules:

```
@media (prefers-reduced-motion:reduce){ ... .link-rule{transition:none} }
```

The rule under a link still appears whole when the link is reached. It does not
travel to get there, which is the only motion this page has.
