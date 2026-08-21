# Portfolio Site

The personal site at fmenemo.github.io. Its job is to confirm, for someone who already has Fran's name, that he is real and senior. Job search is a secondary goal, so the CV is prominent but the tone is not a funnel.

## Language

### Purpose

**Credibility anchor**:
The site's primary job: satisfying a reader who arrived already knowing the name (a recruiter, a conference organiser, someone met in person) that the person is real and senior.
_Avoid_: Portfolio, landing page, funnel

**Evidence**:
A specific, verifiable statement tied to a named employer, date, or artefact. "Cut deployment time from over 2 hours to 1 minute" is evidence.
_Avoid_: Achievement, highlight

**Claim**:
An unverifiable assertion of capability, typically a noun phrase with nothing behind it. "Technical Decision Making", "50+ Engineers Mentored". Claims are removed from this site on sight, because under a credibility anchor they cost more than they earn.
_Avoid_: Skill, competency, stat

### Content

**Experience entry**:
One role at one employer: title, employer, dates, and a small number of bullets, each of which must be evidence. Two entries at the same employer (a promotion) are two entries, not one.
_Avoid_: Job, position, career item

**Independent work**:
Something Fran built and shipped outside an employer, on his own. Distinct from an experience entry because there is no employer to verify it, so it earns its place by being clickable or by demonstrating a differentiator.
_Avoid_: Project, side project, portfolio piece

**Recognition**:
An award or competition placement from a named organisation, with a date. Rendered as one compact line, never as a section of cards.
_Avoid_: Award section, accolade

**Differentiator**:
The AI-layer thread that distinguishes Fran from other engineers with ten years of experience: production semantic search, MCP tooling, a multi-agent delivery system built and run solo. Every part of the site should be readable as supporting it.
_Avoid_: USP, specialty, focus area

### Editions

**Edition**:
One language version of the whole site: its own URL, its own document, its own metadata, its own CV. There are two, English and Spanish. Neither is a mode of the other, and neither is presented to a reader as the lesser one.
_Avoid_: Locale, translation, language version

**English edition**:
The site at `/`. Not privileged over the Spanish edition in the UI. The only asymmetry stated anywhere is that the CV was written in English, which is provenance, not precedence.
_Avoid_: Default site, main site, source language

**Spanish edition**:
The site at `/es`. Exists for the reader who arrives from LinkedIn knowing the name and would rather read Spanish, so its job is warmth, not comprehension. Written from the Spanish CV rather than translated from the English edition.
_Avoid_: Translation, /es version, localised site

**Chrome**:
The words the layout says about itself rather than about Fran: section headings, navigation labels, the name of a control. Part of an edition, so a Spanish reader meets them in Spanish, but not traceable to a CV the way an `evidence` bullet is. Names are not chrome: "FM", "GitHub" and "LinkedIn" are the same in every edition and stay in the components that draw them. Nor is the label on a thing an edition may offer more or fewer of, such as a `CV` download: it travels with what it names, because a separate list of labels would pair with them by position.
_Avoid_: Labels, UI strings, i18n keys

### Source of truth

**CV**:
The authority for titles, dates, employers, and numbers. Where the site and the CV disagree, the CV wins and the site is wrong. Exists in two languages, one per edition. Neither filename carries a version: one name per language, replaced in situ when that CV is updated.
_Avoid_: Resume

**Original CV**:
The English CV, `public/Fran_Menendez_CV.pdf`. Written first, and the authority for facts in both languages. Offered on the Spanish edition too, as a document a recruiter can forward onward.
_Avoid_: Master CV, canonical CV, authoritative CV

**Spanish CV**:
The Spanish CV, a translation of the original. Not an authority for facts, but the source of truth for the Spanish edition's wording: where a title or section name appears in both, the site takes the CV's. Regenerated and published alongside the original, never on its own.
_Avoid_: Translated CV, localised CV

**Identity line**:
The single sentence in the hero stating who Fran is. Sourced from the CV summary of its own language, which says "Software Engineer" and "Ingeniero de software", deliberately not the current job title of Principal Software Engineer.
_Avoid_: Tagline, headline, bio
