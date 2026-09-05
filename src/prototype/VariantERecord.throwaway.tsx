// THROWAWAY. The plan: five variants on the existing route, switchable by `variant`.
//
// Design read: a credibility anchor for a recruiter who already has the name, set as the record itself rather than as a page about it, in a dense index language of running heads, field labels and numbered entries, drawn in one grotesque at two widths on a manila stock; variance 6, motion 2, density 7.
//
// What that means in the drawing. Every line on the page belongs to a column:
// the dates and the field labels down the left, the index numbers of the
// entries beside them, the evidence in the one wide column that is left. The
// page treats density as the point, so the rhythm is tight and the hairlines
// are rationed: a rule separates one employer from the next and one recognition
// from the next, and nothing else on the page is boxed, banded or carded. The
// Shop programme is an entry with sub-entries numbered under it, `1.1` to
// `1.9`, which is how a record nests. Nothing moves on its own; the one moving
// thing is the rule drawn under a link the pointer or the keyboard reaches.
import React from 'react';
import type { Bullet } from '../content';
import { useContent } from '../hooks/useContent';
import { useDarkMode } from '../hooks/useDarkMode';

const rule = 'border-rc-rule dark:border-rc-rule-dark';
const hair = 'border-rc-hair dark:border-rc-hair-dark';
const muted = 'text-rc-muted dark:text-rc-muted-dark';
const accent = 'text-rc-accent dark:text-rc-accent-dark';

// The one voice the page says anything about itself in: narrow, uppercase,
// tracked open and small. Field labels, running heads, index numbers and the
// controls all wear it, so the record's own hand is never mistaken for the
// record.
const hand = 'rc-narrow text-[0.6875rem] uppercase tracking-[0.16em]';

const link = `rc-link ${accent}`;

// A field of the ledger: a label in the hand, a value beside it. The label
// column is fixed so that every value on the page starts on the same vertical,
// which is the whole of the alignment the design read asks for.
const Field: React.FC<{ label: React.ReactNode; children: React.ReactNode }> = ({ label, children }) => (
  <div className={`grid gap-x-6 gap-y-0.5 border-t py-2 sm:grid-cols-[7rem_minmax(0,1fr)] ${hair}`}>
    <div className={`${hand} ${muted} pt-[0.3rem]`}>{label}</div>
    <div className='min-w-0 text-[0.9375rem] leading-[1.5]'>{children}</div>
  </div>
);

// An entry of the record: its index number, hanging, and the statement. Sub
// entries carry the parent's number and their own, `1.4`, and sit in the same
// column as their parent's text rather than indented away from it.
const Entry: React.FC<{ index: string; children: React.ReactNode; className?: string }> = ({
  index,
  children,
  className = '',
}) => (
  <div className={`grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[2.75rem_minmax(0,1fr)] ${className}`}>
    <div className={`${hand} ${muted} pt-[0.35rem]`}>{index}</div>
    <div className='min-w-0'>{children}</div>
  </div>
);

const evidence = 'max-w-[74ch] text-[0.9375rem] leading-[1.55]';

// A section's running head: its number and its name, on a rule, in the hand.
// The number is the only thing the page numbers, which is what stops the index
// at the top from being decoration.
const RunningHead: React.FC<{ index: string; children: React.ReactNode }> = ({ index, children }) => (
  <div className={`flex items-baseline gap-4 border-t-2 pt-2 ${rule}`}>
    <span className={`${hand} ${accent}`}>{index}</span>
    <h2 className={`${hand} ${muted}`}>{children}</h2>
  </div>
);

// A recognition is one string ending in its date; the date belongs in the left
// column with every other figure on the page. A string that does not end that
// way keeps its shape and sits whole in the text column.
const dated = (recognition: string): { text: string; date: string } => {
  const match = /^(.*)\s\(([^()]+)\)$/.exec(recognition);
  return match ? { text: match[1], date: match[2] } : { text: recognition, date: '' };
};

const isNested = (bullet: Bullet): bullet is Exclude<Bullet, string> => typeof bullet !== 'string';

const VariantERecord: React.FC = () => {
  const { identity, contact, employers, independentWork, recognitions, education, technologies, chrome } = useContent();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const index = [
    { href: '#experience', label: chrome.sections.experience },
    { href: '#independent-work', label: chrome.sections.independentWork },
    { href: '#recognitions', label: chrome.sections.recognitions },
    { href: '#technologies', label: chrome.sections.technologies },
    { href: '#contact', label: chrome.sections.contact },
  ];

  return (
    <div className='rc-page min-h-screen bg-rc-stock font-record text-rc-ink dark:bg-rc-stock-dark dark:text-rc-ink-dark'>
      {/* The running head. It stays at the top edge of the page the way a
          running head stays at the top edge of every leaf of a dossier: the
          name of the record, and the two things a reader may change about how
          it is shown. */}
      <div className={`sticky top-0 z-10 border-b bg-rc-stock/95 backdrop-blur-[2px] ${rule} dark:bg-rc-stock-dark/95`}>
        <div className='mx-auto flex w-full max-w-[72rem] items-baseline gap-4 px-4 py-2 sm:px-8'>
          <p className={`${hand} min-w-0 flex-1 truncate`}>{identity.name}</p>

          <nav aria-label={chrome.language.label} className={`${hand} flex items-baseline gap-2`}>
            <span aria-current='true'>{chrome.language.current}</span>
            <span aria-hidden='true' className={muted}>
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

          {/* The theme control is a field of the record like any other: it
              says what it will do, in the edition's own words, in the hand. */}
          <button type='button' onClick={toggleDarkMode} className={`${hand} ${link} shrink-0 text-right`}>
            {isDarkMode ? chrome.nav.toLightMode : chrome.nav.toDarkMode}
          </button>
        </div>
      </div>

      <div className='mx-auto w-full max-w-[72rem] px-4 sm:px-8'>
        <main>
          <section id='home' className='pt-8 pb-12 sm:pt-12'>
            <h1 className='rc-wide text-[clamp(2.25rem,9.5vw,5rem)] leading-[0.92] font-semibold tracking-[-0.02em] uppercase'>
              {identity.name}
            </h1>

            {/* The identity line is the record's summary, set as one column
                at every width; the measure is capped so that the line stays
                readable on the widest screens. */}
            <p
              className={`mt-6 max-w-[68ch] border-t-2 pt-6 text-[1.0625rem] leading-[1.5] ${rule}`}
            >
              {identity.line}
            </p>

            <div className='mt-10 grid gap-x-14 lg:grid-cols-2'>
              <div>
                <Field label={chrome.contact.location}>
                  {identity.location}, {identity.mode}
                </Field>
                <Field label={chrome.contact.email}>
                  <a href={`mailto:${contact.email}`} className={link}>
                    {contact.email}
                  </a>
                </Field>
                <Field label={chrome.contact.linkedin}>
                  <a href={contact.linkedin} target='_blank' rel='noopener noreferrer' className={link}>
                    {contact.linkedinLabel}
                  </a>
                </Field>
                {/* A brand rather than a word, so it is the same in every
                    edition and is written here rather than in the content
                    module. */}
                <Field label='GitHub'>
                  <a href={contact.github} target='_blank' rel='noopener noreferrer' className={link}>
                    {contact.github.replace(/^https:\/\//, '')}
                  </a>
                </Field>

                {/* The one thing on the page a reader is asked to take away,
                    and the one thing drawn as an object rather than as a line.
                    It sits in the identification block and nowhere else: a
                    record does not ask twice. */}
                <div className={`mt-6 flex flex-wrap gap-3 border-t pt-6 ${hair}`}>
                  {contact.cvs.map((cv) => (
                    <a
                      key={cv.href}
                      href={cv.href}
                      download={cv.href.replace(/^.*\//, '')}
                      className={`${hand} border-2 border-rc-accent px-4 py-2.5 transition-colors hover:bg-rc-accent hover:text-rc-stock dark:border-rc-accent-dark dark:hover:bg-rc-accent-dark dark:hover:text-rc-stock-dark`}
                    >
                      {cv.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* The contents of the record, numbered with the numbers the
                  running heads carry. */}
              <nav aria-label={chrome.nav.label} className='mt-10 lg:mt-0'>
                {index.map((entry, position) => (
                  <a
                    key={entry.href}
                    href={entry.href}
                    className={`flex items-baseline gap-4 border-t py-2.5 ${hair}`}
                  >
                    <span className={`${hand} ${muted}`}>{String(position + 1).padStart(2, '0')}</span>
                    <span className={`rc-link ${accent} text-[0.9375rem]`}>{entry.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </section>

          <section id='experience' className='pb-12'>
            <RunningHead index='01'>{chrome.sections.experience}</RunningHead>

            <div className='mt-6 space-y-10'>
              {employers.map((employer, employerIndex) => (
                <article key={employer.name} className={employerIndex > 0 ? `border-t pt-10 ${rule}` : ''}>
                  <div className='grid gap-x-6 gap-y-1 sm:grid-cols-[9.5rem_minmax(0,1fr)]'>
                    <p className={`${hand} ${muted} pt-[0.45rem]`}>{employer.span}</p>
                    <div className='min-w-0'>
                      <h3 className='rc-narrow text-[1.375rem] leading-tight font-semibold uppercase tracking-[0.01em] sm:text-[1.625rem]'>
                        {employer.name}
                      </h3>
                      <p className={`${hand} ${muted} mt-1.5`}>{employer.location}</p>
                    </div>
                  </div>

                  <div className='mt-7 space-y-8'>
                    {employer.roles.map((role) => (
                      <div key={role.title + role.dates} className='grid gap-x-6 gap-y-2 sm:grid-cols-[9.5rem_minmax(0,1fr)]'>
                        <p className={`${hand} ${muted} pt-[0.35rem]`}>{role.dates}</p>

                        <div className='min-w-0'>
                          <h4 className='text-[1.0625rem] leading-snug font-semibold'>{role.title}</h4>

                          <div className='mt-3 space-y-2.5'>
                            {role.bullets.map((bullet, bulletIndex) =>
                              isNested(bullet) ? (
                                <div key={bullet.text}>
                                  <Entry index={`${bulletIndex + 1}`}>
                                    <p className={`${evidence} font-medium`}>{bullet.text}</p>
                                  </Entry>

                                  {/* The programme's parts, numbered under it.
                                      They sit in the parent's own text column,
                                      so the record reads down one edge and the
                                      numbers say what is under what. */}
                                  <div className='mt-2.5 space-y-2.5 sm:pl-[3.5rem]'>
                                    {bullet.subBullets.map((part, partIndex) => (
                                      <Entry key={part} index={`${bulletIndex + 1}.${partIndex + 1}`}>
                                        <p className={evidence}>{part}</p>
                                      </Entry>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <Entry key={bullet} index={`${bulletIndex + 1}`}>
                                  <p className={evidence}>{bullet}</p>
                                </Entry>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id='independent-work' className='pb-12'>
            <RunningHead index='02'>{chrome.sections.independentWork}</RunningHead>

            <div className='mt-6 space-y-5'>
              {independentWork.map((entry, entryIndex) => (
                <div key={entry.name} className='grid gap-x-6 gap-y-1 sm:grid-cols-[9.5rem_minmax(0,1fr)]'>
                  <p className={`${hand} ${muted} pt-[0.45rem]`}>{String(entryIndex + 1).padStart(2, '0')}</p>
                  <div className='min-w-0'>
                    <h3 className='rc-narrow text-[1.0625rem] font-semibold uppercase tracking-[0.02em]'>{entry.name}</h3>
                    <p className={`${evidence} mt-2`}>{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id='recognitions' className='pb-12'>
            <RunningHead index='03'>{chrome.sections.recognitions}</RunningHead>

            {/* Dates down the left, one hairline a row: the densest thing on
                the page, and the one place the record admits it is a list. */}
            <ul className='mt-6'>
              {recognitions.map((recognition) => {
                const { text, date } = dated(recognition);

                return (
                  <li
                    key={recognition}
                    className={`grid gap-x-6 border-t py-2 sm:grid-cols-[9.5rem_minmax(0,1fr)] ${hair}`}
                  >
                    <p className={`${hand} ${muted} pt-[0.3rem]`}>{date}</p>
                    <p className='text-[0.9375rem] leading-[1.5]'>{text}</p>
                  </li>
                );
              })}
            </ul>

            <div className={`mt-8 grid gap-x-6 gap-y-1 border-t-2 pt-4 sm:grid-cols-[9.5rem_minmax(0,1fr)] ${rule}`}>
              <p className={`${hand} ${muted} pt-[0.3rem]`}>{education.years}</p>
              <div className='min-w-0'>
                <p className={`${hand} ${accent}`}>{chrome.recognitions.education}</p>
                <p className='mt-1.5 text-[0.9375rem] leading-[1.5]'>
                  {education.degree}, {education.institution}
                </p>
                <p className={`mt-1 text-[0.9375rem] leading-[1.5] ${muted}`}>{education.languages}</p>
              </div>
            </div>
          </section>

          <section id='technologies' className='pb-12'>
            <RunningHead index='04'>{chrome.sections.technologies}</RunningHead>

            {/* An index rather than a set of chips: numbered, in columns, in
                the hand. Nothing here is a claim, so nothing here is given the
                weight of a statement. */}
            <ol className='mt-6 grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-5'>
              {technologies.map((technology, technologyIndex) => (
                <li key={technology} className={`flex items-baseline gap-3 border-t py-2 ${hair}`}>
                  <span className={`${hand} ${muted}`}>{String(technologyIndex + 1).padStart(2, '0')}</span>
                  <span className='rc-narrow text-[0.9375rem]'>{technology}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id='contact' className='pb-12'>
            <RunningHead index='05'>{chrome.sections.contact}</RunningHead>

            <div className='mt-6 max-w-[52rem]'>
              <Field label={chrome.contact.email}>
                <a href={`mailto:${contact.email}`} className={link}>
                  {contact.email}
                </a>
              </Field>
              <Field label={chrome.contact.linkedin}>
                <a href={contact.linkedin} target='_blank' rel='noopener noreferrer' className={link}>
                  {contact.linkedinLabel}
                </a>
              </Field>
              <Field label='GitHub'>
                <a href={contact.github} target='_blank' rel='noopener noreferrer' className={link}>
                  {contact.github.replace(/^https:\/\//, '')}
                </a>
              </Field>
              <Field label={chrome.contact.location}>
                {identity.location}, {identity.mode}
              </Field>
            </div>
          </section>
        </main>

        <footer className={`flex items-baseline justify-between gap-4 border-t-2 py-6 ${hand} ${muted} ${rule}`}>
          <p>{identity.name}</p>
          <p>{new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default VariantERecord;
