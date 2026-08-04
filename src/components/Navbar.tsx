import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { Container } from './Section';

const SunIcon = () => (
  <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
    />
  </svg>
);

const MoonIcon = () => (
  <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
    />
  </svg>
);

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

// The masthead is a hairline rule and three short labels. It carries no
// scroll state, no blur and no mobile menu: at this length the links fit
// across every width the site supports.
const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper dark:border-rule-dark dark:bg-canvas'>
      <Container>
        <div className='flex h-14 items-center justify-between gap-4'>
          <a href='#home' className='font-mono text-sm font-medium tracking-[0.2em] text-ink dark:text-chalk'>
            FM
          </a>

          <nav aria-label='Sections' className='flex items-center gap-5 sm:gap-8'>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className='font-mono text-2xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent dark:text-muted-dark dark:hover:text-accent-dark'
              >
                {link.name}
              </a>
            ))}

            <button
              type='button'
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className='-mr-1 p-1 text-muted transition-colors hover:text-accent dark:text-muted-dark dark:hover:text-accent-dark'
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
