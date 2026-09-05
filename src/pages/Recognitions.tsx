import React from 'react';
import Container from '../components/Container';
import SectionHead from '../components/SectionHead';
import { useContent } from '../hooks/useContent';
import { hand } from '../styles';

// One compact line of awards, never a card grid (CONTEXT.md). Education sits
// under it as a second line for the same reason: cheap, verifiable, and not
// worth a section of its own.
const Recognitions: React.FC = () => {
  const { recognitions, education, chrome } = useContent();

  return (
    <section id='recognitions'>
      <Container className='pb-16 md:pb-24'>
        <SectionHead index='03'>{chrome.sections.recognitions}</SectionHead>
        {/* The items are inline so they flow and wrap as running text. As flex
            children each one took its own line, which reads as a list again. */}
        <ul className='mt-8 max-w-3xl text-sm leading-loose text-muted dark:text-muted-dark'>
          {recognitions.map((recognition, index) => (
            <li key={recognition} className='inline'>
              {recognition}
              {index < recognitions.length - 1 && <span className='mx-2 text-rule dark:text-rule-dark'>/</span>}
            </li>
          ))}
        </ul>

        <dl className='mt-12 grid gap-2 border-t border-rule pt-6 sm:grid-cols-4 sm:gap-8 dark:border-rule-dark'>
          <dt className={`${hand} text-muted dark:text-muted-dark`}>{chrome.recognitions.education}</dt>
          <dd className='text-sm leading-relaxed sm:col-span-3'>
            {education.degree}, {education.institution}, {education.years}
            <span className='mt-1 block text-muted dark:text-muted-dark'>{education.languages}</span>
          </dd>
        </dl>
      </Container>
    </section>
  );
};

export default Recognitions;
