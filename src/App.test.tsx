import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { en } from './content.en';
import { es } from './content.es';
// The shipped entry documents, the stylesheet holding the palette, and the
// source of the share image, each read as a string. Vite resolves `?raw` at
// transform time, so the test needs no filesystem access and the app project
// keeps its browser-only type boundary.
import enHtml from '../index.html?raw';
import esHtml from '../es/index.html?raw';
import ogImageHtml from '../tools/assets/og-image.html?raw';
import ogImageEsHtml from '../tools/assets/og-image.es.html?raw';
import faviconSvg from '../public/favicon.svg?raw';

const SITE = 'https://fmenemo.github.io';

// One row per edition, and the point of the exercise (ADR 0004). The guard
// groups below run over this table with `describe.each`, so a test that covers
// English and not Spanish becomes something you have to go out of your way to
// write, which is the failure mode a second edition invites.
//
// A row carries that edition's content module, its entry document, and the
// values the shared assertions compare against. Those values are per-edition
// *expectations*, not a second copy of the content: each edition is condensed
// from a different CV, so "Zaragoza, Spain" and "Zaragoza, España" are two
// facts checked against two documents, not one fact translated.
//
// What does not belong here is a guard that is inherently per-edition. Bullet
// provenance is checked against a different CV for each edition, so it stays
// out of the table and is named as per-edition where it sits.
const editions = [
  {
    edition: 'English',
    content: en,
    entry: enHtml,
    lang: 'en',
    url: `${SITE}/`,
    title: 'Fran Menéndez | Software Engineer',
    // Each edition has a card of its own: the PNG a scraper fetches, the source
    // it is rendered from, and the alt that describes the picture. The alt is a
    // per-edition expectation for the same reason the title is — it is read
    // aloud in the language of the document it sits in.
    image: `${SITE}/og-image.png`,
    imageSource: ogImageHtml,
    imageAlt: 'Fran Menéndez, Software Engineer, Zaragoza, Spain.',
    // The first words of the identity line, which several guards need to find
    // the paragraph without asserting the whole of it.
    identityLead: /^Software Engineer, 10\+ years/,
    themeToggle: /switch to (dark|light) mode/i,
    // The selector as a visitor meets it on this edition: its own label marked,
    // the sibling's label linked, and the link named in this edition's language.
    language: {
      label: 'Language',
      current: 'EN',
      other: { label: 'ES', path: '/es/', name: 'View this page in Spanish' },
    },
    // Primary first, and the whole list: the English edition offers the
    // original and nothing else, which is what makes the Spanish row's second
    // entry an assertion rather than a coincidence.
    cvs: [{ href: '/Fran_Menendez_CV.pdf', download: 'Fran_Menendez_CV.pdf', label: 'Download CV' }],
    location: 'Zaragoza, Spain',
    // The employer names are the same in both editions; the month
    // abbreviations are not.
    employers: [
      ['The Knot Worldwide', 'Oct 2023'],
      ['MOBIKO GmbH', 'Aug 2020'],
      ['Hiberus Tecnología', 'Jul 2017'],
    ],
    // The twelve month abbreviations this edition's CV uses, for the date-range
    // guard below. Here rather than in the guard for the same reason the
    // employer dates above are here: they are one edition's vocabulary, and the
    // guard runs over both.
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // The end date of the most recent entry, which is the one that goes stale.
    // Both editions write it the same way, and it is stated per edition anyway,
    // because the day one of them writes it in its own words is the day this
    // stops being a copy of the other row and starts being an assertion.
    lastWorked: 'Jul 2026',
    // A promotion at one employer is two entries, not one (CONTEXT.md).
    roles: [
      'Principal Software Engineer',
      'Lead Software Engineer',
      'Team Lead & Architecture',
      'Senior Full-Stack Developer',
      'Full-Stack Developer',
      'Junior Developer, E-commerce',
    ],
    figures: [
      '850ms',
      '34ms',
      '100,000+',
      '2M+',
      '500k+',
      '1M+',
      '100k+',
      '8-person',
      '23%',
      '72%',
      '70%',
      '99.95%',
    ],
    // The three figures this pass added were read on the rendered CV rather
    // than extracted from the PDF, as ADR 0001 asks: the record of that read is
    // `.scratch/english-figures-against-the-render.md`.
    //
    // The figures this edition's CV states that the page deliberately leaves
    // off. Eight were weighed for this pass and three were taken; these four
    // were declined, and listing them here is what keeps that a decision
    // rather than an omission nobody can tell from an oversight.
    //
    // Each is matched as its number beside the thing that number counts, which
    // is what a declined figure is. A bare number would fail the day an
    // unrelated 85% is earned somewhere else on the page, and a bare phrase
    // would let the same claim back in under a rewording.
    declinedFigures: [
      { figure: '100% retention', pattern: /100\s?%[^.]{0,40}retention|retention[^.]{0,40}100\s?%/i },
      {
        figure: 'the 85% design-with-components cut',
        pattern: /85\s?%[^.]{0,60}(design|component|week|day)|(design|component|week|day)[^.]{0,60}85\s?%/i,
      },
      {
        figure: 'three global enterprise partnerships',
        pattern: /(three|3)\s+global\s+enterprise\s+partnerships/i,
      },
      {
        figure: 'the 3,000 to 10,000+ user growth, and its 233%',
        pattern:
          /(3,000|10,000\+|233\s?%)[^.]{0,60}(user|growth)|(user|growth)[^.]{0,60}(3,000|10,000\+|233\s?%)/i,
      },
    ],
    // The organisations and awards are names, and so are the month
    // abbreviations, but each edition names them as its own CV does.
    recognitions: [
      'NASA Space Apps Global Finalist',
      '100 Ideas Zaragoza',
      'uCode by Adidas',
      'ImagineCode',
      'Google Hash Code',
    ],
    // Every entry the independent-work section carries, in the order it renders
    // them, so that a row says how many entries its edition has as well as
    // which. The English edition gained the harness in #10; the Spanish one is
    // frozen at one entry and this is where that shows.
    //
    // Instagram Checker stays first. Its description opens "the same agentic
    // workflow as the work above", which points at the Principal role in the
    // section above it, and putting a second entry between the two would leave
    // that reference reading as the entry directly overhead.
    independentWork: ['Instagram Checker', 'Multi-agent delivery harness'],
    // Carried by every copy of the identity, including the share image, which
    // has room for the identity but not for the differentiator that follows.
    identityPhrases: ['Software Engineer', '10+ years', 'millions of users', 'AI layer'],
    differentiator: ['semantic search', 'MCP', 'agentic'],
    // The claims ADR 0001 removed, in the language they would come back in.
    availability: /available|open to (new )?opportunities|actively (exploring|looking)|hiring/i,
    claims: [
      /\d+\+?\s*(engineers|developers)\s*mentored/i,
      /years of experience|systems scaled/i,
      /open source|passionate|passion for/i,
      /freelance/i, // D3: the freelance entry is on the CV, not on the site.
    ],
    // A description is what a search engine indexes the page as, so the two
    // titles ADR 0001 took off the page must not survive in it.
    describedAsNot: /full stack|designer|portfolio/i,
    metadataClaims: [
      /passionate|passion for|open source|beautiful|user-friendly/i,
      /years of experience|systems scaled/i,
    ],
  },
  {
    edition: 'Spanish',
    content: es,
    entry: esHtml,
    lang: 'es',
    url: `${SITE}/es/`,
    title: 'Fran Menéndez | Ingeniero de Software',
    image: `${SITE}/og-image-es.png`,
    imageSource: ogImageEsHtml,
    imageAlt: 'Fran Menéndez, ingeniero de software, Zaragoza, España.',
    identityLead: /^Ingeniero de software, más de 10 años/,
    themeToggle: /cambiar a modo (oscuro|claro)/i,
    language: {
      label: 'Idioma',
      current: 'ES',
      other: { label: 'EN', path: '/', name: 'Ver esta página en inglés' },
    },
    // The Spanish CV leads and the original sits beside it, for a recruiter who
    // needs an English artefact to forward onward. What the second label may and
    // may not say is asserted in its own group below.
    cvs: [
      { href: '/Fran_Menendez_CV_ES.pdf', download: 'Fran_Menendez_CV_ES.pdf', label: 'Descargar CV' },
      { href: '/Fran_Menendez_CV.pdf', download: 'Fran_Menendez_CV.pdf', label: 'CV en inglés (original)' },
    ],
    location: 'Zaragoza, España',
    employers: [
      ['The Knot Worldwide', 'Oct 2023'],
      ['MOBIKO GmbH', 'Ago 2020'],
      ['Hiberus Tecnología', 'Jul 2017'],
    ],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    lastWorked: 'Jul 2026',
    roles: [
      'Ingeniero de Software Principal',
      'Ingeniero de Software Líder',
      'Team Lead y Arquitectura',
      'Desarrollador Full-Stack Senior',
      'Desarrollador Full-Stack',
      'Desarrollador Junior, E-commerce',
    ],
    // The same evidence as the English row, written as the Spanish CV writes
    // it: a decimal point for thousands, and a space before the unit.
    figures: ['850 ms', '34 ms', '100.000', '2M', '500k', '1M', '100k', '8 personas'],
    // The declines above were made against the English CV in an English-only
    // pass, and this edition is frozen against a CV of its own, so it has no
    // list of its own to carry yet.
    declinedFigures: [] as { figure: string; pattern: RegExp }[],
    recognitions: [
      'Finalista global',
      '100 Ideas Zaragoza',
      'uCode by Adidas',
      'ImagineCode',
      'Google Hash Code',
    ],
    independentWork: ['Instagram Checker'],
    identityPhrases: ['Ingeniero de software', 'más de 10 años', 'millones de usuarios', 'capa de IA'],
    differentiator: ['búsqueda semántica', 'MCP', 'agéntico'],
    availability: /disponible|abierto a (nuevas )?oportunidades|buscando activamente|contratando/i,
    claims: [
      /\d+\+?\s*(ingenieros|desarrolladores)\s*mentorizados/i,
      /años de experiencia|sistemas escalados/i,
      /código abierto|apasionad[oa]|pasión por/i,
      /freelance|autónomo/i,
    ],
    describedAsNot: /full stack|diseñador|portfolio|portafolio/i,
    metadataClaims: [
      /apasionad[oa]|pasión por|código abierto|precios[oa]|fácil de usar/i,
      /años de experiencia|sistemas escalados/i,
    ],
  },
] as const;

type Edition = (typeof editions)[number];

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

// jsdom implements no scrolling at all, so `scrollIntoView` is not a function
// on an element there. The fragment-landing tests below assert against this
// spy; every other test needs it only so that rendering does not throw.
const scrollIntoView = vi.fn();
Element.prototype.scrollIntoView = scrollIntoView;

const renderedText = (edition: Edition) => {
  render(<App content={edition.content} />);
  return document.body.textContent ?? '';
};

const parseDocument = (html: string) => new DOMParser().parseFromString(html, 'text/html');

const metaOf = (head: ParentNode, key: string) =>
  head.querySelector(`meta[name="${key}"], meta[property="${key}"]`)?.getAttribute('content') ?? null;

/**
 * Every word a scraper reads out of an entry document, as one string: the tags
 * it builds a card from, plus whatever text the document carries around them.
 *
 * Parsed rather than read raw, unlike the metadata group's `?raw` import, and
 * this is the one place that distinction matters: `textContent` leaves out the
 * HTML comments, and those comments are where these documents explain their own
 * decisions, in the vocabulary the guards below are looking for.
 */
const scraperText = (entry: string) => {
  const parsed = parseDocument(entry);
  return [
    parsed.head.textContent,
    ...[...parsed.querySelectorAll('meta[content]')].map((tag) => tag.getAttribute('content')),
    parsed.body.textContent,
  ].join(' ');
};

/**
 * Files Vite copies verbatim to the site root, keyed by their public path. Read
 * by the metadata group for what a document references and by the CV group for
 * what the page links to, which is why it sits out here rather than in either.
 */
const publicAssets = new Set(Object.keys(import.meta.glob('../public/*')).map((path) => path.replace('../public', '')));

/** Every CV the hero offers, in the order a visitor meets them. */
const cvLinks = () => screen.getAllByRole('link', { name: /cv/i });

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  systemPrefersDark = false;
  // The fragment is navigation state carried in the URL, and jsdom keeps one
  // URL for the whole file. A test that opened a section would otherwise leave
  // every test after it rendered as though the visitor were mid-page.
  window.location.hash = '';
  scrollIntoView.mockClear();
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

  // One entry per edition supplies that edition, and this file renders both to
  // assert against. Everything else reads whichever edition it was rendered
  // under. If this list ever needs an entry that is not an entry document, the
  // decision it defends has gone and the test should be deleted, not extended.
  const chooseTheEdition = ['./main.tsx', './main.es.tsx', './App.test.tsx'];

  it('has nothing but the entry documents import an edition by name', () => {
    // The glob is resolved at transform time, so a pattern that stopped
    // matching would leave this passing over an empty set.
    expect(Object.keys(sources).length).toBeGreaterThan(5);

    const reaching = Object.entries(sources)
      .filter(([path]) => !chooseTheEdition.includes(path))
      .filter(([, source]) => /from '[^']*content\.(en|es)(\.ts)?'/.test(source))
      .map(([path]) => path);

    expect(reaching).toEqual([]);
  });
});

describe.each(editions)('$edition edition', (edition) => {
  const { content } = edition;

  // Guard tests for ticket 04 (theming architecture): the theme is a class on
  // <html> plus a persisted localStorage choice, exercised through the toggle.
  // The behaviour is the same in both editions and the toggle's accessible
  // name is not, which is the whole reason this runs from the table.
  describe('theme', () => {
    const toggle = () => screen.getAllByRole('button', { name: edition.themeToggle })[0];

    it('follows the system dark preference on first visit', () => {
      systemPrefersDark = true;
      render(<App content={content} />);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorage.getItem('theme')).toBeNull();
    });

    it('follows the system light preference on first visit', () => {
      render(<App content={content} />);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorage.getItem('theme')).toBeNull();
    });

    it('lets a stored explicit choice override the system preference', () => {
      systemPrefersDark = true;
      localStorage.setItem('theme', 'light');
      render(<App content={content} />);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('toggling to dark sets the class and persists the choice', () => {
      render(<App content={content} />);
      fireEvent.click(toggle());
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('toggling back to light removes the class and persists the choice', () => {
      render(<App content={content} />);
      fireEvent.click(toggle());
      fireEvent.click(toggle());
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorage.getItem('theme')).toBe('light');
    });

    it('ignores an invalid stored theme and falls back to the system preference', () => {
      systemPrefersDark = true;
      localStorage.setItem('theme', 'banana');
      render(<App content={content} />);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    // A visitor who chose a theme on one edition keeps it on the other. The
    // two documents share an origin and a storage key, so this is the same
    // assertion as "a stored choice is honoured" made from the other edition's
    // side: what it defends is a future change keying the choice per edition.
    it('honours a theme chosen on the other edition', () => {
      localStorage.setItem('theme', 'dark');
      render(<App content={content} />);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  // Guard tests for ticket 04 of the Spanish edition (the language selector).
  // Running from the table is what says the control exists on both editions
  // and points each one at the other, rather than English having a way out
  // that Spanish does not.
  describe('the language selector', () => {
    const { language } = edition;

    const control = () => screen.getByRole('navigation', { name: language.label });

    // The accessible name asserted exactly, and it is the visible label
    // followed by the qualifier. A name that did not begin with the two
    // letters on screen would leave a voice-control visitor saying "click ES"
    // with nothing to click (WCAG 2.5.3, Label in Name).
    const toTheOther = () => screen.getByRole('link', { name: `${language.other.label} ${language.other.name}` });

    const visibleText = (element: HTMLElement) => (element.textContent ?? '').replace(/\s+/g, '');

    it('names itself in the language of the edition it appears in', () => {
      render(<App content={content} />);
      expect(control()).toBeTruthy();
    });

    it('shows both editions', () => {
      render(<App content={content} />);
      expect(visibleText(control())).toContain(language.current);
      expect(visibleText(control())).toContain(language.other.label);
    });

    it('marks the edition being read and does not link it', () => {
      render(<App content={content} />);
      const marked = control().querySelector('[aria-current]');
      expect(marked?.textContent).toBe(language.current);
      expect(marked?.closest('a')).toBeNull();
    });

    it('links the other edition at its own document', () => {
      render(<App content={content} />);
      expect(toTheOther().getAttribute('href')).toBe(language.other.path);
      expect(visibleText(toTheOther())).toBe(language.other.label);
    });

    // A flag names a country and Spanish is not Spain's alone, so the control
    // is two language codes and a separator and nothing else. The emoji guard
    // above covers the copy; this covers the control specifically, including
    // an <img> or an <svg>, which no emoji pattern would catch.
    it('is text rather than a flag', () => {
      render(<App content={content} />);
      expect(control().querySelector('img, svg')).toBeNull();
      expect(visibleText(control())).toBe(`${language.current}/${language.other.label}`);
    });

    // The one interaction that matters: a reader switching language is usually
    // mid-page, and landing them at the top of a document in the language they
    // just asked for is worse than not offering the switch.
    it('carries the fragment the document was opened at', () => {
      window.location.hash = '#experience';
      render(<App content={content} />);
      expect(toTheOther().getAttribute('href')).toBe(`${language.other.path}#experience`);
    });

    // Section ids are English in every edition, so the fragment crosses
    // unchanged and there is no mapping table for the two editions to
    // disagree about.
    it('follows the visitor as they move through the page', () => {
      render(<App content={content} />);
      window.location.hash = '#contact';
      fireEvent(window, new HashChangeEvent('hashchange'));
      expect(toTheOther().getAttribute('href')).toBe(`${language.other.path}#contact`);
    });
  });

  // The other half of fragment preservation, and the half the browser is
  // expected to do and does not: it resolves the fragment against a document
  // whose only element is an empty `#root`, so it finds nothing and never
  // tries again. Carrying a fragment across the selector is only worth
  // anything if the document at the other end lands on it.
  describe('landing on a fragment', () => {
    it('scrolls to the section the document was opened at', () => {
      window.location.hash = '#experience';
      render(<App content={content} />);
      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById('experience'));
    });

    it('leaves a visitor who opened no fragment at the top', () => {
      render(<App content={content} />);
      expect(scrollIntoView).not.toHaveBeenCalled();
    });

    // The fragment is whatever the visitor typed, and reading one has two ways
    // of throwing on input the site never wrote: `querySelector('#')` raises a
    // SyntaxError, and `decodeURIComponent('%')` a URIError. Either would take
    // down the whole page, on a URL a visitor can reach by mistyping.
    it.each(['#', '#%', '#no-such-section'])('renders the page anyway when the fragment is %s', (hash) => {
      window.location.hash = hash;
      expect(() => render(<App content={content} />)).not.toThrow();
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      expect(scrollIntoView).not.toHaveBeenCalled();
    });
  });

  // Guard tests for ticket 05 of the site refresh (Swiss visual direction).
  // These assert structure a visitor can observe: one document outline, working
  // anchor navigation, real links rather than clickable boxes, and no emoji.
  describe('page structure', () => {
    it('has a single h1', () => {
      render(<App content={content} />);
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    });

    // queryAllByRole with a name filter uses the accessible-name computation, so
    // anything missing from the named set has no name a screen reader can read.
    it('gives every link and button an accessible name', () => {
      render(<App content={content} />);
      for (const role of ['link', 'button'] as const) {
        const named = screen.queryAllByRole(role, { name: /\S/ });
        expect(named).toHaveLength(screen.queryAllByRole(role).length);
      }
    });

    // Section ids stay English in every edition, so a fragment carries across
    // the language selector unchanged. This passing in both editions is what
    // says the two anchor sets have not drifted apart.
    it('points every in-page anchor at a section that exists', () => {
      render(<App content={content} />);
      const anchors = screen
        .getAllByRole('link')
        .map((link) => link.getAttribute('href'))
        .filter((href): href is string => href?.startsWith('#') ?? false);

      expect(anchors.length).toBeGreaterThan(0);
      for (const href of anchors) {
        expect(document.querySelector(href)).not.toBeNull();
      }
    });

    // Each contact route has to be an anchor a visitor can open, middle-click or
    // tab to, rather than a div carrying an onClick.
    it('makes each contact route a real link', () => {
      render(<App content={content} />);
      const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
      expect(hrefs).toContain('mailto:fmenendezmoya@gmail.com');
      expect(hrefs).toContain('https://www.linkedin.com/in/fmenemo/');
      expect(hrefs).toContain('https://github.com/fmenemo');
    });

    // An emoji is a character that renders as one by default, or one forced into
    // emoji presentation by a variation selector. This deliberately allows "©",
    // which is pictographic but renders as text.
    it('renders no emoji in the copy', () => {
      expect(renderedText(edition)).not.toMatch(/\p{Emoji_Presentation}|\uFE0F/u);
    });
  });

  // Guard tests for ticket 05 of the Spanish edition (both CVs on the Spanish
  // edition). Running from the table is what pins the asymmetry: each row states
  // the whole list, so an edition quietly growing or losing a download fails
  // here rather than being noticed by a reader.
  describe('the CVs it offers', () => {
    it('offers exactly the CVs this edition publishes, in order', () => {
      render(<App content={content} />);
      expect(cvLinks().map((link) => link.textContent)).toEqual(edition.cvs.map((cv) => cv.label));
    });

    it('offers each one as a link to the PDF rather than a scripted download', () => {
      render(<App content={content} />);
      for (const link of cvLinks()) {
        expect(link.getAttribute('href')).toContain('.pdf');
      }
    });

    // The asset, the href and the name the visitor's browser saves it under are
    // all one string. They drifted once already: the file was versioned
    // `CV_Fran_Menendez_2026-07.pdf` while the download attribute said
    // `Francisco_Menendez_CV.pdf`, a name Fran does not use.
    it('serves each one under one name everywhere', () => {
      render(<App content={content} />);
      const offered = cvLinks().map((link) => ({
        href: link.getAttribute('href'),
        download: link.getAttribute('download'),
      }));

      expect(offered).toEqual(edition.cvs.map(({ href, download }) => ({ href, download })));
    });

    // A PDF's text is not in the build, so nothing can check what a CV says.
    // What can be checked is that the file is there at all: the Spanish link
    // shipped one ticket before the file did, and this is what would have said so.
    it('publishes every CV it offers as a site asset', () => {
      render(<App content={content} />);
      for (const link of cvLinks()) {
        expect(publicAssets).toContain(link.getAttribute('href'));
      }
    });
  });

  // Guard tests for ADR 0001 arriving at the field it is easiest to break:
  // employment dates, which go wrong by standing still.
  //
  // If you are reading this because you tripped it: the CV is the source of
  // truth and this file is condensed from it, so the fix is to bring the date
  // here into line with the CV — never the other way round, and never by
  // relaxing the guard.
  //
  // The site said "Oct 2023 - Present" and "Actualidad" for five days after
  // Fran's employment ended and both CVs said "Jul 2026", in public, while he
  // was mid-process elsewhere. Nothing here noticed, because a string that has
  // stopped being true reads exactly like one that never was.
  //
  // Asserted over the *shape* of a range rather than over the words "Present"
  // and "Actualidad". A banned-word list would catch the instance that prompted
  // it and be one translation behind from the day a third edition lands; every
  // entry on a CV is a closed range of two dates once the role has ended, in
  // every language, so that is what is checked. The CV's own repo asserts the
  // absence of those two words in its markdown, which is the other end of the
  // same guard.
  describe('no date range outlives the CV it was condensed from', () => {
    // Every range a visitor reads on an experience entry: the employer's span,
    // and each role inside it. Education's `years` is deliberately not here —
    // it is a range of bare years rather than months, and a degree does not
    // acquire a false end date by the passage of time.
    const dateRanges = () =>
      content.employers.flatMap((employer) => [employer.span, ...employer.roles.map((role) => role.dates)]);

    const closedRange = new RegExp(`^(?:${edition.months.join('|')}) \\d{4} - (?:${edition.months.join('|')}) \\d{4}$`);

    it('writes every employer span and role date as a closed range of two dates', () => {
      const ranges = dateRanges();
      // A content file that stopped exposing ranges would otherwise leave this
      // passing over an empty list.
      expect(ranges.length).toBeGreaterThan(5);

      expect(ranges.filter((range) => !closedRange.test(range))).toEqual([]);
    });

    // The specific fact the shape guard cannot carry: a closed range can still
    // be the wrong one. This is the entry that was wrong, pinned to the date
    // the CV gives it.
    it('ends the most recent employment on the date its CV gives', () => {
      const [current] = content.employers;
      expect(current.span.endsWith(edition.lastWorked)).toBe(true);
      expect(current.roles[0].dates.endsWith(edition.lastWorked)).toBe(true);
    });
  });

  // Guard tests for ADR 0001 (evidence-first content): every statement on the
  // site must be traceable to a CV. These pin the decisions most likely to be
  // silently undone by a future change.
  describe('fabricated content stays out', () => {
    it('renders none of the fabricated project names', () => {
      const text = renderedText(edition);
      for (const name of ['TaskFlow', 'EcoTracker', 'FinanceWise', 'DevPortal', 'ShopSmart', 'MindfulSpace']) {
        expect(text).not.toContain(name);
      }
    });

    it('does not render the "∞" character', () => {
      expect(renderedText(edition)).not.toContain('∞');
    });

    // Narrowed for ticket 06 of the site refresh. This banned every "N+" when
    // the page had no CV copy on it, but the CV is full of them ("100,000+
    // products", "2M+ weekly users") and those are evidence, not claims. What
    // ADR 0001 actually removed was the stat block: a big round number
    // captioned with a capability noun and nothing behind it.
    it('renders no round-number statistic', () => {
      const text = renderedText(edition);
      expect(text).not.toMatch(
        /\d+\s*\+?\s*(years?\s+experience|engineers?\s+mentored|systems?\s+scaled|años\s+de\s+experiencia)/i
      );
      expect(text).not.toMatch(
        /\d+\s*\+\s*(engineers|developers|projects|clients|teams|ingenieros|desarrolladores|proyectos|clientes|equipos)\b/i
      );
    });

    // The current job title is allowed on its own experience entry: "Principal
    // Software Engineer" and "Ingeniero de Software Principal" are Fran's real
    // titles at The Knot Worldwide. What ADR 0001 decided is that the site does
    // not *lead* with one, so the assertion belongs on the identity line.
    it('does not lead with the current job title', () => {
      render(<App content={content} />);
      expect(screen.getByRole('heading', { level: 1 }).textContent).not.toContain('Principal');
      expect(screen.getByText(edition.identityLead).textContent).not.toContain('Principal');
    });
  });

  // Guard test for the central decision of ADR 0004: nothing in the UI hedges.
  //
  // If you are reading this because you tripped it, go and read ADR 0004 before
  // you edit the list. A badge, banner, tooltip or footnote saying an edition
  // is machine-translated, unreviewed, provisional or less current than the
  // other tells the Spanish reader, in Spanish, that the page they are on is
  // the unchecked copy. That hedges the credibility of the artefact in front of
  // the only person it was added for, and it is implausible on its face, since
  // Fran is a native Spanish speaker. The honest response to a Spanish edition
  // nobody has read is not to label it, it is not to ship it.
  //
  // Written as a negative test in the manner of the fabricated-content group
  // above, and run from the edition table, because a hedge that appeared on one
  // edition only is exactly the shape this would take.
  describe('nothing hedges the edition', () => {
    // Both languages in every list, because a hedge is written in the language
    // of the reader it is aimed at, and the one aimed at the Spanish reader is
    // the one that costs.
    //
    // These are hedges wherever they appear. "sin revisar" and not "revisi",
    // because code review is evidence the site legitimately carries.
    const alwaysAHedge = [
      /machine[\s-]?translat|auto(?:matic(?:ally)?|[\s-])[\s-]?translat|ai[\s-]translat/i,
      /translated\s+from\s+the\s+english|traducido\s+del\s+ingl[eé]s/i,
      /traduc\w*\s+(?:autom|con\s+ia|por\s+ia)|traducci[oó]n\s+(?:autom|de\s+ia)|generad\w*\s+(?:con|por)\s+ia/i,
      /unreviewed|not\s+(?:yet\s+)?reviewed|pending\s+review/i,
      /sin\s+revisar|sin\s+revisi[oó]n|no\s+revisad|pendiente\s+de\s+revisi[oó]n/i,
      /work\s+in\s+progress|en\s+construcci[oó]n/i,
    ];

    // These are only a hedge when they are said *about a version of this site*.
    // "Replaced an outdated stack" and "una plataforma más completa" are the
    // ordinary vocabulary of a CV bullet, so matching them bare would one day
    // fail a true piece of evidence under a comment telling whoever wrote it to
    // go and read ADR 0004 — which is the worst thing a guard like this can do.
    // What makes the difference is the subject, so these carry one.
    // What a hedge calls the thing it is hedging: the document, or the language
    // it is written in. "El texto en español está desactualizado" names neither
    // a version nor an edition and is a hedge all the same.
    const aboutAVersionOfTheSite =
      /\b(?:page|version|edition|translation|copy|site|text|content|spanish|english|p[aá]gina|versi[oó]n|edici[oó]n|traducci[oó]n|copia|sitio|texto|contenido|espa[nñ]ol|ingl[eé]s)\b/i;

    // Both directions of the comparison. A hedge aimed at `/es` is at least as
    // likely to be written from the modest side ("no tan actual") as the
    // boastful one, and the first draft of this list only banned the boastful.
    const hedgeAboutAVersion = [
      /out[\s-]of[\s-]date|outdated|desactualizad|obsolet/i,
      /\b(?:more|less|not\s+as)\s+(?:up[\s-]to[\s-]date|current|complete|accurate|recent)\b/i,
      /\b(?:m[aá]s|menos|no\s+tan)\s+(?:actual|actualizad|complet|reciente|fiable)/i,
      /provisional/i,
      /\bbeta\b|\bdraft\b|\bborrador\b/i,
    ];

    // Near, not anywhere in the document: "version" appears in the theme script
    // and "página" in a heading, so a whole-text test would make every pattern
    // above unconditional again.
    const NEARBY = 60;

    const hedgesIn = (text: string) => [
      ...alwaysAHedge.filter((hedge) => hedge.test(text)),
      ...hedgeAboutAVersion.filter((hedge) =>
        [...text.matchAll(new RegExp(hedge.source, `${hedge.flags}g`))].some((match) =>
          aboutAVersionOfTheSite.test(
            text.slice(Math.max(0, match.index - NEARBY), match.index + match[0].length + NEARBY)
          )
        )
      ),
    ];

    // What a visitor reads, including what only some of them read. ADR 0004
    // bans a hedge in a *tooltip* by name, and a tooltip is an attribute, which
    // `textContent` cannot see.
    it('renders no hedge, in its text or in an attribute a reader is shown', () => {
      render(<App content={edition.content} />);
      const attributes = [...document.body.querySelectorAll('[title], [alt], [aria-label]')].flatMap((element) =>
        ['title', 'alt', 'aria-label'].map((name) => element.getAttribute(name) ?? '')
      );

      expect(hedgesIn([document.body.textContent, ...attributes].join(' '))).toEqual([]);
    });

    // The other half of the promise, and the surface that matters more: a
    // scraper reads the document and stops (ADR 0003), so a hedge in the
    // description is a hedge in the LinkedIn feed.
    it('carries no hedge in what a scraper reads', () => {
      expect(hedgesIn(scraperText(edition.entry))).toEqual([]);
    });

    // And the picture that card is built around, which a reader cannot check
    // against anything because it is an image. A badge belongs to the family of
    // things ADR 0004 bans, and the card is where it would be seen first.
    it('carries no hedge on its share image', () => {
      expect(hedgesIn(parseDocument(edition.imageSource).body.textContent ?? '')).toEqual([]);
    });
  });

  // Guard tests for the content of each edition. Every value in this row of the
  // table traces to that edition's CV, or to a decision recorded in its bullet
  // approval record under `.scratch/`.
  describe('content', () => {
    // The footer said "Francisco Menendez" long after the hero stopped, and no
    // test noticed. One name, one spelling, accent included, in every edition.
    it('calls him Fran Menéndez everywhere it names him', () => {
      const text = renderedText(edition);
      expect(text).toContain('Fran Menéndez');
      expect(text).not.toContain('Francisco');
      expect(text).not.toContain('Menendez');
    });

    it('renders the name with its accent as the one h1', () => {
      render(<App content={content} />);
      expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Fran Menéndez');
    });

    it('names the AI-layer differentiator in the identity line', () => {
      render(<App content={content} />);
      const identity = screen.getByText(edition.identityLead);
      for (const phrase of edition.differentiator) {
        expect(identity.textContent).toContain(phrase);
      }
    });

    // `as const` on the table makes every row deeply readonly, which `it.each`
    // does not accept: the copy is for the type, not for the values.
    it.each(edition.employers.map(([employer, from]) => [employer, from]))(
      'renders %s with its dates',
      (employer, from) => {
        const text = renderedText(edition);
        expect(text).toContain(employer);
        expect(text).toContain(from);
      }
    );

    it.each(edition.roles)('renders the %s role', (title) => {
      expect(renderedText(edition)).toContain(title);
    });

    it('carries the evidence figures exactly as its CV states them', () => {
      const text = renderedText(edition);
      for (const figure of edition.figures) {
        expect(text).toContain(figure);
      }
    });

    it('carries none of the figures its CV states that this page declined', () => {
      const text = renderedText(edition);
      for (const { figure, pattern } of edition.declinedFigures) {
        expect(text, figure).not.toMatch(pattern);
      }
    });

    // D1: the mentions ship, the URLs do not, and no claim leans on a click.
    //
    // The assertion belongs to the section rather than to one project. Instagram
    // Checker is live behind a login wall, and the harness is not a thing a
    // visitor can go and look at at all, so neither name is an anchor and a
    // third entry arriving with a URL should have to argue for it here.
    //
    // Naming the entries in order is also what holds the count: an edition
    // renders the entries its row lists and no others, which is how "two in
    // English, still one in Spanish" survives the next pass.
    it('names every piece of independent work, and links none of it', () => {
      render(<App content={content} />);
      const section = document.getElementById('independent-work');
      expect(section).not.toBeNull();

      const names = [...section!.querySelectorAll('strong')].map((name) =>
        (name.textContent ?? '').replace(/\.$/, '')
      );
      expect(names).toEqual([...edition.independentWork]);

      expect(within(section!).queryAllByRole('link')).toEqual([]);
      const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
      expect(hrefs.some((href) => href?.includes('instagram-checker'))).toBe(false);
    });

    it('renders every recognition with its issuing organisation and date', () => {
      const text = renderedText(edition);
      for (const recognition of edition.recognitions) {
        expect(text).toContain(recognition);
      }
      for (const date of ['May 2017', 'Sep 2017', 'Mar 2018', 'Oct 2018', 'Feb 2019']) {
        expect(text).toContain(date);
      }
    });

    it('states where Fran is without signalling availability', () => {
      const text = renderedText(edition);
      expect(text).toContain(edition.location);
      // D4: work authorization stays on the CV, off the site.
      expect(text).not.toMatch(/work authorization|permiso de trabajo/i);
      expect(text).not.toMatch(edition.availability);
    });

    it('makes no claim its CV does not support', () => {
      const text = renderedText(edition);
      expect(text).not.toContain('∞');
      for (const claim of edition.claims) {
        expect(text).not.toMatch(claim);
      }
    });
  });

  // Guard tests for ticket 07 of the site refresh (favicon, OG image and
  // metadata), now run over both documents.
  //
  // These read the entry document rather than the rendered app, because that is
  // the only thing a link scraper ever sees: Slack, LinkedIn and WhatsApp fetch
  // the document and stop, without running React. Metadata injected from a
  // component would pass a test against the rendered DOM and still produce a
  // broken preview, which is exactly the bug ADR 0003 exists to prevent, twice
  // over now that there are two documents.
  describe('metadata', () => {
    const parsed = parseDocument(edition.entry);
    const head = parsed.head;

    const meta = (key: string) => metaOf(head, key);

    const link = (rel: string) => head.querySelector(`link[rel="${rel}"]`)?.getAttribute('href') ?? null;

    // Without this a screen reader pronounces Spanish with English phonetics,
    // which is the difference between a document in a language and a document
    // that merely contains one.
    it('declares the language of its own edition', () => {
      expect(parsed.documentElement.getAttribute('lang')).toBe(edition.lang);
    });

    it('titles the tab with the person and the role, not the word portfolio', () => {
      expect(head.querySelector('title')?.textContent).toBe(edition.title);
    });

    // What the description *says* is checked by the condensation group below,
    // against the identity line. This is the other half: a description is what
    // a search engine indexes the page as, so the two titles ADR 0001 took off
    // the page must not survive in it.
    it('does not index the page under a title ADR 0001 removed', () => {
      expect(meta('description')).not.toMatch(edition.describedAsNot);
    });

    it.each([
      ['og:type', 'website'],
      ['og:site_name', 'Fran Menéndez'],
      ['twitter:card', 'summary_large_image'],
    ])('sets %s', (key, value) => {
      expect(meta(key)).toBe(value);
    });

    it('points its own URL at its own edition', () => {
      expect(meta('og:url')).toBe(edition.url);
      expect(link('canonical')).toBe(edition.url);
    });

    it('gives the social tags the same description as the page', () => {
      expect(meta('og:description')).toBe(meta('description'));
      expect(meta('twitter:description')).toBe(meta('description'));
      expect(meta('twitter:title')).toBe(meta('og:title'));
      expect(meta('og:title')).toBe(edition.title);
    });

    // A scraper resolves og:image against nothing: a root-relative path is not
    // enough, it has to be absolute.
    it.each(['og:image', 'twitter:image'])('points %s at an absolute URL', (key) => {
      expect(meta(key)).toBe(edition.image);
    });

    it('declares the share image dimensions a scraper crops to', () => {
      expect(meta('og:image:width')).toBe('1200');
      expect(meta('og:image:height')).toBe('630');
      // The alt describes the picture, and each edition now has a picture of
      // its own, so it is read out of the row rather than merely checked for
      // being non-empty. An alt left in the other edition's language is the
      // exact tell of a half-done localisation this ticket exists to remove.
      expect(meta('og:image:alt')).toBe(edition.imageAlt);
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
      expect(edition.entry).not.toMatch(/vite\.svg/);
      expect(publicAssets).not.toContain('/vite.svg');
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

    // The pre-paint theme script cannot be imported, because it has to run
    // before any module loads, so it is copied into both documents. What this
    // catches is one document getting the fix and the other not: a dark-mode
    // visitor would see a light flash on whichever one was missed.
    it('sets the theme class before first paint', () => {
      const script = [...head.querySelectorAll('script:not([src])')].map((tag) => tag.textContent).join('');
      expect(script).toContain("localStorage.getItem('theme')");
      expect(script).toContain('prefers-color-scheme: dark');
      expect(script).toContain("classList.toggle('dark'");
    });

    // The identity is written in three places per edition: `identity.line` in
    // the content module, the description tags here, and the share image. Only
    // the first is read against a CV, so the others have to be condensations of
    // it rather than independent descriptions of Fran that drift on their own.
    describe('stays a condensation of the identity line', () => {
      it.each([...edition.identityPhrases, ...edition.differentiator])(
        'sources "%s" from the identity line',
        (phrase) => {
          expect(content.identity.line).toContain(phrase);
        }
      );

      it.each([...edition.identityPhrases, ...edition.differentiator])(
        'carries "%s" in the description',
        (phrase) => {
          expect(meta('description')).toContain(phrase);
        }
      );

      // Nothing in the metadata can be checked against the CV by a reader
      // either: a scraper shows it without the page around it. So every number
      // in it has to come from the one sentence that was checked.
      it('puts no figure in the description that the identity line does not carry', () => {
        const figures = (meta('description') ?? '').match(/\d[\d,.]*\+?/g) ?? [];
        expect(figures.length).toBeGreaterThan(0);
        for (const figure of figures) {
          expect(content.identity.line).toContain(figure);
        }
      });
    });

    // ADR 0001 governs the metadata too: it is copy, and it is the copy most
    // likely to be written once and never reread.
    it('makes no claim its CV does not support', () => {
      const text = scraperText(edition.entry);
      for (const claim of edition.metadataClaims) {
        expect(text).not.toMatch(claim);
      }
      expect(text).not.toContain('∞');
    });
  });
});

// The first assertions that read both documents together, so they sit outside
// the table by necessity rather than by oversight: what they check is the
// relationship between the editions, which no single row can see.
describe('the two editions know about each other', () => {
  const alternatesOf = (html: string) =>
    [...parseDocument(html).head.querySelectorAll('link[rel="alternate"]')].map((tag) => [
      tag.getAttribute('hreflang'),
      tag.getAttribute('href'),
    ]);

  // Both documents carry the same self-including set, which is what lets a
  // crawler that finds either one find the pair. `x-default` names the edition
  // to fall back to when it cannot tell, and it is the one place English
  // legitimately leads (ADR 0004).
  const expected = [
    ['en', `${SITE}/`],
    ['es', `${SITE}/es/`],
    ['x-default', `${SITE}/`],
  ];

  it.each([
    ['the English document', enHtml],
    ['the Spanish document', esHtml],
  ])('%s cross-links both editions with an x-default', (_name, html) => {
    expect(alternatesOf(html)).toEqual(expected);
  });

  it('gives each edition an alternate pointing at the other', () => {
    for (const edition of editions) {
      const others = alternatesOf(edition.entry)
        .filter(([hreflang]) => hreflang !== 'x-default' && hreflang !== edition.lang)
        .map(([, href]) => href);

      expect(others).toEqual([editions.find((other) => other !== edition)!.url]);
    }
  });

  // Two documents mean two of everything a scraper reads, and a copied
  // document that was not fully rewritten is the failure this feature invites.
  it('gives the editions different titles and descriptions', () => {
    const [enHead, esHead] = [enHtml, esHtml].map((html) => parseDocument(html).head);
    expect(enHead.querySelector('title')?.textContent).not.toBe(esHead.querySelector('title')?.textContent);
    expect(metaOf(enHead, 'description')).not.toBe(metaOf(esHead, 'description'));
  });
});

// The one asymmetry between the editions that appears anywhere in the UI, so it
// is asserted where both editions are in view rather than inside a row that can
// only see its own.
describe('the original CV is offered on both editions, and named as provenance', () => {
  // By name rather than by position: a reordered table would otherwise swap
  // which edition is expected to offer one CV, and both assertions would still
  // pass.
  const rowFor = (name: string) => editions.find((edition) => edition.edition === name)!;

  const cvsOn = (edition: Edition) => {
    render(<App content={edition.content} />);
    return cvLinks().map((link) => ({ label: link.textContent, href: link.getAttribute('href') }));
  };

  const original = '/Fran_Menendez_CV.pdf';

  it('offers the original alone on the English edition', () => {
    const english = rowFor('English');
    const offered = cvsOn(english);
    expect(offered).toEqual(english.cvs.map(({ label, href }) => ({ label, href })));
    expect(offered.map((cv) => cv.href)).toEqual([original]);
  });

  it('leads with the Spanish CV on the Spanish edition and puts the original beside it', () => {
    const [primary, second] = cvsOn(rowFor('Spanish'));
    expect(primary.href).toBe('/Fran_Menendez_CV_ES.pdf');
    expect(second.href).toBe(original);
  });

  // The wording is load-bearing, and why is recorded in ADR 0004 and on
  // `CvDownload` in `content.ts` rather than restated here: "original" says
  // where the document was written, and anything about which version is fresher
  // is a confession about maintenance.
  it('says where the original was written and nothing about which is fresher', () => {
    const [, second] = cvsOn(rowFor('Spanish'));
    expect(second.label).toMatch(/original/i);
    expect(second.label).not.toMatch(
      /actualizad|reciente|complet|recomendad|preferid|mejor|updated|current|recommended|preferred/i
    );
  });
});

// One asset for both editions, so it sits outside the table. It is here because
// it shipped broken: an XML comment cannot contain a double hyphen, and the
// token names in this file's own comment were written with theirs. Chrome was
// lenient about it for a while and then was not, and the failure was silent in
// both directions — the icon simply stopped being drawn, and the render script
// wrote the blank screenshot out as though it had worked.
describe('the favicon is a document a browser can parse', () => {
  it('is well-formed XML', () => {
    const parsed = new DOMParser().parseFromString(faviconSvg, 'image/svg+xml');
    expect(parsed.querySelector('parsererror')).toBeNull();
    expect(parsed.documentElement.tagName).toBe('svg');
  });
});

// The third seam: the share image source read as text. It runs from the table
// like the rest, which is what says the Spanish card is condensed from the
// Spanish identity line rather than translated from the English picture.
describe.each(editions)('the $edition share image stays a condensation of the identity line', (edition) => {
  // The words on the share image, without the stylesheet that sets them: its
  // letter-spacing and font sizes are not copy, and reading them as copy would
  // have this asserting that "0.2em" traces to the CV.
  const shareImageCopy = (parseDocument(edition.imageSource).body.textContent ?? '').replace(/\s+/g, ' ');

  // The layout and palette live in `tools/assets/og-image.css`, shared by every
  // edition's source, and this is what stops one card drifting off it. It also
  // keeps the group above reading copy: a source with its own `<style>` would
  // have letter-spacing values in its text content, and "0.2em" would then be
  // something this file asserts traces to a CV.
  it('takes its styling from the shared stylesheet rather than its own', () => {
    const source = parseDocument(edition.imageSource);
    expect(source.querySelector('link[rel="stylesheet"]')?.getAttribute('href')).toBe('og-image.css');
    expect(source.querySelector('style')).toBeNull();
    expect(source.querySelector('[style]')).toBeNull();
  });

  // `identityPhrases` is the identity the image has room for, without the
  // differentiator that follows it, which it does not.
  it.each(edition.identityPhrases)('carries "%s" on the share image', (phrase) => {
    expect(shareImageCopy).toContain(phrase);
  });

  // Nothing on the share image can be checked against the CV by a reader,
  // because it is a picture. So every number on it has to come from the one
  // sentence that was checked.
  it('puts no figure on the share image that the identity line does not carry', () => {
    const figures = shareImageCopy.match(/\d[\d.,]*\+?/g) ?? [];
    expect(figures.length).toBeGreaterThan(0);
    for (const figure of figures) {
      expect(edition.content.identity.line).toContain(figure);
    }
  });

  // The card is where the edition makes its first impression, so the place a
  // stale copy-paste would show is the other edition's words surviving on it.
  it('carries none of the other edition’s identity on it', () => {
    const other = editions.find((row) => row !== edition)!;
    const mine: readonly string[] = edition.identityPhrases;
    for (const phrase of other.identityPhrases) {
      if (mine.includes(phrase)) continue;
      expect(shareImageCopy).not.toContain(phrase);
    }
  });
});
