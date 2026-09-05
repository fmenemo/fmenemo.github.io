import React from 'react';
import { useContent } from '../hooks/useContent';
import { hand } from '../styles';
import Container from './Container';

// The colophon: one row on the heaviest rule the page draws, in the hand and
// muted. Who the record is of on the left, when it was set on the right, and
// nothing else. The GitHub and LinkedIn marks that used to sit here are routes,
// and the routes live once, in the Contact section above.
const Footer: React.FC = () => {
  const { identity } = useContent();

  return (
    <footer className='border-t-2 border-rule dark:border-rule-dark'>
      <Container className='py-6'>
        <div className={`flex items-baseline justify-between gap-4 ${hand} text-muted dark:text-muted-dark`}>
          <p>{identity.name}</p>
          {/* The year the page is read in rather than a year written down: a
              hard-coded one is wrong every January and nothing notices. */}
          <p>{new Date().getFullYear()}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
