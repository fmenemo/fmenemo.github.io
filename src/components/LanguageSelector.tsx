import React from 'react';
import { useContent } from '../hooks/useContent';
import { useFragment } from '../hooks/useFragment';
import { mastheadControl, metaVoice } from '../styles';

// Two short labels and a slash. No menu, no dropdown, no animation, and no
// flag: a flag names a country, and Spanish is not Spain's alone (ADR 0004).
//
// The current edition is marked and is not a link, because a control that lets
// you click through to the page you are already on tells the visitor nothing
// about where they are.
//
// The link carries `hreflang` and deliberately not `lang`: `hreflang` describes
// the document at the other end, while `lang` would describe this element's own
// text, and its text for a screen reader is the accessible name, which is
// written in the language of the edition the control appears in.
const LanguageSelector: React.FC = () => {
  const { language } = useContent().chrome;
  const fragment = useFragment();

  return (
    // A landmark rather than a labelled `group`: the control navigates to
    // another document, and Chrome prunes a `group` that wraps nothing but
    // text out of the accessibility tree, which took the control's name with
    // it. As a named landmark it sits beside "Sections" in the list a screen
    // reader offers, which is where someone looking for their language looks.
    <nav aria-label={language.label} className={`${metaVoice} flex items-center gap-1.5`}>
      <span aria-current='true' className='text-ink dark:text-chalk'>
        {language.current}
      </span>
      <span aria-hidden='true' className='text-rule dark:text-rule-dark'>
        /
      </span>
      {/* The fragment rides across unchanged. Section ids are English in every
          edition precisely so this needs no mapping table, and the sibling
          document lands on it because `useFragmentLanding` does what the
          browser cannot do before React has rendered the sections. */}
      {/* The name begins with the two letters on screen and then says where the
          link goes. An accessible name that replaced the visible label instead
          would leave a voice-control visitor saying "click ES" with nothing to
          click (WCAG 2.5.3, Label in Name). It is composed here rather than
          carried as visually hidden text beside the label, because the name
          computation joins adjacent inline text without a separator and
          "ESView this page in Spanish" is not a name anyone can say. */}
      <a
        href={`${language.other.path}${fragment}`}
        hrefLang={language.other.lang}
        aria-label={`${language.other.label} ${language.other.name}`}
        className={mastheadControl}
      >
        {language.other.label}
      </a>
    </nav>
  );
};

export default LanguageSelector;
