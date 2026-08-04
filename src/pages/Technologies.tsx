import React from 'react';
import Section from '../components/Section';
import { useContent } from '../hooks/useContent';

// CONTEXT.md avoids the word "skill": a skill is a claim, a technology is a
// fact. The section, the file and the anchor all say technologies.
// One line of technologies, set as running text rather than as chips. The chip
// grid it replaced listed capabilities ("Technical Decision Making"), which are
// claims rather than evidence and were removed under ADR 0001.
const Technologies: React.FC = () => {
  const { technologies, chrome } = useContent();

  return (
    <Section id='technologies' index='04' title={chrome.sections.technologies}>
      <p className='max-w-3xl text-sm leading-loose text-muted dark:text-muted-dark'>{technologies.join(' / ')}</p>
    </Section>
  );
};

export default Technologies;
