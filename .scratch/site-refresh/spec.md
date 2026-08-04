# Site refresh: evidence-first content, Swiss visual direction, dependency reconcile

Status: resolved

All seven tickets are resolved and the site is deployed to https://fmenemo.github.io/.
Verified live: the assets the metadata references return 200, the share image is
byte-identical to the committed one, and the tags are in the served document before
any JavaScript runs.

Three things the spec did not anticipate, each recorded where it belongs rather
than only here:

1. **The link previews were broken twice over.** The referenced OG image was missing,
   which the spec knew, but the tags pointing at it were also written by a React
   effect and so were never read by any scraper. See ADR 0003.
2. **The one-seam testing rule needed an exception**, for exactly that reason. It is
   written into the Testing Decisions above rather than left as a departure.
3. **The repo misdescribed itself in more places than `package.json`.** `README.md`
   documented a deleted component, Framer Motion, a Projects page, a contact form and
   an unmeasured Lighthouse score; `.github/` carried a Jekyll theme's contributing
   guide and issue template, pointing at another project's issue tracker. Both were
   dealt with under the same principle that drove the manifest reconcile: a repo that
   describes an application it is not is a liability.

Out of scope and still true: no CI workflow, no automated deployment. `npm run deploy`
remains a manual, deliberate act.

## Problem Statement

Fran's personal site does not do the job he needs it to do, and parts of it actively work against him.

A visitor who already has his name arrives to check he is real and senior. What they find is thirty generic skill chips, three invented statistics (including "∞ Systems Scaled"), a hero that opens with "Hello, I'm" over a pulsing green availability dot and two rotating circles, and a GitHub link inviting them to "explore my open source work" that leads to university coursework and forks. Nothing on the page can be verified, and the whole thing reads as generated rather than written. The one genuinely distinguishing thing about Fran's recent work, the AI-layer engineering (production semantic search, MCP tooling, agentic development workflows he made a team standard), appears nowhere at all. The site also announces a job title he no longer wants to lead with.

Underneath the content, the repo is in a state that blocks any redesign and misrepresents itself:

- `package.json` does not describe the running application. It declares React 18 while React 19 is installed, omits the Tailwind Vite plugin that the Vite config imports, and omits an installed router. A clean `npm ci` produces a build that fails.
- 15 npm advisories are open, all dev-time, including one reachable only because of a router that is installed but never used.
- Roughly eighty colours live as inline JavaScript ternaries inside components, so there is no single place where the design lives.
- The Tailwind config file defining the palette and fonts has no effect at all under Tailwind v4, and has been silently inert.
- Dark-mode visitors get a flash of the light theme on every load, and every component that reads the theme mounts its own `MutationObserver`.
- The browser tab shows the Vite logo, link previews are broken (the referenced OG image does not exist), and the page loads two unused third-party font stylesheets, one of them serving a typeface not licensed for web redistribution.

## Solution

Rebuild the site as a **credibility anchor**: a short, confident, single-scrolling page whose every statement is **evidence** traceable to the **CV**, presented in a restrained Swiss/structural visual direction, on a dependency set that is honest, current and free of known vulnerabilities.

A visitor lands on an **identity line** stating that Fran is a Software Engineer of ten years who now works at the AI layer, with the CV one click away. Below it, **experience entries** carry the weight: real employers, real dates, real numbers. Below those, the **independent work** and a single compact line of **recognitions**. Contact is short. There is no Projects section, no skills grid, no invented statistics, and no animation competing for attention.

## User Stories

1. As a recruiter who already has Fran's name, I want to confirm within ten seconds that he is a real, senior engineer, so that I can decide whether to keep reading.
2. As a recruiter, I want to see named employers with dates, so that I can verify the career against LinkedIn.
3. As a recruiter, I want to download the CV without hunting for it, so that I can forward it internally.
4. As a hiring manager, I want to read specific outcomes with numbers, so that I can judge the level of work rather than the vocabulary used to describe it.
5. As a hiring manager, I want to understand what makes this engineer different from other engineers with ten years of experience, so that I know whether the profile fits a role I have.
6. As a hiring manager evaluating AI-adjacent roles, I want to see concrete AI-layer work (semantic search in production, MCP tooling, agentic workflows), so that I can tell genuine experience from enthusiasm.
7. As a conference organiser, I want a one-line description of who Fran is that I can paraphrase in a speaker bio, so that I do not have to write one myself.
8. As a conference organiser, I want to see recognitions and awards with dates and issuing organisations, so that I can establish credibility for a programme committee.
9. As someone who just met Fran, I want the site to match how he introduced himself, so that the two do not contradict each other.
10. As a visitor, I want the page to state Fran's actual current identity as a Software Engineer, so that I am not misled by a title he does not lead with.
11. As a visitor, I want no unverifiable claims presented as achievements, so that I trust the statements that are verifiable.
12. As a visitor, I want to reach Fran by email in one click, so that contacting him costs nothing.
13. As a visitor, I want a LinkedIn link, so that I can verify the career history independently.
14. As a visitor, I want a GitHub link available but not oversold, so that I can find it if I want it without being promised a portfolio that is not there.
15. As a visitor on a phone, I want the page to be readable and correctly laid out at small widths, so that I can read it on the move.
16. As a visitor who prefers dark interfaces, I want the site to respect my system preference on first load, so that I am not flashed a bright page.
17. As a visitor who prefers dark interfaces, I want to override the system preference with a toggle, so that I can choose per site.
18. As a returning visitor, I want my theme choice remembered, so that I do not set it on every visit.
19. As a visitor with reduced-motion enabled, I want the site to honour that preference, so that I am not made uncomfortable.
20. As a visitor on a slow connection, I want the page to render without waiting on third-party font servers, so that I see content quickly.
21. As a visitor using a screen reader, I want a sensible heading hierarchy and real landmarks, so that I can navigate the page structurally.
22. As a visitor using a keyboard, I want visible focus states on every interactive element, so that I can see where I am.
23. As a visitor sharing the link in Slack or LinkedIn, I want a correct preview image and title, so that the link does not look broken.
24. As a visitor who opens the site in a browser tab, I want a favicon that represents Fran, so that the tab is identifiable and does not advertise a build tool.
25. As a search engine, I want accurate metadata describing a Software Engineer working at the AI layer, so that the page is indexed for what it actually is.
26. As Fran, I want the site to say only things I would defend in an interview, so that the site never sets up a conversation I cannot back.
27. As Fran, I want the CV to remain the single source of truth, so that updating the site is a matter of following the CV rather than reinventing copy.
28. As Fran, I want to approve each condensed bullet against its CV original, so that nothing is overstated or subtly changed in the condensing.
29. As Fran, I want to approve the favicon and OG image before they ship, so that the visual identity is mine rather than assumed.
30. As Fran, I want my independent work mentioned even before it has a public URL, so that the agentic-workflow thread has a concrete artefact behind it.
31. As Fran, I want to add the independent work's link later without restructuring the page, so that publishing it is a small change.
32. As Fran, I want dependencies current and free of known advisories, so that the repo is not a liability I have to apologise for.
33. As Fran, I want `npm ci` on a clean machine to produce a working build, so that the repo is reproducible.
34. As Fran, I want Dependabot watching dependencies, so that this does not silently rot again.
35. As Fran, I want to keep deploying manually, so that publishing stays a deliberate act.
36. As Fran, I want the design to live in one place, so that the next restyle does not mean editing eighty components.
37. As Fran, I want the site to stop looking machine-generated, so that it reflects that a person made deliberate choices.
38. As a future maintainer, I want the vocabulary and the decisions recorded, so that I understand why there is no Projects section before I helpfully add one.
39. As a future agent working in this repo, I want automated tests that fail when fabricated content or invented statistics are reintroduced, so that the content rules survive changes I make.
40. As a future agent, I want a single obvious test seam, so that I know where to add a test without inventing a structure.
41. As a future maintainer, I want no inert configuration files in the repo, so that I do not edit a file that has no effect.
42. As a future maintainer, I want the dependency list to contain only what is used, so that I am not misled about what the app depends on.

## Implementation Decisions

### Content and information architecture

- The site remains a **single scrolling page** with anchor navigation. No router.
- Section order: hero (identity line, CV action, contact actions), experience, independent work, recognitions, a compact skills line, contact.
- The hero carries the **CV download** as a primary action, and email and LinkedIn as secondary actions.
- **Experience entries** are drawn from the CV, one per role, with a promotion at the same employer rendered as two entries. Each entry carries title, employer, location/mode, dates, and a small number of bullets that are each **evidence**.
- Bullets are **condensed** from the CV, not rewritten. Every condensed bullet is presented to Fran alongside its CV original for approval before it lands in code. Where the PDF extraction lost digits or ligature glyphs, the figure is flagged as uncertain and confirmed rather than guessed.
- **Independent work** is mentioned without a public URL for now, written so that no claim depends on the reader being able to click through. The page structure must accept a link later without rework.
- **Recognitions** render as one compact line of award names with issuing organisation and date, not as a card grid.
- The **skills line** is a short factual list of technologies actually worked in, not a categorised chip grid.
- The **identity line** states "Software Engineer", sourced from the CV summary, deliberately not the current job title. See `CONTEXT.md` and ADR 0001.
- The name is rendered "Fran Menéndez", with the accent.
- No availability signalling, no emoji in body copy, no round-number statistics, no Projects section. GitHub appears as an unlabelled footer icon.

### Visual direction

- Swiss/structural: left-aligned, a visible grid, hairline and heavy rules as structure, a monospace face for dates and employers, one accent colour, generous whitespace.
- No cards, no glass/backdrop-blur, no gradients, no decorative floating shapes, no scroll-triggered stagger animation.
- Motion is limited to CSS transitions on interactive states, gated behind `prefers-reduced-motion`.
- Light and dark are both designed. Light is the primary composition.

### Theming and styling architecture

- The design system lives in **Tailwind v4 `@theme` tokens** in the stylesheet: palette, type scale, spacing rhythm. See ADR 0002.
- Dark mode is expressed with the `dark:` variant against a class on the document element.
- **All inline colour ternaries are removed.** No component decides a colour in JavaScript.
- The theme hook is reduced to a toggle plus persistence. The `MutationObserver` and per-component theme state are removed.
- A small inline script in the HTML entry sets the theme class before first paint, eliminating the flash.
- The inert Tailwind config and PostCSS config are deleted, along with `autoprefixer`.

### Dependencies

- `package.json` is reconciled to describe the application that actually runs, and the lockfile regenerated from it. The package name is corrected.
- `react-router-dom` is removed: installed, unused, and the source of a high-severity advisory.
- `framer-motion` is removed: its only use is the animation being deleted. React becomes the sole runtime dependency.
- Everything else is upgraded to latest, with the TypeScript major upgrade staged as its own step because it is the change most likely to surface real type errors.
- Target state: `npm audit` reports zero vulnerabilities, `npm ci && npm run build && npm run lint` succeeds from a clean checkout.
- Dependabot is configured to watch npm dependencies. **No CI workflow**, by explicit decision: Dependabot pull requests will be judged by eye. Deployment stays manual.

### Assets and metadata

- Fonts are **self-hosted** woff2 subsets: a grotesque for body and headings, a monospace for metadata. The Google Fonts and third-party SF Pro stylesheet links are removed.
- A favicon is designed and presented for approval, replacing the Vite logo.
- An OG image is designed and presented for approval, so link previews resolve.
- Metadata (title, description, Open Graph, canonical) is rewritten to describe a Software Engineer working at the AI layer. The current "Full Stack Developer & Designer" description is wrong on both counts.

## Testing Decisions

A good test here asserts what a **visitor** can observe, never how a component is built. Tests read the rendered page for visible text, links and attributes. No snapshots, no assertions on class names or token values, no component-level tests, no testing that a style equals a hex code.

- **One seam: the rendered application.** A single test file mounts the whole app and asserts against the resulting DOM. This is the highest available seam and the only one being introduced.
  - **One exception, added during ticket 07: the entry document.** Metadata is read by link scrapers that fetch `index.html` and stop without running React, so the rendered DOM is the wrong seam for it: tags injected by a component pass a DOM assertion and still produce a broken preview. The metadata tests read `index.html` as text, in the same file. This is still "assert what a visitor can observe", with the scraper as the visitor. It does not license component tests or a second test file.
- **Stack**: Vitest, Testing Library and jsdom, added as dev dependencies with a `test` script. There is **no prior art** in this repo: it currently has no test framework, no test script and no tests, so this establishes the pattern rather than following one.
- **Coverage at that seam**:
  - The identity line renders "Software Engineer" and does not render "Principal Software Engineer".
  - Each expected employer appears with its dates.
  - The CV action links to the CV PDF asset.
  - Email and LinkedIn links are present and correct.
  - The theme toggle flips the theme class on the document element, and the choice persists.
- **Guard tests derived from ADR 0001**, which are the point of having tests at all here. These pin the decisions most likely to be silently undone by a future change:
  - None of the fabricated project names appear anywhere in the rendered output.
  - The "∞" character does not appear.
  - No round-number mentoring statistic appears.
- Accessibility basics are asserted where cheap: a single `h1`, and every interactive element having an accessible name.

## Out of Scope

- Any CI workflow. Explicitly declined; Dependabot only.
- Automated deployment. `npm run deploy` stays a manual, deliberate act.
- A blog, writing section, or any content requiring ongoing publishing.
- Rebuilding a Projects section. See ADR 0001.
- A contact form. There is none today and none is wanted; email and LinkedIn suffice.
- Analytics of any kind.
- Internationalisation. The site is English-only despite Fran being a native Spanish speaker.
- Publishing the independent work project, or building anything in it. Only its mention on this site is in scope.
- Updating the CV PDF itself. It is the source of truth and is treated as read-only here.
- Visual regression testing, end-to-end browser testing, and component-level unit tests.

## Further Notes

**Open facts to confirm before the content stage lands:**

1. Several CV figures survived PDF text extraction incompletely (a migrated product count, a query-time-before figure, an experiment count, and the years in the recognitions line). Each must be read off the rendered PDF and confirmed rather than inferred.
2. The precise wording of the independent work mention, given there is no public URL yet.
3. Whether the location line should read Zaragoza specifically or Spain generally, and whether EU work authorization is worth stating on the site as it is on the CV. The latter matters mainly for the secondary job-search goal.

**Sequencing.** One branch, four staged commits, each verified with a build and lint before moving on: (1) dependency reconcile, upgrade and vulnerability clearance; (2) styling architecture, tokens, fonts and favicon; (3) content rewrite from the CV, gated on bullet approval; (4) OG image and metadata. The test seam is introduced with stage 1 so that later stages have a red-green loop available.

**Risk worth naming.** The content stage depends on Fran approving a bullet-by-bullet comparison table. If that approval stalls, stages 1, 2 and 4 can still land and the site remains coherent with its existing copy, just restyled. Stage 3 is the only one that cannot be done without him.
