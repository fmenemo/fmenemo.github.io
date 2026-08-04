import React from 'react';
import Container from '../components/Container';
import { accentAction, metaVoice, primaryAction } from '../styles';

const specialties = ['System Architecture', 'Cloud Infrastructure', 'Technical Leadership', 'Platform Engineering'];

const Home: React.FC = () => {
  return (
    <section id='home'>
      <Container className='pt-28 pb-20 md:pt-40 md:pb-28'>
        <p className={`${metaVoice} text-accent dark:text-accent-dark`}>Hello, I'm</p>

        <h1 className='mt-6 text-5xl leading-[0.95] font-semibold tracking-tight sm:text-6xl md:text-7xl'>
          <span className='block'>Francisco</span>
          <span className='block'>Menendez</span>
        </h1>

        <p className='mt-8 font-mono text-sm tracking-[0.2em] text-muted uppercase dark:text-muted-dark'>Software Engineer</p>

        <p className='mt-6 max-w-2xl text-lg leading-relaxed font-light text-muted dark:text-muted-dark'>
          Leading engineering teams and architecting scalable solutions. Passionate about building robust systems, mentoring talent, and
          driving technical excellence across complex software initiatives.
        </p>

        <ul
          className={`mt-12 flex max-w-3xl flex-wrap gap-x-8 gap-y-2 border-t border-rule pt-4 ${metaVoice} text-muted dark:border-rule-dark dark:text-muted-dark`}
        >
          {specialties.map((specialty) => (
            <li key={specialty}>{specialty}</li>
          ))}
        </ul>

        <div className='mt-12 flex flex-wrap items-center gap-x-8 gap-y-4'>
          <a href='#about' className={primaryAction}>
            Learn More
          </a>
          <a href='#contact' className={accentAction}>
            Get In Touch
          </a>
        </div>

        <p className={`mt-16 ${metaVoice} text-muted dark:text-muted-dark`}>
          Available for leadership opportunities
          <span className='mx-3 text-rule dark:text-rule-dark'>/</span>
          Based in Spain
          <span className='mx-3 text-rule dark:text-rule-dark'>/</span>
          Leading remote teams globally
        </p>
      </Container>
    </section>
  );
};

export default Home;
