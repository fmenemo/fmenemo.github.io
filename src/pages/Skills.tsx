import React from 'react';
import Section from '../components/Section';
import { technologies } from '../content';

// One line of technologies, set as running text rather than as chips. The chip
// grid it replaced listed capabilities ("Technical Decision Making"), which are
// claims rather than evidence and were removed under ADR 0001.
const Skills: React.FC = () => (
  <Section id='skills' index='04' title='Technologies'>
    <p className='max-w-3xl text-sm leading-loose text-muted dark:text-muted-dark'>{technologies.join(' / ')}</p>
  </Section>
);

export default Skills;
