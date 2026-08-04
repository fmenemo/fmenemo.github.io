import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

// jsdom does not implement matchMedia, which the theme code reads on mount.
// Tests flip this to simulate the system colour-scheme preference.
let systemPrefersDark = false;

vi.stubGlobal(
  'matchMedia',
  (query: string) =>
    ({
      matches: systemPrefersDark && query.includes('prefers-color-scheme: dark'),
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
  systemPrefersDark = false;
});

afterEach(cleanup);

// Guard tests for ticket 04 (theming architecture): the theme is a class on
// <html> plus a persisted localStorage choice, exercised through the toggle.
describe('theme', () => {
  const toggle = () => screen.getAllByRole('button', { name: /switch to (dark|light) mode/i })[0];

  it('follows the system dark preference on first visit', () => {
    systemPrefersDark = true;
    render(<App />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBeNull();
  });

  it('follows the system light preference on first visit', () => {
    render(<App />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBeNull();
  });

  it('lets a stored explicit choice override the system preference', () => {
    systemPrefersDark = true;
    localStorage.setItem('theme', 'light');
    render(<App />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggling to dark sets the class and persists the choice', () => {
    render(<App />);
    fireEvent.click(toggle());
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggling back to light removes the class and persists the choice', () => {
    render(<App />);
    fireEvent.click(toggle());
    fireEvent.click(toggle());
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('ignores an invalid stored theme and falls back to the system preference', () => {
    systemPrefersDark = true;
    localStorage.setItem('theme', 'banana');
    render(<App />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});

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
