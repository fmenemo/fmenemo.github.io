import { createContext, useContext } from 'react';
import type { SiteContent } from '../content';

// The edition's strings, supplied once at the root and read from anywhere below
// it. Components ask for content rather than importing an edition by name, so
// which edition they render is decided by the entry document that booted them
// (ADR 0004).
export const ContentContext = createContext<SiteContent | null>(null);

/**
 * The current edition's strings.
 *
 * The null default is not a fallback: it is the absence of a provider, and this
 * throws on it rather than reaching for English. An edition supplies every
 * string or nothing renders, which is the same rule the content type enforces
 * at compile time.
 */
export const useContent = (): SiteContent => {
  const content = useContext(ContentContext);

  if (!content) {
    throw new Error('No edition content: render the app with <App content={...} />.');
  }

  return content;
};
