# Copy approval: Spec #53, the ebroceram case study and what leads to it

The approval record for Spec #53. Every string the Spec puts on the site that the
site does not already carry is approved here against its source before a Ticket
transcribes it. **Nothing here lands in code until Fran signs its part.** The
Tickets that build from this record transcribe what is signed and draft nothing.

- **Part 1** is #54's: ebroceram's Independent work entry, which #58
  transcribes. Prepared 2026-09-30.
- #55 adds the parts after it: the case study's copy, the Portfolio index row's
  line and the video's text description, each against the source document.

Items are labelled as in the earlier records: **D** for a decision, **E** for an
entry put for signature.

---

## Part 1: ebroceram's Independent work entry (#54)

### The sources

Both CVs in `professional-record` at `0f298a5`, read as rendered pages per ADR 0001:

- **English:** page 3 of `cv/shipped/Fran_Menendez_CV.pdf`, SHA-256
  `7f674a112364b6c06b24076c4bccb5fd0e22dcbeb14013853bed01d0aa9f027e`. It
  matches `cv/en.md` lines 112 and 116 exactly.
- **Spanish:** page 3 of `cv/shipped/Fran_Menendez_CV_ES.pdf`, SHA-256
  `e30be709db3b4050834ef1162a8e0934af594be40550fc16cc846f54f68ee124`. The
  Spanish CV has no markdown. Its translation step generates it from `cv/en.md`
  at build time, so the rendered page is the only Spanish source.

ebroceram entered both CVs in `dec7743` (#122), and `0f298a5` reworded it. Both
commits rebuilt both PDFs. On 2026-09-30, at `0f298a5`, the CV repo's gates were
run again, and all passed:

- `check:cv`: parity, both editions
- `check:cv-facts`: 18 claims
- `check:cv-slop`
- `npm test`: 691 of 691

The site's public copies are still the builds from before ebroceram:
`68d1c252…` for English and `34727f84…` for Spanish.

### Checked at ebroceram `c891c41`

Every statement in the entry was checked on 2026-09-30 against ebroceram's
default branch at `c891c4167c5ad2be49795efb1a1ed74e92d8656a` (2026-09-29,
"Despliegue a producción"). That commit is 10 after `3c30f9d0ebed`, where the
CV repo's achievement record counts its figures. The entry carries none of
those figures.

| Statement | Holds? | Where |
| --- | --- | --- |
| built solo | Yes | Every commit in its history is Fran's, under three author names, from 2026-08-26 on |
| a tablet app | Yes | It installs on the shop's tablet as a standalone app (`src/app/manifest.ts:7-19`). The visual battery runs on a Galaxy Tab S9 and an iPad Pro 11 (`playwright.bateria.config.ts:160-173`) |
| for EBROCERAM S.L., a ceramic tile outlet in Zaragoza | Yes, not from the code | The manifest names EBROCERAM S.L. (`src/app/manifest.ts:15`). The city is the business's, as #53 states it, and the code never says it |
| makes quotes on the warehouse floor | Yes | The code calls them proformas and the business calls them presupuestos (`CONTEXT.md:15`). They are made "a pie de palé" (`src/lib/envio-de-las-pendientes.ts:10`) |
| **rounds every line up to whole boxes of tile** | **No: it overstates** | The round-up is `cajasEnterasDeLinea` (`src/dominio/documentos/calculos.ts:102-111`). It applies only to tile lines in m² with a box size (line 60), and it is a suggestion: the typed quantity is kept unless someone taps "Ajustar" (`src/components/cajas.tsx:21`). `CONTEXT.md:28` says so: "No lo fuerza: un outlet también vende restos y cajas abiertas." |
| keeps stock and a public stock catalogue | Yes | `/catalogo` is public (`src/acceso/rutas.ts:109`, `src/proxy.ts:24`) and shows available stock without prices (`CONTEXT.md:97`). Stock is in `src/dominio/stock/` |
| **a quote *started* with no signal stays on the tablet and sends itself once the network is back** | **Partly** | It waits in IndexedDB (`src/lib/base-del-aparato.ts:81`) and sends by itself on the `online` event (`src/components/sin-red.tsx:43-53`, `src/lib/envio-de-las-pendientes.ts:57-87`). That holds only for a quote someone has already pressed "Crear proforma" on: a draft never sends by itself (line 64). It sends only while the app is open. While the setting that allows real proformas from the app is off, what it sends becomes a test proforma. The entry, like the CV, says nothing about that |
| a failing visual regression run stops the deploy script | Yes | `scripts/desplegar.ts:102-111` returns before `vercel --prod` runs. The code documents two exceptions: a failure on the iPad alone does not block (`e2e/bateria/sin-bloquear.ts:43-55`), and a manual `vercel --prod` skips the script (`desplegar.ts:26-28`). Neither makes the sentence untrue |

### D1. The CV corrects its two overstatements first

Under ADR 0001 the site says nothing its CV does not, so the site can't correct
the two rows above on its own. The CV has to change first, and it carries the
same overstatements in both languages. The achievement record behind it
(`achievements/independent-ebroceram-tablet-app.md:36-37`) carries the rounding
one too.

The proposed correction in `cv/en.md` line 112:

- "rounds every line up to whole boxes of tile" becomes "offers to round each
  tile line up to whole boxes".
- "started" becomes "created".

In `professional-record` it then runs as `dec7743` did:

1. The achievement record's line is corrected to match.
2. The translation step regenerates the Spanish.
3. Both PDFs are re-rendered.
4. The gates run.

E1 and E1-ES are then put beside the corrected renders, word for word, and
that is what you sign. The Spanish is only known once the translation step has
run, so E1-ES is put for signature only after that.

**Recommendation:** correct it. The rounding sentence is the entry's one
domain-specific detail. It is also the one a tile buyer, or a reader who
follows the link to the case study, can see is not what the app does.

- [ ] Correct the CV first, as above
- [ ] Correct it with other words: write them here:
- [ ] Keep the CV's wording, overstatements included, and sign E1 and E1-ES
  against the CV as it stands

### E1. The entry, English

- **CV now:** ebroceram, a tablet app built solo for EBROCERAM S.L., a ceramic
  tile outlet in Zaragoza. It makes quotes on the warehouse floor and rounds
  every line up to whole boxes of tile. It also keeps stock and a public stock
  catalogue. A quote started with no signal stays on the tablet and sends itself
  once the network is back. A failing visual regression run stops the deploy
  script.
- **Site now:** nothing.
- **Proposed:** name **ebroceram**. The description is the CV's entry word for
  word as it stands after D1, with the name moved out into the entry's name, as
  the rendered CV sets it. With D1's correction, it reads:

  > A tablet app built solo for EBROCERAM S.L., a ceramic tile outlet in
  > Zaragoza. It makes quotes on the warehouse floor and offers to round each
  > tile line up to whole boxes. It also keeps stock and a public stock
  > catalogue. A quote created with no signal stays on the tablet and sends
  > itself once the network is back. A failing visual regression run stops the
  > deploy script.

- Note: nothing is condensed. The five short sentences run about as long as the
  two entries beside it. Like the CV, it carries no figure and no link. The link
  to the case study comes in #65.

### E1-ES. The entry, Spanish

- **CV now:** ebroceram. Una app para tablet construida en solitario para
  EBROCERAM S.L., un outlet de baldosas cerámicas en Zaragoza. Hace presupuestos
  a pie de almacén y redondea cada línea al alza hasta cajas completas de
  baldosa. También lleva el stock y un catálogo público de existencias. Un
  presupuesto empezado sin cobertura se queda en la tablet y se envía solo en
  cuanto vuelve la red. Una ejecución de regresión visual fallida detiene el
  script de despliegue.
- **Site now:** nada.
- **Proposed:** name **ebroceram**. The description is the Spanish CV's entry
  word for word as it stands after D1, taken from its own CV as ADR 0004 has it
  and not translated from E1. It is filled in here from the corrected render
  once the translation step has run.

### Not in #54: the harness entry's new sentence

In `0f298a5` the CV's harness paragraph gained "It delivered most of ebroceram,
above." ("Entregó la mayor parte de ebroceram (véase arriba)."). The tracker
bears it out: it held 241 issues on 2026-09-30, and 200 distinct
`sandcastle/issue-*` branches are merged at `c891c41`. `0f298a5`'s message
counted 197 of 241 on 2026-09-29. The two counts are not reconciled, and both
are most.

The site's harness entry has never carried that sentence, and no Ticket lands
it: #54 is ebroceram's entry, and #58 transcribes that entry only. Whether the
site takes the sentence belongs to #58's scope, so it is raised here and not put
for signature. If the site does take it, name the subject: on the site, the
sentence before it ends on "a finding returns to the session that wrote the
code", so a bare "It" reads as the finding.

### The order, settled by #58

The CV now puts ebroceram first. #58 already settled that the site keeps
Instagram Checker first "either way": its copy says it was built "with the same
agentic workflow as the work above", meaning the Principal role, and that only
holds while nothing sits between them. The site's order is therefore:

1. Instagram Checker
2. ebroceram
3. Multi-agent delivery harness

ebroceram and the harness keep the CV's relative order. Nothing here asks you to
decide the order again.

### Screened

The entry names no customer and states no price, cost, margin, sales figure,
supplier contact or bank detail, in either language. EBROCERAM S.L. is the
client, not one of its customers, and Fran has the business's permission to
name it (#53, Further Notes).

### Signature

Mark D1 now. Once E1 and E1-ES stand beside the CV they answer to, mark one
line below for each, then fill in the two lines under them. A reply in the
session, or a comment on #54 saying the same thing, counts too. The boxes are
the record either way. An agent ticking a box is not a signature.

- E1: - [ ] Approved, as written - [ ] Changed, with the edit written here:
- E1-ES: - [ ] Approved, as written - [ ] Changed, with the edit written here:

Signed by:
Date:

### Where the ask has got to

- **2026-09-30:** drafted on `sandcastle/issue-54`, forked from `spec/53`. Every
  statement was checked at ebroceram `c891c41`, and the CV repo's gates were
  run again at `0f298a5`. The check found the two overstatements, so D1 comes
  before E1 and E1-ES. Nothing is signed, and #54 stays open.
