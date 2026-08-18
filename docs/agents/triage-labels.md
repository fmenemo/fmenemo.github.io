# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

Because this repo uses GitHub Issues, a "label" is a real GitHub label, applied with `gh issue edit <n> --add-label`. Only `wontfix` exists in the repo today; the other four need creating (`gh label create`) before `/triage` can apply them.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent. `/to-spec` applies `spec` instead — see "What `/to-spec` applies" below |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Edit the right-hand column to match whatever vocabulary you actually use.

## What `/to-spec` applies

> Written by `/setup-sandcastle` on 2026-08-19: this section, and the amendment
> above that points at it. The rest of this file belongs to the mattpocock
> setup, and a later run of that setup overwrites both — visibly, because this
> note is here to be found.

| Skill      | Apply  | Do not apply                               |
| ---------- | ------ | ------------------------------------------ |
| `/to-spec` | `spec` | `ready-for-agent`, despite its own default |

`spec` marks a container issue: a whole feature, worked through its Tickets and
never dispatched to an agent. It is a sixth label outside the five canonical
triage roles the mattpocock skills define, and their own documentation calls
exactly that a fork rather than a configuration. It is a fork chosen
deliberately: a Run works one Spec's Tickets or a set of parentless Tickets and
never a mixture (ADR-0002), so a list of issues has to be readable as one or the
other. Nothing branches on the label — `/sandcastle-run` tells a Spec from a
Ticket by the headings the two authoring Skills write — and it is what makes
that reading skimmable by eye.
