import React from 'react';
import Section from '../components/Section';
import { employers } from '../content';
import { metaVoice } from '../styles';

// Employers are the structure; roles sit under them. A promotion at one
// employer renders as two roles under one name (CONTEXT.md), which is what
// makes the progression legible without repeating the employer.
const Experience: React.FC = () => (
  <Section id='experience' index='01' title='Experience'>
    <div className='space-y-16'>
      {employers.map((employer) => (
        <article key={employer.name}>
          <header className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule pb-2 dark:border-rule-dark'>
            <h3 className='text-xl font-semibold tracking-tight'>{employer.name}</h3>
            <p className={`${metaVoice} text-muted dark:text-muted-dark`}>
              {employer.location}
              <span className='mx-3 text-rule dark:text-rule-dark'>/</span>
              {employer.span}
            </p>
          </header>

          {employer.roles.map((role) => (
            <div key={role.title + role.dates} className='mt-8'>
              <h4 className='flex flex-wrap items-baseline gap-x-4 gap-y-1'>
                <span className='font-medium'>{role.title}</span>
                <span className={`${metaVoice} text-accent dark:text-accent-dark`}>{role.dates}</span>
              </h4>

              <ul className='mt-4 space-y-3'>
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className='border-l border-rule pl-4 text-sm leading-relaxed text-muted dark:border-rule-dark dark:text-muted-dark'
                  >
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

export default Experience;
