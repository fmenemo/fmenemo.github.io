import React from 'react';
import Container from '../components/Container';
import SectionHead from '../components/SectionHead';
import { useContent } from '../hooks/useContent';
import { hand } from '../styles';

// CONTEXT.md avoids the word "skill": a skill is a claim, a technology is a
// fact. The section, the file and the anchor all say technologies.
//
// An index rather than a set of chips: numbered `01` onward, one hairline a
// row, in the narrow setting the record names things in. Nothing here is a
// claim, so nothing here is given the weight of a statement — the numbering is
// what keeps a list of names from reading as a list of capabilities, which is
// what the chip grid ADR 0001 removed had become.
//
// The columns are the one thing that changes with the width: two at phone
// width, where fourteen names in one column would be a scroll of their own, and
// five at the widest, where the index reads across as fast as it reads down.
const Technologies: React.FC = () => {
  const { technologies, chrome } = useContent();

  return (
    <section id='technologies'>
      <Container className='pb-16 md:pb-24'>
        <SectionHead index='04'>{chrome.sections.technologies}</SectionHead>

        <ol className='mt-8 grid grid-cols-2 gap-x-6 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5'>
          {technologies.map((technology, index) => (
            <li
              key={technology}
              className='flex items-baseline gap-3 border-t border-hairline py-2.5 dark:border-hairline-dark'
            >
              <span className={`${hand} shrink-0 text-muted dark:text-muted-dark`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className='narrow min-w-0 text-[0.9375rem] break-words'>{technology}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};

export default Technologies;
