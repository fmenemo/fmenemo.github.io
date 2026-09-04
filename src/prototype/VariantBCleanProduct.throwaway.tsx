// THROWAWAY. The plan: five variants on the existing route, switchable by `variant`.
//
// Design read: a credibility anchor for a recruiter who already has the name, set as the documentation of a system rather than a page about a person, in a clean product-minimal language built on one tight grotesk, cool tinted neutrals and a fixed two-column shell; variance 5, motion 4, density 4.
//
// What that means in the drawing. The page is an application shell: a rail
// pinned down the left carrying the name, the index and the two controls, and a
// record scrolling beside it. Nothing is centred, nothing is a document, and the
// masthead is a column rather than a bar. Inside the record the grid is fixed
// and visible: every role title is pinned in its own column while its evidence
// scrolls past, and every employer span, recognition date and year is set on
// the right edge of the record, so the numbers read down one column. Figures are the loudest thing in each bullet, set in the ink weight
// against body text a step lighter, so a reader scanning for numbers finds them
// before the sentence. The Shop programme is a subsystem panel: the headline is
// the system, and the parts are components listed on a raised surface under it.
// Motion is an entrance, a reveal each section crosses into once, an index mark
// that travels with the reader and a switch that slides, and all of it stops for
// a visitor who asks it to.
//
// Structurally against variant A: A is one centred serif column with the dates
// in a left margin rail and the evidence as prose; B is an off-centre two-column
// shell with a pinned index, the dates on the right edge, the evidence as ruled
// rows, and the contact routes as a grid rather than a list.
import React, { useEffect, useRef, useState } from 'react';
import { useContent } from '../hooks/useContent';
import { useDarkMode } from '../hooks/useDarkMode';

// A figure is a number and whatever is welded to it: a currency mark ahead of
// it, a unit or a plus after it, and the word a compound hangs off, so that
// `8-person` is set as one figure rather than as a bold digit with a tail. The
// lookbehind is what keeps `v2`, `S3`, `GA4`, `BM25` and `p95` out: a digit a
// letter runs into is part of a name, not a measurement. A separator has to be
// followed by digits, so a number ending a sentence does not swallow the stop.
const FIGURE = /(?<![\p{L}\d])(\$?\d+(?:[.,]\d+)*(?:\s?ms|\s?%|\s?x|k|M|B)?\+?(?:-\p{L}+)?)/gu;

// `split` on a pattern with one group returns the text and the matches
// alternating, so the odd indices are the figures and the even ones are the
// words between them.
const figured = (text: string): React.ReactNode[] =>
  text.split(FIGURE).map((part, index) =>
    index % 2 === 1 ? (
      <b key={index} className='font-semibold text-pb-ink tabular-nums dark:text-pb-ink-dark'>
        {part}
      </b>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );

// The anchors the page is divided into, in document order, and the argument to
// the observer below. A constant rather than something derived per render: the
// labels beside them are the edition's and change with it, the ids are the
// document's and do not, and an array rebuilt each render would tear the
// observer down and set it up again on every state change it causes.
const SECTION_IDS = ['home', 'experience', 'independent-work', 'recognitions', 'technologies', 'contact'];

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The section the reader is in, for the mark in the index. An observer rather
// than a scroll listener: the browser does the measuring, and nothing runs on
// every frame of a scroll. The margins pick the band across the middle of the
// viewport, so the mark moves when a section reaches reading position rather
// than when its first pixel appears.
const useActiveSection = (ids: string[]): string => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

// A section is drawn held back and released when it crosses into view. A
// visitor who asks for reduced motion starts released, so the content never
// depends on an observer firing.
const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const [shown, setShown] = useState(prefersReducedMotion);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shown) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div ref={ref} className={`${shown ? 'pb-release' : 'pb-held'} ${className}`}>
      {children}
    </div>
  );
};

const link =
  'text-pb-accent underline decoration-pb-accent/30 underline-offset-4 transition-colors hover:decoration-pb-accent dark:text-pb-accent-dark dark:decoration-pb-accent-dark/30 dark:hover:decoration-pb-accent-dark';

// One heading treatment for all five sections and no eyebrow above any of
// them: a hairline the full width of the record, the heading under it, and the
// position on the page saying the rest.
const Heading: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <h2
    id={`${id}-heading`}
    className='border-t border-pb-line pt-5 text-[1.3125rem] leading-none font-semibold tracking-[-0.015em] text-pb-ink dark:border-pb-line-dark dark:text-pb-ink-dark'
  >
    {children}
  </h2>
);

const meta = 'text-[0.8125rem] leading-snug text-pb-muted tabular-nums dark:text-pb-muted-dark';

const evidence = 'text-[0.9375rem] leading-[1.65]';

// The parts of a programme, drawn as the components of a system: a raised
// surface under the headline, one part per row, each with the square marker
// this variant uses wherever a thing is a member of something. Not indented and
// not numbered; the panel is the nesting.
const Subsystem: React.FC<{ parts: string[] }> = ({ parts }) => (
  <ul className='mt-4 divide-y divide-pb-rule rounded-lg border border-pb-rule bg-pb-surface dark:divide-pb-rule-dark dark:border-pb-rule-dark dark:bg-pb-surface-dark'>
    {parts.map((part) => (
      <li key={part} className='flex gap-3 px-4 py-3.5'>
        <span
          aria-hidden='true'
          className='mt-[0.6em] h-[0.3125rem] w-[0.3125rem] shrink-0 rounded-[1px] bg-pb-accent dark:bg-pb-accent-dark'
        />
        <p className={evidence}>{figured(part)}</p>
      </li>
    ))}
  </ul>
);

const VariantBCleanProduct: React.FC = () => {
  const { identity, contact, employers, independentWork, recognitions, education, technologies, chrome } = useContent();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const index = [
    { id: 'experience', label: chrome.sections.experience },
    { id: 'independent-work', label: chrome.sections.independentWork },
    { id: 'recognitions', label: chrome.sections.recognitions },
    { id: 'technologies', label: chrome.sections.technologies },
    { id: 'contact', label: chrome.sections.contact },
  ];

  const active = useActiveSection(SECTION_IDS);

  // A recognition is one string ending in its date. The date leaves the
  // sentence and joins the right edge every other date on the page is set on;
  // a string that does not end that way keeps its shape.
  const dated = (recognition: string): { text: string; date: string } => {
    const match = /^(.*)\s\(([^()]+)\)$/.exec(recognition);
    return match ? { text: match[1], date: match[2] } : { text: recognition, date: '' };
  };

  const section = 'px-6 py-12 sm:px-10 lg:px-14 lg:py-16';

  return (
    <div className='pb-page min-h-screen bg-pb-bg font-product text-pb-body antialiased dark:bg-pb-bg-dark dark:text-pb-body-dark'>
      <div className='mx-auto flex w-full max-w-[86rem] flex-col lg:flex-row'>
        {/* The shell's left column. Below 1024px it is a block at the top of
            the page rather than a rail: same order, stacked, with the index
            wrapping instead of listing. Nothing about it scrolls sideways. */}
        <header className='pb-enter border-b border-pb-line px-6 py-7 sm:px-10 lg:sticky lg:top-0 lg:h-[100dvh] lg:w-[17.5rem] lg:shrink-0 lg:border-r lg:border-b-0 lg:px-8 lg:py-10 dark:border-pb-line-dark'>
          <div className='flex h-full flex-col'>
            <div>
              <h1 className='text-[1.5rem] leading-none font-semibold tracking-[-0.02em] text-pb-ink [font-stretch:90%] dark:text-pb-ink-dark'>
                {identity.name}
              </h1>
              <p className={`mt-2 ${meta}`}>
                {identity.location}, {identity.mode}
              </p>
            </div>

            {/* The index of the record, and the one thing on the page that
                answers where the reader is: the mark beside the current
                section extends and takes the accent. */}
            <nav
              aria-label={chrome.nav.label}
              className='mt-7 flex flex-wrap gap-x-5 gap-y-1 lg:mt-10 lg:flex-col lg:gap-x-0'
            >
              {index.map((entry) => {
                const current = active === entry.id;

                return (
                  <a
                    key={entry.id}
                    href={`#${entry.id}`}
                    aria-current={current ? 'true' : undefined}
                    className={`group flex items-center gap-2.5 py-1 text-[0.875rem] transition-colors ${
                      current
                        ? 'text-pb-ink dark:text-pb-ink-dark'
                        : 'text-pb-muted hover:text-pb-ink dark:text-pb-muted-dark dark:hover:text-pb-ink-dark'
                    }`}
                  >
                    <span
                      aria-hidden='true'
                      className={`hidden h-px transition-all duration-300 lg:block ${
                        current
                          ? 'w-6 bg-pb-accent dark:bg-pb-accent-dark'
                          : 'w-3 bg-pb-line group-hover:w-5 dark:bg-pb-line-dark'
                      }`}
                    />
                    {entry.label}
                  </a>
                );
              })}
            </nav>

            <div className='mt-7 flex items-center gap-3 lg:mt-auto lg:pt-10'>
              {/* Two states, so the control is a switch rather than a
                  sentence: it shows which of the two the page is in, and what
                  it will do is said to a screen reader rather than printed. */}
              <button
                type='button'
                role='switch'
                aria-checked={isDarkMode}
                aria-label={isDarkMode ? chrome.nav.toLightMode : chrome.nav.toDarkMode}
                onClick={toggleDarkMode}
                className='relative h-6 w-11 shrink-0 rounded-full border border-pb-line bg-pb-surface transition-colors hover:border-pb-muted dark:border-pb-line-dark dark:bg-pb-surface-dark dark:hover:border-pb-muted-dark'
              >
                <span
                  aria-hidden='true'
                  className={`absolute top-1/2 left-[0.1875rem] h-4 w-4 -translate-y-1/2 rounded-full transition-transform duration-200 ${
                    isDarkMode ? 'translate-x-5 bg-pb-accent-dark' : 'bg-pb-ink'
                  }`}
                />
              </button>

              <nav
                aria-label={chrome.language.label}
                className='flex items-center rounded-md border border-pb-line p-[0.1875rem] text-[0.75rem] dark:border-pb-line-dark'
              >
                <span
                  aria-current='true'
                  className='rounded-[0.25rem] bg-pb-ink px-2 py-1 leading-none font-medium text-pb-surface dark:bg-pb-ink-dark dark:text-pb-surface-dark'
                >
                  {chrome.language.current}
                </span>
                <a
                  href={chrome.language.other.path}
                  hrefLang={chrome.language.other.lang}
                  aria-label={`${chrome.language.other.label} ${chrome.language.other.name}`}
                  className='px-2 py-1 leading-none text-pb-muted transition-colors hover:text-pb-ink dark:text-pb-muted-dark dark:hover:text-pb-ink-dark'
                >
                  {chrome.language.other.label}
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className='min-w-0 flex-1'>
          {/* What the page opens with is the sentence the whole record is
              evidence for, and the document it condenses. Nothing else. */}
          <section id='home' className={`pb-enter ${section}`}>
            <p className='max-w-[46ch] text-[1.25rem] leading-[1.4] tracking-[-0.015em] text-pb-ink sm:text-[1.5rem] dark:text-pb-ink-dark'>
              {identity.line}
            </p>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              {contact.cvs.map((cv, position) => (
                <a
                  key={cv.href}
                  href={cv.href}
                  download={cv.href.replace(/^.*\//, '')}
                  className={
                    position === 0
                      ? 'rounded-md bg-pb-ink px-4 py-2.5 text-[0.875rem] font-medium text-pb-surface transition-transform hover:-translate-y-px active:translate-y-px dark:bg-pb-ink-dark dark:text-pb-surface-dark'
                      : 'rounded-md border border-pb-line px-4 py-2.5 text-[0.875rem] font-medium text-pb-ink transition-colors hover:border-pb-ink dark:border-pb-line-dark dark:text-pb-ink-dark dark:hover:border-pb-ink-dark'
                  }
                >
                  {cv.label}
                </a>
              ))}
            </div>
          </section>

          <section id='experience' aria-labelledby='experience-heading' className={section}>
            <Heading id='experience'>{chrome.sections.experience}</Heading>

            <div className='mt-10 space-y-14'>
              {employers.map((employer) => (
                <Reveal key={employer.name}>
                  <article>
                    <div className='flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-pb-rule pb-4 dark:border-pb-rule-dark'>
                      <h3 className='text-[1.125rem] font-semibold tracking-[-0.01em] text-pb-ink dark:text-pb-ink-dark'>
                        {employer.name}
                      </h3>
                      <p className={`${meta} text-right`}>
                        {employer.span}, {employer.location}
                      </p>
                    </div>

                    <div className='space-y-10 pt-6'>
                      {employer.roles.map((role) => (
                        // The fixed column of the grid. At 1024px and above the
                        // role stays put while its evidence scrolls past, so a
                        // reader nine bullets into Shop still has the title it
                        // belongs to on screen. Below that width it is a block
                        // above the evidence and nothing is pinned.
                        <div
                          key={role.title + role.dates}
                          className='grid gap-x-10 gap-y-4 lg:grid-cols-[13rem_minmax(0,1fr)]'
                        >
                          <div className='lg:sticky lg:top-10 lg:h-fit'>
                            <h4 className='text-[0.9375rem] leading-snug font-medium text-pb-ink dark:text-pb-ink-dark'>
                              {role.title}
                            </h4>
                            <p className={`mt-1 ${meta}`}>{role.dates}</p>
                          </div>

                          <ul className='min-w-0 max-w-[62ch]'>
                            {role.bullets.map((bullet) => (
                              <li
                                key={typeof bullet === 'string' ? bullet : bullet.text}
                                className='border-t border-pb-rule py-5 first:border-t-0 first:pt-0 dark:border-pb-rule-dark'
                              >
                                {typeof bullet === 'string' ? (
                                  <p className={evidence}>{figured(bullet)}</p>
                                ) : (
                                  <>
                                    <p className={`${evidence} text-pb-ink dark:text-pb-ink-dark`}>
                                      {figured(bullet.text)}
                                    </p>
                                    <Subsystem parts={bullet.subBullets} />
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section id='independent-work' aria-labelledby='independent-work-heading' className={section}>
            <Heading id='independent-work'>{chrome.sections.independentWork}</Heading>

            <Reveal className='mt-10 space-y-px overflow-hidden rounded-lg border border-pb-rule bg-pb-rule dark:border-pb-rule-dark dark:bg-pb-rule-dark'>
              {independentWork.map((entry) => (
                <article key={entry.name} className='bg-pb-surface p-6 dark:bg-pb-surface-dark'>
                  <h3 className='text-[1rem] font-semibold tracking-[-0.01em] text-pb-ink dark:text-pb-ink-dark'>
                    {entry.name}
                  </h3>
                  <p className={`mt-3 max-w-[62ch] ${evidence}`}>{entry.description}</p>
                </article>
              ))}
            </Reveal>
          </section>

          <section id='recognitions' aria-labelledby='recognitions-heading' className={section}>
            <Heading id='recognitions'>{chrome.sections.recognitions}</Heading>

            {/* Every date on the right edge, on the same column the employer
                spans and the role dates are set on, so the years read down the
                page as one column of numbers. */}
            <Reveal className='mt-10'>
              <ul>
                {recognitions.map((recognition) => {
                  const { text, date } = dated(recognition);

                  return (
                    <li
                      key={recognition}
                      className='grid gap-x-8 border-t border-pb-rule py-3.5 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,1fr)_7rem] dark:border-pb-rule-dark'
                    >
                      <p className='text-[0.9375rem] leading-snug text-pb-ink dark:text-pb-ink-dark'>{text}</p>
                      {date && <p className={`${meta} sm:text-right`}>{date}</p>}
                    </li>
                  );
                })}
              </ul>

              <div className='mt-10 grid gap-x-8 gap-y-1 border-t border-pb-line pt-5 sm:grid-cols-[minmax(0,1fr)_7rem] dark:border-pb-line-dark'>
                <div>
                  <p className={meta}>{chrome.recognitions.education}</p>
                  <p className='mt-1.5 text-[0.9375rem] leading-snug text-pb-ink dark:text-pb-ink-dark'>
                    {education.degree}
                  </p>
                  <p className='mt-1 text-[0.9375rem] leading-snug'>{education.institution}</p>
                  <p className='mt-1 text-[0.9375rem] leading-snug'>{education.languages}</p>
                </div>
                <p className={`${meta} sm:text-right`}>{education.years}</p>
              </div>
            </Reveal>
          </section>

          <section id='technologies' aria-labelledby='technologies-heading' className={section}>
            <Heading id='technologies'>{chrome.sections.technologies}</Heading>

            {/* Set as the parts of a stack rather than as a sentence: one
                bordered token each, wrapping, in the same corner radius as
                every other surface on the page. */}
            <Reveal className='mt-10 flex flex-wrap gap-2'>
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className='rounded-md border border-pb-rule bg-pb-surface px-3 py-1.5 text-[0.8125rem] text-pb-ink dark:border-pb-rule-dark dark:bg-pb-surface-dark dark:text-pb-ink-dark'
                >
                  {technology}
                </span>
              ))}
            </Reveal>
          </section>

          <section id='contact' aria-labelledby='contact-heading' className={section}>
            <Heading id='contact'>{chrome.sections.contact}</Heading>

            {/* The one place the routes live. Four fields on a grid, label
                over value, which is how the rest of this page sets a thing and
                what it is called. GitHub is a name rather than a word, so it is
                written here and not in the content module. */}
            <Reveal className='mt-10 grid max-w-[46rem] gap-x-10 gap-y-7 sm:grid-cols-2'>
              <div>
                <p className={meta}>{chrome.contact.email}</p>
                <p className='mt-1.5 text-[0.9375rem] break-words'>
                  <a href={`mailto:${contact.email}`} className={link}>
                    {contact.email}
                  </a>
                </p>
              </div>

              <div>
                <p className={meta}>{chrome.contact.linkedin}</p>
                <p className='mt-1.5 text-[0.9375rem] break-words'>
                  <a href={contact.linkedin} target='_blank' rel='noopener noreferrer' className={link}>
                    {contact.linkedinLabel}
                  </a>
                </p>
              </div>

              <div>
                <p className={meta}>GitHub</p>
                <p className='mt-1.5 text-[0.9375rem] break-words'>
                  <a href={contact.github} target='_blank' rel='noopener noreferrer' className={link}>
                    {contact.github.replace(/^https:\/\//, '')}
                  </a>
                </p>
              </div>

              <div>
                <p className={meta}>{chrome.contact.location}</p>
                <p className='mt-1.5 text-[0.9375rem] text-pb-ink dark:text-pb-ink-dark'>
                  {identity.location}, {identity.mode}
                </p>
              </div>
            </Reveal>
          </section>

          <footer className='border-t border-pb-line px-6 py-8 sm:px-10 lg:px-14 dark:border-pb-line-dark'>
            <p className={meta}>
              &copy; {new Date().getFullYear()} {identity.name}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default VariantBCleanProduct;
