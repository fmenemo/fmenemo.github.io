# Bullets against the reworked CV

Status: superseded by [#4](https://github.com/fmenemo/fmenemo.github.io/issues/4)

**This sweep is superseded and its six tickets are dead. Do not work them.** It was prepared
on 2026-08-08 against the CV as it stood on 2026-08-06, and the CV moved twice more after
that. `8e89f72` rewrote the summary and added an independent-work entry on 2026-08-18, and
`36eab4d` took three prose rewrites the same morning. #4 also freezes the Spanish edition, so
the Spanish half of every correction below is deferred rather than waiting on a signature.
All six tickets changed under #4's decisions: 01 loses C2 entirely, 02 switches to the fuller
variant, 03 and 04 narrow to English only, 05 drops from eight figure candidates to three,
and 06 swaps a commit that does not resolve for a commit and a PDF digest.

**C2 is dead rather than deferred.** It proposed a hero line ending on an agentic engineering
workflow Fran built and ran for his own production delivery. `8e89f72` removed that from the
CV on 2026-08-18, because the workflow had been dismantled on 2026-08-03. There is nothing
left to sign. Shipping C2 as written would have put a fresher-looking falsehood in the hero
than the one already there, and #4 settles an identity line of its own instead. Every other
wording prepared here still holds.

**`bullet-approval.md` stays, and that is why this directory is marked rather than deleted.**
It holds the approved English wordings for C1, C3 and C4 and for the unified sign-on bullet,
which #4's tickets take verbatim. All four were rechecked against `36eab4d` during #4's grill
and still match the CV. Deleting this directory would take out the source of copy that is
live or about to be.

Everything from here down is the record as prepared on 2026-08-08. Read it as history.

The sweep is done, the diff is prepared in `bullet-approval.md`, and the work is broken into
six tickets under `issues/`. All of it is waiting on Fran, and on nothing else: tickets 01–03
are `needs-info` until the record's C1–C4 boxes are ticked, 04 and 05 are `needs-triage`
pending decisions D1 and D2, and 06 is blocked on the corrections landing. **What it found narrows the problem below** rather than
widening it: the drift is not a long tail, it is four corrections the CV made and the site was
never told about, in both editions — eight strings. Every other bullet still matches. The
"assume there are more" prior was reasonable and turned out to be wrong in a specific and
useful way; see the record's opening section.

Found on 2026-08-06 while correcting the employment dates
(`.scratch/catch-up-with-the-cv/`), and deliberately not fixed there: a date fix carrying a
rewritten bullet is what this repo's bullet-approval convention exists to prevent.

## Problem Statement

Every bullet on this site was condensed from the CV in the site refresh, and approved
against its CV original at that time. The CV has been reworked twice since — a correctness
pass on 2026-08-05 and a positioning pass on 2026-08-06 — and neither of them touched this
repo. The site's copy is therefore condensed from a CV that no longer exists in that form,
and ADR 0001 makes the CV the source of truth for every statement here.

**One instance is known**, and it is the kind that matters rather than a wording drift:

- Both editions say Fran built **the team's** agentic AI development workflow. The English
  reads "Built the team's agentic AI development workflow"; the Spanish, "el flujo de
  desarrollo con IA agéntica del equipo".
- The CV stopped saying that on 2026-08-05. The correctness pass established the workflow
  was **Fran's own**, built and run for his own production delivery, with three of its
  practices reaching the team's process. `cv/en.md` now reads "Built and ran an agentic AI
  development workflow for my own production delivery … drove its practices into the
  team's process".

So the site currently makes a claim about a team that the CV it traces to does not make. It
is the same ADR 0001 fault the date correction fixed, in a different field.

**Assume there are more.** This one was noticed because it happened to be read; nothing has
swept the rest. Two full CV reworks landing on a copy nobody re-derived is unlikely to have
left exactly one bullet behind.

## Solution

Sweep **both editions' bullets** against the CVs as they now stand, and correct what has
drifted, under the bullet-approval convention: each changed bullet approved against its CV
original in an approval record before it lands. Both editions in the same pass — the
Spanish copy is condensed from `cv/es.md`, not translated from the English site, so a
one-edition sweep would leave the other saying the older thing.

`ready-for-human` rather than `ready-for-agent`: the convention is bullet-by-bullet
approval, and the point of it is that a person reads what the site will say about them.
An agent can prepare the diff and the approval record; it cannot sign it off.

## Out of Scope

- **Dates.** Corrected and guarded on 2026-08-06; every range now matches its CV.
- **Positioning.** The CV's positioning pass chose an order and an emphasis for a
  three-page document. This site is not that document and does not inherit its ordering
  decisions — what it inherits is the requirement that nothing here says something the CV
  does not.
