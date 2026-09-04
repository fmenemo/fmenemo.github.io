// THROWAWAY. The plan: five variants on the existing route, switchable by
// `variant`.
//
// The bar is deliberately not in any variant's language: a system sans, a
// near-black pill and a shadow, so nothing on it can be mistaken for part of
// the design being judged.
import React from 'react';

interface PrototypeSwitcherProps {
  variantKey: string;
  name: string;
  onPrevious: () => void;
  onNext: () => void;
}

const arrow = 'flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none text-zinc-300 hover:bg-zinc-700 hover:text-white';

const PrototypeSwitcher: React.FC<PrototypeSwitcherProps> = ({ variantKey, name, onPrevious, onNext }) => (
  <div className='fixed inset-x-0 bottom-4 z-[999] flex justify-center px-4 font-sans'>
    <div className='flex items-center gap-2 rounded-full bg-zinc-900 px-2 py-1.5 text-sm shadow-lg ring-1 ring-white/15'>
      <button type='button' onClick={onPrevious} aria-label='Previous variant' className={arrow}>
        &#8592;
      </button>
      <p className='px-1 text-zinc-100 tabular-nums'>
        <span className='font-semibold uppercase'>{variantKey}</span>
        <span className='mx-1.5 text-zinc-500'>/</span>
        <span>{name}</span>
      </p>
      <button type='button' onClick={onNext} aria-label='Next variant' className={arrow}>
        &#8594;
      </button>
    </div>
  </div>
);

export default PrototypeSwitcher;
