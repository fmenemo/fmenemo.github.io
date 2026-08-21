# The four unmet rows on Spec #4's pull request, and where each of them stands

`/sandcastle-run`'s Land step holds a Spec pull request back where any row of any
criteria table in its body reads other than `met`. On 2026-08-21 four rows did.
All four are the earlier Run's judgement, written before the two gates that
stopped #6 and #10 were settled, and no row has been rewritten: a row rewritten
after the fact is a second opinion nothing reviewed. This file says what each one
is now, beside the evidence.

## #6, criterion 2 — "Neither edition of the page attributes the agentic workflow to the team anywhere"

The reviewer's evidence stands: "English side is clean (`src/content.en.ts:21`
and `:49`). The Spanish edition still attributes the workflow to the team in
three places."

**Answered by the amendment.** On 2026-08-21 Fran amended this criterion to read
"The English edition does not attribute the agentic workflow to the team
anywhere", because as written it contradicted criterion 9's freeze on the Spanish
module. The English side being clean is the criterion as amended, met. See
[`ticket-06-criteria-2-and-4.md`](./ticket-06-criteria-2-and-4.md), signed.

## #6, criterion 4 — "Nothing on the page says or implies that the reviewed set is the below-threshold set"

Same amendment, same reasoning. As amended it reads "Nothing on the English
edition …", and the reviewer recorded the English side fixed at
`src/content.en.ts:48`.

**What is not answered by it** is the Spanish edition itself, which still says
both of the things the unamended criteria forbade. That is knowingly deferred
debt under #4 rather than a Gap, and the whole-feature review on the pull request
raised it from the other side. It wants a Ticket of its own.

## #10, criterion 1 — "The harness description is signed off by a person before it lands"

The reviewer's evidence: the approval file "leaves all three boxes unticked".

**Answered by the signature.** Fran signed it approved, as written, on
2026-08-21, at commit `4c7a22e9`. The boxes are ticked and the two lines under
them are filled in. See
[`../catch-up-with-the-cv/harness-entry-approval.md`](../catch-up-with-the-cv/harness-entry-approval.md).

## #6, criterion 10 — "Every figure that ships was read on the rendered CV page, not extracted from the PDF"

The reviewer's evidence: "attested but not evidenced. The only record is prose."
This was the one row of the four that no decision answered.

**Answered by evidence.** Both pages of the `36eab4d` CV are rendered at 150 dpi
and committed beside the record, and all fourteen figures in the guard are
tabulated against the sentence each was read in, along with the four the CV
states and the site declines. See
[`ticket-06-rendered-checks/every-figure-on-the-render.md`](./ticket-06-rendered-checks/every-figure-on-the-render.md).

That pass also found `$2M+` shipping outside the guard, which the review of #11
had reached independently from the standards side. It is in the guard now.
