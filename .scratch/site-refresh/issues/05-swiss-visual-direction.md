# 05: Swiss visual direction

**What to build:** The site stops looking like a generated template and starts looking like something a person designed. A visitor sees a left-aligned, structural page: a visible grid, hairline and heavy rules doing the dividing, a monospace face for dates and employers, one accent colour, and a lot of whitespace. The copy is still the existing copy at this point. This ticket changes the form, ticket 06 changes the words.

The reference is direction B from the mockups reviewed with Fran.

**Blocked by:** 04 (Theming architecture). Restyling is only cheap once the design lives in tokens.

**Status:** resolved

- [x] The page is a single scrolling document with anchor navigation and no router
- [x] Layout is left-aligned and grid-structured, not centred
- [x] Rules replace cards: no glass or backdrop-blur, no gradients, no pill chips as a content structure
- [x] Dates and employer names are set in the monospace face, as metadata (see comments: the mechanism is in place, the content arrives with ticket 06)
- [x] One accent colour is used, deliberately and sparingly
- [x] The decorative floating shapes, the pulsing availability dot and the emoji in body copy are gone
- [x] Motion is limited to CSS transitions on interactive states, with no scroll-triggered entrance or stagger animation
- [x] `prefers-reduced-motion` is honoured
- [x] Both light and dark are designed, with light as the primary composition
- [x] The page reads correctly at mobile widths, and the body never scrolls horizontally
- [x] Heading hierarchy is sensible (a single `h1`), and every interactive element has a visible focus state and an accessible name
- [x] Existing tests still pass
- [x] `npm run build` and `npm run lint` pass

## Comments

**The direction B mockups are not in this repo**, and nothing in git history or `.scratch/` references them, so the composition was built from this ticket's own description rather than read off the reference. The one choice that could not be derived was the accent, which Fran picked directly: Swiss vermilion, `#cc2200` in light and `#ff5540` in dark, replacing the leftover scaffold blue. It is used on section numbers, the hero eyebrow, link underlines and focus rings, and nowhere else. Ticket 07 should carry this colour into `theme-color`.

**Monospace metadata.** The mono face is wired to every metadata slot the page has today: section numbers, section labels, the identity line, nav labels, the specialty list, buttons, contact-row labels and the footer. There are no dates or employer names on the site yet, because those arrive with the content rewrite in ticket 06. That checkbox is ticked for the mechanism, not for content that does not exist.

**Three guard tests were written red first**, and each was observed failing against the old page before the markup changed:

- the CV is a link to the PDF, not a scripted `document.createElement('a')` download
- each contact route is a real link rather than a `div` with an `onClick`
- no emoji renders in the copy

Three more were born green and are pinned as regressions: a single `h1`, an accessible name on every link and button, and every in-page anchor resolving to a section that exists. The accessible-name test uses Testing Library's own name computation (`queryAllByRole(role, { name: /\S/ })` against `queryAllByRole(role)`) rather than adding `@testing-library/jest-dom` for one matcher.

The emoji guard matches `/\p{Emoji_Presentation}|\uFE0F/u`, not `\p{Extended_Pictographic}`. The broader property matches `©`, which the footer legitimately renders as text.

**Structural changes beyond restyling:**

- `src/components/Section.tsx` is new. It holds the editorial grid (label in the first three columns, content in the remaining nine) and exports a `Container` for the masthead, hero and footer, so the measure is defined once.
- The mobile hamburger menu and its open/closed state are gone. Two short anchor labels plus the theme toggle fit at every width the site supports, so the menu was state with nothing to justify it.
- The `Navbar` scroll listener is gone with the scrolled/blurred masthead it drove. The masthead is now a solid bar with a hairline rule.
- Card titles went with the cards: "Who I Am" is dropped, since the section is already labelled "About Me". The `❤️` colophon line in the footer is dropped rather than de-emojified.
- Contact rows link out with an `aria-label` of `"<Label>: <value>"`, so "Francisco Menendez" reads as "LinkedIn: Francisco Menendez" without hiding the visible text.

**Verified in Chrome** at 1280px and at 500px in both themes: `scrollWidth === clientWidth` with no overflowing element, the CV link serves `200 application/pdf`, and the toggle flips the class, the icon and the label. 500px is the narrowest window Chrome will open, but it is below the `sm` breakpoint, so it is the mobile composition being measured. The built stylesheet was checked directly for the two things that cannot be asserted in jsdom: the `:focus-visible` outline rule and the `prefers-reduced-motion` block are both present, and it contains zero occurrences of `backdrop-filter`, `linear-gradient` or `animate-pulse`.
