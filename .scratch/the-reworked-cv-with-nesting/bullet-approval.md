# Bullet approval: the site catches up with the reworked CV, nesting included

Gate for Spec #25. Opened by ticket #27 with the English **Principal role**, which is the whole
of the role and nothing else. Ticket #30 completes it with the Lead role and the rest of the
English module; ticket #31 writes the Spanish record beside it.

Source of truth: `cv/en.md` at `433e72d` in `professional-record`, read at repo commit `0996591`
(2026-09-04). The bounded read is
`git -C ~/Projects/professional-record diff 36eab4d..HEAD -- cv/en.md`, which is everything the
site was behind on.

**How to review:** each row gives the CV original and the string that landed in
`src/content.en.ts`. A site string says less than its original or says the same; it never says
more, and it carries no figure the CV does not (ADR 0001). Part 2 is what the CV says and the
site deliberately does not.

---

## 1. The Shop programme

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
  them. See part 2.

---

## 2. The rest of the role, in the CV's order

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
- The 85% cut stays declined; see part 3. "Translation" goes with it: the sentence says what was
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
- The thin-orchestrator context budget is the one clause left off; see part 3. The
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

## 3. Deliberate absences

The statements and figures the CV's Principal role carries and the site declines to carry at
all. Clauses trimmed while condensing a bullet that did land are accounted for in that bullet's
own row above, and are not repeated here; what follows is the list of decisions that leave a
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

Two of these were on the site until this ticket — the audit bullet and the
cross-service-authentication bullet — and both are gone from `src/content.en.ts`.

The Spanish edition carried both until ticket #31 swept `/es` from the new Spanish PDF; that
sweep's record is `bullet-approval-es.md` beside this file. The guards for this role stay
English-only and out of the edition table all the same: ADR 0004 condenses each edition from
its own CV, and these assertions quote English wordings that the Spanish edition has no reason
to reproduce.
