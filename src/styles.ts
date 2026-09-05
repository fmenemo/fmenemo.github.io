// The page speaks in one voice about itself and answers in three treatments.
// They live here so restyling any of them is one edit rather than a sweep
// across every page, which is the point of the token work in ADR 0002.

/**
 * The hand: the small, narrow, tracked-open uppercase the record speaks about
 * itself in. Running heads, field labels, index numbers, dates and the controls
 * all wear it, so the record's own hand is never mistaken for the record.
 */
export const hand = 'narrow text-2xs tracking-[0.16em] uppercase';

/**
 * A link. The rule under it is drawn from the left when a pointer or the
 * keyboard reaches it, and is simply there under a press or under reduced
 * motion. Pressing also takes the colour to the ink, so the state is visible on
 * a touch screen, where there is no hover to precede it.
 */
export const link =
  'link-rule text-accent transition-colors active:text-ink dark:text-accent-dark dark:active:text-ink-dark';

/**
 * The one thing on the page drawn as an object rather than as a line: the
 * bordered block a CV is taken away in. Hover fills it, and a press fills it
 * and sets it down a pixel, so the two states are not the same picture.
 */
export const action = `${hand} inline-block border-2 border-accent px-4 py-2.5 text-accent transition-colors hover:bg-accent hover:text-stock active:translate-y-px active:bg-accent active:text-stock dark:border-accent-dark dark:text-accent-dark dark:hover:bg-accent-dark dark:hover:text-stock-dark dark:active:bg-accent-dark dark:active:text-stock-dark`;

/**
 * A control that draws no text of its own, so it has no rule to draw: the theme
 * toggle's icon and the footer's two marks. It answers in colour alone, which
 * is why the pressed state goes past the hover one to the ink rather than
 * stopping at the accent.
 */
export const control =
  'text-muted transition-colors hover:text-accent active:text-ink dark:text-muted-dark dark:hover:text-accent-dark dark:active:text-ink-dark';

/**
 * The measure the evidence is set to. The page's own width is wide enough at
 * 1280px to run a statement past the point an eye finds the next line, so the
 * text column of the record is capped in characters rather than left to the
 * container: the left columns hold the figures, and this holds the prose.
 */
export const evidence = 'max-w-[74ch] text-[0.9375rem] leading-[1.55]';

/**
 * The two-column setting the record is laid out in: a fixed left column for the
 * figures a reader scans down — a span, a role's dates, an entry's number — and
 * everything else beside it. Fixed rather than fractional, so that the columns
 * of two different sections line up on the same vertical, and stacked below the
 * breakpoint where 320px cannot hold both.
 */
export const ledger = 'grid gap-x-6 gap-y-1 sm:grid-cols-[9.5rem_minmax(0,1fr)]';
