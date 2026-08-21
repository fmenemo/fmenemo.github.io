# Ticket 11: the hero, read at the widths where it is least forgiving

One of the ticket's acceptance criteria is a check that cannot be a test. The
identity line grew from 206 characters to 228, and what a test can say about
that is that the string is right, not that the hero still holds its shape when
it wraps. It was done, and this is what it found. The record is here so that a
reader of the branch does not have to take a commit message's word for it.

Nothing reads this file and no test fails when it goes stale, the same footing
as the ticket-10 record beside it.

## What was read

The production build of this branch, served by `vite preview` and opened in
Chromium with a device viewport emulated. Not the dev server and not the test's
jsdom: the criterion is about the page a visitor gets. The window on this
machine still refuses to go below 500px, which is what ticket 10 ran into, so
the two narrow widths were emulated rather than resized to.

- `hero-390px.png`, 390x844 at DPR 3, the iPhone width #4 named.
- `hero-320px.png`, 320x568 at DPR 2, narrower than any phone in use. It is the
  floor, not a case anyone will meet.

## The hero holds its shape

At 390px the line wraps to six lines at 18px on a 29.25px leading, and the name
above it keeps its two-line shape. Nothing overflows: the document's scroll
width is 390px, and the furthest right edge on the page is the viewport's own.
The line ends on "team-wide standard." with the download control, both contact
links and the location rule all still above the fold.

At 320px it wraps to eight lines and the same three things hold: two-line name,
no horizontal scroll, no element wider than the viewport. The download control
is the first thing pushed below the fold, which is the layout doing what it
should at a width no reader will bring.

The line breaks are clean at both widths. "multi-agent" is not broken across
lines at either one, and neither is "team-wide": the two hyphenated terms are
where a longer line would have shown the strain first.
