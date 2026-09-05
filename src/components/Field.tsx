import React from 'react';
import { hand } from '../styles';

// A field of the record: a label in the hand, a value beside it, on a hairline.
// The label column is fixed rather than sized to its contents, so every value
// on the page starts on the same vertical however long the label above it ran —
// which is the whole of the alignment the design asks for, and the reason this
// is one component rather than a grid written out twice.
//
// Below the label column's own width the two stack, because a fixed column that
// no longer fits stops being an alignment and starts being a squeeze.
const Field: React.FC<{ label: React.ReactNode; children: React.ReactNode }> = ({ label, children }) => (
  <div className='grid gap-x-6 gap-y-0.5 border-t border-hairline py-3 sm:grid-cols-[7rem_minmax(0,1fr)] dark:border-hairline-dark'>
    <div className={`${hand} pt-1.5 text-muted dark:text-muted-dark`}>{label}</div>
    <div className='min-w-0 text-sm leading-relaxed'>{children}</div>
  </div>
);

export default Field;
