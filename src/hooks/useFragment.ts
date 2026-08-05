import { useEffect, useState } from 'react';

// The fragment is the one piece of navigation state this site has: every
// section is an anchor, so where a visitor is reading is `location.hash` and
// nothing else. Both things below exist because the language selector has to
// carry that state across to the sibling document (ADR 0004).

/**
 * The current fragment, including its `#`, or `''` when there is none.
 *
 * Read once on mount and kept current from `hashchange`, so a link built from
 * it points at the section the visitor is actually on rather than the one the
 * document was opened at.
 */
export const useFragment = (): string => {
  const [fragment, setFragment] = useState(() => window.location.hash);

  useEffect(() => {
    const read = () => setFragment(window.location.hash);

    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  return fragment;
};

/**
 * The id a fragment names, or `''` when it names nothing.
 *
 * A fragment is whatever the visitor typed, and every step of reading one has a
 * way of throwing on input the site did not write: `decodeURIComponent('%')`
 * raises a `URIError`, and `querySelector('#')` a `SyntaxError`. Either takes
 * the whole application down with it, so this decodes defensively and the
 * caller looks the id up by id rather than by selector.
 */
const fragmentId = (hash: string): string => {
  const raw = hash.slice(1);

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

/**
 * Scrolls to the section a fragment URL was opened at.
 *
 * The browser does this itself, and here it silently does nothing: it resolves
 * the fragment while the document is still an empty `#root`, so there is no
 * `#experience` to scroll to and no second attempt once React has rendered one.
 * Confirmed in a browser before this existed — `/#experience` sat at `scrollY:
 * 0` with the fragment in the address bar — and the language selector depends
 * on it, because carrying a fragment to a document that ignores it delivers the
 * reader to the top of a page they asked to enter halfway down.
 *
 * Landing is instant on purpose, though the stylesheet scrolls smoothly within
 * the page: an animation from the top is a transition the visitor never saw the
 * start of, and the browser's own fragment landing has never had one.
 */
export const useFragmentLanding = (): void => {
  useEffect(() => {
    const id = fragmentId(window.location.hash);
    if (!id) return;

    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);
};
