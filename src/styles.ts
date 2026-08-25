// The page speaks in three interactive treatments and two metadata voices.
// They live here so restyling any of them is one edit rather than a sweep
// across every page, which is the point of the token work in ADR 0002.

/** Small mono caps: section numbers, labels, dates, employers, nav. */
export const labelVoice = 'font-mono text-2xs tracking-[0.2em] uppercase';

/**
 * The other half of the pair: what a label names, rather than the label. An
 * address or a handle is read as itself, so it keeps its own case and normal
 * tracking, and the caps stay on the word beside it.
 */
export const valueVoice = 'font-mono text-sm lowercase tracking-normal';

/**
 * A masthead control: secondary until it is hovered. Worn by the section
 * links, the language selector's link to the other edition, and the theme
 * toggle, which is why it is here rather than repeated in each of them.
 */
export const mastheadControl =
  'text-muted transition-colors hover:text-accent dark:text-muted-dark dark:hover:text-accent-dark';

/**
 * The bordered block that carries a section's main action. It is a control and
 * not a value, so it wears the label voice. The pixel it drops on `:active` and
 * the slower fill are what make a click read as a press; the reduced-motion
 * block in `index.css` takes both back off.
 */
export const primaryAction = `inline-block border-2 border-ink px-6 py-3 ${labelVoice} transition-colors duration-200 active:translate-y-px hover:bg-ink hover:text-paper dark:border-chalk dark:hover:bg-chalk dark:hover:text-canvas`;

/** The accent-underlined action that sits beside a primary one. */
export const accentAction = `${labelVoice} text-accent underline decoration-1 underline-offset-4 transition-colors hover:text-ink dark:text-accent-dark dark:hover:text-chalk`;

/** An underlined link inside running content. */
export const inlineLink = 'underline decoration-1 underline-offset-4 transition-colors hover:text-accent dark:hover:text-accent-dark';
