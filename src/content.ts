// The shape of one edition's strings. The strings themselves live in
// `content.en.ts` and `content.es.ts`, one file per edition, each satisfying
// `SiteContent` in full (ADR 0004).
//
// Nothing here is optional and nothing has a default. An edition supplies every
// string or it fails to compile, which is what stops a half-written second
// edition from shipping with English showing through the gaps.
//
// Nothing below the entry document imports an edition by name: the components
// read whichever one they were rendered under, through `useContent`. Reaching
// for `content.en` inside a component would render English inside the Spanish
// document, which the edition table in `App.test.tsx` is what catches.
//
// Each edition is condensed from its own CV, which is the source of truth for
// it: where the two disagree, the CV wins and the content file is wrong
// (ADR 0001). Every bullet is approved against its CV original in a bullet
// approval record before it lands here.

export interface Role {
  title: string;
  dates: string;
  /** Each one is evidence: a specific outcome tied to this role. */
  bullets: string[];
}

/** One employer, with a role per entry. A promotion is two roles, not one. */
export interface Employer {
  name: string;
  location: string;
  span: string;
  roles: Role[];
}

export interface Identity {
  name: string;
  /** Sourced from the CV summary, deliberately not the current job title. */
  line: string;
  location: string;
  mode: string;
}

/**
 * One CV a visitor can download. The label is here beside the path rather than
 * in `chrome`, because an edition may offer more than one and a list of labels
 * kept somewhere else would pair with this list by position.
 *
 * **Both CVs are regenerated and published together.** The original is the
 * authority for facts and the Spanish CV is a translation of it, so replacing
 * one alone lets `/es` assert things that have stopped being true. No test can
 * catch that: a PDF's text is not in the build, and a text-extraction drift
 * test was considered and rejected in ADR 0004. The rule is the guard.
 */
export interface CvDownload {
  /** Root-relative path of the file in `public/`, under a name carrying no version. */
  href: string;
  /**
   * What the button says. On an edition offering two, the English one is named
   * the **original**, which is a fact about where the document was written. Not
   * "more up to date", "more complete" or "recommended": those say that two
   * versions exist and nobody is sure which is current (ADR 0004).
   */
  label: string;
}

export interface Contact {
  email: string;
  linkedin: string;
  linkedinLabel: string;
  github: string;
  /** Primary download first, and any the edition offers beside it. */
  cvs: CvDownload[];
}

export interface IndependentWork {
  name: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  years: string;
  languages: string;
}

// The words the layout says about itself, as opposed to the words it says about
// Fran. They sat inline in the components until a second edition needed them,
// which is why they read as an afterthought to the sections above.
//
// The rule for what belongs here: anything that is a word in a language. Names
// are not. "FM", "GitHub" and the SVG icon labels stay in their components,
// because an edition that translated them would be wrong rather than localised.
/** The sibling edition, as the current one names it. */
export interface OtherEdition {
  /**
   * The two-letter label in the masthead. A language code rather than a word,
   * so both editions spell it the same way; it is here rather than in the
   * component because which edition is the *other* one differs per edition.
   */
  label: string;
  /** Root-relative path of the sibling document, which the fragment is appended to. */
  path: string;
  /** BCP 47 code of the sibling, for `hreflang` on the link. */
  lang: string;
  /**
   * What the link says beyond its two letters, read by a screen reader and not
   * shown: it follows the visible label rather than replacing it, so that the
   * accessible name still begins with the text on screen (WCAG 2.5.3).
   *
   * In the language of the edition it appears in: a Spanish reader on `/es`
   * meets the control in Spanish, and what it says is where the link goes, not
   * what language the reader is in.
   */
  name: string;
}

export interface Chrome {
  // The nav labels are separate from the section headings below rather than
  // reused from them, and the two are free to differ. They coincide in English
  // and will not in Spanish: the CV's heading is "Experiencia profesional",
  // which the masthead cannot carry and still stay one line at every width.
  nav: {
    /** The accessible name of the section navigation itself. */
    label: string;
    experience: string;
    contact: string;
    /** Accessible names for the theme toggle, by what it will do next. */
    toDarkMode: string;
    toLightMode: string;
  };
  /**
   * The language selector: two short labels, the current one marked and the
   * other a link to the sibling document. Text, not flags: a flag names a
   * country, and Spanish is not Spain's alone (ADR 0004).
   */
  language: {
    /** The accessible name of the control itself, in this edition's language. */
    label: string;
    /** This edition's own label. Marked, and deliberately not a link. */
    current: string;
    other: OtherEdition;
  };
  /** The section headings, keyed by the anchor they sit on. Anchors stay English. */
  sections: {
    experience: string;
    independentWork: string;
    recognitions: string;
    technologies: string;
    contact: string;
  };
  /** The labels down the left of the contact list, not the values beside them. */
  contact: {
    email: string;
    linkedin: string;
    location: string;
  };
  recognitions: {
    education: string;
  };
}

/** Everything a visitor reads, for one edition. */
export interface SiteContent {
  identity: Identity;
  contact: Contact;
  employers: Employer[];
  independentWork: IndependentWork;
  recognitions: string[];
  education: Education;
  technologies: string[];
  chrome: Chrome;
}
