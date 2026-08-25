import React from 'react';
import Section from '../components/Section';
import { useContent } from '../hooks/useContent';
import { labelVoice } from '../styles';

// One compact line of awards, never a card grid (CONTEXT.md). Education and the
// technologies sit under it as rows for the same reason: cheap, verifiable, and
// not worth a section each.
const Recognitions: React.FC = () => {
  const { recognitions, education, technologies, chrome } = useContent();

  return (
    <Section id='recognitions' index='03' title={chrome.sections.recognitions}>
      {/* The items are inline so they flow and wrap as running text. As flex
          children each one took its own line, which reads as a list again. */}
      <ul className='max-w-3xl text-sm leading-loose text-muted dark:text-muted-dark'>
        {recognitions.map((recognition, index) => (
          <li key={recognition} className='inline'>
            {recognition}
            {index < recognitions.length - 1 && <span className='mx-2 text-rule dark:text-rule-dark'>/</span>}
          </li>
        ))}
      </ul>

      <dl className='mt-12 border-t border-rule pt-6 dark:border-rule-dark'>
        <div className='grid gap-2 sm:grid-cols-4 sm:gap-8'>
          <dt className={`${labelVoice} text-muted dark:text-muted-dark`}>{chrome.recognitions.education}</dt>
          <dd className='text-sm leading-relaxed sm:col-span-3'>
            {education.degree}, {education.institution}, {education.years}
            <span className='mt-1 block text-muted dark:text-muted-dark'>{education.languages}</span>
          </dd>
        </div>

        {/* CONTEXT.md avoids the word "skill": a skill is a claim, a technology
            is a fact, so the anchor and the label both say technologies. One
            line of running text rather than chips — the chip grid this replaced
            listed capabilities ("Technical Decision Making"), which are claims
            rather than evidence and were removed under ADR 0001. It was a
            section band of its own until ADR 0005 folded it into this one; the
            id stays here so links already sent to `#technologies` land on it. */}
        <div id='technologies' className='mt-6 grid gap-2 sm:grid-cols-4 sm:gap-8'>
          <dt className={`${labelVoice} text-muted dark:text-muted-dark`}>{chrome.recognitions.technologies}</dt>
          <dd className='text-sm leading-loose text-muted sm:col-span-3 dark:text-muted-dark'>
            {technologies.join(' / ')}
          </dd>
        </div>
      </dl>
    </Section>
  );
};

export default Recognitions;
