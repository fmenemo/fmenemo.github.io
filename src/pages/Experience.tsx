import React from 'react';
import Section from '../components/Section';
import { useContent } from '../hooks/useContent';
import { hand } from '../styles';

// Employers are the structure; roles sit under them. A promotion at one
// employer renders as two roles under one name (CONTEXT.md), which is what
// makes the progression legible without repeating the employer.
const Experience: React.FC = () => {
  const { employers, chrome } = useContent();

  return (
    <Section id='experience' index='01' title={chrome.sections.experience}>
      <div className='space-y-16'>
        {employers.map((employer) => (
          <article key={employer.name}>
            <header className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule pb-2 dark:border-rule-dark'>
              <h3 className='narrow text-xl font-semibold tracking-[0.01em] uppercase'>{employer.name}</h3>
              <p className={`${hand} text-muted dark:text-muted-dark`}>
                {employer.location}
                <span className='mx-3 text-rule dark:text-rule-dark'>/</span>
                {employer.span}
              </p>
            </header>

            {employer.roles.map((role) => (
              <div key={role.title + role.dates} className='mt-8'>
                <h4 className='flex flex-wrap items-baseline gap-x-4 gap-y-1'>
                  <span className='font-medium'>{role.title}</span>
                  <span className={`${hand} text-accent dark:text-accent-dark`}>{role.dates}</span>
                </h4>

                <ul className='mt-4 space-y-3'>
                  {role.bullets.map((bullet) => {
                    const text = typeof bullet === 'string' ? bullet : bullet.text;
                    const subBullets = typeof bullet === 'string' ? [] : bullet.subBullets;

                    return (
                      <li
                        key={text}
                        className='border-l border-hairline pl-4 text-sm leading-relaxed text-muted dark:border-hairline-dark dark:text-muted-dark'
                      >
                        {text}
                        {/* A list inside the item it belongs to, so a screen
                            reader announces the parts as parts of the programme
                            above them rather than as more bullets. The treatment
                            is the minimum that reads on this design — indented,
                            marked, and otherwise the same voice; the redesign
                            decides how nesting looks. */}
                        {subBullets.length > 0 && (
                          <ul className='mt-3 list-disc space-y-2 pl-5 marker:text-rule dark:marker:text-rule-dark'>
                            {subBullets.map((subBullet) => (
                              <li key={subBullet}>{subBullet}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
