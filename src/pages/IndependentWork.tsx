import React from 'react';
import Section from '../components/Section';
import { useContent } from '../hooks/useContent';

// A name is a <strong> rather than an <a> by decision D1. If a project ever
// gets a public landing page, wrapping that one name in an anchor is the whole
// change: nothing in the copy depends on the reader clicking through.
//
// The section renders an entry per paragraph, keyed by name. Names are distinct
// here because two entries with the same name would be one entry.
//
// Entries are separated by space alone, which is what the rest of the page does
// between things of the same kind: no rule, no bullet, no card. The name in bold
// at the head of each paragraph is already the boundary a reader sees, and a
// second device on top of it would say these are two lists rather than two
// entries in one.
const IndependentWork: React.FC = () => {
  const { independentWork, chrome } = useContent();

  return (
    <Section id='independent-work' index='02' title={chrome.sections.independentWork}>
      <div className='max-w-2xl space-y-6'>
        {independentWork.map((entry) => (
          <p key={entry.name} className='leading-relaxed text-muted dark:text-muted-dark'>
            <strong className='font-semibold text-ink dark:text-chalk'>{entry.name}.</strong> {entry.description}
          </p>
        ))}
      </div>
    </Section>
  );
};

export default IndependentWork;
