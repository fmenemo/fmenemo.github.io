import React from 'react';
import Container from '../components/Container';
import RunningHead from '../components/RunningHead';
import type { Bullet } from '../content';
import { useContent } from '../hooks/useContent';
import { evidence, hand, ledger } from '../styles';

// Employers are the structure; roles sit under them. A promotion at one
// employer renders as two roles under one name (CONTEXT.md), which is what
// makes the progression legible without repeating the employer.
//
// The section is drawn as the record it is: the spans and the dates down the
// left column, the names and the statements beside them, and one rule between
// one employer and the next. Nothing here is banded, boxed or carded.

const isNested = (bullet: Bullet): bullet is Exclude<Bullet, string> => typeof bullet !== 'string';

// An entry of the record: its number, hanging in a narrow column of its own,
// and the statement beside it. A part of a programme is the same entry with a
// two-part number, `1.4`, so a reader can see what is under what without the
// text moving away from the column its parent's text is in.
const Entry: React.FC<{ index: string; children: React.ReactNode }> = ({ index, children }) => (
  <li className='grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[2.75rem_minmax(0,1fr)]'>
    <span className={`${hand} pt-[0.35rem] text-muted dark:text-muted-dark`}>{index}</span>
    <div className='min-w-0'>{children}</div>
  </li>
);

const Experience: React.FC = () => {
  const { employers, chrome } = useContent();

  return (
    <section id='experience'>
      <Container className='pb-16 md:pb-24'>
        <RunningHead index='01'>{chrome.sections.experience}</RunningHead>

        <div className='mt-8 space-y-10'>
          {employers.map((employer, employerIndex) => (
            <article
              key={employer.name}
              className={employerIndex > 0 ? 'border-t border-rule pt-10 dark:border-rule-dark' : ''}
            >
              <div className={ledger}>
                <p className={`${hand} pt-[0.45rem] text-muted dark:text-muted-dark`}>{employer.span}</p>
                <div className='min-w-0'>
                  <h3 className='narrow text-[1.375rem] leading-tight font-semibold tracking-[0.01em] uppercase sm:text-[1.625rem]'>
                    {employer.name}
                  </h3>
                  <p className={`${hand} mt-1.5 text-muted dark:text-muted-dark`}>{employer.location}</p>
                </div>
              </div>

              <div className='mt-7 space-y-8'>
                {employer.roles.map((role) => (
                  <div key={role.title + role.dates} className={`${ledger} gap-y-2`}>
                    <p className={`${hand} pt-[0.35rem] text-muted dark:text-muted-dark`}>{role.dates}</p>

                    <div className='min-w-0'>
                      <h4 className='text-[1.0625rem] leading-snug font-semibold'>{role.title}</h4>

                      <ul className='mt-3 space-y-2.5'>
                        {role.bullets.map((bullet, bulletIndex) =>
                          isNested(bullet) ? (
                            <Entry key={bullet.text} index={`${bulletIndex + 1}`}>
                              <p className={`${evidence} font-medium`}>{bullet.text}</p>

                              {/* The programme's parts, numbered under it and
                                  inside it: a list within the item they belong
                                  to, so a screen reader announces them as parts
                                  of the arc above them rather than as more
                                  bullets. They start where their parent's own
                                  text starts, so the record still reads down
                                  one edge and the numbers do the nesting. */}
                              <ul className='mt-2.5 space-y-2.5'>
                                {bullet.subBullets.map((part, partIndex) => (
                                  <Entry key={part} index={`${bulletIndex + 1}.${partIndex + 1}`}>
                                    <p className={evidence}>{part}</p>
                                  </Entry>
                                ))}
                              </ul>
                            </Entry>
                          ) : (
                            <Entry key={bullet} index={`${bulletIndex + 1}`}>
                              <p className={evidence}>{bullet}</p>
                            </Entry>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Experience;
