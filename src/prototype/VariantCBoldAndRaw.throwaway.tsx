// THROWAWAY. The plan: five variants on the existing route, switchable by `variant`.
//
// Design read: a credibility anchor for a recruiter who already has the name, set bold and raw as a near-brutalist broadsheet — full-bleed, no centred column, one compressed grotesque at 900 doing the shouting, hard rules instead of boxes, and one uncompromising accent spent almost entirely on the Shop panel; variance 8, motion 5, density 3.
//
// What that means in the drawing, and where it disagrees with variant A. That
// page is a set document: a 54rem column, a serif, hairlines, and a right-
// aligned margin rail every date hangs on. This one has no column at all. Every
// block runs edge to edge inside one page gutter, the divisions are 2px and 4px
// rules rather than hairlines, the type is one face compressed and set in caps
// at sizes that break the line, and the numbers hang on the left as an ordinal
// count of the record rather than on the right as dates.
//
// The Shop programme is the centrepiece and is drawn as the only field of
// colour on the page: a full-bleed accent panel, black on orange, its nine
// parts numbered and ruled. It is the same panel in both themes, so the loudest
// thing here is the thing that does not move when the lights do.
//
// Density 3, so almost nothing is packed: one thing per band, and the bands are
// tall. Motion 5, and it is spent on three things — the nameplate arrives a
// line at a time, the technologies run as a ticker, and every control answers
// press. All three stop for a visitor who asks for reduced motion.
import React from 'react';
import { useContent } from '../hooks/useContent';
import { useDarkMode } from '../hooks/useDarkMode';

// The page gutter, and its negation. A block that wants the full bleed pairs
// them, which is how the Shop panel and the ticker reach the window edge from
// inside a section that does not.
const gutter = 'px-4 sm:px-8 lg:px-12';
const bleed = '-mx-4 sm:-mx-8 lg:-mx-12';

const ordinal = (index: number): string => String(index + 1).padStart(2, '0');

// Mono is the site's, not this variant's: the small print is set in the same
// compressed grotesque at a tracked-out small size instead, so the page holds
// one face throughout.
const label = 'br-narrow text-[0.6875rem] font-semibold uppercase tracking-[0.18em]';

const muted = 'text-br-muted dark:text-br-muted-dark';

// A link is underlined at rest and takes the accent as a field on hover, which
// is the same move the CV bar and the contact rows make. Nothing here is a
// pill, a chip or a rounded anything.
const link =
  'underline decoration-2 underline-offset-4 transition-colors hover:bg-br-accent hover:text-br-void hover:decoration-transparent';

// A section heading: the running number of the record, then the word, on one
// line and at a size that is meant to be read across the room. The number is
// inline rather than stacked above, because a small label over a heading is an
// eyebrow and this page is allowed at most one.
const Heading: React.FC<{ number: string; children: React.ReactNode }> = ({ number, children }) => (
  <h2 className='br-compress flex items-baseline gap-4 text-[clamp(2.25rem,9vw,5rem)] leading-[0.9] font-black uppercase tracking-[-0.02em] sm:gap-6'>
    <span className='br-narrow text-br-accent text-[0.28em] font-bold tracking-[0.1em]'>{number}</span>
    <span>{children}</span>
  </h2>
);

// A band of the page: a 4px rule across the top of it and a lot of air under.
// The rule is the only thing separating one section from the next; there is no
// card, no panel and no change of ground.
const Band: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <section
    id={id}
    className='border-t-4 border-br-ink py-14 sm:py-20 lg:py-24 dark:border-br-ink-dark'
  >
    {children}
  </section>
);

// One statement of evidence: its ordinal at the left, hanging in a fixed column
// so that every number on the page starts on the same vertical, and the text
// beside it held to a measure a reader can follow at this size.
const Statement: React.FC<{ number: string; children: React.ReactNode }> = ({ number, children }) => (
  <li className='grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t-2 border-br-ink py-6 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-6 sm:py-8 dark:border-br-ink-dark'>
    <span className={`${label} ${muted} pt-1.5 tabular-nums`}>{number}</span>
    <p className='max-w-[62ch] text-[1.0625rem] leading-[1.55] sm:text-[1.1875rem]'>{children}</p>
  </li>
);

// The centrepiece. A programme is not a bullet with an indent under it here: it
// is a field of colour running the full width of the window, its headline set
// at display size and its parts numbered and ruled beneath. The one accent on
// the page is spent almost entirely on this panel, and the panel is identical
// in both themes.
const Programme: React.FC<{ number: string; text: string; parts: string[] }> = ({ number, text, parts }) => (
  <li className={`${bleed} ${gutter} bg-br-accent py-14 text-br-void sm:py-20`}>
    {/* The panel keeps its place in the role's count, so the ordinals run
        unbroken from the statement above it to the one below. */}
    <p className={`${label} tabular-nums opacity-70`}>{number}</p>
    <p className='br-compress mt-6 max-w-[24ch] text-[clamp(1.75rem,5.5vw,3.5rem)] leading-[0.98] font-extrabold tracking-[-0.02em]'>
      {text}
    </p>

    <ol className='mt-12 border-t-2 border-br-void'>
      {parts.map((part, index) => (
        <li
          key={part}
          className='grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b-2 border-br-void py-6 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-6 sm:py-7'
        >
          <span className={`${label} pt-1.5 tabular-nums opacity-70`}>{ordinal(index)}</span>
          <p className='max-w-[62ch] text-[1.0625rem] leading-[1.55] font-medium sm:text-[1.125rem]'>{part}</p>
        </li>
      ))}
    </ol>
  </li>
);

// A row of the contact list and of the record beside it: the field name small
// and tracked out at the left, the value large, a 2px rule under. Not a table
// and not a card; the rules are what makes it a list.
const Row: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => (
  <div className='grid gap-2 border-b-2 border-br-ink py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6 sm:py-8 dark:border-br-ink-dark'>
    <dt className={`${label} ${muted} sm:pt-2`}>{name}</dt>
    <dd className='br-narrow text-[1.25rem] leading-tight font-semibold break-words sm:text-[1.75rem]'>{children}</dd>
  </div>
);

const VariantCBoldAndRaw: React.FC = () => {
  const { identity, contact, employers, independentWork, recognitions, education, technologies, chrome } = useContent();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // The nameplate is the name broken onto one line per word, so it stacks into
  // a slab rather than running as a line of text. It is a drawing decision made
  // on the edition's own string; no word of it is this file's.
  const nameplate = identity.name.split(' ');

  const index = [
    { href: '#experience', label: chrome.sections.experience },
    { href: '#independent-work', label: chrome.sections.independentWork },
    { href: '#technologies', label: chrome.sections.technologies },
    { href: '#recognitions', label: chrome.sections.recognitions },
    { href: '#contact', label: chrome.sections.contact },
  ];

  // A recognition is one string ending in its date. The date comes out to sit
  // at the right of its row, and a string not written that way keeps its shape.
  const dated = (recognition: string): { text: string; date: string } => {
    const match = /^(.*)\s\(([^()]+)\)$/.exec(recognition);
    return match ? { text: match[1], date: match[2] } : { text: recognition, date: '' };
  };

  return (
    <div className='br-page bg-br-ground font-brutal text-br-ink min-h-screen dark:bg-br-ground-dark dark:text-br-ink-dark'>
      <div className={gutter}>
        <header>
          {/* The nameplate stacks a word per line and is set as tight as the
              name allows: 0.92 rather than the 0.82 the slab wants, because the
              acute on MENÉNDEZ climbs into the line above at anything closer. */}
          {/* The two controls the page carries, before anything else and at the
              smallest size on it: this variant spends its scale on the record,
              so its chrome is deliberately quiet. */}
          <div className='flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5'>
            <nav aria-label={chrome.language.label} className={`${label} flex items-center gap-3`}>
              <span aria-current='true' className='bg-br-ink text-br-ground px-2 py-1 dark:bg-br-ink-dark dark:text-br-ground-dark'>
                {chrome.language.current}
              </span>
              <a
                href={chrome.language.other.path}
                hrefLang={chrome.language.other.lang}
                aria-label={`${chrome.language.other.label} ${chrome.language.other.name}`}
                className={`${link} px-2 py-1`}
              >
                {chrome.language.other.label}
              </a>
            </nav>

            <button
              type='button'
              onClick={toggleDarkMode}
              className={`${label} border-2 border-br-ink px-3 py-1.5 transition-transform hover:bg-br-accent hover:text-br-void active:translate-y-0.5 dark:border-br-ink-dark`}
            >
              {isDarkMode ? chrome.nav.toLightMode : chrome.nav.toDarkMode}
            </button>
          </div>

          <h1 className='br-compress border-t-4 border-br-ink pt-6 pb-8 text-[clamp(3rem,15vw,11rem)] leading-[0.92] font-black uppercase tracking-[-0.035em] sm:pb-12 dark:border-br-ink-dark'>
            {nameplate.map((word, wordIndex) => (
              <span
                key={word}
                className='br-slam block'
                style={{ animationDelay: `${wordIndex * 90}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>
        </header>

        <main>
          {/* The identity line is set as a statement rather than as a
              standfirst: it is the largest running text on the page and the
              only thing in this band, which is what density 3 buys. */}
          <section id='home' className='border-t-2 border-br-ink py-10 sm:py-14 dark:border-br-ink-dark'>
            <p className='br-narrow max-w-[34ch] text-[clamp(1.375rem,4.2vw,2.375rem)] leading-[1.15] font-semibold tracking-[-0.015em]'>
              {identity.line}
            </p>

            {/* One CTA, one label, in one place on the page: the download is a
                bar rather than a button, and the Contact band at the bottom
                does not repeat it. */}
            <div className='mt-12 space-y-4'>
              {contact.cvs.map((cv) => (
                <a
                  key={cv.href}
                  href={cv.href}
                  download={cv.href.replace(/^.*\//, '')}
                  className='br-compress flex items-baseline justify-between gap-4 bg-br-accent px-4 py-6 text-[clamp(1.5rem,6vw,3rem)] leading-none font-black uppercase text-br-void transition-transform hover:bg-br-ink hover:text-br-ground active:translate-y-1 sm:px-8 dark:hover:bg-br-ink-dark dark:hover:text-br-ground-dark'
                >
                  <span>{cv.label}</span>
                  <span aria-hidden='true'>&#8595;</span>
                </a>
              ))}
            </div>

            <nav
              aria-label={chrome.nav.label}
              className='mt-12 border-t-2 border-br-ink pt-6 dark:border-br-ink-dark'
            >
              <ul className='flex flex-wrap gap-x-8 gap-y-3'>
                {index.map((entry, entryIndex) => (
                  <li key={entry.href} className='flex items-baseline gap-2'>
                    <span className={`${label} text-br-accent tabular-nums`}>{ordinal(entryIndex)}</span>
                    <a href={entry.href} className={`${label} ${link}`}>
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <Band id='experience'>
            <Heading number='01'>{chrome.sections.experience}</Heading>

            <div className='mt-14 space-y-20'>
              {employers.map((employer) => (
                <article key={employer.name}>
                  <div className='flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2'>
                    <h3 className='br-compress text-[clamp(1.75rem,6.5vw,3.25rem)] leading-[0.95] font-extrabold uppercase tracking-[-0.02em]'>
                      {employer.name}
                    </h3>
                    <p className={`${label} tabular-nums`}>{employer.span}</p>
                  </div>
                  <p className={`${label} ${muted} mt-3`}>{employer.location}</p>

                  <div className='mt-12 space-y-16'>
                    {employer.roles.map((role) => (
                      <div key={role.title + role.dates}>
                        <div className='flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1'>
                          <h4 className='br-narrow text-[1.25rem] leading-tight font-bold uppercase tracking-[0.01em] sm:text-[1.625rem]'>
                            {role.title}
                          </h4>
                          <p className={`${label} ${muted} tabular-nums`}>{role.dates}</p>
                        </div>

                        <ol className='mt-8 border-b-2 border-br-ink dark:border-br-ink-dark'>
                          {role.bullets.map((bullet, bulletIndex) =>
                            typeof bullet === 'string' ? (
                              <Statement key={bullet} number={ordinal(bulletIndex)}>
                                {bullet}
                              </Statement>
                            ) : (
                              <Programme
                                key={bullet.text}
                                number={ordinal(bulletIndex)}
                                text={bullet.text}
                                parts={bullet.subBullets}
                              />
                            ),
                          )}
                        </ol>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Band>

          <Band id='independent-work'>
            <Heading number='02'>{chrome.sections.independentWork}</Heading>

            {/* Two entries, set as two bands and not as two cards: the second
                one is longer than the first and is allowed to be. */}
            <div className='mt-14'>
              {independentWork.map((entry, entryIndex) => (
                <div
                  key={entry.name}
                  className='grid gap-x-6 gap-y-4 border-t-2 border-br-ink py-10 sm:grid-cols-[4rem_minmax(0,1fr)] dark:border-br-ink-dark'
                >
                  <span className={`${label} ${muted} tabular-nums sm:pt-3`}>{ordinal(entryIndex)}</span>
                  <div>
                    <h3 className='br-compress text-[clamp(1.5rem,5vw,2.5rem)] leading-[1] font-extrabold uppercase tracking-[-0.02em]'>
                      {entry.name}
                    </h3>
                    <p className='mt-5 max-w-[62ch] text-[1.0625rem] leading-[1.55] sm:text-[1.1875rem]'>
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Band>

          <Band id='technologies'>
            <Heading number='03'>{chrome.sections.technologies}</Heading>

            {/* The ticker is the page's loudest piece of motion and the one
                thing on it that repeats: a stack of technologies set as chips
                would be a grid of boxes, which this page does not have. It runs
                edge to edge, clips rather than scrolls the document, and stands
                still and wraps into a plain block for a reader who asks. The
                wrap is on the list rather than on the rail that carries the two
                copies of it: the rail has one child once the echo is hidden,
                and one child never wraps. */}
            <div className={`${bleed} mt-14 overflow-hidden border-y-4 border-br-ink py-6 dark:border-br-ink-dark`}>
              <div className='br-ticker flex w-max gap-8 whitespace-nowrap px-4 sm:gap-12 sm:px-8'>
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    aria-hidden={copy === 1 ? 'true' : undefined}
                    className={`br-ticker-row flex gap-8 sm:gap-12 ${copy === 1 ? 'br-ticker-echo' : ''}`}
                  >
                    {technologies.map((technology) => (
                      <li
                        key={technology}
                        className='br-compress text-[clamp(1.75rem,5vw,3rem)] leading-none font-black uppercase tracking-[-0.01em]'
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </Band>

          <Band id='recognitions'>
            <Heading number='04'>{chrome.sections.recognitions}</Heading>

            <ul className='mt-14 border-t-2 border-br-ink dark:border-br-ink-dark'>
              {recognitions.map((recognition) => {
                const { text, date } = dated(recognition);

                return (
                  <li
                    key={recognition}
                    className='flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b-2 border-br-ink py-6 dark:border-br-ink-dark'
                  >
                    <p className='br-narrow max-w-[46ch] text-[1.125rem] leading-tight font-semibold sm:text-[1.5rem]'>
                      {text}
                    </p>
                    {date ? <p className={`${label} ${muted} tabular-nums`}>{date}</p> : null}
                  </li>
                );
              })}
            </ul>

            {/* Education is folded in here rather than given a band of its own,
                and it is the one block on the page drawn in reverse: ink ground,
                paper type. It is the record's footing, not a sixth section. */}
            <div className='mt-12 bg-br-ink px-4 py-10 text-br-ground sm:px-8 dark:bg-br-ink-dark dark:text-br-ground-dark'>
              <p className={`${label} text-br-accent`}>{chrome.recognitions.education}</p>
              <p className='br-compress mt-5 max-w-[24ch] text-[clamp(1.5rem,4.5vw,2.5rem)] leading-[1.02] font-extrabold uppercase tracking-[-0.02em]'>
                {education.degree}
              </p>
              <p className='br-narrow mt-5 text-[1.0625rem] font-medium sm:text-[1.25rem]'>
                {education.institution}
                <span className='mx-2 text-br-accent'>&#47;</span>
                <span className='tabular-nums'>{education.years}</span>
              </p>
              <p className='br-narrow mt-2 text-[1.0625rem] opacity-80 sm:text-[1.25rem]'>{education.languages}</p>
            </div>
          </Band>

          {/* Every route to Fran is here and only here. The masthead carries the
              CV and the index; the bottom of the page carries the ways to reach
              him, so neither repeats the other. */}
          <Band id='contact'>
            <Heading number='05'>{chrome.sections.contact}</Heading>

            <dl className='mt-14 border-t-2 border-br-ink dark:border-br-ink-dark'>
              <Row name={chrome.contact.email}>
                <a href={`mailto:${contact.email}`} className={link}>
                  {contact.email}
                </a>
              </Row>

              <Row name={chrome.contact.linkedin}>
                <a href={contact.linkedin} target='_blank' rel='noopener noreferrer' className={link}>
                  {contact.linkedinLabel}
                </a>
              </Row>

              {/* A brand rather than a word, so it is spelled the same in every
                  edition and is written here rather than in the content module. */}
              <Row name='GitHub'>
                <a href={contact.github} target='_blank' rel='noopener noreferrer' className={link}>
                  {contact.github.replace(/^https:\/\//, '')}
                </a>
              </Row>

              <Row name={chrome.contact.location}>
                {identity.location}
                <span className='mx-2 text-br-accent'>&#47;</span>
                {identity.mode}
              </Row>
            </dl>
          </Band>
        </main>

        <footer className='border-t-4 border-br-ink py-10 dark:border-br-ink-dark'>
          <p className={`${label} ${muted} tabular-nums`}>
            &copy; {new Date().getFullYear()} {identity.name}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default VariantCBoldAndRaw;
