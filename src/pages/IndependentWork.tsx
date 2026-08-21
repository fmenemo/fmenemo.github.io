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
// The paragraphs carry no spacing between them, because with one entry there is
// nothing to space. Whoever adds the second entry decides what separates them.
const IndependentWork: React.FC = () => {
  const { independentWork, chrome } = useContent();

  return (
    <Section id='independent-work' index='02' title={chrome.sections.independentWork}>
      {independentWork.map((entry) => (
        <p key={entry.name} className='max-w-2xl leading-relaxed text-muted dark:text-muted-dark'>
          <strong className='font-semibold text-ink dark:text-chalk'>{entry.name}.</strong> {entry.description}
        </p>
      ))}
    </Section>
  );
};

export default IndependentWork;
