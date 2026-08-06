# 01: The employment dates are closed

**Status:** claimed

**What to build:** The site stops claiming Fran currently works at The Knot Worldwide, and
cannot start again silently.

Four strings, listed in the spec. They are a date correction and nothing else: the copy
around them is not touched here.

**The guard is the durable half**, and it is the reason this is a ticket rather than a
chore. Write it in the manner of the existing negative groups in `App.test.tsx` — an
assertion with a comment saying what it defends — and write it over the *shape* of a date
range rather than over the words `Present` and `Actualidad`. A closed range of two dates is
what an entry looks like in every edition; a banned-word list is one translation behind
from the day a third edition lands.

The month vocabulary differs per edition and belongs in the edition table with the rest of
the per-edition expectations, beside `employers`, which already states each edition's month
abbreviations for the same reason.

- [x] `src/content.en.ts` reads `Oct 2023 - Jul 2026` and `Apr 2025 - Jul 2026`
- [x] `src/content.es.ts` reads `Oct 2023 - Jul 2026` and `Abr 2025 - Jul 2026`
- [x] Every employer span and role date in both files is a closed range of two dates
- [x] A guard fails if one is open-ended again, in either edition, and it is written over
      the shape rather than over the two words
- [x] Every date range matches its edition's CV, checked entry by entry

## Comments

**2026-08-06 — the guard was written first, and it bit.** Both new assertions were run
against the uncorrected content files before the strings were touched: the shape guard
failed on all four ranges across the two editions, and the end-date assertion failed on
both editions' Knot entries. That ordering is what says the guard is checking the content
rather than agreeing with it.

**Every date range was checked against the CV, not only the four.** Both content files
carry twelve ranges between them; ten already matched. The two CVs at `cv/en.md` and
`cv/es.md` in the CV repo were read entry by entry: The Knot `Oct 2023 – Jul 2026`, MOBIKO
`Aug 2020 – Sep 2023`, Hiberus `Jul 2017 – Jul 2020`, and each role within them. The site
matches on all of them now.

**One piece of drift found and deliberately not fixed.** The Principal bullets in both
content files still describe the agentic AI development workflow as **the team's** — the
English reads "Built the team's agentic AI development workflow". The CV stopped saying
that on 2026-08-05: the correctness pass established the workflow was Fran's own, built and
run for his own production delivery, with three of its practices reaching the team's
process. `cv/en.md` now reads "Built and ran an agentic AI development workflow for my own
production delivery … drove its practices into the team's process".

So the site currently makes a claim about a team that the CV it traces to no longer makes.
That is the same ADR 0001 fault as the dates, in a different field, and it is **not fixed
here on purpose**: a bullet is copy, copy lands through the bullet-approval convention, and
a date fix quietly carrying a rewritten bullet is what that convention exists to prevent.
It is reported rather than left for a reader to find, and it wants a ticket of its own —
which should sweep both editions' bullets against the reworked CV rather than fixing this
one, since a CV reworked twice has almost certainly left more than one bullet behind.
