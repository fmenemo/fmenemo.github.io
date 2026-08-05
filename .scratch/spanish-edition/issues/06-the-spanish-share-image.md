# 06: The Spanish share image

**What to build:** When the Spanish edition's link is shared, the card that appears is Spanish all the way through, image included.

This is the largest single piece of work in the effort, for an image most visitors never consciously examine, so the reason it is in scope should be stated plainly. The argument that bought two documents in the first place was that the first Spanish-language impression is not the page, it is the preview card. An English image sitting under a Spanish title is a visibly half-done localisation in the one frame where it shows most, and omitting the image entirely is worse: the card collapses to a small link stub that reads as a dead page.

The share image is a generated binary, and per ADR 0003 its source and the command that renders it live in the tools directory so that it is redrawn from a file rather than from memory. Both editions' images render from that one command. Two commands, or one command and a manual step, is how a palette change lands on one image and not the other.

The guard that matters here is the condensation rule. Nothing on a share image can be checked by a reader, because it is a picture, so every figure on it has to come from the one sentence that was checked against the CV. That guard already exists for the English image and extends to the Spanish one through the edition table.

See ADR 0003 and ADR 0004.

**Status:** ready-for-human

Everything an agent can close is closed. What is left is the live scraper check,
which needs a public `/es` and so cannot happen before deploy. It is already
ticket 07's line 24, and this ticket closes with it.

**Blocked by:** 03 (the Spanish edition exists).

- [x] A Spanish share image source lives beside the existing one, and both render to their PNGs from a single command
- [x] The Spanish copy on the image is condensed from the Spanish `identity line`, not translated from the English image
- [x] The Spanish document references its own image, as an absolute URL, with the declared dimensions a scraper crops to
- [x] No figure appears on either share image that its own edition's identity line does not carry, asserted from the edition table
- [x] The share image copy is read as text content, excluding styling, so that letter-spacing and font sizes are never mistaken for copy
- [x] Both PNGs exist at the paths their documents reference, in the built output
- [ ] The rendered card is checked against a real scraper preview for both editions before the ticket is closed, not inferred from the markup — **carried to ticket 07**, which is where the deploy that makes it possible sits. What was done here instead: both built documents were fetched over HTTP with a scraper user-agent and no JavaScript, their `og:image` values read out of the response, and both PNGs fetched from those paths and looked at. That is the whole chain except the scraper's own renderer.
- [x] `npm run build`, `npm run lint` and `npm test` pass

## Comments

**The layout moved out of the sources.** `tools/assets/og-image.css` now holds the
layout and palette, and each `og-image*.html` holds only its copy. Two sources each
carrying their own copy of the stylesheet is the same drift the single render command
exists to prevent, one level down.

**The favicon was broken and this ticket found it.** `public/favicon.svg` had
`--color-ink` inside an XML comment, and a double hyphen is not legal there, so the
file has never been well-formed XML. Chrome tolerated it until recently and now does
not: it refuses to parse the SVG. This surfaced because `apple-touch-icon.html`
screenshots that SVG, and the render wrote out a blank square with a broken-image
glyph without failing. Fixed here, with a guard in `src/App.test.tsx` that parses the
file, because the failure was silent in both directions.

**The renders are served over HTTP now.** Chrome no longer loads a `file://`
subresource from a `file://` page, which is the second half of why the touch icon came
out blank. `render.sh` runs a local server for the duration. Both pre-existing PNGs
re-render byte-identical to what was committed, which is the evidence that the
extraction and the transport change left the pictures alone.
