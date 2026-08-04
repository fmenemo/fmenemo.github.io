import React from 'react';

// The page is one editorial grid: a fixed measure, left-aligned, with the
// section label sitting in the first three columns and the content in the
// remaining nine. Every band is divided by a rule rather than boxed in a card.

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-5xl px-6 md:px-10 ${className}`}>{children}</div>
);

interface SectionProps {
  id: string;
  /** The two-digit section number set in the accent, as metadata. */
  index: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, index, title, children }) => (
  <section id={id} className='border-t-2 border-ink dark:border-chalk'>
    <Container className='py-20 md:py-28'>
      <div className='grid gap-10 md:grid-cols-12'>
        <header className='md:col-span-3'>
          <p className='font-mono text-2xs tracking-[0.2em] text-accent dark:text-accent-dark'>{index}</p>
          <h2 className='mt-2 text-xl font-semibold tracking-tight'>{title}</h2>
        </header>
        <div className='md:col-span-9'>{children}</div>
      </div>
    </Container>
  </section>
);

export default Section;
