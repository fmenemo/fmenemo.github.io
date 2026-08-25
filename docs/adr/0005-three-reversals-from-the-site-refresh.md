# Three reversals from the site refresh

The redesign pass on the form of the page overturned three things the site-refresh spec and its ticket 05 (the Swiss visual direction) had settled the other way: the hero stood off the grid the sections use, the routes to Fran sat in the hero, and Technologies was a section band of its own. Each of those was a deliberate choice at the time, so an agent reading only the earlier record would restore them as fixes. We decided to record all three here, with what each one reverses, so that the next reader finds the second decision beside the first.

## The hero sits on the twelve-column grid

Ticket 05 gave the hero the shared measure but not the shared grid: the name, the identity line and the actions ran full width inside the container, and the twelve columns started at the first section band. The page therefore only began reading as one composition at the second screen.

The hero now sits on the same twelve columns. The name spans the measure, the identity line and the CV take the content columns, and the location and mode line sits out in the label columns, where every section label below it sits. The placement is desktop-only; at phone widths the grid collapses to one column in source order, so nothing reorders.

**What this reverses:** the hero's exemption from the grid in ticket 05. The measure was always shared, and only the column placement changes.

## The routes to Fran leave the hero

Ticket 05 put email and LinkedIn in the hero beside the CV, so that a reader who wanted to make contact could do it without scrolling. The cost was that Contact, at the bottom of the page, then repeated the hero word for word and gave a reader who had scrolled the whole page nothing new.

The hero's only actions are now the edition's CVs. Contact is the one place on the page where a route to Fran is read as text. The footer's GitHub and LinkedIn marks are brand marks and are unaffected.

**What this reverses:** the three routes in the hero from ticket 05. A test over the edition table asserts the hero carries exactly the edition's CV links and no `mailto:` or LinkedIn href, so a helpful restoration fails rather than ships.

## Technologies folds into Recognitions

Ticket 05 made Technologies a section band, with a heavy rule, a number, a heading and the full section padding, holding two lines of running text. That was right when the band replaced a grid of thirty capability chips, because the section was the visible statement that the chips were gone (ADR 0001). It is not right now that the chips are only a line in an ADR: the band spends a screen of a five-band page on the shortest thing on it.

Technologies is now a second definition row under Education in the Recognitions band, in the same label-and-value shape, with the same slash-separated running text. The label is chrome, so each edition carries its own. The Recognitions heading is untouched, and the nav, which lists Experience and Contact, is untouched. The sections renumber to `01` Experience, `02` Independent work, `03` Recognitions, `04` Contact.

**What this reverses:** the Technologies section band from ticket 05. What it does not reverse is the reasoning under it, which still holds and is why the row is running text: a skill is a claim and a technology is a fact (`CONTEXT.md`), so the row names technologies actually worked in and never returns to chips.

## Consequences

- **The `#technologies` anchor moves onto the row rather than disappearing.** Someone may already hold a link to it, and a fragment that lands on nothing leaves a reader at the top of a page they asked to enter halfway down. The id sits on the row, so the fragment lands on the technologies themselves.
- **Two tests over the edition table hold the fold in place.** The section numbers rendered are `01` to `04` with no gap, and `#technologies` resolves to an element inside the Recognitions section. The older test that every in-page anchor resolves is unchanged and still covers the nav.
- **`chrome.sections.technologies` is gone and `chrome.recognitions.technologies` replaces it.** Both editions supply the row label or the build fails, which is the guard ADR 0004 put there.
- **The reasoning that removed the chips lives on the row.** It moved with the content rather than being deleted with the file, because it is the only thing standing between the next reader and a rebuilt chip grid.
