# Redesign audit

Run against the live site at 1280px and 390px, light and dark, on 2026-08-25. Stack: React 19, Tailwind v4 with `@theme` tokens in `src/index.css`, no router, two static entry documents. Nothing here proposes changing that.

## What already passes

Most of the generic-template checklist was cleared by the site-refresh spec (`.scratch/site-refresh/`) and does not need repeating. Off-black canvas, one accent, no cards, no gradients, no shadows, self-hosted fonts, visible focus rings, `prefers-reduced-motion`, smooth scroll with `scroll-padding-top`, semantic landmarks, one `h1`, full metadata and share images, favicon, no dead links, no placeholder copy. The Spanish edition gets the same treatment.

Several of the audit's stock upgrades contradict decisions this repo recorded on purpose. Noise overlays, background imagery, parallax stacks, spring physics and scroll-driven reveals are all ruled out by the spec ("no gradients, no scroll-triggered animation, motion limited to transitions on interactive states"). I am not proposing any of them. The audit that applies here is about type, measure, hierarchy and a few missing pieces of finish, not about adding texture.

## Findings

Ordered by how much they change what a visitor sees.

### 1. Inter is the whole voice of the page

`--font-sans` is Inter, five weights. The audit calls Inter the single most common tell of a generated site, and on this page it carries the name, the identity line, every heading and every bullet. The Swiss direction survives it because the layout does the work, but the type is anonymous.

Proposal. Swap the sans for one with more edge. Geist is the cheapest move, because Geist Mono can replace IBM Plex Mono at the same time and the metadata voice and the body voice come from one family. `@fontsource/geist-sans` and `@fontsource/geist-mono` both exist at 5.3.0. The alternative is to keep Plex Mono, which has more character than Geist Mono, and only swap the sans. Fran picks. Either way this is a token edit plus the `@import` lines.

While in there: Inter 700 is imported and nothing uses it (`font-bold` appears nowhere; `<strong>` is set to `font-semibold`). Inter 300 is imported for one paragraph. Drop 700, and decide whether the identity line needs 300 or reads fine at 400 in the new face.

### 2. The evidence is the smallest, greyest text on the page

The site's argument is the experience bullets. They render at 14px, in `muted` (#5f5f5f), with a measure of 698px at 1280px wide, which is roughly 100 to 110 characters per line. The Principal role has twelve of them, several running four or five lines. The identity line, which says less, is 18px. The hierarchy is inverted: the thing a recruiter came to check is the hardest thing to read.

Proposal. Bullets at 16px in ink, not muted, with muted kept for the metadata beside them. Cap the measure at `max-w-[65ch]` on the bullet list, or narrow the content column. `text-wrap: pretty` on `li` and `p` to kill the orphans visible today ("multi- / developer", "hundreds / of thousands"). `font-variant-numeric: tabular-nums` on `body`, because the page is dense with figures (850ms to 34ms, 100,000+, 23%, 99.95%) and Inter's proportional digits jitter next to each other.

### 3. Tracked caps on things that are not labels

`metaVoice` (mono, 11px, uppercase, 0.2em tracking) is worn by section numbers, dates, nav, the CV button, the footer, and also by the email address and the LinkedIn URL in the hero. `FMENENDEZMOYA@GMAIL.COM` in tracked caps is hard to read and is not a label, it is a value. The hero has three of these in a row.

Proposal. Split the voice. Keep caps and tracking for true labels (section numbers, dates, nav, contact `dt`s). Set values (email, LinkedIn handle, location line) in lowercase mono with normal tracking. One more export in `src/styles.ts`, no structural change.

### 4. The hero does not sit on the grid

The 3/9 column split starts at Experience. Above it, the hero is one left column with the right 55% of the viewport empty at 1280px. Ticket 05's review round deferred this "until ticket 06 puts real content there". The content is there now.

Proposal. Put the hero on the same twelve columns. Name across the full measure, identity line and actions in columns 4 to 12, and the location and mode line in columns 1 to 3 beside them, where the section labels will sit further down. The grid becomes visible from the first paint instead of from the second band.

### 5. Technologies is a band holding two lines

Section 04 is a heavy 2px rule, 112px of padding above, 112px below, and fourteen words in 14px grey. It is the weakest stretch of the page and it costs a full section's worth of scroll.

Proposal. Fold it into the Recognitions band as a second `dl` row under Education, the same shape Education already uses. Five heavy rules become four, the numbering closes up, and the `#technologies` anchor moves to the row. CONTEXT.md's rule that technologies are facts not claims is untouched.

### 6. Contact repeats the hero

Email, LinkedIn and location all appear in the hero and again in section 05, in the same words. A reader who scrolls to the bottom finds nothing they did not already have.

Proposal, with a choice for Fran. Either the hero keeps only the CV button and Contact owns the routes, or Contact goes and the footer picks up email beside the two icons. The first is safer: the nav has a Contact link, and the bottom of the page is where someone who read the whole thing decides to write. The spec asked for "the CV one click away", not the email, so removing the email and LinkedIn from the hero does not break a recorded decision.

### 7. Masthead controls speak two languages

The language selector is text (`EN / ES`). The theme toggle beside it is a Heroicons sun and moon. The rest of the masthead is text.

Proposal. A text toggle in `metaVoice`, reading `DARK` or `LIGHT` by what it will do next, with the same `mastheadControl` hover. The accessible name already says this. The masthead becomes all text, which is the Swiss answer and removes the one icon set on the page that is not a brand mark.

### 8. No pressed state anywhere

The built stylesheet contains no `:active` rule. Hover exists on every control; press does nothing.

Proposal. `active:translate-y-px` on `primaryAction` and the theme toggle. Default transition is 150ms; 200ms reads better on the fill. Two class edits in `src/styles.ts`.

### 9. No skip link, no `id` on `main`

Four tab stops before content is few, but WCAG 2.4.1 still asks for a bypass, and the guard tests in `App.test.tsx` already assert an accessible name on every link so the test extends itself.

Proposal. A visually hidden `a[href="#main"]` as the first child of `body`, visible on focus in the accent, `id="main"` on the `<main>`. Both editions, with the label in `chrome`.

### 10. No 404 page

`https://fmenemo.github.io/nope` serves GitHub's own "Page not found" in GitHub's branding. GitHub Pages serves `404.html` from the site root automatically.

Proposal. `public/404.html` in the site's type and palette, with the pre-paint theme script, offering `/` and `/es/`. It has no React and no bundle, which is the right weight for a page that exists to send people away from it.

### 11. Optional: tint the neutrals

Every grey is pure (`#5f5f5f`, `#d9d9d9`, `#ededed`, `#0d0d0d`). The audit prefers greys that carry a hue. With a vermilion accent, a slight warm shift (paper toward `#fdfcfa`, ink toward `#141210`, and the greys along the same line) would soften the page without anyone naming why.

Fran chose pure white paper deliberately for the Swiss direction. This is a taste call, not a defect. Listed so the choice is made rather than defaulted.

## Not proposing, and why

- Current-section indication in the nav. Two links; a scroll spy would cost more than it tells.
- Loading, empty and error states. Static page, no forms, nothing loads after paint.
- Legal links and cookie consent. No cookies, no analytics, no tracking, personal site.
- Replacing the sun and moon with a dropdown or system detection. Text toggle (finding 7) is the version of this that fits.
- Rewriting bullets. Three of them use em dashes, which reads as generated in running text, but every bullet is approved against the CV and changing the words means reopening the approval record. Out of scope for a visual pass; noted for the next CV sweep.

## Suggested cut for tickets

Ordered by the audit's fix priority (font, then hierarchy, then interaction, then layout, then finish). Each is a branch that builds and passes tests on its own.

1. Font swap and weight cleanup (finding 1). Needs Fran's pick: Geist for both voices, or Geist sans over Plex Mono.
2. Evidence typography: bullet size and colour, measure, `text-wrap`, tabular figures (finding 2). Plus the label/value split in `styles.ts` (finding 3) and the pressed state (finding 8). These touch the same two files.
3. Hero on the grid (finding 4), and the decision on where contact routes live (finding 6).
4. Technologies folded into the Recognitions band (finding 5), sections renumbered.
5. Masthead text toggle (finding 7).
6. Skip link and 404 page, both editions (findings 9 and 10).
7. Optional: warm neutrals (finding 11). A token edit; take it or leave it.
