# Bullet approval: the site catches up with the reworked CV, nesting included

Gate for Spec #25, and the record for the whole of `src/content.en.ts`. Opened by ticket #27
with the **Principal role**; completed by ticket #30 with the **Lead role** and every other
string the English edition carries. Ticket #31 writes the Spanish record beside it.

It supersedes `.scratch/site-refresh/bullet-approval.md`, which approved a CV two rewrites back.
The rows here that no diff moved were re-read against the current CV anyway: a row that points
at another document is a check deferred rather than made.

Source of truth: `cv/en.md` at `433e72d` in `professional-record`, read at repo commit `0996591`
(2026-09-04). The bounded read is
`git -C ~/Projects/professional-record diff 36eab4d..HEAD -- cv/en.md`, which is everything the
site was behind on.

**How to review:** each row gives the CV original and the string that landed in
`src/content.en.ts`. A site string says less than its original or says the same; it never says
more, and it carries no figure the CV does not (ADR 0001). Parts 1 to 6 walk the page in the
order a reader meets it; part 7 is what the CV says and the site deliberately does not.

---

## 1. The Principal role: the Shop programme

One bullet on the site, as it is one bullet on the CV: a headline carrying the parts under it.
The site's condensation drops the headline's second sentence and keeps every part.

### The headline

- **CV:** Took Shop from proposal to production: the e-commerce platform I proposed as Lead, on
  a $2M+ annual revenue projection, delivered to a live MVP with the team, and took to
  production as Principal — sole contributor on it at times. Where the build order was contested
  I argued it from what the product's metrics showed rather than from the surface being asked
  for.
- **Site:** Took Shop from proposal to production: the e-commerce platform I proposed as Lead,
  on a $2M+ annual revenue projection, delivered to a live MVP with the team, and took to
  production as Principal — sole contributor on it at times.
- The second sentence is left off because the first sub-bullet *is* that argument, in the
  specific. Stating the general form above the instance makes the headline a preamble to its own
  evidence.

### The parts, in the CV's order

The CV lists **nine**. Spec #25 and ticket #27 both say "eight", counting unified sign-on and
session continuity as one; the CV keeps them as two bullets and ticket #27's own enumeration
names them separately, so the site renders nine. Nothing is added or dropped either way — the
count is a way of describing the same set.

**1. The mobile-first argument** — new to the site.

- **CV:** After the mobile-only MVP the plan was the desktop build next; I argued from Mixpanel
  and GA, an onboarding drop-off on a mostly mobile audience, that retention on mobile came
  first, and that order was adopted.
- **Site:** unchanged from the CV. It is one sentence and every clause carries a step of the
  argument: the plan, the evidence, the claim, the outcome.

**2. The PayloadCMS migration** — approved in the previous sweep, unmoved by the CV.

- **CV:** Migrated PayloadCMS from v2 to v3 for 100,000+ products with zero downtime; query
  response times dropped from 850ms to 34ms through database optimization and a Redis query
  cache.
- **Site:** Migrated PayloadCMS from v2 to v3 for 100,000+ products with zero downtime; query
  response times dropped from 850ms to 34ms.
- The mechanism is left off, as it was before. The figure is the evidence.

**3. The solo rebuild** — approved in the previous sweep, unmoved.

- **CV:** Rebuilt the Shop e-commerce platform from scratch in one month solo (versus a
  three-month, multi-developer estimate). The platform handles millions of products from
  Amazon's Rainforest API and editorial content via Contentful, built with Next.js and React
  with shared component libraries, now serving hundreds of thousands of users in production.
- **Site:** Rebuilt the Shop e-commerce platform from scratch in one month solo, against a
  three-month multi-developer estimate. Next.js and React over Amazon's Rainforest API and
  Contentful, serving hundreds of thousands of users in production.

**4. The semantic matcher** — approved in the previous sweep, unmoved.

- **CV:** Built a semantic product matching system using OpenSearch with k-NN vector similarity
  and BM25 text relevance, banded by confidence: candidates below a 0.75 floor were discarded,
  the strongest matches served automatically — about 90% of throughput, with no human review —
  and the band in between routed to a custom review dashboard I built inside PayloadCMS. p95
  query latency stayed under 50ms across 100,000+ products.
- **Site:** Built semantic product matching on OpenSearch with k-NN vector similarity and BM25
  text relevance, banded by confidence: the strongest matches served automatically with no human
  review — about 90% of throughput — the weakest discarded, and the band between them routed to
  a review dashboard I built in PayloadCMS. p95 query latency stayed under 50ms across 100,000+
  products.
- The 0.75 floor stays declined, as it was in the previous sweep: the bullet already carries
  four figures, and the floor is the only one a reader cannot weigh without knowing the scoring
  scale it sits on.

**5. The caching rework** — approved in the previous sweep, unmoved.

- **CV:** Building on that migration, reworked caching for 2M+ weekly users: added a cache layer
  and set per-endpoint revalidation and staleness policies after investigating each endpoint's
  tolerance, on the existing CDN with no added infrastructure. The reduced origin load let the
  pods be right-sized down, cutting the resource allocated and billed per pod with no
  availability regression.
- **Site:** Reworked caching for 2M+ weekly users: a cache layer and per-endpoint revalidation
  on the existing CDN with no added infrastructure. Reduced origin load let the pods be
  right-sized down, cutting resource cost per pod with no availability regression.

**6. The admin extensions** — new to the site.

- **CV:** Extended the PayloadCMS admin with custom pages: a purge console giving editors
  control over that Redis cache without an engineer, and the manual review panel for the product
  matcher.
- **Site:** Extended the PayloadCMS admin with custom pages: a purge console giving editors
  control over the Redis query cache without an engineer, and the manual review panel for the
  product matcher.
- "That Redis cache" points back to a clause the migration bullet above declines to carry, so
  the site names the cache instead of pointing at it. The name is the CV's own.

**7. Unified sign-on** — approved in the previous sweep, unmoved. The CV's sentence verbatim.

- **CV and site:** Unified sign-on across five products — Bump articles, baby names, registry,
  shop and the native apps — so that one account replaced five separate logins.

**8. Session continuity** — approved in the previous sweep, unmoved.

- **CV:** Built session continuity across the Bump platform and Shop boundary: an OAuth token
  handoff signs users into Shop with their existing Bump account on navigation, provisioning an
  account just-in-time when none exists.
- **Site:** Built session continuity across the Bump and Shop boundary: an OAuth token handoff
  signs users into Shop with their existing Bump account on navigation, provisioning an account
  just in time when none exists.

**9. The API hardening** — rewritten. This is the CV's replacement for the audit bullet, and the
one string in the programme whose meaning changed rather than its position.

- **CV:** Hardened the public e-commerce API: closed SQL injection, access-control and
  PII-exposure holes, including a write-side IDOR in a shared authorisation primitive covering
  five collections, and left it guarded by regression tests that run in CI.
- **Site:** unchanged from the CV. Every clause is a distinct fact: what was closed, the one
  finding worth naming, and what holds it closed.
- What went: the finding count, the four-class taxonomy, the first automated test harness and
  the access-coverage matrix. All four were the old bullet's, and the CV no longer makes any of
  them. See part 7.

---

## 2. The Principal role: the rest of it, in the CV's order

Five bullets stand on their own after the programme. Four are unmoved by the CV and carried
unchanged from the previous sweep; each is set out here beside its CV original anyway, because a
row that points at another document is a check deferred rather than made. The fifth is rewritten.

**1. MCP tooling** — approved in the previous sweep, unmoved.

- **CV:** Introduced Model Context Protocol (MCP) tooling that generates production components
  directly from Figma at token-exact fidelity, removing the manual design-to-code translation
  step; now the team-wide standard. On my own implementation work it took design-with-components
  from about a week to under a day, roughly 85%.
- **Site:** Introduced Model Context Protocol (MCP) tooling that generates production components
  directly from Figma at token-exact fidelity, removing the manual design-to-code step; now the
  team-wide standard.
- The 85% cut stays declined; see part 7. "Translation" goes with it: the sentence says what was
  removed either way, and the shorter phrase does not invite the figure back.
- This is the one bullet the team-wide standard attaches to, and `App.test.tsx` keeps it that
  way: nothing on the page may attach "team-wide" to the agentic workflow.

**2. The agentic workflow** — approved in the previous sweep, unmoved.

- **CV:** Built and ran an agentic AI development workflow for my own production delivery: four
  stages, eight role-scoped agents, model routing by task, a thin-orchestrator context budget,
  and review roles barred from writing the code they audit. Used it to deliver a security
  hardening programme, where the independent step caught defects the implementing pass had
  missed; drove its practices into the team's process.
- **Site:** Built and ran an agentic AI development workflow for my own production delivery:
  four stages, eight role-scoped agents, model routing by task, and review roles barred from
  writing the code they audit. Used it to deliver a security hardening programme, where the
  independent step caught defects the implementing pass had missed; drove its practices into the
  team's process.
- The thin-orchestrator context budget is the one clause left off; see part 7. The
  separation-of-duties clause stays, because it is what makes the workflow credible rather than
  fashionable.

**3. Steadying the team through the restructuring** — approved in the previous sweep, unmoved.
The CV's sentence verbatim.

- **CV and site:** Steadied the engineering team through a company restructuring, and argued
  build-capacity against target-attainment in the half-year OKR capacity review; adjudicated
  review disputes on evidence rather than seniority.

**4. The Contentful editor app** — approved in the previous sweep, unmoved.

- **CV:** Built a custom Contentful editor app for the editorial platform (React, Contentful App
  SDK), including its S3 + CloudFront hosting infrastructure; propagated the new content model
  end-to-end across three services with zero-downtime migrations.
- **Site:** Built a custom Contentful editor app for the editorial platform (React, Contentful
  App SDK) with its S3 and CloudFront hosting; propagated the new content model end to end
  across three services with zero-downtime migrations.
- Same facts, fewer words: "including its ... infrastructure" becomes "with its ... hosting".

**5. The SEO incident** — promoted from a trailing clause to a bullet of its own.

- **CV:** Traced a sitewide collapse in The Bump's organic traffic to the site taking its own
  address from whichever host the request arrived on. An ingress migration had just changed that
  host, so the site was telling search engines its internal origin was canonical. Pinned that
  identity to the brand domain where it is derived, so no later infrastructure change can move
  it.
- **Site:** Traced a sitewide collapse in The Bump's organic traffic to the site taking its own
  address from whichever host the request arrived on, which an ingress migration had just
  changed: it was telling search engines its internal origin was canonical. Pinned that identity
  to the brand domain where it is derived, so no later infrastructure change can move it.
- Three sentences to two, and the diagnosis is the whole of it. The site used to name Kubernetes
  and call the thing a "canonical SEO incident", which is the shape of the answer without the
  answer.

---

## 3. The Lead role, in the CV's order

Five bullets, and the CV's order is the argument: what he took on, the system he built for it,
what that system returned, the team he ran, and the release path he fixed. `App.test.tsx`
asserts that order, because an order is content.

**1. The handover** — new to the site. The CV gained it in this rewrite.

- **CV:** Took over The Bump's web platform from the outgoing team: rebuilt their build and
  release tooling, environments and runbooks in-house, and sat on the hiring panel for four
  engineering roles, defining the technical screen, to staff the team that would own it.
- **Site:** unchanged from the CV. Every clause is a distinct fact — the inheritance, what was
  rebuilt, and the hiring panel — and dropping any of them leaves the role sounding like one he
  was handed staffed.

**2. The A/B system** — approved in the previous sweep as the first half of a longer bullet, and
carried unchanged. The CV has since split that bullet in two; the site's string is already the
system alone, so the split cost it nothing.

- **CV:** Built an A/B testing system for The Bump, a platform where edge caching had made
  experimentation impossible: Akamai assigns a variant cookie at the edge, the app reads it to
  render the matching tagged build, and assignment stays cached and sticky across reloads until
  the cookie expires. The platform had run no experiments in over 3 years before it; 10+ have run
  on it since.
- **Site:** Built an A/B testing system for a platform where edge caching had made
  experimentation impossible: Akamai assigns a variant cookie at the edge and the app renders the
  matching tagged build, sticky across reloads. The platform had run no experiments in over 3
  years before it; 10+ have run since.
- The cookie's expiry is left off: "sticky across reloads" is the property a reader is being
  asked to believe, and the mechanism keeping it sticky is already named.

**3. The winning variant** — promoted to a statement of its own, following the CV.

- **CV:** The winning variant in an ad-layout test on that system lifted served ad impressions
  23% against control on an ad-monetised property; it shipped because engagement depth held at
  baseline in Mixpanel and GA4, with the new ad combination sitting outside the width-capped
  article column.
- **Site:** The winning variant in an ad-layout test on that system lifted served ad impressions
  23% against control; it shipped because engagement depth held at baseline in Mixpanel and GA4.
- Two clauses go. "On an ad-monetised property" is said by "ad impressions" already, and the
  width-capped article column is the layout of a page the reader has never seen, so it explains
  nothing without a paragraph around it. What stays is the lift and the reason it was allowed to
  ship, which is the whole of why the figure is evidence rather than a number.

**4. The team** — approved in the previous sweep, unmoved by the CV.

- **CV:** Managed an 8-person cross-functional team; mentored 5 developers, resulting in 2
  promotions, with 100% retention across the period.
- **Site:** Managed an 8-person cross-functional team; mentored 5 developers, resulting in 2
  promotions.
- The retention figure stays declined; see part 7.

**5. The deployment time** — approved in the previous sweep, unmoved.

- **CV:** Cut deployment time from over 2 hours to 1 minute, taking releases from batched to
  daily.
- **Site:** Cut deployment time from over 2 hours to 1 minute, enabling daily deployments.
- The CV reworded the second clause and the site's says the same thing more plainly. Left as it
  is rather than churned for a synonym.

**Gone from this role:** "Took the integrated commerce platform from proposal to a live MVP, on a
$2M+ annual revenue projection." The CV moved that claim into the Shop headline in the role
above, where it is now made once, as Principal. Left here as well it would be the same work
counted twice in two roles, which is what a recruiter reading both would catch first.
`App.test.tsx` guards its absence.

---

## 4. MOBIKO GmbH

The CV diff does not touch this employer. Every row is the previous sweep's, re-read against the
current document.

**Team Lead & Architecture** — the architecture bullet.

- **CV:** Set the technical strategy and built the microservices architecture behind the
  company's enterprise expansion — three global enterprise partnerships, each scoped directly
  with the customer and integrated per partner — processing 500k+ daily mobility events: a NestJS
  API gateway fronting serverless functions communicating over NATS message queues, containerized
  into Kubernetes with Keda-driven autoscaling and GitHub Actions deployment workflows.
- **Site:** Set the technical strategy and built the microservices architecture behind the
  company's enterprise expansion, processing 500k+ daily mobility events: a NestJS API gateway
  fronting serverless functions over NATS, on Kubernetes with Keda-driven autoscaling.
- The partnerships clause and the GitHub Actions clause are both off; see part 7 for the first,
  and the deployment story is told by the pipeline bullet below for the second.

**Team Lead & Architecture** — the process bullet. The CV's sentence verbatim.

- **CV and site:** Restructured the review and release process and mentored engineers into
  ownership; the team grew and delivery cycles shortened over the period.

**Senior Full-Stack Developer** — the Vue migration.

- **CV:** Migrated the entire product onto a new Vue platform and built the PWA intended to
  replace the existing multiplatform applications, on a Vuex/Flux state architecture in a
  class-structured TypeScript codebase.
- **Site:** Migrated the entire product onto a new Vue platform and built the PWA intended to
  replace the existing multiplatform applications, on a Vuex/Flux state architecture.
- "Intended to replace" is the honest verb and stays. It is not an upgrade waiting to be made to
  "replaced".

**Senior Full-Stack Developer** — the API rebuild.

- **CV:** Rebuilt the API surface on NestJS with Swagger-annotated contracts and TypeORM against
  PostgreSQL, cutting API response times 72% through caching and database query optimization;
  page loads dropped 70% in Lighthouse.
- **Site:** Rebuilt the API surface on NestJS with Swagger-annotated contracts and TypeORM
  against PostgreSQL, cutting response times 72% through caching and query optimization; page
  loads dropped 70% in Lighthouse.

**Senior Full-Stack Developer** — the pipeline.

- **CV:** Automated the deployment pipeline from multi-day release cycles to continuous
  deployment, on Kubernetes with CircleCI running automated deploys and compatibility checks.
- **Site:** Automated the deployment pipeline from multi-day release cycles to continuous
  deployment, on Kubernetes with CircleCI.

The site orders this role's three bullets migration, API, pipeline where the CV runs API,
migration, pipeline. The order here is chronological within the role and was approved that way;
the CV did not move it in this rewrite, so neither does this sweep.

---

## 5. Hiberus Tecnología

Untouched by the CV diff. Re-read anyway.

**Senior Full-Stack Developer** — Afición360.

- **CV:** Built Afición360, a single Angular monorepo serving the front ends of multiple football
  clubs plus an internal admin dashboard, on a shared Flux state architecture with NestJS REST
  microservices split via Lerna; integrated the La Liga and AVET APIs, using websockets
  deliberately to throttle traffic so the external services were not overloaded.
- **Site:** Built Afición360, a single Angular monorepo serving the front ends of multiple
  football clubs plus an internal admin dashboard, with NestJS REST microservices split via
  Lerna; integrated the La Liga and AVET APIs over websockets, deliberately throttled so the
  external services were not overloaded.
- The throttling stays: it is the judgement in the bullet rather than the technology.

**Senior Full-Stack Developer** — the ticketing checkout. The CV's sentence verbatim.

- **CV and site:** Rebuilt the checkout path for a real-time ticketing platform under La Liga
  match-day load, integrating the official API for 100k+ concurrent users.

**Full-Stack Developer** — the distributed platform.

- **CV:** Built a platform processing 1M+ daily entries with real-time sync across 5 geographic
  locations, on CouchDB as an offline-capable distributed database live-syncing data spread
  across multiple systems, at 99.95% uptime; still in production.
- **Site:** Built a platform processing 1M+ daily entries with real-time sync across 5 geographic
  locations, on CouchDB as an offline-capable distributed database, at 99.95% uptime; still in
  production.

**Junior Developer, E-commerce** — the first job.

- **CV:** Built a NodeJS/Express service from scratch aggregating external APIs, still in
  production, and an AngularJS application for a multinational consuming Google ecosystem APIs;
  backend work on an in-house Spring/Hibernate framework over MySQL and SQL Server.
- **Site:** Built a NodeJS/Express service from scratch aggregating external APIs, still in
  production, and an AngularJS application for a multinational consuming Google ecosystem APIs.
- A first-job entry earns one line. The Spring/Hibernate clause is the one dropped.

---

## 6. Independent work, education, recognitions and technologies

**Instagram Checker** — the CV dropped its link in this rewrite. The site never carried one.

- **CV:** Instagram Checker, live and built end to end with the same agentic workflow: it turns
  an Instagram data export the user supplies into a follower and following dashboard, reading
  only what the user provides rather than scraping.
- **Site:** Built end to end with the same agentic workflow as the work above: it turns an
  Instagram data export the user supplies into a follower and following dashboard, reading only
  what the user provides rather than scraping.
- The link the CV removed is the one the site declined on its own account: the project is live
  but lands on a login wall, which is a worse click than no click (decision D1). The two
  documents now agree, and the CV's removal is a reason to leave the site alone rather than to
  change it. "The same agentic workflow as the work above" is what earns the entry its place, and
  it is why this entry renders first.

**Multi-agent delivery harness** — the CV shortened its paragraph. Every clause the site carries
survives in the shorter one.

- **CV:** Multi-agent delivery harness, built and run solo. Scheduling comes from the tracker's
  dependency edges, unblocked work in parallel. An independent review answers in a schema the
  harness parses, and the parsed verdict gates the merge; a finding returns to the writing
  session as a bounded retry. Every step lands on a typed transition stream, and each role runs
  at the model and effort its failure cost argues for.
- **Site:** Built and run solo: it derives the order work runs in from a tracker's own dependency
  edges, scheduling in parallel whatever nothing blocks. An independent review answers in a
  schema the harness parses, and that parsed verdict gates the merge; a finding returns to the
  session that wrote the code as a bounded retry rather than a rewrite.
- The typed transition stream and the per-role model and effort routing stay off, as they were
  in the sweep that added this entry: each needs a sentence of its own to mean anything, and the
  CV shortening its own paragraph is not a reason to lengthen the site's.

**Education and languages.**

- **CV:** Computer Engineering (Software Engineering Specialization), Universidad de Zaragoza |
  2012–2017. Spanish (Native) | English (Advanced, Cambridge C1, certificate 14CES0055005).
- **Site:** Computer Engineering (Software Engineering Specialization), Universidad de Zaragoza,
  2012 - 2017. Spanish (native), English (C1).
- The CV gained the certificate number in this rewrite. It stays off; see part 7.

**Recognitions.** Seven lines, each the CV's own wording with its organisation and date, and
every one of them unchanged: NASA Space Apps Global Finalist & Galactic Impact Award (May 2017),
100 Ideas Zaragoza, Most Innovative Technology (Sep 2017), 100 Ideas Zaragoza, Best Use of the
Citizen Card (Sep 2017), uCode by Adidas, Best Fan Experience Solution (Mar 2018), ImagineCode
Blockchain Challenge Winner (Oct 2018), NASA Space Apps Zaragoza Local Hub Winner (Oct 2018),
Google Hash Code Zaragoza Hub Winner (Feb 2019).

The CV reversed the list to newest first in this rewrite. The site keeps oldest first: the order
of a one-line list is a presentation choice, and the redesign decides it (Spec #25). No line
moved, so nothing here is a claim that differs between the two documents.

**Technologies.** Unchanged. The CV's skills block moved Application Security up a row and
dropped its Languages row; neither is a technology this line lists, and every name on it appears
in the CV's remaining rows or in an entry above.

---

## 7. Deliberate absences

The statements and figures the CV carries and the site declines to carry at all. Clauses trimmed
while condensing a bullet that did land are accounted for in that bullet's own row above, and are not repeated here; what follows is the list of decisions that leave a
whole claim off the page.

| On the CV | Why it is not on the site |
| --- | --- |
| The audit's eight findings across four vulnerability classes | The CV replaced that bullet with the shorter hardening one. A count the CV no longer makes is a claim the site cannot support, and `App.test.tsx` now bans "eight findings" and "vulnerability classes" on the English edition. |
| The service's first automated test harness, and the access-coverage matrix that flags a loosening of access as a diff | Same bullet, same reason: both were the audit bullet's, and the CV's replacement keeps only "regression tests that run in CI". |
| Root-caused cross-service authentication failures, the edge-layer fault and the hanging Cognito session call | The CV dropped the bullet outright when the SEO incident became one of its own. Guarded: nothing on the English edition says "cross-service authentication". |
| The headline's "where the build order was contested I argued it from what the product's metrics showed" | Said in the specific by the first sub-bullet. See part 1. |
| The 0.75 confidence floor | Declined in the previous sweep and still declined. See part 1, item 4. |
| The 85% design-with-components cut | Declined in the previous sweep. Listed in the test table's `declinedFigures`, so it cannot return unnoticed. |
| The thin-orchestrator context budget | Declined in the previous sweep: it needs a sentence of its own to mean anything. |
| The Lead role's "proposal to a live MVP" on the commerce platform | Not absent from the page, moved: the CV made it part of the Shop headline in the Principal role, and the site says it there. Guarded — nothing on the English edition says "integrated commerce platform". |
| 100% retention across the Lead role's period | Declined in the previous sweep and still declined. Listed in the test table's `declinedFigures`. |
| Three global enterprise partnerships at MOBIKO | Declined in the previous sweep, and in `declinedFigures`: the count is of customers, not of anything built, and the bullet's evidence is the 500k+ daily events. |
| Scaling the MOBIKO user base from 3,000 to 10,000+ users, 233% growth | A whole bullet declined in the previous sweep and in `declinedFigures`: the growth is the product's, and the bullet does not say what about it was Fran's. |
| The Hiberus Jenkins-from-scratch bullet | Declined in the previous sweep, confirmed by Fran: the CI/CD thread is already carried, with better figures, by the deployment-time bullet and MOBIKO's pipeline bullet. |
| The Hiberus Ionic/Cordova/Electron kiosk bullet | Declined in the previous sweep, confirmed by Fran: the most dated stack on the page, and it supports nothing the differentiator rests on. |
| The freelance entry, 2016 to Jul 2017 | Decision D3 of the first sweep. Guarded: `App.test.tsx` bans "freelance" on both editions. |
| The Cambridge C1 certificate number | New to the CV in this rewrite. A reader who wants to verify the certificate asks for it; on the page it is a string of characters nobody can check, sitting where the education line is meant to be read in one glance. |
| The CV's newest-first order for the recognitions | A presentation choice rather than a claim, and the redesign decides it. See part 6. |

Two of these were on the site until ticket #27 — the audit bullet and the
cross-service-authentication bullet — and both are gone from `src/content.en.ts`. One more went
with ticket #30: the Lead role's "proposal to a live MVP".

The Spanish edition still carries the audit and cross-service-authentication bullets, knowingly:
ADR 0004 condenses each edition from its own CV, and ticket #31 sweeps `/es` from the new Spanish
PDF. That is why the guards for these roles are English-only and out of the edition table.
