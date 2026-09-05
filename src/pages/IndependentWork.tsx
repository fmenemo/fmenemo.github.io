import React from 'react';
import Container from '../components/Container';
import RunningHead from '../components/RunningHead';
import { useContent } from '../hooks/useContent';
import { evidence, hand, ledger } from '../styles';

// A name is a heading rather than an <a> by decision D1. If a project ever gets
// a public landing page, wrapping that one name in an anchor is the whole
// change: nothing in the copy depends on the reader clicking through.
//
// The section renders an entry per piece of work, keyed by name. Names are
// distinct here because two entries with the same name would be one entry.
//
// Each entry is numbered down the same left column the spans and dates of the
// experience above sit in, which is the whole of the separation between one and
// the next: the record numbers its entries, so nothing here needs a rule, a
// bullet or a card to say where one ends.
const IndependentWork: React.FC = () => {
  const { independentWork, chrome } = useContent();

  return (
    <section id='independent-work'>
      <Container className='pb-16 md:pb-24'>
        <RunningHead index='02'>{chrome.sections.independentWork}</RunningHead>

        <div className='mt-8 space-y-6'>
          {independentWork.map((entry, entryIndex) => (
            <article key={entry.name} className={ledger}>
              <p className={`${hand} pt-[0.45rem] text-muted dark:text-muted-dark`}>
                {String(entryIndex + 1).padStart(2, '0')}
              </p>
              <div className='min-w-0'>
                <h3 className='narrow text-[1.0625rem] font-semibold tracking-[0.02em] uppercase'>{entry.name}</h3>
                <p className={`${evidence} mt-2`}>{entry.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default IndependentWork;
