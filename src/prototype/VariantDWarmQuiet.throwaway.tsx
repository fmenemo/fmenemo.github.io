// THROWAWAY. The plan: five variants on the existing route, switchable by `variant`.
//
// Design read: a credibility anchor for a recruiter who already has the name, set as a warm and quiet letter-weight page in a soft humanist language, one narrow measure of warm paper with the person stated before the record and space doing the dividing; variance 5, motion 3, density 2.
//
// What that means in the drawing. One column, 34rem wide, from the first word
// to the last: no rail, no rules, no cards, no bands, no imagery. Nothing on
// the page divides anything; the space between two blocks is what says they are
// two. The person comes first and is the loudest thing on the page: the
// identity line is set at reading size and above it the name is a quiet line
// rather than a nameplate, because a reader who already has the name does not
// need it shouted back. Section names are the smallest type here, set in
// letterspaced caps, so the record outranks the labels over it: they are
// headings drawn quietly and not eyebrows, and no heading on this page carries
// a second label above it.
//
// The Shop programme is a story told in order, so it is numbered: the headline
// says what the programme was and the parts run 1 to 9 under it, in sequence,
// which is the one place a figure leads a line. Every date on the page sits
// under the thing it belongs to as a caption rather than out in a margin, which
// is what lets the column stay one column at every width. The routes live once,
// at the end, and the CV lives once, at the top beside the person; nothing on
// the page asks for the same click twice. The theme and the edition are two
// words in the top line, in the same voice as the rest of it.
//
// Motion is one settling entrance on the opening block and nothing else, and it
// stops for a visitor who asks it to.
import React from 'react';
import { useContent } from '../hooks/useContent';
import { useDarkMode } from '../hooks/useDarkMode';

// A section is a quiet name and the space around it. The heading is small on
// purpose: on this page the evidence is the large type and the label over it is
// the small type, which is the inversion the whole variant rests on.
const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className='pt-20 sm:pt-28'>
    <h2 className='text-[0.6875rem] uppercase tracking-[0.22em] text-wq-faint dark:text-wq-faint-dark'>{title}</h2>
    <div className='mt-9'>{children}</div>
  </section>
);

const link =
  'text-wq-ink underline decoration-wq-accent/50 decoration-1 underline-offset-[0.28em] transition-colors hover:text-wq-accent dark:text-wq-ink-dark dark:decoration-wq-accent-dark/50 dark:hover:text-wq-accent-dark';

const quietLink =
  'text-wq-muted underline decoration-wq-faint/60 decoration-1 underline-offset-[0.25em] transition-colors hover:text-wq-accent dark:text-wq-muted-dark dark:decoration-wq-faint-dark/60 dark:hover:text-wq-accent-dark';

const evidence = 'text-[1.0625rem] leading-[1.85]';

const caption = 'text-[0.8125rem] tracking-[0.02em] text-wq-faint tabular-nums dark:text-wq-faint-dark';

// One statement of evidence, hung off a soft dash in the accent. The dash sits
// in the indent rather than in the text, so the second line of a statement
// begins where the first one does and the left edge of the column holds.
const Statement: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className={`relative pl-6 ${evidence}`}>
    <span aria-hidden='true' className='absolute left-0 top-0 text-wq-accent dark:text-wq-accent-dark'>
      &#8211;
    </span>
    {children}
  </li>
);

// The programme, told in order. The parts are numbered because the sequence is
// the point: this is the one bullet on the page that is a story rather than a
// statement, and a number is the quietest way to say "and then".
const Programme: React.FC<{ text: string; parts: string[] }> = ({ text, parts }) => (
  <li className='relative pl-6'>
    <span aria-hidden='true' className='absolute left-0 top-0 text-wq-accent dark:text-wq-accent-dark'>
      &#8211;
    </span>
    <p className={evidence}>{text}</p>
    <ol className='mt-6 space-y-5'>
      {parts.map((part, index) => (
        <li key={part} className='grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline'>
          <span
            aria-hidden='true'
            className='font-warm-display text-[0.9375rem] text-wq-accent tabular-nums dark:text-wq-accent-dark'
          >
            {index + 1}
          </span>
          <p className='text-[1rem] leading-[1.8] text-wq-muted dark:text-wq-muted-dark'>{part}</p>
        </li>
      ))}
    </ol>
  </li>
);

const VariantDWarmQuiet: React.FC = () => {
  const { identity, contact, employers, independentWork, recognitions, education, technologies, chrome } = useContent();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // A recognition is one string ending in its date. The date comes out of the
  // line and sits under it as a caption, in the same place every other date on
  // this page sits. A string that does not end that way is left whole.
  const dated = (recognition: string): { text: string; date: string } => {
    const match = /^(.*)\s\(([^()]+)\)$/.exec(recognition);
    return match ? { text: match[1], date: match[2] } : { text: recognition, date: '' };
  };

  return (
    <div className='wq-page min-h-screen bg-wq-paper font-warm-text text-wq-ink dark:bg-wq-paper-dark dark:text-wq-ink-dark'>
      <div className='mx-auto w-full max-w-[34rem] px-6 pb-24 sm:px-8'>
        {/* Two words and a middot: the edition, and what the theme control will
            do next. No bar, no border, no icons — the page opens on the person,
            so nothing above the person is allowed to weigh anything. */}
        <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-8 text-[0.6875rem] uppercase tracking-[0.18em]'>
          <nav aria-label={chrome.language.label} className='flex items-baseline gap-2'>
            <span aria-current='true' className='text-wq-muted dark:text-wq-muted-dark'>
              {chrome.language.current}
            </span>
            <span aria-hidden='true' className='text-wq-faint dark:text-wq-faint-dark'>
              &middot;
            </span>
            <a
              href={chrome.language.other.path}
              hrefLang={chrome.language.other.lang}
              aria-label={`${chrome.language.other.label} ${chrome.language.other.name}`}
              className={quietLink}
            >
              {chrome.language.other.label}
            </a>
          </nav>

          <span aria-hidden='true' className='text-wq-faint dark:text-wq-faint-dark'>
            &middot;
          </span>

          <button type='button' onClick={toggleDarkMode} className={`${quietLink} uppercase tracking-[0.18em]`}>
            {isDarkMode ? chrome.nav.toLightMode : chrome.nav.toDarkMode}
          </button>
        </div>

        <main>
          {/* The person, before the record. The name is a line and the identity
              line is the paragraph under it, which is the way round a reader who
              already has the name needs. */}
          <section id='home' className='wq-settle pt-20 sm:pt-28'>
            <h1 className='font-warm-display text-[1.875rem] font-normal leading-[1.25] tracking-[-0.01em] sm:text-[2.25rem]'>
              {identity.name}
            </h1>

            <p className={`mt-3 ${caption}`}>
              {identity.location} &middot; {identity.mode}
            </p>

            <p className='mt-9 text-[1.1875rem] leading-[1.8] sm:text-[1.25rem] sm:leading-[1.8]'>{identity.line}</p>

            {/* The CV, once, here. It is the one thing on the page a reader may
                have come for rather than come to read, so it sits with the
                person and is not offered again further down. */}
            <p className='mt-10'>
              {contact.cvs.map((cv) => (
                <a
                  key={cv.href}
                  href={cv.href}
                  download={cv.href.replace(/^.*\//, '')}
                  className='text-[1.0625rem] text-wq-accent underline decoration-wq-accent/40 decoration-1 underline-offset-[0.3em] transition-colors hover:decoration-wq-accent dark:text-wq-accent-dark dark:decoration-wq-accent-dark/40 dark:hover:decoration-wq-accent-dark'
                >
                  {cv.label}
                </a>
              ))}
            </p>
          </section>

          <Section id='experience' title={chrome.sections.experience}>
            <div className='space-y-20'>
              {employers.map((employer) => (
                <article key={employer.name}>
                  <h3 className='font-warm-display text-[1.375rem] leading-snug'>{employer.name}</h3>
                  <p className={`mt-2 ${caption}`}>
                    {employer.span} &middot; {employer.location}
                  </p>

                  <div className='mt-10 space-y-14'>
                    {employer.roles.map((role) => (
                      <div key={role.title + role.dates}>
                        <h4 className='text-[1.0625rem] font-medium'>{role.title}</h4>
                        <p className={`mt-1.5 ${caption}`}>{role.dates}</p>

                        <ul className='mt-7 space-y-7'>
                          {role.bullets.map((bullet) =>
                            typeof bullet === 'string' ? (
                              <Statement key={bullet}>{bullet}</Statement>
                            ) : (
                              <Programme key={bullet.text} text={bullet.text} parts={bullet.subBullets} />
                            ),
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id='independent-work' title={chrome.sections.independentWork}>
            <div className='space-y-12'>
              {independentWork.map((entry) => (
                <article key={entry.name}>
                  <h3 className='font-warm-display text-[1.1875rem] leading-snug'>{entry.name}</h3>
                  <p className={`mt-3 ${evidence}`}>{entry.description}</p>
                </article>
              ))}
            </div>
          </Section>

          {/* Recognitions and education under one name: they are the same kind
              of fact about the same person, and two labels for them would be
              two labels where the page has been spending one. */}
          <Section id='recognitions' title={chrome.sections.recognitions}>
            <ul className='space-y-7'>
              {recognitions.map((recognition) => {
                const { text, date } = dated(recognition);

                return (
                  <li key={recognition}>
                    <p className='text-[1.0625rem] leading-[1.6]'>{text}</p>
                    {date && <p className={`mt-1.5 ${caption}`}>{date}</p>}
                  </li>
                );
              })}
            </ul>

            <div className='mt-14'>
              <h3 className='text-[0.6875rem] uppercase tracking-[0.22em] text-wq-faint dark:text-wq-faint-dark'>
                {chrome.recognitions.education}
              </h3>
              <p className='mt-4 text-[1.0625rem] leading-[1.6]'>{education.degree}</p>
              <p className='mt-1.5 text-[1.0625rem] text-wq-muted dark:text-wq-muted-dark'>{education.institution}</p>
              <p className={`mt-1.5 ${caption}`}>{education.years}</p>
              <p className='mt-4 text-[1.0625rem] text-wq-muted dark:text-wq-muted-dark'>{education.languages}</p>
            </div>
          </Section>

          {/* Running text at a wide leading, not chips: a chip is a card the
              size of a word, and there is not a card anywhere else here. */}
          <Section id='technologies' title={chrome.sections.technologies}>
            <p className='text-[1.0625rem] leading-[2.1] text-wq-muted dark:text-wq-muted-dark'>
              {technologies.join(' · ')}
            </p>
          </Section>

          {/* The routes, once, at the end: the top of the page gave the person,
              where they are and the CV, and the bottom gives the ways to reach
              them. Neither half repeats the other. */}
          <Section id='contact' title={chrome.sections.contact}>
            <ul className='space-y-5 text-[1.0625rem]'>
              <li>
                <a href={`mailto:${contact.email}`} className={link}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target='_blank' rel='noopener noreferrer' className={link}>
                  {contact.linkedinLabel}
                </a>
              </li>
              <li>
                <a href={contact.github} target='_blank' rel='noopener noreferrer' className={link}>
                  {contact.github.replace(/^https:\/\//, '')}
                </a>
              </li>
            </ul>
          </Section>
        </main>

        <footer className='pt-20 sm:pt-28'>
          <p className={caption}>
            &copy; {new Date().getFullYear()} {identity.name}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default VariantDWarmQuiet;
