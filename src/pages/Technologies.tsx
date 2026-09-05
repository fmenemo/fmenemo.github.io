import React from 'react';
import Container from '../components/Container';
import SectionHead from '../components/SectionHead';
import { useContent } from '../hooks/useContent';

// CONTEXT.md avoids the word "skill": a skill is a claim, a technology is a
// fact. The section, the file and the anchor all say technologies.
// One line of technologies, set as running text rather than as chips. The chip
// grid it replaced listed capabilities ("Technical Decision Making"), which are
// claims rather than evidence and were removed under ADR 0001.
const Technologies: React.FC = () => {
  const { technologies, chrome } = useContent();

  return (
    <section id='technologies'>
      <Container className='pb-16 md:pb-24'>
        <SectionHead index='04'>{chrome.sections.technologies}</SectionHead>
        <p className='mt-8 max-w-3xl text-sm leading-loose text-muted dark:text-muted-dark'>{technologies.join(' / ')}</p>
      </Container>
    </section>
  );
};

export default Technologies;
