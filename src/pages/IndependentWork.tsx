import React from 'react';
import Section from '../components/Section';
import { independentWork } from '../content';

// The name is a <strong> rather than an <a> by decision D1. If the project ever
// gets a public landing page, wrapping it in an anchor is the whole change:
// nothing in the copy depends on the reader clicking through.
const IndependentWork: React.FC = () => (
  <Section id='independent-work' index='02' title='Independent work'>
    <p className='max-w-2xl leading-relaxed text-muted dark:text-muted-dark'>
      <strong className='font-semibold text-ink dark:text-chalk'>{independentWork.name}.</strong> {independentWork.description}
    </p>
  </Section>
);

export default IndependentWork;
