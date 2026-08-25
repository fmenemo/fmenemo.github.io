# Redesign pass: type, hierarchy and finish

Status: open

## Problem Statement

The site does its job as a credibility anchor: the copy is evidence, the layout is the Swiss direction Fran chose, and nothing on it is fabricated. But a visitor who has seen a few hundred developer sites recognises the type in the first second. Inter carries the name, the identity line, every heading and every evidence bullet, and Inter at 600 with tight tracking is what a generated site looks like in 2026.

Below the hero, the evidence is the hardest thing on the page to read. The experience entries render their bullets at 14px in secondary grey, across a measure of roughly 105 characters at desktop width, while the identity line above them, which says less, is 18px. A recruiter who came to check the numbers finds them in the smallest, greyest text on the page, with digits that jitter because the face has no tabular figures.

Around that, a handful of things the site does not finish. The hero sits off the grid every section below it uses. Technologies is a full section band, with a heavy rule and 224px of padding, holding two lines. Contact repeats the hero's email, LinkedIn and location word for word. The email address in the hero wears the tracked-caps label voice, which is hard to read on a value. The masthead sets the language selector as text and the theme toggle as an icon. Nothing on the page has a pressed state. Keyboard users have no way past the masthead. And a mistyped URL lands on GitHub's own 404 in GitHub's branding.

## Solution

One pass over the form of the page, leaving every word of the evidence where the CV put it.

The typeface changes to Geist, with Geist Mono for the metadata voice, so both voices come from one family and the page stops reading as a default. The evidence bullets become the primary text: body size, ink rather than muted, capped at a readable measure, with orphans and proportional digits fixed. Labels and values are told apart: tracked caps for labels, lowercase mono for addresses and handles.

The hero moves onto the same twelve columns as the sections below it, and keeps only the CV as its action; email and LinkedIn move to Contact, which stops being a repeat. Technologies folds into the Recognitions band as a row beside Education, so the page has four heavy rules rather than five. The theme toggle becomes text, matching the language selector, and every control gets a pressed state.

A skip link and a branded 404 page, in both editions, finish it.

## User Stories

1. As a recruiter who already has Fran's name, I want the page to look designed rather than generated, so that my first impression matches the seniority the CV claims.
2. As a recruiter, I want the evidence bullets set at body size in the primary text colour, so that the part I came to read is the easiest part to read.
3. As a reader on a wide screen, I want each evidence bullet held to a readable line length, so that my eye finds the start of the next line.
4. As a reader, I want figures like 850ms to 34ms and 100,000+ set in tabular digits, so that numbers next to each other line up and read as numbers.
5. As a reader, I want no single word stranded on the last line of a bullet, so that the text reads as set rather than poured.
6. As a reader, I want the email address and LinkedIn handle in lowercase, so that I can read an address as an address.
7. As a reader, I want dates, section numbers and labels in the tracked-caps metadata voice, so that I can tell a label from a value at a glance.
8. As a reader on a desktop, I want the hero on the same grid as the sections below it, so that the page reads as one composition from the first paint.
9. As a reader, I want the CV one click away in the hero, so that the document I actually need is where I land.
10. As a reader, I want Contact to be the one place the routes to Fran live, so that the bottom of the page gives me something the top did not.
11. As a reader, I want the technologies beside Education in the Recognitions band, so that I do not scroll through a full section for two lines of text.
12. As a reader, I want the section numbers to stay contiguous after the fold, so that nothing on the page looks removed.
13. As a reader with the masthead in view, I want the theme toggle to be text like the language selector beside it, so that the masthead speaks one language.
14. As a reader, I want the toggle to say what it will do next, so that I do not have to guess which state I am in.
15. As a reader using a mouse, I want the CV button and the toggle to move when I press them, so that a click feels like one.
16. As a reader using a keyboard, I want a skip link as the first tab stop, so that I reach the content without tabbing through the masthead.
17. As a reader using a keyboard, I want the skip link visible when it has focus and hidden otherwise, so that it is there when I need it and gone when I do not.
18. As a reader who mistypes a URL, I want a 404 page in the site's own type and palette, so that a dead end still looks like Fran's site.
19. As a reader on the 404 page, I want links to both editions, so that I can get to the page I wanted in the language I wanted.
20. As a reader on the 404 page in dark mode, I want no flash of light, so that the page matches the one I left.
21. As a reader of the Spanish edition, I want every new piece of chrome in Spanish, so that the edition is still an edition rather than English showing through.
22. As a reader who prefers reduced motion, I want the pressed state and any new transition removed, so that the page honours the setting it already honours.
23. As a reader on a phone, I want the page never to scroll horizontally, so that the new grid does not break at 320px.
24. As a reader on a phone, I want the hero to stack sensibly, so that the grid placement on desktop does not reorder the content on mobile.
25. As a reader on a slow connection, I want no more font bytes than before, so that the swap does not cost load time.
26. As a reader of the share image, I want it to match the site's new type, so that the preview and the page agree.
27. As Fran, I want the CV button, the evidence and the metadata to change face together, so that the swap is one decision rather than a mix.
28. As Fran, I want the unused Inter 700 weight gone, so that the font imports say what the page uses.
29. As Fran, I want every copy change in this pass to be chrome and never evidence, so that the bullet approval record stays true.
30. As Fran, I want the section anchors unchanged, so that a link someone already has to `#technologies` still lands.
31. As Fran, I want the two `theme-color` meta tags left in step with the surface tokens, so that the browser chrome still continues the page.
32. As a future maintainer, I want the label and value voices as two named styles, so that the next restyle is one edit.
33. As a future maintainer, I want a test that fails if the skip link or `main`'s id goes missing, so that the accessibility gain survives the next change.
34. As a future maintainer, I want a test that fails if the 404 page drops either edition's link or the pre-paint theme script, so that the page stays a working exit.
35. As a future maintainer, I want a test that fails if the hero grows a second route beside the CV, so that Contact stays the one place the routes live.
36. As a future maintainer, I want the design tokens still to be the only place the palette and type live, so that ADR 0002 holds after this pass.
37. As a future agent, I want the decisions here recorded in the ADR series where they overturn something recorded before, so that I do not helpfully restore the Technologies section.

## Implementation Decisions

### Typeface

- The sans becomes Geist Sans and the mono becomes Geist Mono, both self-hosted from their fontsource packages as latin subsets, replacing Inter and IBM Plex Mono. The font tokens in the design system change; nothing in a component names a face.
- Weights loaded: sans 400, 500, 600; mono 400, 500. Inter 700 was imported and used by nothing, and the identity line drops from 300 to 400. Total font bytes must not exceed today's.
- The share image sources in the asset tooling take the same faces, and both share images are re-rendered with the render command already there. The share image guard tests bind its copy to the identity line and are unaffected by the face.
- The CV PDFs are outside this pass. They are generated upstream and are not the site's to restyle.

### Evidence typography

- Evidence bullets render at the base size in ink, with the muted colour kept for the metadata beside them. The left hairline on each bullet stays.
- The bullet list is capped at a measure of about 65 characters. The cap is on the list rather than the column, so the employer header and its dates still span the full content column.
- `text-wrap: pretty` applies to running text (bullets and paragraphs). `font-variant-numeric: tabular-nums` applies at the body.
- The type scale tokens do not change. This is a change of which token each element wears.

### Labels and values

- The shared style module gains a second metadata voice for values: mono, small, lowercase, normal tracking. The existing label voice (mono, uppercase, 0.2em tracking) stays for section numbers, dates, nav, contact labels, the CV button and the footer.
- Values wearing the new voice: the email address and LinkedIn handle in Contact, and the location and mode line under the hero.
- The CV button keeps the label voice: it is a control, not a value.

### Hero and Contact

- The hero sits on the twelve-column grid the sections use. The name spans the full measure; the identity line and the CV action occupy the content columns; the location and mode line sits in the label columns beside them, where section labels sit further down. On mobile the grid collapses to one column in source order, so the name, then the line, then the action, then the location.
- The hero's actions are the edition's CVs and nothing else. Email and LinkedIn leave the hero. The Spanish edition's second CV, the original, stays beside the first under the accent treatment it has today.
- Contact keeps its three routes and becomes the only place email and LinkedIn appear as text on the page. The footer icons stay.

### Technologies fold

- The Technologies section is removed as a band. Its content becomes a second definition row under Education in the Recognitions band, with a label from chrome and the same slash-separated running text.
- The `#technologies` anchor moves to that row, so existing links land on the technologies rather than on nothing.
- Sections renumber: Experience 01, Independent work 02, Recognitions 03, Contact 04.
- The nav does not change. It lists Experience and Contact today and still does.
- The Recognitions section heading stays as its CV gives it in each edition. Technologies becomes a row label, not a heading.

### Masthead

- The theme toggle becomes a text control in the label voice, reading the edition's word for the state it will switch to. The accessible name and the visible text become the same string, which is what chrome already carries for the name.
- The sun and moon icons are deleted. The footer's GitHub and LinkedIn marks are brand marks and stay.
- The masthead must still hold the name, both section links, the language selector and the toggle on one line at 420px, and the toggle must still fit beside the selector at 320px where the section links yield. If the Spanish word does not fit, it is the Spanish word that is shortened, not the rule.

### Interaction

- Pressed state: the CV button and the theme toggle translate down one pixel on `:active`. Hover treatments do not change. The reduced-motion block already zeroes transitions and covers the new state.
- Transition duration on the CV button's fill goes from the 150ms default to 200ms.

### Skip link

- A visually hidden link to `#main` is the first child of the app, visible on focus in the accent with the focus ring the page already uses. The `main` landmark takes `id="main"`.
- The link's text is chrome, so each edition carries its own.

### 404 page

- A static `404.html` in the public assets, served by GitHub Pages for any unknown path. It is not a React entry: a page that exists to send people away carries no bundle.
- It carries the pre-paint theme script from the entry documents, the site's faces and palette inline, and links to the English and Spanish editions. Its `lang` is English, with the Spanish link carrying `hreflang`.
- It says nothing about the site's versions or freshness. The hedge guard's vocabulary applies to it.
- It is not in the edition table because it is one document for both editions, and the test for it reads it as text.

### Records

- ADR 0005 records the fold of Technologies into Recognitions, the hero's grid placement, and the move of routes out of the hero, since ticket 05 of the site refresh and the spec that ordered it decided each of those the other way.
- `CONTEXT.md` gains no new terms. "Chrome", "evidence", "edition" and "identity line" cover everything here.

## Testing Decisions

A good test here asserts what a visitor or a scraper observes, not how a component is built. The seam is the existing one and the only one: mount `App` over the edition table, and read entry documents and asset sources as raw text. No test reads the built stylesheet, mounts a component alone, or asserts on a class name.

Tests to add, each over the edition table unless stated:

- The first link in the document is the skip link, its target is `main`'s id, and it has an accessible name in the edition's language.
- The hero contains exactly the edition's CV links and no `mailto:` or LinkedIn link. The existing test that each contact route is a real link continues to cover Contact.
- The `#technologies` anchor resolves to an element inside the Recognitions section, and the section numbers rendered are `01` to `04` with no gap. The existing test that every in-page anchor resolves stays as it is.
- The theme toggle's visible text equals its accessible name, in both states, in both editions. The existing theme tests cover the class and persistence.
- The 404 page, read as text: parses, contains a link to `/` and to `/es/` with `hreflang`, contains the theme script, and passes the hedge guard.
- The edition-table check that no component imports an edition by name stays green, since the new chrome strings go through the content type.

Prior art: the page-structure block (single `h1`, accessible names, anchors resolve, contact routes are links), the theme block, the language-selector block, and the raw-text reads of `index.html` and the share image sources, all in the one test file.

Verified in a browser and recorded in the ticket rather than tested, because jsdom cannot see them: the rendered faces, the bullet measure at 1280px, tabular digits, the pressed state, the masthead at 420px and 320px in both editions, no horizontal scroll at 320px, and the font bytes served before and after.

## Out of Scope

- Any change to an evidence bullet, a recognition, a title or a date. The words are the CV's, approved in the bullet approval records, and this pass changes only the form they take. The three bullets that use em dashes stay as approved; they are noted for the next CV sweep.
- Warm-tinting the neutral palette. A taste call Fran chose the other way for the Swiss direction; listed in the audit, not decided here.
- A current-section indicator in the nav, scroll spy, or any scroll-driven motion. Ruled out by the site-refresh spec and unchanged.
- Grain, background imagery, gradients, shadows or glass. Ruled out by the same spec.
- Regenerating either CV PDF.
- A print stylesheet.
- Analytics, cookie consent or legal pages. The site sets no cookies and runs no tracking.

## Further Notes

Fix order follows the audit's priority, and each ticket is a branch that builds, lints and passes tests alone: font swap first, then evidence typography with the label and value split and the pressed state, then the hero and Contact, then the Technologies fold, then the masthead toggle, then the skip link and 404. Font swap first because it is the largest visible change and the lowest risk, and because the share images have to be re-rendered once after it rather than after every ticket.

The audit this spec came from is at `.scratch/redesign/audit.md` and lists what already passed and what the stock upgrades would have broken. Fran chose Geist for both voices and the hero keeping only the CV on 2026-08-25.

Both editions ship together on every ticket. A ticket that adds a chrome string adds it to both content modules or fails to compile, which is the guard ADR 0004 put there.
