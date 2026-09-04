// THROWAWAY. The plan: five variants on the existing route, switchable by
// `variant`.
//
// The page a slot in the cycle shows before its variant is drawn. #26 asks for
// five variants and #32 delivers the first, so four of the five keys point here
// until the tickets behind this one replace them in the register.
//
// It is deliberately not a design. It wears the switcher's voice, a system sans
// on a flat grey, because a placeholder that looked composed would be one more
// thing to judge.
import React from 'react';

const NotBuiltYet: React.FC = () => (
  <div className='flex min-h-screen items-center justify-center bg-zinc-200 px-6 font-sans text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'>
    <p className='text-center text-sm'>This variant is not built yet.</p>
  </div>
);

export default NotBuiltYet;
