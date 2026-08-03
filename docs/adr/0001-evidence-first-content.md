# Evidence-first content, sourced from the CV

The site previously presented thirty skill chips ("Technical Decision Making", "DevSecOps"), three invented stats ("10+ Years Experience", "50+ Engineers Mentored", "∞ Systems Scaled"), and a Projects section containing six fabricated products with `githubUrl` links to repositories that do not exist. Since the site's job is to be a credibility anchor (see `CONTEXT.md`), unverifiable claims actively cost credibility rather than building it. We decided that every statement on the site must be evidence traceable to `public/CV_Fran_Menendez_2026-07.pdf`, that the CV wins wherever the two disagree, and that content which cannot be sourced is deleted rather than softened.

## Consequences

- `src/pages/Projects.tsx` is to be deleted outright rather than left commented out. Fran's public GitHub is university coursework and forks, so there is no real project set to rebuild it from, and dead fabricated code in a repo that agents read is a hazard.
- The GitHub link drops to an unlabelled footer icon. The previous framing ("Explore my technical contributions and open source work") invited a click that undercuts the seniority claim.
- Round-number stats are not used at all, including revised-downward ones. "30+ engineers mentored" was proposed and rejected because the CV documents mentoring 5 developers into 2 promotions and managing an 8-person team, which is both true and more specific.
- The site leads with "Software Engineer", matching the CV summary, not the current job title of Principal Software Engineer. This is a deliberate choice by Fran, not an oversight, and should not be "corrected".
- Numbers taken from the CV PDF need care: the text was extracted against embedded subset-font CMaps, and some ligature glyphs and digits did not survive. Any figure on the site must be confirmed against the rendered PDF before it ships.
