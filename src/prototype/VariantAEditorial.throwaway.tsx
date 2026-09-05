// THROWAWAY. The plan: five variants on the existing route, switchable by `variant`.
//
// Design read: a credibility anchor for a recruiter who already has the name, set as an editorial document rather than an app, in a typographic language built on one variable serif, a generous measure and a margin rail every date and figure aligns on; variance 6, motion 3, density 3.
//
// What that means in the drawing. The page is a nameplate, a standfirst and a
// record: no cards, no chips, no bands of colour, no imagery. Every date, span
// and label sits in a right-aligned rail down the left of the document, so the
// numbers line up from the first employer to the last recognition and the page
// reads as a record. The evidence is set as paragraphs rather than as bullets,
// because a reader who came to check the claims reads them; and the Shop
// programme is a passage, a lede with its parts under one pair of hairlines,
// rather than an indented list. Motion is one entrance on the nameplate and
// nothing else, and it stops for a visitor who asks it to.
import React from 'react';
import { useContent } from '../hooks/useContent';
import { useDarkMode } from '../hooks/useDarkMode';

// The document's one structural device: a narrow margin rail carrying the
// dates and the labels, and the text beside it. Below the fold of a phone the
// rail stacks above its text, which is the only thing that changes at 320px.
const Row: React.FC<{ margin: React.ReactNode; children: React.ReactNode; className?: string }> = ({
  margin,
  children,
  className = '',
}) => (
  <div className={`grid gap-x-8 gap-y-1 md:grid-cols-[8rem_minmax(0,1fr)] ${className}`}>
    <div className='pt-1 text-sm text-ed-muted tabular-nums md:text-right dark:text-ed-muted-dark'>{margin}</div>
    <div className='min-w-0'>{children}</div>
  </div>
);

const Measure: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-[66ch] ${className}`}>{children}</div>
);

// A heading and the hairline it sits under. No eyebrow, no number, no label:
// where a section is in the document is what says what it is.
const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className='border-b border-ed-rule pb-3 text-[1.75rem] leading-tight sm:text-[2rem] dark:border-ed-rule-dark'>
    {children}
  </h2>
);

const link =
  'text-ed-accent underline decoration-from-font underline-offset-[0.2em] transition-colors hover:text-ed-ink dark:text-ed-accent-dark dark:hover:text-ed-ink-dark';

const evidence = 'text-[1.0625rem] leading-[1.7]';

// The parts of a programme, set as one passage between two hairlines. Not
// indented and not marked: the headline above them says what they are parts of,
// and the rules say where the passage begins and ends.
const Programme: React.FC<{ text: string; parts: string[] }> = ({ text, parts }) => (
  <div className={evidence}>
    <p>{text}</p>
    <div className='mt-5 space-y-4 border-y border-ed-rule py-5 text-[1rem] text-ed-muted dark:border-ed-rule-dark dark:text-ed-muted-dark'>
      {parts.map((part) => (
        <p key={part}>{part}</p>
      ))}
    </div>
  </div>
);

const VariantAEditorial: React.FC = () => {
  const { identity, contact, employers, independentWork, recognitions, education, technologies, chrome } = useContent();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const contents = [
    { href: '#experience', label: chrome.sections.experience },
    { href: '#independent-work', label: chrome.sections.independentWork },
    { href: '#recognitions', label: chrome.sections.recognitions },
    { href: '#technologies', label: chrome.sections.technologies },
    { href: '#contact', label: chrome.sections.contact },
  ];

  // A recognition is one string ending in its date, and the date belongs in the
  // rail with every other number on the page. A string that does not end that
  // way keeps its shape and sits in the text column whole.
  const dated = (recognition: string): { text: string; date: string } => {
    const match = /^(.*)\s\(([^()]+)\)$/.exec(recognition);
    return match ? { text: match[1], date: match[2] } : { text: recognition, date: '' };
  };

  return (
    <div className='ed-page min-h-screen bg-ed-paper font-editorial text-ed-ink dark:bg-ed-paper-dark dark:text-ed-ink-dark'>
      <div className='mx-auto w-full max-w-[54rem] px-5 sm:px-8'>
        <header className='ed-rise'>
          <div className='flex items-baseline justify-between gap-4 border-b border-ed-rule py-4 text-sm dark:border-ed-rule-dark'>
            <nav aria-label={chrome.language.label} className='flex items-baseline gap-2'>
              <span aria-current='true'>{chrome.language.current}</span>
              <span aria-hidden='true' className='text-ed-rule dark:text-ed-rule-dark'>
                /
              </span>
              <a
                href={chrome.language.other.path}
                hrefLang={chrome.language.other.lang}
                aria-label={`${chrome.language.other.label} ${chrome.language.other.name}`}
                className={link}
              >
                {chrome.language.other.label}
              </a>
            </nav>

            {/* The control says what it will do, in words, in the edition's
                language. A document does not carry a switch; it carries a
                note in the margin. */}
            <button type='button' onClick={toggleDarkMode} className={`${link} text-right`}>
              {isDarkMode ? chrome.nav.toLightMode : chrome.nav.toDarkMode}
            </button>
          </div>

          <h1 className='border-b-[3px] border-double border-ed-ink py-8 text-center text-[clamp(2.5rem,11vw,5rem)] leading-[0.95] tracking-[-0.015em] sm:py-12 dark:border-ed-ink-dark'>
            {identity.name}
          </h1>
        </header>

        <main>
          <section id='home' className='ed-rise py-10 sm:py-14'>
            <Measure>
              {/* The identity line is the standfirst, and the only place on the
                  page set at this size. The initial is the one flourish the
                  variant allows itself. */}
              <p className='text-[1.1875rem] leading-[1.5] first-letter:mr-2 first-letter:float-left first-letter:text-[3.25rem] first-letter:leading-[0.82] sm:text-[1.5rem] sm:leading-[1.45] sm:first-letter:text-[4.25rem]'>
                {identity.line}
              </p>
            </Measure>

            <div className='mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3'>
              {contact.cvs.map((cv, index) => (
                <a
                  key={cv.href}
                  href={cv.href}
                  download={cv.href.replace(/^.*\//, '')}
                  className={
                    index === 0
                      ? 'border-b-2 border-ed-accent pb-1 text-lg text-ed-ink transition-colors hover:border-ed-ink dark:border-ed-accent-dark dark:text-ed-ink-dark dark:hover:border-ed-ink-dark'
                      : link
                  }
                >
                  {cv.label}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className={link}>
                {contact.email}
              </a>
              <a href={contact.linkedin} target='_blank' rel='noopener noreferrer' className={link}>
                {contact.linkedinLabel}
              </a>
            </div>

            <p className='mt-6 text-sm text-ed-muted dark:text-ed-muted-dark'>
              {identity.location}, {identity.mode}
            </p>

            {/* The contents of the document, which is what a masthead is on a
                page that is one document rather than a set of them. */}
            <nav
              aria-label={chrome.nav.label}
              className='mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-ed-rule pt-5 text-sm dark:border-ed-rule-dark'
            >
              {contents.map((entry) => (
                <a key={entry.href} href={entry.href} className={link}>
                  {entry.label}
                </a>
              ))}
            </nav>
          </section>

          <section id='experience' className='py-10 sm:py-14'>
            <Heading>{chrome.sections.experience}</Heading>

            <div className='mt-10 space-y-14'>
              {employers.map((employer) => (
                <article key={employer.name}>
                  <Row margin={<span className='block'>{employer.span}</span>}>
                    <h3 className='text-[1.5rem] leading-tight sm:text-[1.75rem]'>{employer.name}</h3>
                    <p className='mt-1 text-sm text-ed-muted dark:text-ed-muted-dark'>{employer.location}</p>
                  </Row>

                  <div className='mt-8 space-y-10'>
                    {employer.roles.map((role) => (
                      <Row key={role.title + role.dates} margin={role.dates}>
                        <h4 className='text-[1.125rem] font-semibold'>{role.title}</h4>

                        <Measure className='mt-4 space-y-5'>
                          {role.bullets.map((bullet) =>
                            typeof bullet === 'string' ? (
                              <p key={bullet} className={evidence}>
                                {bullet}
                              </p>
                            ) : (
                              <Programme key={bullet.text} text={bullet.text} parts={bullet.subBullets} />
                            ),
                          )}
                        </Measure>
                      </Row>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id='independent-work' className='py-10 sm:py-14'>
            <Heading>{chrome.sections.independentWork}</Heading>

            <div className='mt-10 space-y-10'>
              {independentWork.map((entry) => (
                <Row key={entry.name} margin={<span className='md:hidden' />}>
                  <Measure>
                    <h3 className='text-[1.25rem]'>{entry.name}</h3>
                    <p className={`mt-3 ${evidence}`}>{entry.description}</p>
                  </Measure>
                </Row>
              ))}
            </div>
          </section>

          <section id='recognitions' className='py-10 sm:py-14'>
            <Heading>{chrome.sections.recognitions}</Heading>

            {/* The date rail is what separates one line from the next: a
                hairline under every row of a list this long draws a table, and
                a recognition is a line of a record rather than a row of one. */}
            <ul className='mt-10 space-y-4'>
              {recognitions.map((recognition) => {
                const { text, date } = dated(recognition);

                return (
                  <li key={recognition}>
                    <Row margin={date}>
                      <p className='text-[1.0625rem]'>{text}</p>
                    </Row>
                  </li>
                );
              })}
            </ul>

            <Row className='mt-10' margin={education.years}>
              <Measure>
                <p className='text-sm text-ed-muted dark:text-ed-muted-dark'>{chrome.recognitions.education}</p>
                <p className='mt-1 text-[1.0625rem]'>
                  {education.degree}, {education.institution}
                </p>
                <p className='mt-1 text-[1.0625rem] text-ed-muted dark:text-ed-muted-dark'>{education.languages}</p>
              </Measure>
            </Row>
          </section>

          <section id='technologies' className='py-10 sm:py-14'>
            <Heading>{chrome.sections.technologies}</Heading>

            <Measure className='mt-8'>
              {/* Running text, in the same voice as everything else on the page:
                  a list of technologies set as chips would be the one place the
                  document stopped being one. */}
              <p className='text-[1.0625rem] leading-[1.9]'>{technologies.join(', ')}</p>
            </Measure>
          </section>

          <section id='contact' className='py-10 sm:py-14'>
            <Heading>{chrome.sections.contact}</Heading>

            <dl className='mt-10'>
              <div className='border-b border-ed-rule py-4 dark:border-ed-rule-dark'>
                <Row margin={<dt>{chrome.contact.email}</dt>}>
                  <dd className='text-[1.0625rem]'>
                    <a href={`mailto:${contact.email}`} className={link}>
                      {contact.email}
                    </a>
                  </dd>
                </Row>
              </div>

              <div className='border-b border-ed-rule py-4 dark:border-ed-rule-dark'>
                <Row margin={<dt>{chrome.contact.linkedin}</dt>}>
                  <dd className='text-[1.0625rem]'>
                    <a href={contact.linkedin} target='_blank' rel='noopener noreferrer' className={link}>
                      {contact.linkedinLabel}
                    </a>
                  </dd>
                </Row>
              </div>

              {/* A brand rather than a word, so it is the same in every edition
                  and is written here rather than in the content module. */}
              <div className='border-b border-ed-rule py-4 dark:border-ed-rule-dark'>
                <Row margin={<dt>GitHub</dt>}>
                  <dd className='text-[1.0625rem]'>
                    <a href={contact.github} target='_blank' rel='noopener noreferrer' className={link}>
                      {contact.github.replace(/^https:\/\//, '')}
                    </a>
                  </dd>
                </Row>
              </div>

              <div className='py-4'>
                <Row margin={<dt>{chrome.contact.location}</dt>}>
                  <dd className='text-[1.0625rem]'>
                    {identity.location}, {identity.mode}
                  </dd>
                </Row>
              </div>
            </dl>

            <div className='mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3'>
              {contact.cvs.map((cv) => (
                <a
                  key={cv.href}
                  href={cv.href}
                  download={cv.href.replace(/^.*\//, '')}
                  className={link}
                >
                  {cv.label}
                </a>
              ))}
            </div>
          </section>
        </main>

        <footer className='border-t border-ed-rule py-8 text-sm text-ed-muted dark:border-ed-rule-dark dark:text-ed-muted-dark'>
          <p>
            &copy; {new Date().getFullYear()} {identity.name}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default VariantAEditorial;
