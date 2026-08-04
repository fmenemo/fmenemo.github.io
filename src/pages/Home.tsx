import React from 'react';
import Container from '../components/Container';
import { contact, identity } from '../content';
import { accentAction, metaVoice, primaryAction } from '../styles';

// The hero states who Fran is and puts the CV one click away. It carries no
// availability signalling and no greeting: a reader who arrived already knowing
// the name wants the identity line, not an introduction.
const Home: React.FC = () => (
  <section id='home'>
    <Container className='pt-28 pb-20 md:pt-40 md:pb-28'>
      <h1 className='text-5xl leading-[0.95] font-semibold tracking-tight sm:text-6xl md:text-7xl'>
        {/* The space is load-bearing: without it the accessible name of the
            heading is "FranMenéndez". It collapses visually between blocks. */}
        <span className='block'>Fran</span> <span className='block'>Menéndez</span>
      </h1>

      <p className='mt-8 max-w-2xl text-lg leading-relaxed font-light text-muted dark:text-muted-dark'>{identity.line}</p>

      <div className='mt-12 flex flex-wrap items-center gap-x-8 gap-y-4'>
        <a href={contact.cv} download='Fran_Menendez_CV.pdf' className={primaryAction}>
          Download CV
        </a>
        <a href={`mailto:${contact.email}`} className={accentAction}>
          {contact.email}
        </a>
        <a href={contact.linkedin} target='_blank' rel='noopener noreferrer' className={accentAction}>
          {contact.linkedinLabel}
        </a>
      </div>

      <p className={`mt-16 border-t border-rule pt-4 ${metaVoice} text-muted dark:border-rule-dark dark:text-muted-dark`}>
        {identity.location}
        <span className='mx-3 text-rule dark:text-rule-dark'>/</span>
        {identity.mode}
      </p>
    </Container>
  </section>
);

export default Home;
