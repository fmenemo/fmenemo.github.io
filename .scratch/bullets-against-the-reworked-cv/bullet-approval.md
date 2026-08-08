# Bullet approval: the reworked CV vs the site as it stands

Gate for `.scratch/bullets-against-the-reworked-cv/`. **Nothing here lands in code until Fran
approves it.** Prepared 2026-08-08; no content file has been touched.

Source of truth: `public/Fran_Menendez_CV.pdf` and `public/Fran_Menendez_CV_ES.pdf`, read as
rendered pages per ADR 0001. Both were rendered and read for this sweep; every figure quoted
below was confirmed on the rendered page, not extracted from the PDF text layer. The markdown
originals in the CV repo (`~/Projects/about-me/cv/en.md`, `cv/es.md`) were used alongside them
and match the rendered pages exactly.

**How to review:** each item shows the CV original and the proposed site version. Mark each
keep / change / cut. The corrections in part 1 are the ticket; the decisions in part 2 are
optional and can be deferred without leaving anything on the site untrue.

---

## What the sweep found

The ticket assumed drift was scattered and that the known agentic-workflow bullet was one
instance among many. It is narrower and more systematic than that.

Diffing the CV from its site-refresh state (`38e757b`) to now shows the site's copy is a
**faithful condensation of the pre-correction CV**. Every drifted string on the site is the old
CV wording, verbatim. The CV corrected exactly four things, and the site is behind on exactly
those four — not on a long tail of wording drift.

| The CV changed | The site still carries the old wording |
| --- | --- |
| `bd4b114` Stop claiming the agentic workflow was the team's | C1, C2 |
| `606531a` (semantic matching re-described by band) | C3 |
| `82a0321` Tell the security programme the way the record tells it | C4 |

That is the whole of it. **Four corrections, both editions, eight strings.** Everything else on
the site still matches the CV.

This is worth recording because the ticket's "assume there are more" was a reasonable prior and
turned out to be wrong in a specific way: the drift was not entropy, it was three dated CV
commits the site was never told about. The guard that would have caught it is not a wording
check — it is knowing when the CV repo changes.

Both editions drifted identically, because both CVs were corrected identically. Under ADR 0004
each edition is condensed from its own CV, so the two corrections below are parallel rather
than translations of each other.

---

## Part 1 — Corrections

These four are the ticket. Each is a statement the site makes that its CV does not.

### C1. The agentic workflow was Fran's own, not the team's

The known instance. The site claims a team artefact; the CV says he built and ran it for his own
delivery and *then* drove its practices into the team's process. The second is a better claim
and the site is not making it.

**English** — `src/content.en.ts:49`

- **Old CV** (what the site was condensed from): Built the team's agentic AI development
  workflow: orchestration and verification architecture with role-based model routing, context
  budgeting, and mandatory independent review; used for production delivery including
  security-critical work.
- **Current CV:** Built and ran an agentic AI development workflow for my own production
  delivery: four stages, eight role-scoped agents, model routing by task, a thin-orchestrator
  context budget, and review roles barred from writing the code they audit. Used it to deliver a
  security hardening programme, where the independent step caught defects the implementing pass
  had missed; drove its practices into the team's process.
- **Site now:** Built the team's agentic AI development workflow: orchestration and verification
  with role-based model routing, context budgeting and mandatory independent review, used for
  production delivery including security-critical work.
- **Proposed:** Built and ran an agentic AI development workflow for my own production delivery:
  four stages, eight role-scoped agents, model routing by task, and review roles barred from
  writing the code they audit. Used it to deliver a security hardening programme, where the
  independent step caught defects the implementing pass had missed; drove its practices into the
  team's process.
- Note: drops the thin-orchestrator context budget, which needs a sentence of its own to mean
  anything to a reader. Keeps the separation-of-duties clause, which is the part that makes the
  workflow credible rather than fashionable.

- [ ] Approve  - [ ] Change  - [ ] Cut

**Spanish** — `src/content.es.ts:56`

- **Current CV:** Construí y operé un flujo de desarrollo con IA agéntica para mis propias
  entregas en producción: cuatro fases, ocho agentes con rol acotado, enrutado de modelos por
  tarea, un presupuesto de contexto con orquestador ligero y roles de revisión a los que se les
  prohíbe escribir el código que auditan. Lo usé para entregar un programa de hardening de
  seguridad, donde el paso independiente detectó defectos que la pasada de implementación había
  pasado por alto; impulsé sus prácticas hasta el proceso del equipo.
- **Site now:** Construí el flujo de desarrollo con IA agéntica del equipo: orquestación y
  verificación con enrutado de modelos por rol, presupuesto de contexto y revisión independiente
  obligatoria, usado para entregas en producción, incluido trabajo crítico de seguridad.
- **Proposed:** Construí y operé un flujo de desarrollo con IA agéntica para mis propias entregas
  en producción: cuatro fases, ocho agentes con rol acotado, enrutado de modelos por tarea y
  roles de revisión a los que se les prohíbe escribir el código que auditan. Lo usé para entregar
  un programa de hardening de seguridad, donde el paso independiente detectó defectos que la
  pasada de implementación había pasado por alto; impulsé sus prácticas hasta el proceso del
  equipo.

- [ ] Approve  - [ ] Change  - [ ] Cut

---

### C2. The identity line makes the same overclaim, one level up

This one is not in the ticket and matters more than the bullet, because it is the first sentence
a visitor reads. The site's identity line attributes "made team-wide standards" (plural) to both
the MCP tooling *and* the agentic workflows. The CV attributes it only to MCP.

**English** — `src/content.en.ts:21`

- **Old CV summary:** ...semantic search in production, MCP tooling, and agentic engineering
  workflows I have made team-wide standards.
- **Current CV summary:** ...semantic search in production, MCP tooling I made the team-wide
  standard, and an agentic engineering workflow I built and run for my own production delivery.
- **Site now:** Software Engineer, 10+ years building platforms that serve millions of users,
  working at the AI layer: semantic search in production, MCP tooling, and agentic engineering
  workflows made team-wide standards.
- **Proposed:** Software Engineer, 10+ years building platforms that serve millions of users,
  working at the AI layer: semantic search in production, MCP tooling made the team-wide
  standard, and an agentic engineering workflow built and run for my own production delivery.
- **Shorter alternative**, if the line above is too long in the hero at narrow widths: ...semantic
  search in production, MCP tooling made the team-wide standard, and an agentic engineering
  workflow of my own.

**This line gets materially longer**, which is the one thing in this document worth seeing
rendered before approving: 189 → **256** characters for the full version, or **221** for the
shorter one. It sits in the hero, so the growth lands where the page is least forgiving. The
honest version of the claim is simply wordier than the overclaim was — "made team-wide
standards" collapsed two different relationships into three words.

- [ ] Approve the full version  - [ ] Approve the shorter one  - [ ] Change

**Spanish** — `src/content.es.ts:21`

- **Current CV summary:** ...búsqueda semántica en producción, tooling MCP que convertí en
  estándar de todo el equipo y un flujo de ingeniería agéntico que construí y opero para mis
  propias entregas en producción.
- **Site now:** ...búsqueda semántica en producción, tooling MCP y flujos de desarrollo agéntico
  convertidos en estándar de todo el equipo.
- **Proposed:** Ingeniero de software, más de 10 años construyendo plataformas que dan servicio a
  millones de usuarios, trabajando en la capa de IA: búsqueda semántica en producción, tooling
  MCP convertido en estándar de todo el equipo y un flujo de ingeniería agéntico que construí y
  opero para mis propias entregas en producción.
- **Shorter alternative:** ...búsqueda semántica en producción, tooling MCP convertido en estándar
  de todo el equipo y un flujo de ingeniería agéntico propio.

Spanish grows harder than English: 214 → **315** characters for the full version, or **261** for
the shorter one — so even the shortened Spanish line exceeds the full English one. Spanish is
already the longer of the two, so the shorter alternative is the one I would try first here,
which is the reverse of what I would try in English.

- [ ] Approve the full version  - [ ] Approve the shorter one  - [ ] Change

**Two things that do *not* need to change with it**, both checked:

- The `index.html` / `es/index.html` metadata descriptions say "agentic workflows" and "flujos de
  desarrollo agéntico" plainly, with no team-wide claim attached. They are already correct.
- The share images (`tools/assets/og-image.html`, `og-image.es.html`) stop at "the AI layer" and
  carry no differentiator claim at all. Already correct.

So the fix is confined to one line per content file, and the three-places-move-together rule in
the `content.en.ts` header is satisfied without touching the other two.

**Constraint for whoever implements it:** `App.test.tsx` asserts the identity line contains
`semantic search` / `MCP` / `agentic` (and `búsqueda semántica` / `MCP` / `agéntico`), and that
`identityLead` still matches `/^Software Engineer, 10\+ years/` and
`/^Ingeniero de software, más de 10 años/`. Both proposals above satisfy all of these.

---

### C3. The review dashboard reviews the middle band, not the rejects

The site says the human-review dashboard handles "matches below the confidence threshold". Per
the CV those are *discarded*. The reviewed set is the band between the floor and the
auto-served tier. As written, the site describes a system that reviews its own rejects, which is
both wrong and a worse design than the real one.

**English** — `src/content.en.ts:48`

- **Old CV:** ...with a custom human-review dashboard inside PayloadCMS for matches below
  confidence thresholds.
- **Current CV:** Built a semantic product matching system using OpenSearch with k-NN vector
  similarity and BM25 text relevance, banded by confidence: candidates below a 0.75 floor were
  discarded, the strongest matches served automatically — about 90% of throughput, with no human
  review — and the band in between routed to a custom review dashboard I built inside PayloadCMS.
  p95 query latency stayed under 50ms across 100,000+ products.
- **Site now:** Built semantic product matching on OpenSearch with k-NN vector similarity and
  BM25 text relevance, with a human-review dashboard in PayloadCMS for matches below the
  confidence threshold.
- **Proposed:** Built semantic product matching on OpenSearch with k-NN vector similarity and
  BM25 text relevance, banded by confidence: the strongest matches served automatically with no
  human review, the weakest discarded, and the band between them routed to a review dashboard I
  built in PayloadCMS.
- **Fuller alternative, with the figures** (all three confirmed on the rendered page): ...served
  automatically with no human review — about 90% of throughput — the weakest discarded, and the
  band between them routed to a review dashboard I built in PayloadCMS. p95 query latency stayed
  under 50ms across 100,000+ products.
- Note: the proposal deliberately carries no figures, matching how the site handles the rest of
  this role. The alternative is there because 90%-automatic and sub-50ms-p95 are the two numbers
  that make this bullet land, and this is the strongest technical bullet on the page.

- [ ] Approve the figure-light version  - [ ] Approve the fuller one  - [ ] Change

**Spanish** — `src/content.es.ts:55`

- **Site now:** ...con un panel de revisión humana en PayloadCMS para los emparejamientos por
  debajo del umbral de confianza.
- **Proposed:** Construí el emparejamiento semántico de productos con OpenSearch, combinando
  similitud vectorial k-NN y relevancia textual BM25, con bandas por confianza: los
  emparejamientos más fuertes se resolvían automáticamente sin revisión humana, los más débiles
  se descartaban y la banda intermedia pasaba a un panel de revisión que construí en PayloadCMS.
- **Fuller alternative:** ...automáticamente sin revisión humana — en torno al 90 % del volumen —,
  los más débiles se descartaban y la banda intermedia pasaba a un panel de revisión que construí
  en PayloadCMS. La latencia p95 de consulta se mantuvo por debajo de 50 ms con más de 100.000
  productos.

- [ ] Approve the figure-light version  - [ ] Approve the fuller one  - [ ] Change

---

### C4. The four vulnerability classes are named wrong

The site lists the four classes as "SQL injection, broken access control, a write-side IDOR and
a PII exposure". Per the CV the four are **SQL injection, over-open collection access, PII
projection and identity trust**. The IDOR is not one of the four — it was found later, during
remediation, in a shared authorisation primitive. The site has promoted a remediation finding
into the audit's taxonomy and dropped "identity trust" to make room.

The site also calls the CI artefact a "security-regression tripwire". The CV no longer uses that
phrase; it describes a lint gate enforced at error level and a regenerable access-coverage
matrix. "Tripwire" is a gloss over something more specific and more impressive.

**English** — `src/content.en.ts:51`

- **Old CV:** ...eight findings across four vulnerability classes, closing SQL injection, broken
  access control, a write-side IDOR and a PII exposure; built the service's first automated test
  harness (two-tier, DB-free CI proof layer) and a regenerable security-regression tripwire in CI.
- **Current CV:** Ran a full API security audit and hardening programme for the public
  e-commerce service: eight findings across four vulnerability classes — SQL injection, over-open
  collection access, PII projection and identity trust — extended by roughly nine further
  findings once a full-product verification pass enumerated the access surface from code.
  Remediation found and closed a write-side IDOR in a shared authorisation primitive covering
  five collections. Built the service's first automated test harness (two-tier, DB-free CI proof
  layer), a lint gate enforced at error level in CI and pre-push, and a regenerable
  access-coverage matrix that flags any loosening of access as a diff.
- **Site now:** Ran the API security audit and hardening programme for the public e-commerce
  service: eight findings across four vulnerability classes, closing SQL injection, broken access
  control, a write-side IDOR and a PII exposure; built the service's first automated test harness
  and a security-regression tripwire in CI.
- **Proposed:** Ran the API security audit and hardening programme for the public e-commerce
  service: eight findings across four vulnerability classes — SQL injection, over-open collection
  access, PII projection and identity trust — with remediation closing a write-side IDOR in a
  shared authorisation primitive covering five collections; built the service's first automated
  test harness and an access-coverage matrix that flags any loosening of access as a diff.
- Note: keeps the IDOR, which is the single most concrete thing in the bullet, but puts it where
  the CV puts it. Drops the further nine findings — the count is hard to state briefly without
  sounding like the first audit missed half the surface, which is not what happened.

- [ ] Approve  - [ ] Change  - [ ] Cut

**Spanish** — `src/content.es.ts:58`

- **Site now:** ...ocho hallazgos en cuatro clases de vulnerabilidad, cerrando una inyección SQL,
  un control de acceso roto, un IDOR de escritura y una exposición de PII; construí el primer
  conjunto de pruebas automatizadas del servicio y un detector de regresiones de seguridad en CI.
- **Proposed:** Dirigí la auditoría de seguridad y el programa de hardening de la API del
  servicio público de e-commerce: ocho hallazgos en cuatro clases de vulnerabilidad — inyección
  SQL, acceso demasiado abierto a colecciones, proyección de PII y confianza en la identidad —, y
  en la remediación cerré un IDOR de escritura en una primitiva de autorización compartida que
  cubre cinco colecciones; construí el primer conjunto de pruebas automatizadas del servicio y
  una matriz de cobertura de accesos que señala como diff cualquier relajación de los permisos.

- [ ] Approve  - [ ] Change  - [ ] Cut

---

## Part 2 — Decisions on what the CV gained

Nothing here is a correction. These are things the CV now says that the site has never said, so
leaving them out leaves nothing untrue. They are separated from part 1 so the corrections can
ship without waiting on a taste call.

### D1. Unified sign-on across five products

Called out in `.scratch/catch-up-with-the-cv/` as something the CV gained and the site never
received. It is the only whole bullet missing from the Principal role: the CV has twelve, the
site has eleven, and this is the twelfth.

It is strong evidence — a five-product consolidation is a scope claim nothing else on the page
makes — and it needs no condensing to fit.

- **CV (EN):** Unified sign-on across five products — Bump articles, baby names, registry, shop
  and the native apps — so that one account replaced five separate logins.
- **CV (ES):** Unifiqué el inicio de sesión en cinco productos — artículos de Bump, nombres de
  bebé, lista de regalos, shop y las apps nativas —, de modo que una sola cuenta sustituyó a
  cinco inicios de sesión separados.
- **Proposed:** both verbatim, placed immediately before the session-continuity bullet, which is
  the same programme's other half and currently reads as though it stands alone.

**Recommendation:** add it. This is the one omission I would not leave.

- [ ] Add to both editions  - [ ] Add to English only  - [ ] Leave it off

### D2. Figures the CV gained

The CV's correctness pass added figures that did not exist when the site's bullets were
approved, so the site has never made a decision about them. All confirmed on the rendered pages.

| Where | The figure the CV gained |
| --- | --- |
| A/B testing (Lead) | winning variant lifted served ad impressions **23%** against control; engagement depth held at baseline in Mixpanel and GA4 |
| Commerce MVP (Lead) | projected at **$2M+** annual revenue |
| 8-person team (Lead) | **100%** retention across the period |
| MCP tooling (Principal) | design-with-components from about a week to under a day, **roughly 85%** |
| MOBIKO API rebuild | API response times **72%**; page loads **70%** in Lighthouse |
| MOBIKO (whole bullet) | Scaled the user base from **3,000 to 10,000+** (233% growth) |
| MOBIKO architecture | **three** global enterprise partnerships, each scoped directly with the customer |
| Hiberus CouchDB platform | **99.95%** uptime |

**Recommendation:** take three — the 23% ad lift, the 72% API response time, and 99.95% uptime.
Each attaches a measured outcome to a bullet that currently ends on the mechanism, and all three
are outcomes rather than scale nouns. Leave the rest: $2M+ is a projection rather than a result,
100% retention over one period reads thinner than the "5 developers, 2 promotions" already
there, and the 3,000→10,000 growth bullet would push MOBIKO to four bullets against a page that
tapers by recency.

This is a taste call about a credibility anchor, so it is yours rather than mine — the
recommendation is a starting point to disagree with.

- [ ] Take the three recommended  - [ ] Take all of them  - [ ] Take none  - [ ] Pick individually

---

## Confirmed unchanged

Checked against the current CVs and still accurate, in both editions: the Shop rebuild, the MCP
tooling bullet, the PayloadCMS migration, the caching rework, the Contentful editor app, the
restructuring bullet, session continuity, the root-cause bullet, all four Lead bullets, both
MOBIKO roles, all three Hiberus roles, the independent work, all seven recognitions, and
education and languages.

The omissions recorded as decisions in the earlier approvals remain intact and were not
re-opened: the Jenkins bullet and the Ionic/Cordova/Electron bullet (both "omitted, confirmed by
Fran"), the freelance entry (D3, cut), the Spring/Hibernate clause, and the Instagram Checker
URL (D1 of the site refresh — still a login wall, so still copy-only).
