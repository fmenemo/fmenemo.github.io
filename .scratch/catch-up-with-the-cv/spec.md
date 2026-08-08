# Catch up with the CV

Status: resolved

Both tickets shipped on 2026-08-06 and went live on 2026-08-08. The four strings are
corrected, the guard is written over the shape of a date range rather than the two words,
both PDFs are the current build, and the suite, build and lint pass.

**The two-day gap was the publish step, never the build.** The artefact on `gh-pages` was
correct from 2026-08-06 onward; GitHub's legacy Pages builder failed it twice with a bare
`Page build failed.` at `duration: 0`, during a platform incident. Three things then kept
the retry from happening, and the first two were misreadings worth recording:

- A run left wedged in `queued` for 40+ hours looked like the cause. It was not: a later
  run started and completed alongside it, so it never held the queue. GitHub's own API
  will not cancel it (`409`, force-cancel included). It is inert; leave it.
- The obvious retry — rebuild and `npm run deploy` — was a **no-op**. The build was
  byte-identical to what was already on `gh-pages`, so no commit was made and no build was
  triggered. `gh-pages` still prints `Published`. Nothing had actually been retried since
  the incident ended; verify the branch HEAD moved, not the command's output.
- `.nojekyll` was then added and silently dropped, because `gh-pages` omits dotfiles unless
  passed `--dotfiles`. Fixed in `package.json`.

Jekyll is now out of the path entirely (`public/.nojekyll`), which is what a Vite build
should have had all along. Verified live: the referenced `en-*.js` and `es-*.js` each
contain `Jul 2026` and zero `Present`/`Actualidad`, both PDF hashes match the local build,
and `/es/` returns 200.

The site is a consumer of the canonical CV (ADR 0001), and it has fallen behind it in two
ways at once. Both are corrections arriving from the CV's own repo, where the work that
caused them is already closed; the spec that sequenced them is
`.scratch/downstream-cv-correction/spec.md` in that repo, and this is its arrival.

## Problem Statement

**The site says Fran still works at The Knot Worldwide.** He stopped on 2026-07-31. Four
strings:

| File | Reads | Should read |
| --- | --- | --- |
| `src/content.en.ts` | `Oct 2023 - Present` | `Oct 2023 - Jul 2026` |
| `src/content.en.ts` | `Apr 2025 - Present` | `Apr 2025 - Jul 2026` |
| `src/content.es.ts` | `Oct 2023 - Actualidad` | `Oct 2023 - Jul 2026` |
| `src/content.es.ts` | `Abr 2025 - Actualidad` | `Abr 2025 - Jul 2026` |

Both CVs have carried the corrected dates since 2026-08-05. The site was never told, and
nothing here would have said so — which is the more durable half of the problem. ADR 0001
requires every statement on this site to be traceable to the CV; these four are traceable
to a CV that no longer says that. The CV's own repo asserts the absence of `Present` and
`Actualidad` in its markdown. This repo has no equivalent assertion over its content
files, so the same drift can happen again on the next CV change, silently.

**The published CVs are a stale build.** `public/Fran_Menendez_CV.pdf` and
`public/Fran_Menendez_CV_ES.pdf` were replaced on 2026-08-06 by the CV repo's
`npm run publish:cv`, which stops at the copy by design — it stages, commits and pushes
nothing here. Both files are sitting uncommitted in this working tree, so the live site is
still serving the 2026-08-01 build: the one that says he works at The Knot, and that
carries none of the corrections or the unified sign-on programme the CV gained since.

The two are one deploy. Shipping the dates without the PDFs would leave the page correct
and the document it offers wrong, which is the worse of the two failures — the PDF is what
a recruiter forwards.

## Solution

Correct the four strings, guard the class of fault rather than the four strings, and
commit and deploy both PDFs alongside them.

The guard is the part worth designing. Writing it as a banned-word list keyed to `Present`
and `Actualidad` would catch this instance and not the next one, in a repo that will grow
more editions. Every date range on this site is a closed range of two dates — that is what
a CV entry is once a role has ended, in either language — so the guard asserts the shape
and not the vocabulary, and a third edition inherits it without a translation.

## Acceptance

- [x] Neither `Present` nor `Actualidad` appears as an end date in either content file
- [x] The Knot Worldwide reads `Oct 2023 - Jul 2026` and the Principal role
      `Apr 2025 - Jul 2026`, in both editions, in each edition's own month vocabulary
- [x] Every date range in both content files matches its edition's CV
- [x] A guard fails the suite if any employer span or role date is open-ended again, in
      either edition
- [x] Both rebuilt PDFs are committed
- [x] `npm run build`, `npm run lint` and `npm test` pass
- [x] Deployed, and verified live on 2026-08-08

## Out of Scope

- **Any other content change.** The site's copy is condensed from a CV that has been
  reworked twice since this copy was written, so there is other drift and at least one
  instance of it is known — see ticket 01's Comments. Correcting copy is a content change
  under this repo's bullet-approval convention, and folding it in behind a date fix is
  exactly what the convention exists to stop.
- **Rebuilding the PDFs.** They are built in the CV repo by its own gated chain. This repo
  receives them and publishes them; it does not produce them.
