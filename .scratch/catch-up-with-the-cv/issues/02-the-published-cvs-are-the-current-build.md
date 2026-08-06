# 02: The published CVs are the current build

**Status:** claimed

**What to build:** The two PDFs the site offers are the ones the CV repo last built, and
they are live rather than merely copied.

`npm run publish:cv` in the CV repo copies both editions into `public/` and stops there,
deliberately: it stages, commits and pushes nothing in this repo, so a published CV is not
yet a live one. That gap is where these two files have been sitting since 2026-08-06.

Nothing in this repo can check what a PDF says — a PDF's text is not in the build, and a
text-extraction drift test was considered and rejected in ADR 0004. The existing guard is
the one that can be written: every CV the page offers is published as a site asset. It
already passes and it would not have caught this, because the files were there; they were
just old. The rule that the two editions are regenerated and published together, recorded
on `CvDownload` in `content.ts`, is the guard for the rest.

- [x] Both PDFs committed
- [x] Deployed, and the live site serves the new build

## Comments

**2026-08-06 — shipped with ticket 01, as one deploy.** Deliberately not split: the page
and the document it offers disagreeing about where Fran works is worse than either being
wrong alone, and the PDF is the artefact a recruiter forwards.

**Both files verified as the current build before committing** — byte-identical to
`cv/shipped/Fran_Menendez_CV.pdf` and `cv/shipped/Fran_Menendez_CV_ES.pdf` in the CV repo,
which are the outputs of its two gated renders.
