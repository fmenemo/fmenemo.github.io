import React from 'react';
import Container from '../components/Container';
import SectionHead from '../components/SectionHead';
import { useContent } from '../hooks/useContent';
import { evidence, hand, ledger } from '../styles';

// The densest thing on the page, and the one place the record admits it is a
// list: the date in the left column the spans and the role dates above it sit
// in, the recognition beside it, one hairline a row. Never a card, and never a
// section of cards (CONTEXT.md).
//
// Education sits under it rather than in a section of its own, for the same
// reason it always has: cheap, verifiable, and not worth a number of its own in
// the contents index. A heavier rule is what says it is a different kind of
// thing from the rows above it.

// A recognition is one string ending in its date in parentheses, and the date
// is a figure like every other figure on the page, so it moves to the left
// column. A string that does not end that way keeps its shape and sits whole in
// the text column: the split reports what it found rather than assuming a date
// is there to find.
const dated = (recognition: string): { text: string; date: string } => {
  const match = /^(.*) \(([^()]+)\)$/.exec(recognition);
  return match ? { text: match[1], date: match[2] } : { text: recognition, date: '' };
};

const Recognitions: React.FC = () => {
  const { recognitions, education, chrome } = useContent();

  return (
    <section id='recognitions'>
      <Container className='pb-16 md:pb-24'>
        <SectionHead index='03'>{chrome.sections.recognitions}</SectionHead>

        <ul className='mt-8'>
          {recognitions.map((recognition) => {
            const { text, date } = dated(recognition);

            return (
              <li
                key={recognition}
                className={`${ledger} border-t border-hairline py-2.5 dark:border-hairline-dark`}
              >
                <p className={`${hand} pt-[0.35rem] text-muted dark:text-muted-dark`}>{date}</p>
                <p className={evidence}>{text}</p>
              </li>
            );
          })}
        </ul>

        <div className={`${ledger} mt-8 border-t-2 border-rule pt-4 dark:border-rule-dark`}>
          <p className={`${hand} pt-[0.35rem] text-muted dark:text-muted-dark`}>{education.years}</p>
          <div className='min-w-0'>
            <p className={`${hand} text-accent dark:text-accent-dark`}>{chrome.recognitions.education}</p>
            <p className={`${evidence} mt-1.5`}>
              {education.degree}, {education.institution}
            </p>
            <p className={`${evidence} mt-1 text-muted dark:text-muted-dark`}>{education.languages}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Recognitions;
