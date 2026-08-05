import React from 'react';
import { useContent } from '../hooks/useContent';
import { useDarkMode } from '../hooks/useDarkMode';
import { mastheadControl, metaVoice } from '../styles';
import Container from './Container';
import LanguageSelector from './LanguageSelector';

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

// The masthead is a hairline rule and three short labels. It carries no
// scroll state, no blur and no mobile menu: at this length the links fit
// across every width the site supports.
const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { chrome } = useContent();

  // Two links, not one per section. Independent work, recognitions and
  // technologies are each a few lines sitting directly under experience, so a
  // visitor scrolling reaches them before a nav link would have saved them
  // anything. The ids exist and are linkable; the masthead just does not list
  // them, which is what keeps it to one line at every width.
  //
  // The labels are the edition's; the anchors are English in every edition, so
  // that a fragment carries across the language selector unchanged (ADR 0004).
  const navLinks = [
    { name: chrome.nav.experience, href: '#experience' },
    { name: chrome.nav.contact, href: '#contact' },
  ];

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper dark:border-rule-dark dark:bg-canvas'>
      <Container>
        <div className='flex h-14 items-center justify-between gap-4'>
          <a href='#home' className='font-mono text-sm font-medium tracking-[0.2em] text-ink dark:text-chalk'>
            FM
          </a>

          {/* The section links are the navigation; the language selector and the
              theme toggle sit beside it rather than inside it. They are controls
              for the document a visitor is already in, and listing them under
              "Sections" would announce them as places to go. */}
          <div className='flex items-center gap-4 sm:gap-8'>
            {/* Below 420px the masthead cannot hold the name, two section
                links, the selector and the toggle on one line: the Spanish
                labels run it to 384px of content in a 320px viewport. The
                section links are what yields, because they are the only part
                a visitor can get without them — scrolling reaches every
                section, and the comment above says as much about why there
                are two of them rather than six. The selector cannot yield: a
                reader who cannot see that the other edition exists has no way
                to find it. */}
            <nav aria-label={chrome.nav.label} className='hidden items-center gap-4 xs:flex sm:gap-8'>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`${metaVoice} ${mastheadControl}`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <LanguageSelector />

            <button
              type='button'
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? chrome.nav.toLightMode : chrome.nav.toDarkMode}
              className={`-mr-1 p-1 ${mastheadControl}`}
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
