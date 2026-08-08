# Bullets against the reworked CV

Status: ready-for-human

The sweep is done and the diff is prepared: `bullet-approval.md` in this directory. It is
waiting on Fran, and on nothing else. **What it found narrows the problem below** rather than
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
