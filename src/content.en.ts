// Every string a visitor reads on the English edition. The shape it satisfies
// is in `content.ts`.
//
// Two copies live outside it, both of them condensations of `identity.line`
// below: the metadata in `index.html`, which is what a link scraper reads, and
// the share image copy in `tools/assets/og-image.html`. Change the identity
// line and all three move together; a test in `App.test.tsx` fails if they
// drift apart.
//
// It is condensed from `public/Fran_Menendez_CV.pdf`, which is the source of
// truth: where the two disagree, the CV wins and this file is wrong (ADR 0001).
// Each bullet was approved against its CV original in
// `.scratch/site-refresh/bullet-approval.md`, which also records why anything on
// the CV is missing here. Do not add a statement that is not in that document.

import type { SiteContent } from './content';

export const en: SiteContent = {
  identity: {
    name: 'Fran Menéndez',
    line: 'Software Engineer, 10+ years building platforms that serve millions of users, working at the AI layer: semantic search in production, MCP tooling, and agentic engineering workflows made team-wide standards.',
    location: 'Zaragoza, Spain',
    mode: 'Remote',
  },

  contact: {
    email: 'fmenendezmoya@gmail.com',
    linkedin: 'https://www.linkedin.com/in/fmenemo/',
    linkedinLabel: 'linkedin.com/in/fmenemo',
    github: 'https://github.com/fmenemo',
    // The original, and the only CV this edition offers. The Spanish edition
    // offers this one too, so it is republished with its Spanish translation
    // and never on its own (ADR 0004, and the note on `CvDownload`).
    cvs: [{ href: '/Fran_Menendez_CV.pdf', label: 'Download CV' }],
  },

  employers: [
    {
      name: 'The Knot Worldwide',
      location: 'Remote',
      span: 'Oct 2023 - Jul 2026',
      roles: [
        {
          title: 'Principal Software Engineer',
          dates: 'Apr 2025 - Jul 2026',
          bullets: [
            'Rebuilt the Shop e-commerce platform from scratch in one month solo, against a three-month multi-developer estimate. Next.js and React over Amazon’s Rainforest API and Contentful, serving hundreds of thousands of users in production.',
            'Built semantic product matching on OpenSearch with k-NN vector similarity and BM25 text relevance, banded by confidence: the strongest matches served automatically with no human review — about 90% of throughput — the weakest discarded, and the band between them routed to a review dashboard I built in PayloadCMS. p95 query latency stayed under 50ms across 100,000+ products.',
            'Built and ran an agentic AI development workflow for my own production delivery: four stages, eight role-scoped agents, model routing by task, and review roles barred from writing the code they audit. Used it to deliver a security hardening programme, where the independent step caught defects the implementing pass had missed; drove its practices into the team’s process.',
            'Introduced Model Context Protocol (MCP) tooling that generates production components directly from Figma at token-exact fidelity, removing the manual design-to-code step; now the team-wide standard.',
            'Ran the API security audit and hardening programme for the public e-commerce service: eight findings across four vulnerability classes — SQL injection, over-open collection access, PII projection and identity trust — with remediation closing a write-side IDOR in a shared authorisation primitive covering five collections; built the service’s first automated test harness and an access-coverage matrix that flags any loosening of access as a diff.',
            'Migrated PayloadCMS from v2 to v3 for 100,000+ products with zero downtime; query response times dropped from 850ms to 34ms.',
            'Reworked caching for 2M+ weekly users: a cache layer and per-endpoint revalidation on the existing CDN with no added infrastructure. Reduced origin load let the pods be right-sized down, cutting resource cost per pod with no availability regression.',
            'Built a custom Contentful editor app for the editorial platform (React, Contentful App SDK) with its S3 and CloudFront hosting; propagated the new content model end to end across three services with zero-downtime migrations.',
            'Steadied the engineering team through a company restructuring, and argued build-capacity against target-attainment in the half-year OKR capacity review; adjudicated review disputes on evidence rather than seniority.',
            'Unified sign-on across five products — Bump articles, baby names, registry, shop and the native apps — so that one account replaced five separate logins.',
            'Built session continuity across the Bump and Shop boundary: an OAuth token handoff signs users into Shop with their existing Bump account on navigation, provisioning an account just in time when none exists.',
            'Root-caused cross-service authentication failures across that same boundary, isolating an edge-layer fault and a hanging Cognito session call; resolved a Kubernetes-served canonical SEO incident.',
          ],
        },
        {
          title: 'Lead Software Engineer',
          dates: 'Oct 2023 - Mar 2025',
          bullets: [
            'Built an A/B testing system for a platform where edge caching had made experimentation impossible: Akamai assigns a variant cookie at the edge and the app renders the matching tagged build, sticky across reloads. The platform had run no experiments in over 3 years before it; 10+ have run since.',
            'Cut deployment time from over 2 hours to 1 minute, enabling daily deployments.',
            'Led development of the integrated commerce platform, taking it from proposal to a live MVP.',
            'Managed an 8-person cross-functional team; mentored 5 developers, resulting in 2 promotions.',
          ],
        },
      ],
    },
    {
      name: 'MOBIKO GmbH',
      location: 'Munich, Germany (remote)',
      span: 'Aug 2020 - Sep 2023',
      roles: [
        {
          title: 'Team Lead & Architecture',
          dates: 'Mar 2023 - Sep 2023',
          bullets: [
            'Set the technical strategy and built the microservices architecture behind the company’s enterprise expansion, processing 500k+ daily mobility events: a NestJS API gateway fronting serverless functions over NATS, on Kubernetes with Keda-driven autoscaling.',
            'Grew the engineering team and shortened delivery cycles by restructuring the review and release process and mentoring engineers into ownership.',
          ],
        },
        {
          title: 'Senior Full-Stack Developer',
          dates: 'Aug 2020 - Mar 2023',
          bullets: [
            'Migrated the entire product onto a new Vue platform and built the PWA intended to replace the existing multiplatform applications, on a Vuex/Flux state architecture.',
            'Rebuilt the API surface on NestJS with Swagger-annotated contracts and TypeORM against PostgreSQL, cutting response times through caching and query optimization.',
            'Automated the deployment pipeline from multi-day release cycles to continuous deployment, on Kubernetes with CircleCI.',
          ],
        },
      ],
    },
    {
      name: 'Hiberus Tecnología',
      location: 'Zaragoza, Spain',
      span: 'Jul 2017 - Jul 2020',
      roles: [
        {
          title: 'Senior Full-Stack Developer',
          dates: 'Jan 2020 - Jul 2020',
          bullets: [
            'Built Afición360, a single Angular monorepo serving the front ends of multiple football clubs plus an internal admin dashboard, with NestJS REST microservices split via Lerna; integrated the La Liga and AVET APIs over websockets, deliberately throttled so the external services were not overloaded.',
            'Rebuilt the checkout path for a real-time ticketing platform under La Liga match-day load, integrating the official API for 100k+ concurrent users.',
          ],
        },
        {
          title: 'Full-Stack Developer',
          dates: 'Nov 2017 - Jan 2020',
          bullets: [
            'Built a platform processing 1M+ daily entries with real-time sync across 5 geographic locations, on CouchDB as an offline-capable distributed database; still in production.',
          ],
        },
        {
          title: 'Junior Developer, E-commerce',
          dates: 'Jul 2017 - Nov 2017',
          bullets: [
            'Built a NodeJS/Express service from scratch aggregating external APIs, still in production, and an AngularJS application for a multinational consuming Google ecosystem APIs.',
          ],
        },
      ],
    },
  ],

  // No public URL by decision D1: the project is live but lands on a login wall,
  // which is a worse click than no click. The copy stands alone, so adding an
  // `href` here later is the whole change.
  independentWork: {
    name: 'Instagram Checker',
    description:
      'Built end to end with the same agentic workflow as the work above: it turns an Instagram data export the user supplies into a follower and following dashboard, reading only what the user provides rather than scraping.',
  },

  recognitions: [
    'NASA Space Apps Global Finalist & Galactic Impact Award (May 2017)',
    '100 Ideas Zaragoza, Most Innovative Technology (Sep 2017)',
    '100 Ideas Zaragoza, Best Use of the Citizen Card (Sep 2017)',
    'uCode by Adidas, Best Fan Experience Solution (Mar 2018)',
    'ImagineCode Blockchain Challenge Winner (Oct 2018)',
    'NASA Space Apps Zaragoza Local Hub Winner (Oct 2018)',
    'Google Hash Code Zaragoza Hub Winner (Feb 2019)',
  ],

  education: {
    degree: 'Computer Engineering (Software Engineering Specialization)',
    institution: 'Universidad de Zaragoza',
    years: '2012 - 2017',
    languages: 'Spanish (native), English (C1)',
  },

  // Technologies actually worked in, not capability nouns. "Semantic Search" and
  // "Agentic Development Workflows" are deliberately absent: as line items they
  // read as claims, and the experience entries already evidence them.
  technologies: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'Vue',
    'Angular',
    'React Native',
    'PostgreSQL',
    'OpenSearch',
    'MongoDB',
    'AWS',
    'Kubernetes',
    'Docker',
  ],

  chrome: {
    nav: {
      label: 'Sections',
      experience: 'Experience',
      contact: 'Contact',
      toDarkMode: 'Switch to dark mode',
      toLightMode: 'Switch to light mode',
    },
    language: {
      label: 'Language',
      current: 'EN',
      other: { label: 'ES', path: '/es/', lang: 'es', name: 'View this page in Spanish' },
    },
    sections: {
      experience: 'Experience',
      independentWork: 'Independent work',
      recognitions: 'Recognitions',
      technologies: 'Technologies',
      contact: 'Contact',
    },
    contact: {
      email: 'Email',
      linkedin: 'LinkedIn',
      location: 'Location',
    },
    recognitions: {
      education: 'Education',
    },
  },
};
