import React from 'react';
import { useContent } from '../hooks/useContent';
import { labelVoice } from '../styles';

/**
 * The id the main landmark carries and this link jumps to. Exported so that
 * `App` sets it from the same constant the link targets: the two drifting apart
 * is the one failure this component has, and it is silent — the link still
 * focuses something, just not the content.
 */
export const MAIN_ID = 'main';

// The first link in the document, and the first thing Tab reaches. Without it a
// keyboard visitor arrives at four masthead controls before the first word of
// the page, on every page load and after every trip through the language
// selector (WCAG 2.4.1).
//
// Hidden until it has focus, which is the whole trick: `sr-only` clips it to a
// pixel and leaves it in the accessibility tree, and the focus variant puts it
// back into the flow, fixed above the masthead so it is not the masthead's
// bottom border that a visitor is reading it through.
const SkipLink: React.FC = () => {
  const { chrome } = useContent();

  return (
    <a
      href={`#${MAIN_ID}`}
      className={`sr-only ${labelVoice} focus:not-sr-only focus:fixed focus:top-3 focus:left-6 focus:z-60 focus:border-2 focus:border-accent focus:bg-paper focus:px-4 focus:py-2 focus:text-accent dark:focus:border-accent-dark dark:focus:bg-canvas dark:focus:text-accent-dark`}
    >
      {chrome.skipToContent}
    </a>
  );
};

export default SkipLink;
