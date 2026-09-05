import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import type { Role } from './content';
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
    title: 'Fran Menéndez | Full-stack Engineer',
    // Each edition has a card of its own: the PNG a scraper fetches, the source
    // it is rendered from, and the alt that describes the picture. The alt is a
    // per-edition expectation for the same reason the title is — it is read
    // aloud in the language of the document it sits in.
    image: `${SITE}/og-image.png`,
    imageSource: ogImageHtml,
    imageAlt: 'Fran Menéndez, Full-stack Engineer, Zaragoza, Spain.',
    // The first words of the identity line, which several guards need to find
    // the paragraph without asserting the whole of it.
    identityLead: /^Full-stack engineer, 10\+ years/,
    themeToggle: /switch to (dark|light) mode/i,
    // The theme control says what it will do next, in words rather than as an
    // icon, so its whole visible text is asserted per edition.
    themeControl: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
    // The first link in the document, and the only one a visitor meets before
    // the running head.
    skipLink: 'Skip to content',
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
      // Read on the render at .scratch/bullets-against-the-reworked-cv/
      // ticket-06-rendered-checks/cv-render-page-2.png. Distinct from the 2M+
      // above, which the inclusion-only guard would otherwise match inside it.
      '$2M+',
      '500k+',
      '1M+',
      '100k+',
      '8-person',
      '23%',
      '72%',
      '70%',
      '99.95%',
      // Added by #6, with the reworked Principal bullets that state them.
      '90%',
      '50ms',
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
    identityPhrases: ['Full-stack engineer', '10+ years', 'end to end in TypeScript', 'AI layer'],
    differentiator: ['semantic search', 'MCP', 'agentic'],
    // The claims ADR 0001 removed, in the language they would come back in.
    // "Hiring" is banned as Fran offering himself, not as a thing he did: he
    // sat on a hiring panel in the Lead role, which is the CV's own words for
    // work he was doing for the team. The lookahead is what keeps the ban on
    // the claim rather than on the word.
    availability: /available|open to (new )?opportunities|actively (exploring|looking)|hiring(?!\s+panel)/i,
    claims: [
      /\d+\+?\s*(engineers|developers)\s*mentored/i,
      /years of experience|systems scaled/i,
      /open source|passionate|passion for/i,
      /freelance/i, // D3: the freelance entry is on the CV, not on the site.
    ],
    // A description is what a search engine indexes the page as, so the
    // titles ADR 0001 took off the page must not survive in it. "full stack" is
    // no longer one of them: ADR 0001 banned it because the old site invented
    // "Full Stack Developer" as a title, and the CV summary has since chosen
    // "Full-stack engineer" for itself, so the phrase now arrives from the
    // document rather than around it (ADR 0001, amended 2026-09-04). "designer"
    // and "portfolio" were never on the CV and stay banned.
    describedAsNot: /designer|portfolio/i,
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
    title: 'Fran Menéndez | Ingeniero Full-Stack',
    image: `${SITE}/og-image-es.png`,
    imageSource: ogImageEsHtml,
    imageAlt: 'Fran Menéndez, ingeniero full-stack, Zaragoza, España.',
    identityLead: /^Ingeniero full-stack, más de 10 años/,
    themeToggle: /cambiar a modo (oscuro|claro)/i,
    themeControl: { toDark: 'Cambiar a modo oscuro', toLight: 'Cambiar a modo claro' },
    skipLink: 'Saltar al contenido',
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
    // it: a decimal point for thousands, a comma for decimals, and a space
    // before the unit. Read on the rendered Spanish PDF, not extracted from it.
    figures: [
      '850 ms',
      '34 ms',
      '100.000',
      '2M',
      // Distinct from the 2M above, which the inclusion-only guard would
      // otherwise match inside it. The Spanish CV writes the currency after the
      // number, so this is not the English row's '$2M+' with the words swapped.
      '2M$',
      '500k',
      '1M',
      '100k',
      '8 personas',
      // Arrived with the sweep of this edition against the new Spanish CV.
      '90 %',
      '50 ms',
      '23 %',
      '72 %',
      '70 %',
      '99,95 %',
    ],
    // The same four declines the English edition made, in the words the Spanish
    // CV states them: this edition is now swept against a CV of its own, so a
    // figure it left off is a decision here too and not merely an inheritance.
    declinedFigures: [
      { figure: 'the 100% retention', pattern: /100\s?%[^.]{0,40}retenci[oó]n|retenci[oó]n[^.]{0,40}100\s?%/i },
      {
        figure: 'the 85% design-with-components cut',
        pattern: /85\s?%[^.]{0,60}(dise[nñ]o|componente|semana|d[ií]a)|(dise[nñ]o|componente|semana|d[ií]a)[^.]{0,60}85\s?%/i,
      },
      {
        figure: 'three global enterprise partnerships',
        pattern: /(tres|3)\s+alianzas\s+enterprise\s+globales/i,
      },
      {
        figure: 'the 3.000 to 10.000+ user growth, and its 233%',
        pattern:
          /(3\.000|10\.000|233\s?%)[^.]{0,60}(usuario|crecimiento)|(usuario|crecimiento)[^.]{0,60}(3\.000|10\.000|233\s?%)/i,
      },
    ],
    recognitions: [
      'Finalista global',
      '100 Ideas Zaragoza',
      'uCode by Adidas',
      'ImagineCode',
      'Google Hash Code',
    ],
    independentWork: ['Instagram Checker', 'Harness de entrega multiagente'],
    identityPhrases: ['Ingeniero full-stack', 'más de 10 años', 'de principio a fin en TypeScript', 'capa de IA'],
    differentiator: ['búsqueda semántica', 'MCP', 'agéntico'],
    availability: /disponible|abierto a (nuevas )?oportunidades|buscando activamente|contratando/i,
    claims: [
      /\d+\+?\s*(ingenieros|desarrolladores)\s*mentorizados/i,
      /años de experiencia|sistemas escalados/i,
      /código abierto|apasionad[oa]|pasión por/i,
      /freelance|autónomo/i,
    ],
    // As on the English row, and for the same reason: ADR 0001 banned "full
    // stack" because the old site invented it as a title, and both CV summaries
    // have since chosen it for themselves — the Spanish one opens "Ingeniero
    // full-stack", so the phrase now arrives from the document rather than from
    // around it (ADR 0001, amended 2026-09-04). "diseñador", "portfolio" and
    // "portafolio" were never on either CV and stay banned, the last two
    // because the word a Spanish reader would search for has both spellings.
    describedAsNot: /diseñador|portfolio|portafolio/i,
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

// Guard test for ticket 41 (the Record's tokens and type). ADR 0002 moved the
// palette out of eighty inline ternaries and into `@theme` tokens; the way that
// unravels is one component reaching for a hex again because a token for what it
// wanted did not exist. Every module the components are drawn from is read here
// as source, not as a rendered tree, because a literal that never reaches the
// DOM in jsdom is still a colour outside the theme block.
//
// This is not an assertion on a class name: it says nothing about which token a
// component picks, only that it picks one.
const componentSources = Object.entries(
  import.meta.glob('./{components,pages}/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<
    string,
    string
  >,
);

describe('the palette', () => {
  it('is carried by tokens, so no component names a colour', () => {
    // Hex triplets and the functional notations. The SVG path data in the
    // footer is a long string of digits and letters, so the hex pattern is
    // anchored to a `#` rather than left to float.
    const literal = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|color-mix)\(/;

    expect(componentSources.length).toBeGreaterThan(0);

    for (const [path, source] of componentSources) {
      expect(source, `${path} names a colour instead of reading a token`).not.toMatch(literal);
    }
  });
});

// Guard test for ticket 43 (the evidence as a record). The section head is the
// primitive every section now opens on, and it replaced the section component
// rather than sitting beside it: a section left on the old component would draw
// a second, different head on the same page. It is a different thing from the
// running head, which heads the page rather than a section. Read as source,
// because a deleted module is not a thing the rendered tree can be asked about.
describe('the section component the section head replaces', () => {
  it('is gone, and nothing reaches for it', () => {
    const paths = componentSources.map(([path]) => path);

    expect(paths.length).toBeGreaterThan(0);
    expect(paths).not.toContain('./components/Section.tsx');

    const reaching = componentSources
      .filter(([, source]) => /from '[^']*components\/Section'/.test(source))
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
    // Guard for ticket 43. Each section opens on a running head: its number in
    // the accent, its name in the edition's own word, on the rule. The number
    // is what the contents index links by, so a head that lost it would leave
    // the index decorative.
    it.each([
      ['experience', '01'],
      ['independent-work', '02'],
    ])('opens %s on a running head with its number and its name', (id, index) => {
      render(<App content={content} />);
      const section = document.getElementById(id);
      expect(section).not.toBeNull();

      const name =
        id === 'experience' ? content.chrome.sections.experience : content.chrome.sections.independentWork;
      const heading = within(section!).getAllByRole('heading', { level: 2 })[0];

      expect(heading.textContent).toBe(name);
      expect(heading.parentElement?.textContent).toContain(index);
    });

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

  // Guard tests for ticket 42 of the redesign (the running head and the
  // identification block). The running head replaced the masthead, which is
  // why the section links a visitor used to find there are asserted absent
  // from it: they are the contents index's now.
  describe('the top of the record', () => {
    // A `header` scoped to a `section` is not a banner landmark, but the role
    // mapping testing-library uses maps every `header` to one, so the section
    // headings answer to the role too. The page's banner is the one outside
    // the main landmark, and there is exactly one of those.
    const runningHead = () => {
      const main = screen.getByRole('main');
      const outside = screen.getAllByRole('banner').filter((banner) => !main.contains(banner));
      expect(outside).toHaveLength(1);
      return outside[0];
    };

    // The skip link is the keyboard visitor's way past the running head, so
    // what matters is that nothing precedes it and that it lands somewhere.
    // Both editions, because it is finish rather than English's finish.
    it('opens on a skip link that lands on the main landmark', () => {
      render(<App content={content} />);
      const first = screen.getAllByRole('link')[0];
      expect(first.textContent).toBe(edition.skipLink);

      const target = first.getAttribute('href') ?? '';
      expect(target.startsWith('#')).toBe(true);
      expect(document.querySelector(target)).toBe(screen.getByRole('main'));
    });

    // The masthead listed two sections beside the name; the running head lists
    // none, because the contents index below reaches all five. What is left is
    // the name of the record and the two things a reader may change about how
    // it is shown.
    it('carries the name, the language selector and the theme control, and nothing else', () => {
      render(<App content={content} />);
      const head = runningHead();

      expect(head.textContent).toContain(content.identity.name);
      expect(within(head).getByRole('navigation', { name: edition.language.label })).toBeTruthy();
      expect(within(head).getByRole('button', { name: edition.themeToggle })).toBeTruthy();

      const toASection = within(head)
        .queryAllByRole('link')
        .filter((link) => link.getAttribute('href')?.startsWith('#'));
      expect(toASection).toEqual([]);
    });

    // The toggle was an icon with its name only in an `aria-label`, so a
    // visitor who could see the page could not read what it would do. It now
    // says so, in the edition's own words, and the words change with the state.
    it('says what the theme control will do, in the edition’s own words', () => {
      render(<App content={content} />);
      const control = () => screen.getByRole('button', { name: edition.themeToggle });

      expect(control().textContent).toBe(edition.themeControl.toDark);
      expect(control().querySelector('img, svg')).toBeNull();

      fireEvent.click(control());
      expect(control().textContent).toBe(edition.themeControl.toLight);
    });

    // The identification block is the section the nameplate is in. Found
    // through the one `h1` rather than by its id, because the h1 is what the
    // block is: a record identifies itself before it says anything else.
    const identification = () => {
      const block = screen.getByRole('heading', { level: 1 }).closest('section');
      expect(block).not.toBeNull();
      return block as HTMLElement;
    };

    it('states where Fran is and how he works, in fields of their own', () => {
      render(<App content={content} />);
      const text = identification().textContent ?? '';

      expect(text).toContain(content.chrome.fields.location);
      expect(text).toContain(content.identity.location);
      expect(text).toContain(content.chrome.fields.mode);
      expect(text).toContain(content.identity.mode);
    });

    it('offers every CV this edition publishes, where the reader lands', () => {
      render(<App content={content} />);
      const offered = within(identification())
        .getAllByRole('link', { name: /cv/i })
        .map((link) => link.getAttribute('href'));

      expect(offered).toEqual(edition.cvs.map((cv) => cv.href));
    });

    // User story 12, resolved by the verdict on #26 in favour of the bottom:
    // the routes live once, in the Contact section, so the bottom of the page
    // gives a reader something the top did not. The hero used to carry the
    // email and the LinkedIn link beside the CV, which is the assertion this
    // replaces.
    it('leaves email, LinkedIn and GitHub to the Contact section', () => {
      render(<App content={content} />);
      const hrefs = within(identification())
        .queryAllByRole('link')
        .map((link) => link.getAttribute('href') ?? '');

      expect(hrefs.filter((href) => /^mailto:|linkedin\.com|github\.com/.test(href))).toEqual([]);
    });

    // The contents index is what the running head stopped carrying, and it is
    // the whole of the page's navigation now: five entries, one per section,
    // numbered as the sections number themselves.
    it('indexes all five sections, numbered as their running heads number them', () => {
      render(<App content={content} />);
      const index = within(identification()).getByRole('navigation', { name: content.chrome.nav.label });
      const entries = within(index).getAllByRole('link');

      expect(entries.map((entry) => entry.getAttribute('href'))).toEqual([
        '#experience',
        '#independent-work',
        '#recognitions',
        '#technologies',
        '#contact',
      ]);

      const labels = [
        content.chrome.sections.experience,
        content.chrome.sections.independentWork,
        content.chrome.sections.recognitions,
        content.chrome.sections.technologies,
        content.chrome.sections.contact,
      ];

      entries.forEach((entry, position) => {
        const number = String(position + 1).padStart(2, '0');
        expect(entry.textContent).toBe(`${number}${labels[position]}`);

        // The number is the section's own, not the index's: each section opens
        // on it, so an index entry that drifted from the page it names fails
        // here rather than being noticed by a reader counting.
        const section = document.querySelector(entry.getAttribute('href') ?? '');
        expect(section?.textContent?.startsWith(number)).toBe(true);
      });
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
    // Guard for ticket 43. The record is only a record if all of it is on the
    // page: every employer with its span and location, every role with its
    // dates, every bullet, and every part of the one programme that has parts.
    // Read off the content module rather than listed here, so a bullet added to
    // an edition is covered the day it lands.
    it('renders every employer, role, bullet and sub-bullet the content declares', () => {
      const text = renderedText(edition);
      const declared = content.employers.flatMap((employer) => [
        employer.name,
        employer.location,
        employer.span,
        ...employer.roles.flatMap((role) => [
          role.title,
          role.dates,
          ...role.bullets.flatMap((bullet) =>
            typeof bullet === 'string' ? [bullet] : [bullet.text, ...bullet.subBullets]
          ),
        ]),
      ]);

      // A content file that stopped exposing employers would otherwise leave
      // this passing over an empty list.
      expect(declared.length).toBeGreaterThan(20);

      for (const statement of declared) {
        expect(text).toContain(statement);
      }
    });

    // Guard for ticket 43, and for user story 3. A bullet is a numbered entry:
    // the index hangs in its own column and the statement sits beside it. A
    // programme's parts carry their parent's number and their own, which is how
    // a record says what is under what without indenting it away.
    it('numbers every entry in a role, and every part of a programme under its parent', () => {
      render(<App content={content} />);
      const [role] = content.employers[0].roles;
      const entries = [...screen.getByText(role.title).closest('div')!.querySelector('ul')!.children];

      expect(entries.map((entry) => entry.firstElementChild?.textContent)).toEqual(
        role.bullets.map((_, position) => String(position + 1))
      );

      const headline = role.bullets[0];
      const parts = typeof headline === 'string' ? [] : headline.subBullets;
      expect(parts.length).toBeGreaterThan(0);

      const nested = [...entries[0].querySelector('ul')!.children];
      expect(nested.map((part) => part.firstElementChild?.textContent)).toEqual(
        parts.map((_, position) => `1.${position + 1}`)
      );
    });

    // Guard for ticket 43. Independent work is numbered down the same left
    // column the spans and the dates sit in, continuing the record's one
    // numbering rather than starting a second device.
    it('numbers each piece of independent work down the left', () => {
      render(<App content={content} />);
      const section = document.getElementById('independent-work');
      expect(section).not.toBeNull();

      const numbers = [...section!.querySelectorAll('article')].map(
        (entry) => entry.firstElementChild?.textContent
      );

      expect(numbers).toEqual(edition.independentWork.map((_, position) => String(position + 1).padStart(2, '0')));
    });

    it('names every piece of independent work, and links none of it', () => {
      render(<App content={content} />);
      const section = document.getElementById('independent-work');
      expect(section).not.toBeNull();

      // Rewritten for ticket 43's layout, and for one reason: the name used to
      // be a bold run opening a paragraph, and is now the entry's own heading
      // beside its number. The assertion is the same one — these names, in this
      // order, and no others — read where a reader and a screen reader now meet
      // them.
      const names = within(section!)
        .getAllByRole('heading', { level: 3 })
        .map((name) => name.textContent);
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
    // Rewritten for the Record (#41): the two surfaces are now the manila stock
    // and the slate, so the values the browser chrome takes moved with them.
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
        ['(prefers-color-scheme: light)', '#f4f1e9'], // --color-stock
        ['(prefers-color-scheme: dark)', '#121316'], // --color-stock-dark
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

// Guard tests for ticket 27 of the reworked-CV sweep: the Principal role as the
// CV now tells it, one nested Shop programme, carrying forward the corrections
// ticket 06 of the CV catch-up left here. English only, and out of the table for
// that reason — the spec sweeps the Spanish edition in a ticket of its own, so
// `/es` goes on making statements the English side has stopped making, and a row
// per edition here would assert the opposite of what was decided.
//
// These read the whole sentence rather than a phrase from it. Each one is a
// wording approved against the CV in
// `.scratch/the-reworked-cv-with-nesting/bullet-approval.md`, and a bullet that
// drifts a clause off one of them is back to saying something its CV does not.
describe('the Principal role says what the CV says', () => {
  const english = editions.find((edition) => edition.edition === 'English')!;

  // The item that *says* the phrase, rather than the one it is nested inside: a
  // sub-bullet's text is part of its headline's text too, so the match to take
  // is the one no other match contains.
  const bulletSaying = (phrase: string) => {
    render(<App content={english.content} />);
    const matching = [...document.querySelectorAll('li')].filter((item) => item.textContent?.includes(phrase));
    return matching.find((item) => !matching.some((other) => other !== item && item.contains(other)));
  };

  // The arc the CV opens the role on. Everything indented under it is a part of
  // this one piece of work, which is the whole reason the nesting exists: the
  // eight years of Shop were not eight unrelated bullets.
  it('opens on Shop as one arc from proposal to production', () => {
    expect(renderedText(english)).toContain(
      'Took Shop from proposal to production: the e-commerce platform I proposed as Lead, on a $2M+ annual revenue projection, delivered to a live MVP with the team, and took to production as Principal — sole contributor on it at times.'
    );
  });

  // The first sub-bullet, and the one that says how the build order was decided.
  // It is evidence for the headline's claim about arguing from metrics, which is
  // why the headline can drop that clause and this cannot.
  it('says the mobile-first order was argued from the product’s own metrics', () => {
    expect(renderedText(english)).toContain(
      'After the mobile-only MVP the plan was the desktop build next; I argued from Mixpanel and GA, an onboarding drop-off on a mostly mobile audience, that retention on mobile came first, and that order was adopted.'
    );
  });

  // C1. The stronger claim as well as the truer one: he built it, ran it, and
  // then drove its practices into the team's process.
  it('says Fran built and ran the agentic workflow for his own delivery', () => {
    expect(renderedText(english)).toContain(
      'Built and ran an agentic AI development workflow for my own production delivery: four stages, eight role-scoped agents, model routing by task, and review roles barred from writing the code they audit. Used it to deliver a security hardening programme, where the independent step caught defects the implementing pass had missed; drove its practices into the team’s process.'
    );
  });

  // The same overclaim lives one level up, in the first sentence a visitor
  // reads: the hero used to end on "agentic engineering workflows made
  // team-wide standards". The CV attaches the team-wide standard to MCP tooling
  // alone. Both shapes are guarded, because correcting the bullet and leaving
  // the hero is how this one survived the last sweep.
  it('attributes the workflow to nobody but Fran, in the hero as well as the bullet', () => {
    const text = renderedText(english);
    expect(text).not.toMatch(/team[’']s agentic/i);
    expect(text).not.toMatch(/agentic[^.]*team-wide/i);
  });

  // C3, in its fuller variant. The figure-light one was preferred for matching
  // a convention this role does not have: it already carries 850ms, 34ms,
  // 100,000+ and 2M+.
  it('routes the uncertain band to review and discards the weakest matches', () => {
    expect(renderedText(english)).toContain(
      'Built semantic product matching on OpenSearch with k-NN vector similarity and BM25 text relevance, banded by confidence: the strongest matches served automatically with no human review — about 90% of throughput — the weakest discarded, and the band between them routed to a review dashboard I built in PayloadCMS. p95 query latency stayed under 50ms across 100,000+ products.'
    );
  });

  // The old wording described a system spending human attention on its own
  // rejects, which is both untrue and a worse design than the real one.
  it('never says the reviewed set is the one below the threshold', () => {
    expect(renderedText(english)).not.toMatch(/below (the )?confidence threshold/i);
  });

  // The hardening bullet as the CV now words it: what was closed, and what it
  // was left guarded by. It replaces the audit bullet that counted findings.
  it('says what the hardening closed rather than how many findings it had', () => {
    expect(renderedText(english)).toContain(
      'Hardened the public e-commerce API: closed SQL injection, access-control and PII-exposure holes, including a write-side IDOR in a shared authorisation primitive covering five collections, and left it guarded by regression tests that run in CI.'
    );
  });

  // The count and the taxonomy are the CV's dropped claim, not a rewording of
  // the one above, so the page must not carry them in any shape. The remediation
  // finding stays out of an audit taxonomy the page no longer states at all.
  it('carries no audit count and no vulnerability-class taxonomy', () => {
    const text = renderedText(english);
    expect(text).not.toMatch(/eight findings/i);
    expect(text).not.toMatch(/vulnerability classes/i);
    expect(text).not.toMatch(/broken access control/i);
  });

  // The CV dropped this bullet outright when the SEO incident became one of its
  // own, and a dropped statement is the easiest thing to leave behind: nothing
  // else on the page contradicts it.
  it('drops the cross-service authentication bullet the CV no longer carries', () => {
    expect(renderedText(english)).not.toMatch(/cross-service authentication/i);
  });

  // What was traced and what was pinned, which is the diagnosis rather than the
  // name of the technology it happened on.
  it('tells the SEO incident as a canonical identity traced and then pinned', () => {
    expect(renderedText(english)).toContain(
      'Traced a sitewide collapse in The Bump’s organic traffic to the site taking its own address from whichever host the request arrived on, which an ingress migration had just changed: it was telling search engines its internal origin was canonical. Pinned that identity to the brand domain where it is derived, so no later infrastructure change can move it.'
    );
  });

  // "Tripwire" was a gloss over something more specific: a lint gate at error
  // level and a regenerable access-coverage matrix. Both editions, because the
  // Spanish one has never carried the word and this is what keeps it that way.
  it('describes the CI artefact by what it does rather than as a tripwire', () => {
    for (const edition of editions) {
      expect(renderedText(edition)).not.toMatch(/tripwire/i);
    }
  });

  // D1, the CV's sentence unchanged. Its placement is the point: session
  // continuity was the other half of the same programme and reads on its own
  // without it. Both are sub-bullets now, and adjacent inside the nested list.
  it('puts unified sign-on immediately before session continuity', () => {
    const signOn = bulletSaying(
      'Unified sign-on across five products — Bump articles, baby names, registry, shop and the native apps — so that one account replaced five separate logins.'
    );
    expect(signOn).toBeDefined();
    expect(signOn?.nextElementSibling?.textContent).toContain('Built session continuity');
  });
});

// The other role at the same employer, swept from the same CV commit. It is a
// per-edition guard for the same reason the Principal block is: the Spanish
// edition is condensed from its own document and sweeps on its own ticket.
describe('the Lead role says what the CV says', () => {
  const english = editions.find((edition) => edition.edition === 'English')!;

  // The role's own bullets, in the order a reader meets them. Found by the
  // heading above them, so the assertion survives any change to how a bullet is
  // styled.
  const leadBullets = () => {
    render(<App content={english.content} />);
    const list = screen.getByText('Lead Software Engineer').closest('div')!.querySelector('ul')!;
    // Rewritten for ticket 43's layout, and for one reason: an entry now
    // carries its index number as well as its statement, so the row's own text
    // begins with a figure and these assertions are anchored to the first word
    // of a sentence. The statement is read from the statement.
    return [...list.children].map((item) => item.querySelector('p')?.textContent ?? '');
  };

  // The CV's order, and the argument it makes: what he took on, the system he
  // built for it, what that system returned, the team he ran, and the release
  // path he fixed. An order is content, so it is asserted rather than assumed.
  it('reads in the CV’s order: the handover, the system, its variant, the team, the deployment time', () => {
    expect(leadBullets()).toEqual([
      expect.stringMatching(/^Took over The Bump’s web platform/),
      expect.stringMatching(/^Built an A\/B testing system/),
      expect.stringMatching(/^The winning variant in an ad-layout test/),
      expect.stringMatching(/^Managed an 8-person cross-functional team/),
      expect.stringMatching(/^Cut deployment time/),
    ]);
  });

  // New to the site with this sweep. It is the one bullet that says what the
  // role was: an inherited platform, rebuilt tooling, and a hiring panel he sat
  // on to staff the team that would own it.
  it('says he took the platform over and staffed the team that would own it', () => {
    expect(renderedText(english)).toContain(
      'Took over The Bump’s web platform from the outgoing team: rebuilt their build and release tooling, environments and runbooks in-house, and sat on the hiring panel for four engineering roles, defining the technical screen, to staff the team that would own it.'
    );
  });

  // The mechanism, on its own. The CV split the old single bullet in two, and
  // the split is the point: a reader can weigh the system without the result
  // hanging off the end of the same sentence.
  it('states the A/B system as the mechanism that made experiments possible', () => {
    expect(renderedText(english)).toContain(
      'Built an A/B testing system for a platform where edge caching had made experimentation impossible: Akamai assigns a variant cookie at the edge and the app renders the matching tagged build, sticky across reloads. The platform had run no experiments in over 3 years before it; 10+ have run since.'
    );
  });

  // The result, as its own statement, and with the reason it shipped: the lift
  // is only evidence if nothing else moved against it.
  it('states the winning variant as its own result, with what held at baseline', () => {
    expect(renderedText(english)).toContain(
      'The winning variant in an ad-layout test on that system lifted served ad impressions 23% against control; it shipped because engagement depth held at baseline in Mixpanel and GA4.'
    );
  });

  // The CV moved this claim into the Shop headline, where it is now made as
  // Principal. Left here as well it would be the same work counted twice, in
  // two roles, which is exactly what a recruiter checking the CV would catch.
  it('leaves the proposal-to-a-live-MVP claim to the Shop headline that now carries it', () => {
    expect(leadBullets().join(' ')).not.toMatch(/proposal to a live MVP/i);
    expect(renderedText(english)).not.toMatch(/integrated commerce platform/i);
  });
});

// The shape, asserted where a screen reader meets it. Indentation is not
// nesting: what makes the Shop programme's parts read as parts is a list inside
// the item they belong to, so this reads the DOM rather than the content module.
describe.each(editions)('$edition edition: the Shop programme is a list inside its own list item', (edition) => {
  const headline = edition.content.employers[0].roles[0].bullets[0];
  const subBullets = typeof headline === 'string' ? [] : headline.subBullets;

  // The role's own bullet list, found by the heading above it rather than by
  // anything about how it is styled. The heading is the role title as this
  // edition's CV writes it, which is the first entry of the row's `roles`.
  const principalBullets = () => {
    render(<App content={edition.content} />);
    return screen.getByText(edition.roles[0]).closest('div')!.querySelector('ul')!;
  };

  it('renders the sub-bullets the content declares, inside the first item', () => {
    expect(subBullets.length).toBeGreaterThan(0);

    const first = principalBullets().firstElementChild!;
    const nested = first.querySelector('ul');

    expect(nested).not.toBeNull();
    // Rewritten for ticket 43's layout, and for one reason: a part now carries
    // its number, `1.1` to `1.9`, beside its statement, so the item's own text
    // is the number and the statement together. What this test is for — the
    // parts the content declares, all of them, in order, inside the item they
    // belong to — is unchanged.
    expect([...nested!.querySelectorAll('li')].map((item) => item.querySelector('p')?.textContent)).toEqual([
      ...subBullets,
    ]);
  });
});

// One level and no more, over everything either edition renders: the type
// refuses a second level, and this is what would catch a component that
// reintroduced one under it. Out of the group above because it is the one
// assertion there that reads both editions at once rather than one per row.
describe('nothing nests deeper than one level', () => {
  it('nests one level and no deeper, anywhere on either edition', () => {
    for (const edition of editions) {
      cleanup();
      render(<App content={edition.content} />);

      for (const nested of document.querySelectorAll('li ul, li ol')) {
        expect(nested.querySelector('ul, ol')).toBeNull();
      }
    }
  });
});

// The type, asserted by compiling. `npm run build` typechecks this file, so an
// `@ts-expect-error` that stopped being an error would fail the build: a bullet
// is a string or a text with a list of sub-bullet strings, and a sub-bullet is a
// string, which is the whole of "one level and no more".
describe('a bullet carries one level of sub-bullets and no more', () => {
  it('takes a plain string or a text with sub-bullet strings', () => {
    const bullets: Role['bullets'] = [
      'A bullet on its own is a string.',
      { text: 'A headline.', subBullets: ['A part of it.', 'Another part of it.'] },
    ];

    expect(bullets).toHaveLength(2);
  });

  it('refuses a sub-bullet that carries sub-bullets of its own', () => {
    const bullets: Role['bullets'] = [
      {
        text: 'A headline.',
        // @ts-expect-error a sub-bullet is a string: the second level does not compile.
        subBullets: [{ text: 'A part of it.', subBullets: ['A part of the part.'] }],
      },
    ];

    expect(bullets).toHaveLength(1);
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
