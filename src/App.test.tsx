import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { en } from './content.en';
// The shipped entry document, the stylesheet holding the palette, and the
// source of the share image, each read as a string. Vite resolves `?raw` at
// transform time, so the test needs no filesystem access and the app project
// keeps its browser-only type boundary.
import indexHtml from '../index.html?raw';
import ogImageHtml from '../tools/assets/og-image.html?raw';

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
  render(<App content={en} />);
  return document.body.textContent ?? '';
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  systemPrefersDark = false;
});

afterEach(cleanup);

// Guard test for ticket 01 (content through a provider), and the one test here
// that reads source rather than what a consumer observes. It is the fourth seam
// recorded in the Spanish edition's spec: a component that imported an edition
// by name would go on rendering English inside the Spanish document, and the
// import is the only place that is visible before `/es` exists (ADR 0004).
describe('the edition arrives from above', () => {
  const sources = import.meta.glob('./**/*.{ts,tsx}', {
    query: '?raw',
    import: 'default',
    eager: true,
  }) as Record<string, string>;

  // The entry supplies the edition, and this file renders one to assert
  // against. Everything else reads whichever edition it was rendered under.
  const chooseTheEdition = ['./main.tsx', './App.test.tsx'];

  it('has nothing but the entry import an edition by name', () => {
    // The glob is resolved at transform time, so a pattern that stopped
    // matching would leave this passing over an empty set.
    expect(Object.keys(sources).length).toBeGreaterThan(5);

    const reaching = Object.entries(sources)
      .filter(([path]) => !chooseTheEdition.includes(path))
      .filter(([, source]) => /from '[^']*content\.(en|es)'/.test(source))
      .map(([path]) => path);

    expect(reaching).toEqual([]);
  });
});

// Guard tests for ticket 04 (theming architecture): the theme is a class on
// <html> plus a persisted localStorage choice, exercised through the toggle.
describe('theme', () => {
  const toggle = () => screen.getAllByRole('button', { name: /switch to (dark|light) mode/i })[0];

  it('follows the system dark preference on first visit', () => {
    systemPrefersDark = true;
    render(<App content={en} />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBeNull();
  });

  it('follows the system light preference on first visit', () => {
    render(<App content={en} />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBeNull();
  });

  it('lets a stored explicit choice override the system preference', () => {
    systemPrefersDark = true;
    localStorage.setItem('theme', 'light');
    render(<App content={en} />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggling to dark sets the class and persists the choice', () => {
    render(<App content={en} />);
    fireEvent.click(toggle());
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggling back to light removes the class and persists the choice', () => {
    render(<App content={en} />);
    fireEvent.click(toggle());
    fireEvent.click(toggle());
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('ignores an invalid stored theme and falls back to the system preference', () => {
    systemPrefersDark = true;
    localStorage.setItem('theme', 'banana');
    render(<App content={en} />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});

// Guard tests for ticket 05 (Swiss visual direction). These assert structure a
// visitor can observe: one document outline, working anchor navigation, real
// links rather than clickable boxes, and no emoji in the copy.
describe('page structure', () => {
  it('has a single h1', () => {
    render(<App content={en} />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  // queryAllByRole with a name filter uses the accessible-name computation, so
  // anything missing from the named set has no name a screen reader can read.
  it('gives every link and button an accessible name', () => {
    render(<App content={en} />);
    for (const role of ['link', 'button'] as const) {
      const named = screen.queryAllByRole(role, { name: /\S/ });
      expect(named).toHaveLength(screen.queryAllByRole(role).length);
    }
  });

  it('points every in-page anchor at a section that exists', () => {
    render(<App content={en} />);
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
    render(<App content={en} />);
    expect(screen.getByRole('link', { name: /cv/i }).getAttribute('href')).toContain('.pdf');
  });

  // The asset, the href and the name the visitor's browser saves it under are
  // all one string. They drifted once already: the file was versioned
  // `CV_Fran_Menendez_2026-07.pdf` while the download attribute said
  // `Francisco_Menendez_CV.pdf`, a name Fran does not use.
  it('serves the CV under one name everywhere', () => {
    render(<App content={en} />);
    const cv = screen.getByRole('link', { name: /cv/i });
    expect(cv.getAttribute('href')).toBe('/Fran_Menendez_CV.pdf');
    expect(cv.getAttribute('download')).toBe('Fran_Menendez_CV.pdf');
  });

  // Each contact route has to be an anchor a visitor can open, middle-click or
  // tab to, rather than a div carrying an onClick.
  it('makes each contact route a real link', () => {
    render(<App content={en} />);
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
    render(<App content={en} />);
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
    render(<App content={en} />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Fran Menéndez');
  });

  // ADR 0001: the site leads with "Software Engineer" from the CV summary, not
  // with the current job title. "Principal Software Engineer" is allowed to
  // appear as an experience entry's title, so this is scoped to the identity
  // line rather than to the whole page.
  it('leads with Software Engineer rather than the current job title', () => {
    render(<App content={en} />);
    const identity = screen.getByText(/^Software Engineer, 10\+ years/);
    expect(identity.textContent).not.toContain('Principal');
  });

  it('names the AI-layer differentiator in the identity line', () => {
    render(<App content={en} />);
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
    render(<App content={en} />);
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

// Guard tests for ticket 07 (favicon, OG image and metadata).
//
// These read `index.html` rather than the rendered app, because that is the
// only thing a link scraper ever sees: Slack, LinkedIn and WhatsApp fetch the
// document and stop, without running React. Metadata injected from a component
// would pass a test against the rendered DOM and still produce a broken
// preview, which is exactly the bug this ticket exists to fix.
describe('metadata', () => {
  const head = new DOMParser().parseFromString(indexHtml, 'text/html').head;

  const meta = (key: string) =>
    head.querySelector(`meta[name="${key}"], meta[property="${key}"]`)?.getAttribute('content') ?? null;

  const link = (rel: string) => head.querySelector(`link[rel="${rel}"]`)?.getAttribute('href') ?? null;

  /** Files Vite copies verbatim to the site root, keyed by their public path. */
  const publicAssets = new Set(
    Object.keys(import.meta.glob('../public/*')).map((path) => path.replace('../public', ''))
  );

  const SITE = 'https://fmenemo.github.io';

  it('titles the tab with the person and the role, not the word portfolio', () => {
    expect(head.querySelector('title')?.textContent).toBe('Fran Menéndez | Software Engineer');
  });

  it('describes a Software Engineer working at the AI layer', () => {
    const description = meta('description');
    expect(description).toMatch(/Software Engineer/);
    expect(description).toMatch(/AI layer/);
    // A description is what a search engine indexes the page as, so the two
    // titles ADR 0001 took off the page must not survive here.
    expect(description).not.toMatch(/full stack|designer|portfolio/i);
  });

  it.each([
    ['og:title', 'Fran Menéndez | Software Engineer'],
    ['og:type', 'website'],
    ['og:site_name', 'Fran Menéndez'],
    ['og:url', `${SITE}/`],
    ['twitter:card', 'summary_large_image'],
  ])('sets %s', (key, value) => {
    expect(meta(key)).toBe(value);
  });

  it('gives the social tags the same description as the page', () => {
    expect(meta('og:description')).toBe(meta('description'));
    expect(meta('twitter:description')).toBe(meta('description'));
    expect(meta('twitter:title')).toBe(meta('og:title'));
  });

  // A scraper resolves og:image against nothing: a root-relative path is not
  // enough, it has to be absolute.
  it.each(['og:image', 'twitter:image'])('points %s at an absolute URL', (key) => {
    expect(meta(key)).toBe(`${SITE}/og-image.png`);
  });

  it('declares the share image dimensions a scraper crops to', () => {
    expect(meta('og:image:width')).toBe('1200');
    expect(meta('og:image:height')).toBe('630');
    expect(meta('og:image:alt')).toMatch(/\S/);
  });

  // The previous OG image was referenced but never existed, which is half of
  // why sharing the link looked broken.
  it('ships every referenced asset at the path it is referenced by', () => {
    for (const path of [meta('og:image')?.replace(SITE, ''), link('icon'), link('apple-touch-icon')]) {
      expect(publicAssets).toContain(path);
    }
  });

  it('serves a favicon of its own rather than the build tool logo', () => {
    expect(link('icon')).toBe('/favicon.svg');
    expect(indexHtml).not.toMatch(/vite\.svg/);
    expect(publicAssets).not.toContain('/vite.svg');
  });

  it('declares the canonical URL', () => {
    expect(link('canonical')).toBe(`${SITE}/`);
  });

  // The old value was the accent of a palette this site no longer uses.
  //
  // These two hex codes are the one place a test names a colour, which the
  // spec otherwise forbids. A `<meta>` value is not a style: it cannot be
  // expressed as a token, because the browser reads it before any stylesheet.
  // It would be better read out of `index.css` than written here, but Vitest
  // stubs CSS imports to empty strings whatever query they carry, so the
  // coupling is recorded in `index.css` beside the tokens instead.
  it('paints the browser chrome in the palette, per theme', () => {
    const themeColors = [...head.querySelectorAll('meta[name="theme-color"]')].map((tag) => [
      tag.getAttribute('media'),
      tag.getAttribute('content'),
    ]);

    expect(themeColors).toEqual([
      ['(prefers-color-scheme: light)', '#ffffff'], // --color-paper
      ['(prefers-color-scheme: dark)', '#0d0d0d'], // --color-canvas
    ]);
  });

  // The identity is written in three places: `identity.line` in content.en.ts,
  // the description tags here, and the share image. Only the first is read
  // against the CV, so the other two have to be condensations of it rather
  // than independent descriptions of Fran that drift on their own.
  describe('stays a condensation of the identity line', () => {
    // The words on the share image, without the stylesheet that sets them:
    // its letter-spacing and font sizes are not copy, and reading them as
    // copy would have this asserting that "0.2em" traces to the CV.
    const shareImageCopy = (
      new DOMParser().parseFromString(ogImageHtml, 'text/html').body.textContent ?? ''
    ).replace(/\s+/g, ' ');

    // Carried by every copy, including the share image, which has room for
    // the identity but not for the differentiator that follows it.
    const IDENTITY = ['Software Engineer', '10+ years', 'millions of users', 'AI layer'];
    // The differentiator, carried by the text copies only.
    const DIFFERENTIATOR = ['semantic search', 'MCP', 'agentic'];

    it.each([...IDENTITY, ...DIFFERENTIATOR])('sources "%s" from the identity line', (phrase) => {
      expect(en.identity.line).toContain(phrase);
    });

    it.each([...IDENTITY, ...DIFFERENTIATOR])('carries "%s" in the description', (phrase) => {
      expect(meta('description')).toContain(phrase);
    });

    it.each(IDENTITY)('carries "%s" on the share image', (phrase) => {
      expect(shareImageCopy).toContain(phrase);
    });

    // Nothing on the share image can be checked against the CV by a reader,
    // because it is a picture. So every number on it has to come from the one
    // sentence that was checked.
    it('puts no figure on the share image that the identity line does not carry', () => {
      const figures = shareImageCopy.match(/\d[\d,.]*\+?/g) ?? [];
      expect(figures.length).toBeGreaterThan(0);
      for (const figure of figures) {
        expect(en.identity.line).toContain(figure);
      }
    });
  });

  // ADR 0001 governs the metadata too: it is copy, and it is the copy most
  // likely to be written once and never reread.
  it('makes no claim the CV does not support', () => {
    const text = head.textContent + [...head.querySelectorAll('meta')].map((tag) => tag.getAttribute('content')).join(' ');
    expect(text).not.toMatch(/passionate|passion for|open source|beautiful|user-friendly/i);
    expect(text).not.toMatch(/years of experience|systems scaled/i);
    expect(text).not.toContain('∞');
  });
});
