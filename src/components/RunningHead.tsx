import React from 'react';
import { useContent } from '../hooks/useContent';
import { useDarkMode } from '../hooks/useDarkMode';
import { hand, link } from '../styles';
import Container from './Container';
import LanguageSelector from './LanguageSelector';

// The running head stays at the top edge of the page the way a running head
// stays at the top edge of every leaf of a dossier: the name of the record, and
// the two things a reader may change about how it is shown.
//
// It replaces the masthead, which listed two of the five sections. All five are
// in the contents index in the identification block below, which is also what
// lets this hold one line at 320px with nothing hidden: the masthead needed a
// breakpoint of its own to drop the section links, and there is nothing here to
// drop.
const RunningHead: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { identity, chrome } = useContent();

  return (
    <header className='sticky top-0 z-50 border-b border-rule bg-stock dark:border-rule-dark dark:bg-stock-dark'>
      <Container>
        <div className='flex items-baseline gap-4 py-3'>
          {/* Below the smallest width the name is what truncates rather than
              wraps: it is the one thing here a reader still recognises from
              its first word, and the other two are controls that stop working
              when they are clipped. */}
          <p className={`${hand} min-w-0 flex-1 truncate`}>{identity.name}</p>

          <LanguageSelector />

          {/* The theme control is a field of the record like any other: it says
              what it will do, in the edition's own words, in the hand. The
              words are the accessible name, so there is nothing left for an
              `aria-label` to add — the icon it replaced needed one because a
              visitor who could see the page could not read it either. */}
          <button type='button' onClick={toggleDarkMode} className={`${hand} ${link} shrink-0 text-right`}>
            {isDarkMode ? chrome.nav.toLightMode : chrome.nav.toDarkMode}
          </button>
        </div>
      </Container>
    </header>
  );
};

export default RunningHead;
