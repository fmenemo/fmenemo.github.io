// The page speaks in three interactive treatments and one metadata voice.
// They live here so restyling any of them is one edit rather than a sweep
// across every page, which is the point of the token work in ADR 0002.

/** Small mono caps: section numbers, labels, dates, employers, nav. */
export const metaVoice = 'font-mono text-2xs tracking-[0.2em] uppercase';

/** The bordered block that carries a section's main action. */
export const primaryAction = `inline-block border-2 border-ink px-6 py-3 ${metaVoice} transition-colors hover:bg-ink hover:text-paper dark:border-chalk dark:hover:bg-chalk dark:hover:text-canvas`;

/** The accent-underlined action that sits beside a primary one. */
export const accentAction = `${metaVoice} text-accent underline decoration-1 underline-offset-4 transition-colors hover:text-ink dark:text-accent-dark dark:hover:text-chalk`;

/** An underlined link inside running content. */
export const inlineLink = 'underline decoration-1 underline-offset-4 transition-colors hover:text-accent dark:hover:text-accent-dark';
