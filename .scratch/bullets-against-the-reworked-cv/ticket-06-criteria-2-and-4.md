# Ticket 06, criteria 2 and 4: two criteria the ticket forbids itself to meet

Prepared by an agent. **Nothing here changes until Fran signs it**, which is the
same gate `bullet-approval.md` runs under, and the reason it is a proposal
rather than an edit to the ticket.

Two of ticket 06's acceptance criteria cannot be met while a third one holds.
Three review passes have now read the branch, and the second and third both
arrived at this on their own, so it is the ticket's wording rather than a
reading of it.

## The contradiction, in the ticket's own words

Criterion 2 asks that **neither edition** attribute the agentic workflow to the
team. Criterion 4 asks that **nothing on the page** say or imply that the
reviewed set is the set below the confidence threshold.

Criterion 9 says no string in the Spanish content module changes. The body says
it again in prose: "English only. The Spanish module is frozen by #4, knowingly,
and these three corrections are among what stays wrong there." #4 says it a
third time, at length, and names the cost.

The Spanish edition says both of the things criteria 2 and 4 forbid:

- `src/content.es.ts:21` "flujos de desarrollo agéntico convertidos en estándar
  de todo el equipo"
- `src/content.es.ts:56` "Construí el flujo de desarrollo con IA agéntica del
  equipo"
- `src/content.es.ts:55` "un panel de revisión humana en PayloadCMS para los
  emparejamientos por debajo del umbral de confianza"

So an implementer can satisfy criteria 2 and 4, or criterion 9, and not both.
The English edition meets both criteria on this branch.

## What I propose, and it is the smaller of the two options

Amend the two criteria to name the edition the ticket is about:

- **Criterion 2** becomes: The English edition does not attribute the agentic
  workflow to the team anywhere.
- **Criterion 4** becomes: Nothing on the English edition says or implies that
  the reviewed set is the below-threshold set.

Nothing else moves. No code changes, and the branch already meets both as
amended. This is a wording slip rather than a decision being reversed: the body,
criterion 9 and #4 all agree the pass is English only, and only these two lines
say otherwise.

Criterion 6 needs no amendment. It names no edition, so it reads as being about
the bullet the ticket changes, which is English.

## The other option, which is a real decision rather than a slip

Take criteria 2 and 4 at their word and unfreeze the Spanish module. The
wordings exist and are approved: C1, C3 and C4 in `bullet-approval.md` all carry
a Spanish column. What it costs is #4's stated position, which is that spending
them is deferred rather than refused, and it would want a note in #4 rather than
a quiet edit here.

I would not do this inside ticket 06. Three corrections to an edition the spec
froze is a change to the spec, and it should be visible as one.
