// THROWAWAY. The plan: five variants on the existing route, switchable by
// `variant`.
//
// The root of the prototype. It sits above the edition context, so a variant
// reads the edition's strings through `useContent`, exactly as the pages the
// site ships do; `main.tsx` imports this module only inside a
// `import.meta.env.DEV` branch, which is what keeps the whole prototype, this
// file, its stylesheet, the switcher and every variant, out of a production
// build.
import React, { useCallback, useEffect, useState } from 'react';
import type { SiteContent } from '../content';
import { ContentContext } from '../hooks/useContent';
import PrototypeSwitcher from './PrototypeSwitcher.throwaway';
import { variants } from './variants.throwaway';
import './prototype.throwaway.css';

// Arrow keys belong to whatever the visitor is typing in before they belong to
// the switcher. Nothing in a variant takes text today; the guard is here so
// that a variant which grows a field does not have to remember it.
const isEditable = (element: Element | null): boolean =>
  element instanceof HTMLInputElement ||
  element instanceof HTMLTextAreaElement ||
  element instanceof HTMLSelectElement ||
  (element instanceof HTMLElement && element.isContentEditable);

const indexOfKey = (key: string): number => variants.findIndex((variant) => variant.key === key);

const Prototype: React.FC<{ content: SiteContent; requested: string }> = ({ content, requested }) => {
  // An unknown key lands on the first variant rather than on a blank page, and
  // the effect below rewrites the URL to match what is actually on screen.
  const [key, setKey] = useState(() => (indexOfKey(requested) === -1 ? variants[0].key : requested));

  // The URL is the state, so a variant survives a reload and can be sent to
  // someone. `replaceState` rather than `pushState`: cycling through five
  // variants should not bury the page a visitor arrived from under five back
  // presses.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('variant', key);
    window.history.replaceState(null, '', url);
  }, [key]);

  const step = useCallback((delta: number) => {
    setKey((current) => {
      const next = (indexOfKey(current) + delta + variants.length) % variants.length;
      return variants[next].key;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isEditable(document.activeElement)) return;

      step(event.key === 'ArrowLeft' ? -1 : 1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [step]);

  const current = variants[indexOfKey(key)];
  const Variant = current.Component;

  return (
    <ContentContext value={content}>
      <Variant />
      <PrototypeSwitcher
        variantKey={current.key}
        name={current.name}
        onPrevious={() => step(-1)}
        onNext={() => step(1)}
      />
    </ContentContext>
  );
};

export default Prototype;
