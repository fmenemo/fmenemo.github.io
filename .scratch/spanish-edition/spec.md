# Spanish edition

Status: ready-for-agent

A second `edition` of the site at `/es`, written from the `Spanish CV` rather than
translated from the English one, with a language selector, its own metadata, its own
share image and its own CV download.

The decisions behind this spec were settled in a grilling session and recorded in
[ADR 0004](../../docs/adr/0004-a-spanish-edition-with-its-own-source-of-truth.md).
Where this spec and that ADR disagree, the ADR wins. The vocabulary below (`edition`,
`original CV`, `Spanish CV`, `identity line`, `evidence`, `claim`, `credibility anchor`)
is defined in [CONTEXT.md](../../CONTEXT.md) and used deliberately.

## Problem Statement

Most visitors arrive from LinkedIn already holding Fran's name. Some of them work at
Spanish companies, and while they can read English perfectly well, they are more
comfortable reading Spanish. For that reader the site currently offers nothing in their
language: not the page, not the CV, and not the preview card that LinkedIn renders
before they have clicked anything at all.

This is not a comprehension problem. Nobody is bouncing because they cannot read the
English. It is a warmth problem, and warmth is what a `credibility anchor` trades in:
the site's whole job is to satisfy a reader who already knows the name that the person
is real and senior, and meeting a Spanish recruiter in Spanish does that better than
meeting them in a language they are merely competent in.

There is a second, weaker driver worth naming so it does not quietly take over: the
build is also a demonstration of current tooling. That is real, but it is a secondary
goal, and every decision below resolves against the recruiter when the two pull apart.

## Solution

Publish a Spanish `edition` at `/es`: a real second document with its own URL, its own
static metadata, its own share image and its own CV download, reachable from an `EN / ES`
selector in the masthead of both editions.

The Spanish copy is condensed from the `Spanish CV`, the same way the English copy was
condensed from the `original CV` under ADR 0001. Both editions therefore sit one step
from a source of truth, and neither is a derivative of the other. This is what allows
the Spanish page to be presented without hedging: it has an authority of its own.

Nothing in the UI tells a reader that one edition is more trustworthy, more complete or
more current than the other. The single asymmetry that appears anywhere is the label on
the English CV button on `/es`, which calls it the **original**. That is a fact about
where the document was written, not a warning about the Spanish.

The site never guesses. `/` is English, `/es` is Spanish, and the URL is the only thing
that decides.

## User Stories

1. As a Spanish recruiter who found Fran on LinkedIn, I want to read his site in Spanish, so that I can assess him without translating in my head.
2. As that same recruiter, I want the Spanish page to read as though a Spanish speaker wrote it, so that I trust the person behind it.
3. As that same recruiter, I want to see a Spanish preview card when the link is shared in my feed, so that the site feels addressed to me before I have clicked.
4. As that same recruiter, I want to download the CV in Spanish, so that I can read it in the language I will discuss it in.
5. As that same recruiter, I want the English CV available too, so that I can forward an English document to an ATS or an international hiring committee without asking for it.
6. As that same recruiter, I want the two CVs to agree with each other, so that I am never quoting a figure that the other version contradicts.
7. As an English-speaking recruiter, I want the site I already know to be unchanged at its existing URL, so that nothing I bookmarked or shared has moved.
8. As any visitor, I want a visible language control in the masthead, so that I do not have to guess whether another language exists.
9. As any visitor, I want the language control to show which edition I am currently reading, so that I know what I am switching from.
10. As a visitor halfway down the experience section, I want switching language to keep my place, so that I am not thrown back to the top of a page I was already reading.
11. As a visitor, I want to keep my light or dark theme choice when I switch language, so that the site does not flash a theme I did not ask for.
12. As a visitor browsing in Spanish on an English-language laptop, I want the site not to send me somewhere I did not ask to go, so that the URL I typed is the page I get.
13. As a visitor browsing in English on a Spanish-language laptop, I want the same, for the same reason.
14. As a visitor who was sent `fmenemo.github.io/es` directly, I want it to load Spanish immediately, so that a link someone shared with me works as they intended.
15. As Fran, I want a shareable `/es` URL, so that I can post it in a Spanish-language context myself.
16. As a screen reader user, I want each document to declare its own language, so that my reader pronounces the page correctly instead of reading Spanish with English phonetics.
17. As a search engine, I want `hreflang` alternates on both documents, so that I can serve the right edition to the right searcher.
18. As a search engine, I want an `x-default`, so that I know which edition to fall back to when I cannot tell.
19. As a link scraper, I want the Spanish title, description and image present in the document I fetch, so that I do not need to run JavaScript to render a correct card.
20. As Fran, I want no notice anywhere saying one edition is unreviewed or possibly stale, so that the site never undercuts its own credibility in front of the reader it was built for.
21. As Fran, I want job titles and section names on `/es` to match the wording already in the Spanish CV, so that the two documents a recruiter reads side by side do not disagree.
22. As Fran, I want the Spanish identity line to come from the Spanish CV's *Resumen*, so that it traces to a source the same way the English one does.
23. As Fran, I want the Spanish edition to carry the same `evidence` and exclude the same `claim`s as the English one, so that ADR 0001 governs both editions equally.
24. As Fran, I want a missing or half-written Spanish section to fail the build, so that a partial edition cannot ship.
25. As Fran, I want a test to fail if a figure appears in Spanish metadata or on the Spanish share image that the Spanish identity line does not carry, so that the guard from ADR 0003 covers the new copy too.
26. As Fran, I want the guard tests to run against both editions from one table, so that a test that exists for English and not Spanish cannot be written by accident.
27. As Fran, I want a review gate before `/es` ships, so that the decision to publish Spanish without a provenance notice stays honest.
28. As a future maintainer, I want to find the reasoning for two documents rather than a toggle, so that I do not "simplify" it back into the shape that was rejected.
29. As a future maintainer, I want the rule that both CVs ship together written where the CV paths are defined, so that I do not regenerate one alone.
30. As a future maintainer, I want the share image sources for both editions to render from one command, so that redrawing one and forgetting the other is not possible.

## Implementation Decisions

### Two documents, not a toggle

The site becomes a two-entry build: the existing document at `/` and a second at `/es`.
Each is a real HTML file with its own `lang` attribute and its own static metadata. The
build tool's multi-page input handles this, and the hosting serves it without
configuration because the output is a directory with an index document in it.

A client-side toggle on a single URL was rejected. Per ADR 0003 a scraper fetches the
document and stops without running React, so a toggle is invisible to the surface where
the Spanish reader forms their first impression.

### Language is decided at build time

Strings live in two modules, one per edition, both satisfying one shared content type.
Each entry supplies its module to the application root as a prop, which reaches the page
components through a context provider. The seven components that import the content
module directly today stop doing so and read from that provider instead.

Consequences worth stating: the other edition's strings are not in either bundle, and a
missing or misshapen Spanish section fails type-checking during `npm run build` with no
new machinery.

A single module pairing every string as `{ en, es }` was rejected. It asserts a
key-by-key correspondence between the editions that does not exist, because each is
condensed from a different CV and their bullets may legitimately split, merge or land
differently. An i18n library was rejected: nothing here needs pluralisation,
interpolation or catalogue loading, and the library's natural grain is runtime switching,
which is the shape this spec rejected.

### The Spanish copy comes from the Spanish CV

The Spanish edition is written from `Fran_Menendez_CV_ES.pdf`, not translated from the
English site. Where the CV has already settled a phrase, the site takes it rather than
inventing a second Spanish vocabulary: role titles (`Ingeniero de Software Principal`,
`Ingeniero de Software Líder`, `Desarrollador Full-Stack Senior`), section names
(`Experiencia profesional`, `Reconocimientos y premios`, `Trabajo independiente`), and
the `identity line`, which condenses the CV's *Resumen* paragraph.

ADR 0001 governs the Spanish edition exactly as it governs the English one: every bullet
is `evidence`, no bullet is a `claim`, and each traces to its CV. The approval record
follows the pattern of `.scratch/site-refresh/bullet-approval.md`, checked against the
Spanish CV.

### Section ids stay in English

Anchors remain `#experience`, `#contact` and so on in both editions. Only the visible
labels translate. This keeps hash preservation across the selector a matter of carrying
the fragment unchanged, with no mapping table to maintain and no way for the two
editions' anchor sets to drift apart.

### The language selector

An `EN / ES` control in the masthead beside the theme toggle, present at every width,
with no menu. The current edition is marked and not a link; the other is a plain anchor
to the sibling document, carrying the current fragment so that a reader mid-page lands
at the same section.

Text, not flags: a flag names a country, and Spanish is not Spain's alone.

### No language detection

`navigator.language` is not read and no redirect occurs. Browser language predicts
interface preference rather than reading preference, and the two come apart hardest in
the target population. The hosting cannot negotiate server-side in any case, so detection
would mean a script redirect firing after paint.

### Metadata is static in both documents

Both documents carry their own title, description, Open Graph and Twitter tags, canonical
link and theme colours as static markup, per ADR 0003. Component-rendered metadata remains
out of the question; the reasoning is unchanged and now applies twice.

Both documents cross-link with `hreflang` alternates, plus an `x-default` pointing at the
English edition. `x-default` is the one place English legitimately leads, and it is
invisible to humans.

The pre-paint theme script currently inlined in the document is duplicated into the second
one. It cannot be imported, because it must run before any module loads.

### Each edition has its own share image

`tools/assets/` gains a Spanish share image source alongside the existing one, rendered to
a second PNG by the same command, and referenced by the Spanish document as an absolute URL.

This is the largest single piece of work in the feature, for an image most visitors never
consciously examine. It is in scope because the reasoning that bought two documents was
that the first Spanish-language impression is the preview card. An English image under a
Spanish title is a visibly half-done localisation in the frame where it shows most, and
omitting the image entirely collapses the card to a link stub that reads as a dead page.

### Both CVs are published, and ship together

The Spanish CV is added to the public assets under a fixed name carrying no version, the
same convention as the original. The Spanish edition offers both: the Spanish CV as the
primary action, the English one beside it labelled as the **original**. The English edition
continues to offer only the original.

Regenerating one CV without the other lets `/es` assert things that have stopped being
true, and no test can catch it because a PDF's text is not in the build. The rule is that
both are regenerated and published together, recorded in ADR 0004 and as a comment where
the CV paths are defined.

A test extracting text from both PDFs was considered and rejected: the site strings are
condensations rather than quotations, so it would be a fuzzy matcher failing on line breaks
and ligatures, guarding a file that changes about twice a year.

### Nothing in the UI hedges

No badge, banner, tooltip or footnote states that an edition is machine-translated,
unreviewed, or less current than the other. Such a notice would tell the Spanish reader,
in Spanish, that the page they are on is the unchecked copy, hedging the credibility of the
artefact in front of the only person it was added for. It is also implausible on its face,
since Fran is a native Spanish speaker.

Labelling the English CV as the **original** is provenance and stays. Anything about which
is fresher is a confession about maintenance and does not.

## Testing Decisions

A good test here asserts what a consumer observes and nothing about how it was produced.
There are two consumers, a visitor and a scraper, and the existing suite already has a seam
for each. This feature parameterises the existing three, and adds **one** more, which is
the fourth below and the only one in the suite that reads source rather than output.

### The seams

1. **What a visitor observes.** `render(<App />)` with Testing Library queries. All
   structure, content, theme and selector behaviour. Under this spec the root takes its
   content as a prop, so the seam becomes `render(<App content={...} />)`, which is what
   makes it parameterisable over editions.
2. **What a scraper observes.** The entry document imported as raw text. ADR 0003 records
   why this exception exists and why it is load-bearing: metadata asserted against the
   rendered DOM passed for the whole time the previews were broken.
3. **The share image copy.** The share image source imported as raw text and read as text
   content, deliberately excluding its styling, so that letter-spacing values are never
   mistaken for copy.
4. **Which edition a module reaches for.** Every module under `src/` imported as raw text,
   asserting that nothing but the entry document names an edition. Added in ticket 01,
   against the instinct that governs the other three, so the reasoning is recorded here
   rather than only in a code comment.

   What it defends is the decision that an edition is chosen once, at the top: a component
   that imported `content.en` directly would go on rendering English inside the Spanish
   document. That is observable through seam 1 once `/es` exists, because the Spanish
   render would show English words, but only for strings some test happens to assert, and
   not at all in the window between ticket 01 and ticket 03. The import is where the
   mistake actually is, and it is the same shape as the ADR 0003 exception: an assertion
   moved to where the failure is legible rather than where it eventually surfaces.

   It stays cheap on purpose: one glob, one regex, no per-file list to maintain. If it
   ever needs a list of allowed exceptions longer than the entry documents, it has stopped
   defending the decision and should be deleted rather than extended.

### One table, both editions

The suite defines a single local table with one row per edition, each row bundling that
edition's content module, entry document and share image source. The structural, content,
metadata and share-image guard groups run over that table with `describe.each`.

This is the point of the exercise: a test that exists for English but not Spanish becomes
impossible to write by accident, which is the failure mode a second edition invites.

Tests that are inherently per-edition stay per-edition, named as such: each edition's copy
is checked against a *different* CV, so the bullet-provenance and CV-figure assertions
cannot be shared.

### New assertions

- Each document declares the language of its own edition.
- Each document's `hreflang` alternates point at the other, with `x-default` on the English
  one. This is the first assertion that reads both documents together.
- The selector renders in both editions, marks the current one, and links to the sibling.
- Switching language preserves the current fragment.
- No hedging vocabulary appears in either document or either rendered edition. This is a
  negative test in the manner of the existing fabricated-content group, and it is the test
  that keeps the central decision of ADR 0004 from eroding.
- The Spanish edition offers both CVs, with the English one labelled as the original.
- Every asset each document references exists at the path it is referenced by, extending
  the existing check to the new PNG and PDF.

### Prior art

Everything above has a pattern already in `src/App.test.tsx`: `it.each` over phrase lists
for the identity-line condensation, `?raw` document imports for the metadata group, the
DOM-parsed share image text, negative assertions for fabricated content, and the asset
existence check. Follow those rather than introducing new idioms.

## Out of Scope

- **Any third language.** The content type and the edition table make one possible, but
  nothing here is generalised in advance for it.
- **Automated translation of future content changes.** Copy changes are made in both
  editions by hand, against their respective CVs.
- **A PDF text-extraction drift test.** Rejected above with reasons.
- **Language detection or redirect**, in any form, including a dismissible banner.
- **A router.** The site remains anchor-scrolled documents; `/es` is a second document,
  not a route.
- **CI and automated deployment.** Still absent, still deliberate: `npm run deploy` remains
  a manual act. Both editions and both share images are built by that one command.
- **Translating the CV itself.** The Spanish CV already exists and was produced elsewhere.
- **Localising anything but language**: no currency, date-format or timezone handling.

## Further Notes

**The review gate is load-bearing.** Publishing Spanish with no provenance notice was
justified by Fran reading the full Spanish edition before it ships. If that review does not
happen, the correct response is not to add the badge back, it is not to ship `/es`. This is
the one item in this spec that cannot be delegated to an agent.

**Two costs surfaced late in the grilling and are larger than the Spanish copy itself.**
The test file is 456 lines written against a single edition and needs parameterising
throughout, and the share image pipeline doubles. Sequence the work accordingly: the content
is the small part.

**ADR 0003 predicted this.** It recorded that static metadata was affordable only because
the site was one page, and named a second route as the thing that would force it to be
reopened. It has been reopened, and the answer is a twin document rather than a retreat to
component-rendered tags. A future maintainer reading ADR 0003 in isolation should be led to
ADR 0004.

**The `Edition` glossary entry is doing real work.** "Neither is a mode of the other" is what
makes the rejected toggle unwritable later, and it is worth defending in review if someone
proposes collapsing the two documents back into one.
