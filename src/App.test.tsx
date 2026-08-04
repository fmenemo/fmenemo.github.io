import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

// jsdom does not implement matchMedia, which useDarkMode reads on mount.
vi.stubGlobal(
  'matchMedia',
  (query: string) =>
    ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
      onchange: null,
    }) as MediaQueryList
);

const renderedText = () => {
  render(<App />);
  return document.body.textContent ?? '';
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

afterEach(cleanup);

// Guard tests for ADR 0001 (evidence-first content): every statement on the
// site must be traceable to the CV. These pin the decisions most likely to be
// silently undone by a future change.
describe('fabricated content stays out', () => {
  it('renders none of the fabricated project names', () => {
    const text = renderedText();
    for (const name of ['TaskFlow', 'EcoTracker', 'FinanceWise', 'DevPortal', 'ShopSmart', 'MindfulSpace']) {
      expect(text).not.toContain(name);
    }
  });

  it('does not render the "∞" character', () => {
    expect(renderedText()).not.toContain('∞');
  });

  it('renders no round-number statistic', () => {
    expect(renderedText()).not.toMatch(/\d+\s*\+/);
  });

  it('does not render "Principal Software Engineer"', () => {
    expect(renderedText()).not.toContain('Principal Software Engineer');
  });
});
