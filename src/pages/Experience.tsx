import React from 'react';
import Section from '../components/Section';
import { useContent } from '../hooks/useContent';
import { labelVoice } from '../styles';

// Employers are the structure; roles sit under them. A promotion at one
// employer renders as two roles under one name (CONTEXT.md), which is what
// makes the progression legible without repeating the employer.
//
// The bullets are the primary text of the page: body size, in ink, with the
// muted colour left to the metadata beside them. A recruiter arrived to read
// these, so nothing above them may be easier to read than they are.
const Experience: React.FC = () => {
  const { employers, chrome } = useContent();

  return (
    <Section id='experience' index='01' title={chrome.sections.experience}>
      <div className='space-y-16'>
        {employers.map((employer) => (
          <article key={employer.name}>
            <header className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule pb-2 dark:border-rule-dark'>
              <h3 className='text-xl font-semibold tracking-tight'>{employer.name}</h3>
              <p className={`${labelVoice} text-muted dark:text-muted-dark`}>
                {employer.location}
                <span className='mx-3 text-rule dark:text-rule-dark'>/</span>
                {employer.span}
              </p>
            </header>

            {employer.roles.map((role) => (
              <div key={role.title + role.dates} className='mt-8'>
                <h4 className='flex flex-wrap items-baseline gap-x-4 gap-y-1'>
                  <span className='font-medium'>{role.title}</span>
                  <span className={`${labelVoice} text-accent dark:text-accent-dark`}>{role.dates}</span>
                </h4>

                {/* The measure is capped on the list rather than on the column,
                    so the employer header and its dates still span the full
                    nine columns while the evidence stays readable under them.
                    30rem and not 65ch: `ch` is the width of a zero, which in
                    Geist is wider than the average letter, so 65ch of it takes
                    93 characters of this prose. 30rem measured at 64 in a
                    browser, which is what "about 65" was asking for. */}
                <ul className='mt-4 max-w-[30rem] space-y-3'>
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className='border-l border-rule pl-4 leading-relaxed dark:border-rule-dark'>
                      {bullet}
                    </li>
                  ))}
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
