import React from 'react';
import { hand } from '../styles';

// Every section of the record opens the same way: a heavy rule, the section's
// number in the accent, and its name in the hand beside it. The number is the
// only thing the page numbers, and it is the number the contents index links
// by, which is what stops that index from being decoration.
//
// This is a head and not a wrapper. The section element, its anchor and its
// measure belong to the section, because what a section holds under its head
// differs from one to the next and a shared shell would have to know.
const SectionHead: React.FC<{ index: string; children: React.ReactNode }> = ({ index, children }) => (
  <div className='flex items-baseline gap-4 border-t-2 border-rule pt-2 dark:border-rule-dark'>
    <span className={`${hand} text-accent dark:text-accent-dark`}>{index}</span>
    <h2 className={`${hand} text-muted dark:text-muted-dark`}>{children}</h2>
  </div>
);

export default SectionHead;
