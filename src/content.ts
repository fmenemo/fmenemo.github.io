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

export interface Contact {
  email: string;
  linkedin: string;
  linkedinLabel: string;
  github: string;
  cv: string;
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
  hero: {
    cv: string;
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
