import React from 'react';
import { hand } from '../styles';
import Container from './Container';

// The page is one editorial grid: a fixed measure, left-aligned, with the
// section label sitting in the first three columns and the content in the
// remaining nine. Every band is divided by a rule rather than boxed in a card.

interface SectionProps {
  id: string;
  /** The two-digit section number set in the accent, in the hand. */
  index: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, index, title, children }) => (
  <section id={id} className='border-t-2 border-rule dark:border-rule-dark'>
    <Container className='py-20 md:py-28'>
      <div className='grid gap-10 md:grid-cols-12'>
        <header className='md:col-span-3'>
          <p className={`${hand} text-accent dark:text-accent-dark`}>{index}</p>
          <h2 className={`${hand} mt-2 text-muted dark:text-muted-dark`}>{title}</h2>
        </header>
        <div className='md:col-span-9'>{children}</div>
      </div>
    </Container>
  </section>
);

export default Section;
