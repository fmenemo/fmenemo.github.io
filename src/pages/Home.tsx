import React from 'react';
import { Container } from '../components/Section';

const specialties = ['System Architecture', 'Cloud Infrastructure', 'Technical Leadership', 'Platform Engineering'];

const Home: React.FC = () => {
  return (
    <section id='home'>
      <Container className='pt-28 pb-20 md:pt-40 md:pb-28'>
        <p className='font-mono text-2xs tracking-[0.2em] text-accent uppercase dark:text-accent-dark'>Hello, I'm</p>

        <h1 className='mt-6 text-5xl leading-[0.95] font-semibold tracking-tight sm:text-6xl md:text-7xl'>
          <span className='block'>Francisco</span>
          <span className='block'>Menendez</span>
        </h1>

        <p className='mt-8 font-mono text-sm tracking-[0.2em] text-muted uppercase dark:text-muted-dark'>Software Engineer</p>

        <p className='mt-6 max-w-2xl text-lg leading-relaxed font-light text-muted dark:text-muted-dark'>
          Leading engineering teams and architecting scalable solutions. Passionate about building robust systems, mentoring talent, and
          driving technical excellence across complex software initiatives.
        </p>

        <ul className='mt-12 flex max-w-3xl flex-wrap gap-x-8 gap-y-2 border-t border-rule pt-4 font-mono text-2xs tracking-[0.2em] text-muted uppercase dark:border-rule-dark dark:text-muted-dark'>
          {specialties.map((specialty) => (
            <li key={specialty}>{specialty}</li>
          ))}
        </ul>

        <div className='mt-12 flex flex-wrap items-center gap-x-8 gap-y-4'>
          <a
            href='#about'
            className='inline-block border-2 border-ink px-6 py-3 font-mono text-2xs tracking-[0.2em] uppercase transition-colors hover:bg-ink hover:text-paper dark:border-chalk dark:hover:bg-chalk dark:hover:text-canvas'
          >
            Learn More
          </a>
          <a
            href='#contact'
            className='font-mono text-2xs tracking-[0.2em] text-accent uppercase underline decoration-1 underline-offset-4 transition-colors hover:text-ink dark:text-accent-dark dark:hover:text-chalk'
          >
            Get In Touch
          </a>
        </div>

        <p className='mt-16 font-mono text-2xs tracking-[0.15em] text-muted uppercase dark:text-muted-dark'>
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
