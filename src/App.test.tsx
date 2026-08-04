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

// Guard tests for ticket 05 (Swiss visual direction). These assert structure a
// visitor can observe: one document outline, working anchor navigation, real
// links rather than clickable boxes, and no emoji in the copy.
describe('page structure', () => {
  it('has a single h1', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  // queryAllByRole with a name filter uses the accessible-name computation, so
  // anything missing from the named set has no name a screen reader can read.
  it('gives every link and button an accessible name', () => {
    render(<App />);
    for (const role of ['link', 'button'] as const) {
      const named = screen.queryAllByRole(role, { name: /\S/ });
      expect(named).toHaveLength(screen.queryAllByRole(role).length);
    }
  });

  it('points every in-page anchor at a section that exists', () => {
    render(<App />);
    const anchors = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => href?.startsWith('#') ?? false);

    expect(anchors.length).toBeGreaterThan(0);
    for (const href of anchors) {
      expect(document.querySelector(href)).not.toBeNull();
    }
  });

  it('offers the CV as a link to the PDF rather than a scripted download', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /cv/i }).getAttribute('href')).toContain('.pdf');
  });

  // The asset, the href and the name the visitor's browser saves it under are
  // all one string. They drifted once already: the file was versioned
  // `CV_Fran_Menendez_2026-07.pdf` while the download attribute said
  // `Francisco_Menendez_CV.pdf`, a name Fran does not use.
  it('serves the CV under one name everywhere', () => {
    render(<App />);
    const cv = screen.getByRole('link', { name: /cv/i });
    expect(cv.getAttribute('href')).toBe('/Fran_Menendez_CV.pdf');
    expect(cv.getAttribute('download')).toBe('Fran_Menendez_CV.pdf');
  });

  // Each contact route has to be an anchor a visitor can open, middle-click or
  // tab to, rather than a div carrying an onClick.
  it('makes each contact route a real link', () => {
    render(<App />);
    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('mailto:fmenendezmoya@gmail.com');
    expect(hrefs).toContain('https://www.linkedin.com/in/fmenemo/');
    expect(hrefs).toContain('https://github.com/fmenemo');
  });

  // An emoji is a character that renders as one by default, or one forced into
  // emoji presentation by a variation selector. This deliberately allows "©",
  // which is pictographic but renders as text.
  it('renders no emoji in the copy', () => {
    expect(renderedText()).not.toMatch(/\p{Emoji_Presentation}|\uFE0F/u);
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
