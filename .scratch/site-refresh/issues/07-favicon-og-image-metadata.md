# 07: Favicon, OG image and metadata

**What to build:** Sharing the site produces a correct preview instead of a broken one, and the browser tab identifies Fran rather than advertising the build tool. Today the favicon is the Vite logo, the referenced Open Graph image does not exist, and the metadata describes a "Full Stack Developer & Designer" working in React and Node, which is wrong on both counts.

**Blocked by:** 05 (Swiss visual direction). The imagery depends on the visual direction, not on the final copy, so this can proceed while the bullet table in ticket 06 is being reviewed.

**Status:** resolved

- [x] A favicon is designed in the site's visual language and presented to Fran for approval before it ships
- [x] An Open Graph image is designed and presented to Fran for approval before it ships
- [x] The Vite logo is removed
- [x] The page title, description, Open Graph tags, Twitter card tags and canonical link describe a Software Engineer working at the AI layer
- [x] The referenced Open Graph image actually exists at the referenced path, verified by loading it
- [x] The theme-color meta value matches the new palette rather than the old accent
- [x] Metadata claims stay consistent with the CV, in line with ADR 0001
- [x] `npm run build` and `npm run lint` pass

## Comments

**2026-08-04, resolved.**

Three candidate marks and the share image were drawn in the site's own tokens and
presented as a spec sheet. Fran picked **option B**, the single F on ink, over the
FM marks: it is the only one of the three that survives 16px without the letters
closing up. It does mean the tab says F while the masthead says FM, which is his
call and worth knowing if the masthead is ever restyled.

The share image shipped as rendered: heavy ink rule, accent eyebrow, the name
stacked as in the hero, the identity line shortened, mono footer. It is rendered
from the site's own woff2 subsets by headless Chrome, so it cannot drift from the
page's typography by accident.

**The bug was bigger than a missing file.** `SEO.tsx` wrote every tag from a React
effect, so the tags existed only after JavaScript ran. Slack, LinkedIn and WhatsApp
fetch the document and stop. The preview was therefore broken twice over: the image
was missing *and* no scraper ever saw the tags pointing at it. All metadata is now
static markup in `index.html`, and `SEO.tsx` is deleted.

Two smaller decisions:

1. `keywords` is gone. Search engines have ignored it for years, and its value was a
   list of capability claims, which is the shape ADR 0001 took off the page.
   `msapplication-TileColor` and `robots="index, follow"` are gone too: one is a
   legacy Windows tile colour, the other restates the default.
2. `theme-color` is now two tags with `media` queries, `#ffffff` and `#0d0d0d`,
   the paper and canvas of the palette. The old single value was the previous accent.

Both PNGs are checked in, so their sources are checked in beside them under
`tools/assets/`, with the two Chrome commands that render them. Re-running those
commands here reproduced both files byte for byte, though that is a property of
this machine and this Chrome rather than a guarantee: a Chrome release can change
its PNG encoder or its rasteriser, and the output would still be correct while
no longer being identical. The share image draws its type from the site's own
`@fontsource` woff2 files, so it cannot drift from the page by accident.

The guard tests read `index.html` rather than the rendered app, which is a departure
from the spec's one-seam rule and a deliberate one: metadata asserted against the
rendered DOM would have passed for `SEO.tsx` and still produced a broken preview.
The document is what a scraper observes, so it is the right seam for this ticket
and this ticket only.

**From the review round.** Three things the review caught and this ticket fixed:

- `src/content.ts` opened by claiming every visitor-facing string lived in it, which
  this ticket made false: the description and the share image are two more copies of
  the identity. Rather than only correcting the comment, tests now bind all three,
  so an inflated figure on the share image fails three assertions. The header points
  at them.
- `README.md` still documented `SEO.tsx`, Framer Motion, a Projects page, a contact
  form and a "Lighthouse score: 95+" that nobody measured. Deleting the component
  this ticket deletes made that my mess to clean, so it was rewritten to describe the
  repo that exists. It also linked an MIT licence with no `LICENSE` file behind it;
  that claim is gone rather than invented.
- The seam departure is now recorded in `spec.md` itself, not only here, so the next
  agent does not read a rule the code breaks with no explanation.

One review point was answered rather than fixed: the theme-color test names two hex
codes, which the spec's testing rules otherwise forbid. A `<meta>` value is not a
style and cannot be a token, since the browser reads it before any stylesheet
exists. Reading them out of `index.css` would be better, but Vitest stubs CSS
imports to an empty string whatever query they carry, so the coupling is recorded
as a comment beside the tokens in `index.css` instead.

Verified: `npm run build`, `npm run lint`, `npm test` (70 passing), and `vite preview`
serving the built site with `/favicon.svg`, `/apple-touch-icon.png`, `/og-image.png`
and the CV all returning 200 at the paths the metadata references. The absolute
`og:image` host matches `homepage` in `package.json`; it can only be confirmed
end to end after a deploy.
