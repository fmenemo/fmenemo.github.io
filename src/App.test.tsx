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

  // Narrowed for ticket 06. This banned every "N+" when the page had no CV copy
  // on it, but the CV is full of them ("100,000+ products", "2M+ weekly users")
  // and those are evidence, not claims. What ADR 0001 actually removed was the
  // stat block: a big round number captioned with a capability noun and nothing
  // behind it. That shape is what this now pins.
  it('renders no round-number statistic', () => {
    const text = renderedText();
    expect(text).not.toMatch(/\d+\s*\+?\s*(years?\s+experience|engineers?\s+mentored|systems?\s+scaled)/i);
    expect(text).not.toMatch(/\d+\s*\+\s*(engineers|developers|projects|clients|teams)\b/i);
  });

  // Narrowed for ticket 06. "Principal Software Engineer" is Fran's real title
  // at The Knot Worldwide and belongs on that experience entry. What ADR 0001
  // decided is that the site does not *lead* with it, so the assertion belongs
  // on the identity line: see "leads with Software Engineer" below.
  it('does not lead with "Principal Software Engineer"', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).not.toContain('Principal');
    expect(screen.getByText(/^Software Engineer, 10\+ years/).textContent).not.toContain('Principal');
  });
});

// Guard tests for ticket 06 (content rewrite from the CV). Every assertion here
// traces to `public/Fran_Menendez_CV.pdf` or to a decision recorded in
// `.scratch/site-refresh/bullet-approval.md`.
describe('content', () => {
  // The footer said "Francisco Menendez" long after the hero stopped, and no
  // test noticed. One name, one spelling, accent included.
  it('calls him Fran Menéndez everywhere it names him', () => {
    const text = renderedText();
    expect(text).toContain('Fran Menéndez');
    expect(text).not.toContain('Francisco');
    expect(text).not.toContain('Menendez');
  });

  it('renders the name with its accent as the one h1', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Fran Menéndez');
  });

  // ADR 0001: the site leads with "Software Engineer" from the CV summary, not
  // with the current job title. "Principal Software Engineer" is allowed to
  // appear as an experience entry's title, so this is scoped to the identity
  // line rather than to the whole page.
  it('leads with Software Engineer rather than the current job title', () => {
    render(<App />);
    const identity = screen.getByText(/^Software Engineer, 10\+ years/);
    expect(identity.textContent).not.toContain('Principal');
  });

  it('names the AI-layer differentiator in the identity line', () => {
    render(<App />);
    const identity = screen.getByText(/^Software Engineer, 10\+ years/);
    expect(identity.textContent).toMatch(/semantic search/i);
    expect(identity.textContent).toMatch(/MCP/);
    expect(identity.textContent).toMatch(/agentic/i);
  });

  it.each([
    ['The Knot Worldwide', 'Oct 2023'],
    ['MOBIKO GmbH', 'Aug 2020'],
    ['Hiberus Tecnología', 'Jul 2017'],
  ])('renders %s with its dates', (employer, from) => {
    const text = renderedText();
    expect(text).toContain(employer);
    expect(text).toContain(from);
  });

  // A promotion at one employer is two entries, not one (CONTEXT.md): seven
  // roles across three employers.
  it.each([
    'Principal Software Engineer',
    'Lead Software Engineer',
    'Team Lead & Architecture',
    'Senior Full-Stack Developer',
    'Full-Stack Developer',
    'Junior Developer, E-commerce',
  ])('renders the %s role', (title) => {
    expect(renderedText()).toContain(title);
  });

  it('carries the evidence figures exactly as the CV states them', () => {
    const text = renderedText();
    for (const figure of ['850ms', '34ms', '100,000+', '2M+', '500k+', '1M+', '100k+', '8-person']) {
      expect(text).toContain(figure);
    }
  });

  // D1: the mention ships, the URL does not, and no claim leans on a click.
  it('mentions the independent work without linking it', () => {
    render(<App />);
    expect(document.body.textContent).toContain('Instagram Checker');
    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs.some((href) => href?.includes('instagram-checker'))).toBe(false);
  });

  it('renders every recognition with its issuing organisation and date', () => {
    const text = renderedText();
    for (const recognition of [
      'NASA Space Apps Global Finalist',
      '100 Ideas Zaragoza',
      'uCode by Adidas',
      'ImagineCode',
      'Google Hash Code',
    ]) {
      expect(text).toContain(recognition);
    }
    for (const date of ['May 2017', 'Sep 2017', 'Mar 2018', 'Oct 2018', 'Feb 2019']) {
      expect(text).toContain(date);
    }
  });

  it('states where Fran is without signalling availability', () => {
    const text = renderedText();
    expect(text).toContain('Zaragoza, Spain');
    // D4: work authorization stays on the CV, off the site.
    expect(text).not.toMatch(/work authorization/i);
    expect(text).not.toMatch(/available|open to (new )?opportunities|actively (exploring|looking)|hiring/i);
  });

  // The claims ADR 0001 removed, and the ones most likely to creep back in.
  it('makes no claim the CV does not support', () => {
    const text = renderedText();
    expect(text).not.toContain('∞');
    expect(text).not.toMatch(/\d+\+?\s*(engineers|developers)\s*mentored/i);
    expect(text).not.toMatch(/years of experience|systems scaled/i);
    expect(text).not.toMatch(/open source|passionate|passion for/i);
    // D3: the freelance entry is on the CV, not on the site.
    expect(text).not.toMatch(/freelance/i);
  });
});
