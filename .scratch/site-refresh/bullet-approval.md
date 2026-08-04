# Bullet approval: CV original vs proposed site copy

Gate for ticket 06. Nothing here lands in code until Fran approves it.

Source of truth: `public/Fran_Menendez_CV.pdf`, read as rendered pages (not text
extraction), per ADR 0001. (Renamed from `CV_Fran_Menendez_2026-07.pdf` on 2026-08-04:
the version string said July but the PDF was created 1 Aug 2026, and one asset should
not answer to two names. The filename now carries no version and is replaced in situ.)

**How to review:** each item shows the CV original and the proposed site version.
Mark each one keep / change / cut. The four open decisions at the top are the only
things that block me; the rest I can adjust after a first pass.

---

## Open decisions

**All four resolved by Fran on 2026-08-04**, each to the recommended option. Recorded
inline below. Separately, the Principal entry was revised from seven bullets to all
eleven the CV carries (see that entry).

### D1. The independent work has a public URL, and the CV says so

Ticket 06 says the independent work is "mentioned without a public URL, worded so no
claim depends on the reader clicking through". That premise is out of date. The CV
describes Instagram Checker as "live" and hyperlinks it to
`https://instagram-checker-web.vercel.app/`. I checked: it returns 200 and redirects
to `/login`.

Under ADR 0001 the CV wins, which argues for linking it. Against linking it: an
unauthenticated recruiter lands on a login wall, which is a worse click than no
click. Two things not to conflate: whether the *URL* ships, and whether the *copy*
leans on it.

**Recommendation:** ship the copy so it stands alone either way (the proposal below
does), and hold the link until the landing page shows something without a login.
Your call.

- [ ] Link it now
- [x] **Copy only, no link** (chosen)

### D2. Does Hiberus render as one entry or three?

`CONTEXT.md` says two roles at one employer are two entries, not one. The CV has three
Hiberus roles (Senior, Full-Stack, Junior). Ticket 06's checklist names "Hiberus
Tecnología" without a count, unlike TKWW and MOBIKO where it says two.

**Recommendation:** three entries, with bullets tapering by recency (2 / 1 / 1). It
follows the rule, and the taper stops 2017 taking the same visual weight as 2025.

- [x] **Three entries, 2/1/1 bullets** (chosen)
- [ ] One Hiberus block, three titles listed, 2 bullets total

### D3. Does the freelance line survive?

The CV carries "Earlier: Freelance Web Developer, 2016 to Jul 2017" with a paragraph on
a graduation photography studio.

**Recommendation:** cut from the site. It is the weakest evidence on the page and the
CV is one click away for anyone who wants the full history.

- [x] **Cut** (chosen)
- [ ] Keep as a one-line entry, no bullets

### D4. Location line, and EU work authorization

Spec open fact #3. The CV header reads "Zaragoza, Spain | EU work authorization | Remote".

**Recommendation:** the site says "Zaragoza, Spain" and "Remote", and drops EU work
authorization. It is recruiter-funnel signalling, and the site's job is the credibility
anchor; the CV still carries it for the job-search case.

- [x] **Zaragoza, Spain / Remote, no work authorization** (chosen)
- [ ] Include EU work authorization
- [ ] "Spain" rather than "Zaragoza, Spain"

---

## Identity line

**CV summary:**

> Software Engineer with 10+ years building platforms that serve millions of users. I
> work across the full stack and increasingly at the AI layer: semantic search in
> production, MCP tooling, and agentic engineering workflows I have made team-wide
> standards. I lead architecture domain-wide, mentor engineers, and set technical
> standards that scale.

**Proposed site version:**

> Software Engineer, 10+ years building platforms that serve millions of users, working
> at the AI layer: semantic search in production, MCP tooling, and agentic engineering
> workflows made team-wide standards.

**Note:** leads with the differentiator, per ticket 06. Drops the third CV sentence
(architecture, mentoring, standards) because the experience entries below carry it as
evidence rather than as assertion. Says "Software Engineer", not "Principal Software
Engineer", per ADR 0001. Name renders "Fran Menéndez".

---

## The Knot Worldwide

Remote | Oct 2023 to Present

### Principal Software Engineer, Apr 2025 to Present

**P1**

- CV: Rebuilt the Shop e-commerce platform from scratch in one month solo (versus a
  three-month, multi-developer estimate). The platform handles millions of products
  from Amazon's Rainforest API and editorial content via Contentful, built with Next.js
  and React with shared component libraries, now serving hundreds of thousands of users
  in production.
- Site: Rebuilt the Shop e-commerce platform from scratch in one month solo, against a
  three-month multi-developer estimate. Next.js and React over Amazon's Rainforest API
  and Contentful, serving hundreds of thousands of users in production.
- Note: drops "shared component libraries" and "millions of products" (the latter
  because "hundreds of thousands of users" is the stronger of the two, and two scale
  figures in one bullet dilute each other).

**P2**

- CV: Built a semantic product matching system using OpenSearch with k-NN vector
  similarity and BM25 text relevance, with a custom human-review dashboard inside
  PayloadCMS for matches below confidence thresholds.
- Site: Built semantic product matching on OpenSearch with k-NN vector similarity and
  BM25 text relevance, with a human-review dashboard in PayloadCMS for matches below
  the confidence threshold.
- Note: condensed only.

**P3**

- CV: Built the team's agentic AI development workflow: orchestration and verification
  architecture with role-based model routing, context budgeting, and mandatory
  independent review; used for production delivery including security-critical work.
- Site: Built the team's agentic AI development workflow: orchestration and
  verification with role-based model routing, context budgeting and mandatory
  independent review, used for production delivery including security-critical work.
- Note: unchanged in substance.

**P4**

- CV: Introduced Model Context Protocol (MCP) tooling that generates production
  components directly from Figma at token-exact fidelity, removing the manual
  design-to-code translation step; now the team-wide standard.
- Site: Introduced Model Context Protocol (MCP) tooling that generates production
  components directly from Figma at token-exact fidelity, removing the manual
  design-to-code step; now the team-wide standard.
- Note: condensed only. Keeps "Model Context Protocol" spelled out once on the page.

**P5**

- CV: Ran a full API security audit and hardening programme for the public e-commerce
  service: eight findings across four vulnerability classes, closing SQL injection,
  broken access control, a write-side IDOR and a PII exposure; built the service's
  first automated test harness (two-tier, DB-free CI proof layer) and a regenerable
  security-regression tripwire in CI.
- Site: Ran the API security audit and hardening programme for the public e-commerce
  service: eight findings across four vulnerability classes, closing SQL injection,
  broken access control, a write-side IDOR and a PII exposure; built the service's
  first automated test harness and a security-regression tripwire in CI.
- Note: drops "two-tier, DB-free CI proof layer" and "regenerable" as implementation
  detail that costs a line and earns little with a recruiter. Say the word if you want
  them back; they are the kind of detail an engineer reading the page would notice.

**P6**

- CV: Migrated PayloadCMS from v2 to v3 for 100,000+ products with zero downtime; query
  response times dropped from 850ms to 34ms through database optimization and caching
  architecture.
- Site: Migrated PayloadCMS from v2 to v3 for 100,000+ products with zero downtime;
  query response times dropped from 850ms to 34ms.
- Note: **100,000+ and 850ms both confirmed off the rendered PDF** (spec open fact #1).
  Drops the trailing mechanism clause; the numbers are the evidence.

**P7**

- CV: Building on that migration, reworked caching for 2M+ weekly users: added a cache
  layer and set per-endpoint revalidation and staleness policies after investigating
  each endpoint's tolerance, on the existing CDN with no added infrastructure. The
  reduced origin load let the pods be right-sized down, cutting the resource allocated
  and billed per pod with no availability regression.
- Site: Reworked caching for 2M+ weekly users: a cache layer and per-endpoint
  revalidation on the existing CDN with no added infrastructure. Reduced origin load
  let the pods be right-sized down, cutting resource cost per pod with no availability
  regression.
- Note: condensed. Keeps the "no added infrastructure" and "no availability regression"
  qualifiers, which are what make it credible rather than boastful.

**P8**

- CV: Built a custom Contentful editor app for the editorial platform (React, Contentful
  App SDK), including its S3 + CloudFront hosting infrastructure; propagated the new
  content model end-to-end across three services with zero-downtime migrations.
- Site: Built a custom Contentful editor app for the editorial platform (React,
  Contentful App SDK) with its S3 and CloudFront hosting; propagated the new content
  model end to end across three services with zero-downtime migrations.
- Note: condensed only.

**P9**

- CV: Steadied the engineering team through a company restructuring, and argued
  build-capacity against target-attainment in the half-year OKR capacity review;
  adjudicated review disputes on evidence rather than seniority.
- Site: unchanged.
- Note: the only bullet on the page showing judgement under organisational pressure
  rather than technical output. Fran restored it verbatim.

**P10**

- CV: Built session continuity across the Bump platform and Shop boundary: an OAuth
  token handoff signs users into Shop with their existing Bump account on navigation,
  provisioning an account just-in-time when none exists.
- Site: Built session continuity across the Bump and Shop boundary: an OAuth token
  handoff signs users into Shop with their existing Bump account on navigation,
  provisioning an account just in time when none exists.
- Note: condensed only.

**P11**

- CV: Root-caused cross-service authentication failures across that same boundary,
  isolating an edge-layer fault and a hanging Cognito session call; resolved a
  Kubernetes-served canonical SEO incident.
- Site: unchanged.

**Bullet count on this entry: revised from 7 to 11 by Fran on 2026-08-04.** The entry
now carries every bullet the CV does. My reason for proposing seven was page length:
eleven here against one to four everywhere else makes the page top-heavy. Fran's call,
and the counter-argument is sound: this is the role carrying the differentiator, and
recency weighting is what a reader expects.

Still proposed for omission elsewhere, and not covered by that decision: the Hiberus
Jenkins bullet and the Hiberus Ionic/Cordova/Electron bullet (see below).

### Lead Software Engineer, Oct 2023 to Mar 2025

**L1**

- CV: Built an A/B testing system for a platform where edge caching had made
  experimentation impossible: Akamai assigns a variant cookie at the edge, the app
  reads it to render the matching tagged build, and assignment stays cached and sticky
  across reloads until the cookie expires. The platform had run no experiments in over
  3 years before it; 10+ have run on it since.
- Site: Built an A/B testing system for a platform where edge caching had made
  experimentation impossible: Akamai assigns a variant cookie at the edge and the app
  renders the matching tagged build, sticky across reloads. The platform had run no
  experiments in over 3 years before it; 10+ have run since.
- Note: **"3 years" and "10+" both confirmed off the rendered PDF** (spec open fact #1).

**L2**

- CV: Cut deployment time from over 2 hours to 1 minute, enabling daily deployments and
  dramatically reducing developer cycle time.
- Site: Cut deployment time from over 2 hours to 1 minute, enabling daily deployments.
- Note: drops "dramatically reducing developer cycle time" as the unmeasured half of a
  sentence whose first half is already measured.

**L3**

- CV: Led development of the integrated commerce platform, taking it from proposal to a
  live MVP.
- Site: unchanged.

**L4**

- CV: Managed an 8-person cross-functional team; mentored 5 developers, resulting in 2
  promotions.
- Site: unchanged.
- Note: this is the bullet ADR 0001 kept in place of the invented "50+ engineers
  mentored". It stays exactly as the CV states it.

---

## MOBIKO GmbH

Munich, Germany (remote) | Aug 2020 to Sep 2023

### Team Lead & Architecture, Mar 2023 to Sep 2023

**M1**

- CV: Set the technical strategy and built the microservices architecture behind the
  company's enterprise expansion, processing 500k+ daily mobility events: a NestJS API
  gateway fronting serverless functions communicating over NATS message queues,
  containerized into Kubernetes with Keda-driven autoscaling and GitHub Actions
  deployment workflows.
- Site: Set the technical strategy and built the microservices architecture behind the
  company's enterprise expansion, processing 500k+ daily mobility events: a NestJS API
  gateway fronting serverless functions over NATS, on Kubernetes with Keda-driven
  autoscaling.
- Note: drops the GitHub Actions clause; the deployment story is M2 and M5.

**M2**

- CV: Grew the engineering team and shortened delivery cycles by restructuring the
  review and release process and mentoring engineers into ownership.
- Site: unchanged.

### Senior Full-Stack Developer, Aug 2020 to Mar 2023

**M3**

- CV: Migrated the entire product onto a new Vue platform and built the PWA intended to
  replace the existing multiplatform applications, on a Vuex/Flux state architecture in
  a class-structured TypeScript codebase.
- Site: Migrated the entire product onto a new Vue platform and built the PWA intended
  to replace the existing multiplatform applications, on a Vuex/Flux state architecture.
- Note: keeps "intended to replace", which is the honest verb. Do not let anyone
  upgrade it to "replaced" later.

**M4**

- CV: Rebuilt the API surface on NestJS with Swagger-annotated contracts and TypeORM
  against PostgreSQL, cutting response times through caching and database query
  optimization.
- Site: Rebuilt the API surface on NestJS with Swagger-annotated contracts and TypeORM
  against PostgreSQL, cutting response times through caching and query optimization.
- Note: condensed only.

**M5**

- CV: Automated the deployment pipeline from multi-day release cycles to continuous
  deployment, on Kubernetes with CircleCI running automated deploys and compatibility
  checks.
- Site: Automated the deployment pipeline from multi-day release cycles to continuous
  deployment, on Kubernetes with CircleCI.
- Note: condensed only.

---

## Hiberus Tecnología

Zaragoza, Spain | Jul 2017 to Jul 2020

Rendering assumes D2 is answered "three entries, 2/1/1".

### Senior Full-Stack Developer, Jan 2020 to Jul 2020

**H1**

- CV: Built Afición360, a single Angular monorepo serving the front ends of multiple
  football clubs plus an internal admin dashboard, on a shared Flux state architecture
  with NestJS REST microservices split via Lerna; integrated the La Liga and AVET APIs,
  using websockets deliberately to throttle traffic so the external services were not
  overloaded.
- Site: Built Afición360, a single Angular monorepo serving the front ends of multiple
  football clubs plus an internal admin dashboard, with NestJS REST microservices split
  via Lerna; integrated the La Liga and AVET APIs over websockets, deliberately
  throttled so the external services were not overloaded.
- Note: condensed. Keeps the throttling detail, which is the judgement in the bullet.

**H2**

- CV: Rebuilt the checkout path for a real-time ticketing platform under La Liga
  match-day load, integrating the official API for 100k+ concurrent users.
- Site: unchanged.

**Omitted, confirmed by Fran:** the Jenkins-from-scratch bullet ("pipelines building
and deploying every monorepo application and backend into Docker on AWS"). The CI/CD
thread is already carried by L2 and M5 with better numbers.

### Full-Stack Developer, Nov 2017 to Jan 2020

**H3**

- CV: Built a platform processing 1M+ daily entries with real-time sync across 5
  geographic locations, on CouchDB as an offline-capable distributed database
  live-syncing data spread across multiple systems; still in production.
- Site: Built a platform processing 1M+ daily entries with real-time sync across 5
  geographic locations, on CouchDB as an offline-capable distributed database; still in
  production.
- Note: condensed. "Still in production" is the strongest three words in the bullet.

**Omitted, confirmed by Fran:** the Ionic/Cordova/Electron kiosk bullet. It is the
most dated technology stack on the page and does not support the differentiator.

### Junior Developer, E-commerce, Jul 2017 to Nov 2017

**H4**

- CV: Built a NodeJS/Express service from scratch aggregating external APIs, still in
  production, and an AngularJS application for a multinational consuming Google
  ecosystem APIs; backend work on an in-house Spring/Hibernate framework over MySQL and
  SQL Server.
- Site: Built a NodeJS/Express service from scratch aggregating external APIs, still in
  production, and an AngularJS application for a multinational consuming Google
  ecosystem APIs.
- Note: drops the Spring/Hibernate clause. A first-job entry earns one line.

---

## Independent work

**CV:**

> Instagram Checker, live and built end to end with the same agentic workflow: it turns
> an Instagram data export the user supplies into a follower and following dashboard,
> reading only what the user provides rather than scraping.

**Proposed site version:**

> **Instagram Checker.** Built end to end with the same agentic workflow as the work
> above: it turns an Instagram data export the user supplies into a follower and
> following dashboard, reading only what the user provides rather than scraping.

**Note:** the phrase "the same agentic workflow as the work above" is what earns this
its place on a credibility-anchor page: it is the differentiator with an artefact
behind it, rather than a side project. No claim here depends on clicking through, so
this copy is correct whichever way D1 lands. The title becomes an `<a>` if you say
link it, and stays a `<strong>` if you do not; adding the link later is a one-line
change.

---

## Recognitions

One compact line, not cards, per `CONTEXT.md`. Every year below is **confirmed off the
rendered PDF** (spec open fact #1); the text extraction had mangled several.

**Proposed site version:**

> NASA Space Apps Global Finalist & Galactic Impact Award (May 2017) · 100 Ideas
> Zaragoza, Most Innovative Technology (Sep 2017) · 100 Ideas Zaragoza, Best Use of the
> Citizen Card (Sep 2017) · uCode by Adidas, Best Fan Experience Solution (Mar 2018) ·
> ImagineCode Blockchain Challenge Winner (Oct 2018) · NASA Space Apps Zaragoza Local
> Hub Winner (Oct 2018) · Google Hash Code Zaragoza Hub Winner (Feb 2019)

**Note:** verbatim from the CV, separator changed from `|` to `·` for the visual
direction. Seven items is long for one line, but they are all named organisations with
dates, which is exactly what a programme committee wants (user story 8).

---

## Skills line

The CV's eight-category technical skills block becomes one factual line, per ticket 06.

**Proposed site version:**

> TypeScript · React · Next.js · Node.js · NestJS · Vue · Angular · React Native ·
> PostgreSQL · OpenSearch · MongoDB · AWS · Kubernetes · Docker

**Note:** technologies only, no capability nouns. Everything here appears in an
experience entry above or in the CV's skills block. Deliberately excluded: "Semantic
Search", "Agentic Development Workflows", "Context Engineering" and "Application
Security" from the CV's AI Engineering and Application Security rows. They are real,
but as line items they read as claims. They are already evidenced by P2, P3, P4 and P5,
which is worth more.

---

## Education

Not currently in ticket 06's checklist. The CV has it.

**Proposed:** one line under recognitions.

> Computer Engineering (Software Engineering Specialization), Universidad de Zaragoza,
> 2012 to 2017 · Spanish (native), English (C1)

- [x] **Include** (chosen: cheap, verifiable, and the sort of thing a credibility
      anchor is for)
- [ ] Omit

---

## Contact and footer

**Proposed:**

- Hero primary action: Download CV, linking `/Fran_Menendez_CV.pdf` and saving under
  that same name. Done ahead of the rest of this ticket: the asset was byte-identical
  (SHA-256 `dfec75c4…`) to `~/Downloads/Fran_Menendez_CV.pdf`, so the content was never
  wrong, only the two names it answered to. `CONTEXT.md` and ADR 0001 updated to match.
- Hero secondary: `fmenendezmoya@gmail.com`, `linkedin.com/in/fmenemo`
- Contact section: email, LinkedIn, and the location line from D4
- Footer: GitHub as an unlabelled icon only, per ADR 0001

**Removed outright** (all currently on the site, none of it in the CV):

- "Currently Open to New Opportunities" and the availability line. No availability
  signalling, per ticket 06.
- The three "focus areas" cards (Engineering Leadership, System Architecture, Technical
  Strategy). Claims, not evidence.
- The three About paragraphs, including "enjoying the outdoors with my family" and
  "contributing to open source projects". The latter is the exact claim ADR 0001
  removed the GitHub framing over.
- The 30-item skill group list.
- The four hero "specialties" chips.
