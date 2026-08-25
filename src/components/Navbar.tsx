import React from 'react';
import { useContent } from '../hooks/useContent';
import { useDarkMode } from '../hooks/useDarkMode';
import { mastheadControl, metaVoice, pressable } from '../styles';
import Container from './Container';
import LanguageSelector from './LanguageSelector';

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

            {/* A word, not a sun and a moon. The word is the state a click
                moves to, because the state a reader is already in is the one
                thing the page in front of them already says.

                It carries no `aria-label`: the text is the accessible name,
                which is the whole point of the control being text. A label
                that restated it in a longer sentence would leave a
                voice-control visitor unable to say what they can see (WCAG
                2.5.3, Label in Name). */}
            <button
              type='button'
              onClick={toggleDarkMode}
              className={`${metaVoice} -mr-1 p-1 ${mastheadControl} ${pressable}`}
            >
              {isDarkMode ? chrome.nav.toLight : chrome.nav.toDark}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
