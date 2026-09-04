# Bullet approval, Spanish edition: the site catches up with the reworked CV

Gate for Spec #25, written by ticket #31. It covers the **whole** Spanish module — every
role, the independent work and the identity line — and it replaces
`.scratch/spanish-edition/bullet-approval-es.md`, which approved this edition against the
CV as it stood on 2026-08-04.

Source of truth: `public/Fran_Menendez_CV_ES.pdf`, SHA-256
`34727f84d73d2ffaa735a566a83df9de2a93f3d4f7e9dbb8812f7ed3ead10350`, published by ticket
#29. The Spanish CV is generated upstream from the English source and its markdown was
retired on 2026-08-17, so there is no commit to name and no diff to read: this edition is
read from the rendered document and pinned by digest (ADR 0004, as amended).

**This is not a translation of the English site.** Every line below is condensed from the
Spanish CV. Where a row lands the same fact as the English record beside it, both CVs say
the same thing; nothing was copied across. The two editions' bullets split and merge
differently and are not expected to correspond key by key.

**How to review:** each row gives the CV original and the string that landed in
`src/content.es.ts`. A site string says less than its original or says the same; it never
says more, and it carries no figure the CV does not (ADR 0001). Part 5 is what the CV says
and the site deliberately does not.

---

## 0. The identity line, and its two copies

- **CV (summary, first two sentences):** Ingeniero full-stack con más de 10 años entregando
  productos completos de principio a fin en TypeScript, desde la base de datos pasando por
  la API hasta la interfaz y el pipeline que los publica. Trabajo en la capa de IA y en
  todo el stack: búsqueda semántica en producción, herramientas MCP que convertí en el
  estándar de todo el equipo y un flujo de ingeniería agéntico que construí y opero en The
  Knot para entregas en producción.
- **Site (`identity.line`):** Ingeniero full-stack, más de 10 años entregando productos
  completos de principio a fin en TypeScript, trabajando en la capa de IA: búsqueda
  semántica en producción, herramientas MCP convertidas en el estándar de todo el equipo y
  un flujo de ingeniería agéntico construido y operado para entregas en producción.
- It leads as the summary leads, on "Ingeniero full-stack", and keeps the three AI-layer
  items in the summary's order. The old line led on "Ingeniero de software" and hung
  "estándar de todo el equipo" off all three items; the CV attaches it to MCP alone, and
  now so does this.
- What is left off: the database-to-pipeline gloss on "de principio a fin", "y en todo el
  stack" (the phrase before it already says it), and "en The Knot" (the Experience section
  below says where).

The two copies that must move with it, both condensations of the line above:

- **`es/index.html`** — `title`, `description`, and the Open Graph and Twitter tags:
  "Fran Menéndez | Ingeniero Full-Stack", and the description "Ingeniero full-stack, más de
  10 años entregando productos completos de principio a fin en TypeScript, trabajando en la
  capa de IA: búsqueda semántica, herramientas MCP y un flujo de ingeniería agéntico." The
  description drops "en producción" from the first item and the two participles from the
  third; it carries no figure the line does not.
- **`tools/assets/og-image.es.html`** — "Ingeniero full-stack, más de 10 años entregando
  productos completos de principio a fin en TypeScript, ahora en la capa de IA." The card
  has room for the identity and not for the differentiator, so the three items stop there.
  `public/og-image-es.png` was re-rendered from it with `npm run render:assets` and the
  picture read: two lines, nothing clipped.

`og:image:alt` follows the card rather than the title tag, in the CV's lower case:
"Fran Menéndez, ingeniero full-stack, Zaragoza, España."

---

## 1. The Shop programme

One bullet on the site, as it is one bullet on the CV: a headline carrying the parts under
it. The site's condensation drops the headline's second sentence and keeps every part.

### The headline

- **CV:** Llevé Shop de la propuesta a producción: la plataforma de e-commerce que propuse
  como Lead, sobre una proyección de más de 2M$ de ingresos anuales, entregada como MVP en
  vivo con el equipo y llevada a producción como Principal, siendo por momentos su único
  contribuidor. Donde el orden de construcción se discutió, lo defendí a partir de lo que
  mostraban las métricas del producto y no de la superficie que se pedía.
- **Site:** the first sentence, unchanged.
- The second sentence is left off because the first sub-bullet *is* that argument, in the
  specific. Stating the general form above the instance makes the headline a preamble to
  its own evidence — the same decision the English record made on the same sentence.

### The parts, in the CV's order

Nine, as the CV lists them.

**1. El argumento de móvil primero** — new to the site.

- **CV and site:** Tras el MVP solo para móvil, el plan era construir la versión de
  escritorio a continuación; argumenté a partir de Mixpanel y GA, con un abandono en el
  onboarding en una audiencia mayoritariamente móvil, que la retención en móvil iba
  primero, y ese orden fue el adoptado.
- Unchanged: one sentence, and every clause carries a step of the argument.

**2. La migración de PayloadCMS** — carried over, re-read.

- **CV:** Migré PayloadCMS de v2 a v3 para más de 100.000 productos sin tiempo de
  inactividad; los tiempos de respuesta de las consultas bajaron de 850 ms a 34 ms mediante
  optimización de la base de datos y una caché de consultas en Redis.
- **Site:** Migré PayloadCMS de v2 a v3 para más de 100.000 productos sin tiempo de
  inactividad; los tiempos de respuesta de las consultas bajaron de 850 ms a 34 ms.
- The mechanism is left off. The figure is the evidence. "Sin downtime" became "sin tiempo
  de inactividad", which is the CV's own Spanish.

**3. La reconstrucción en solitario** — carried over, re-read.

- **CV:** Reconstruí desde cero la plataforma de e-commerce Shop en un mes y en solitario
  (frente a una estimación de tres meses con varios desarrolladores). La plataforma gestiona
  millones de productos de la Rainforest API de Amazon y contenido editorial vía Contentful,
  construida con Next.js y React con librerías de componentes compartidas, y hoy sirve a
  cientos de miles de usuarios en producción.
- **Site:** Reconstruí desde cero la plataforma de e-commerce Shop en un mes y en solitario,
  frente a una estimación de tres meses con varios desarrolladores. Next.js y React sobre la
  Rainforest API de Amazon y Contentful, sirviendo a cientos de miles de usuarios en
  producción.
- "La API Rainforest" became "la Rainforest API", which is what the CV calls it.

**4. El emparejador semántico** — carried over, rewritten against the CV.

- **CV:** Construí un sistema de emparejamiento semántico de productos con OpenSearch,
  combinando similitud vectorial k-NN y relevancia textual BM25, segmentado por confianza:
  los candidatos por debajo de un umbral de 0,75 se descartaban, las coincidencias más
  sólidas se servían automáticamente - cerca del 90 % del volumen, sin revisión humana - y
  la franja intermedia se enviaba a un panel de revisión a medida que construí dentro de
  PayloadCMS. La latencia p95 de consulta se mantuvo por debajo de 50 ms sobre más de
  100.000 productos.
- **Site:** Construí el emparejamiento semántico de productos con OpenSearch, combinando
  similitud vectorial k-NN y relevancia textual BM25, segmentado por confianza: las
  coincidencias más sólidas se servían automáticamente - cerca del 90 % del volumen -, las
  más débiles se descartaban y la franja intermedia se enviaba a un panel de revisión a
  medida que construí dentro de PayloadCMS. La latencia p95 de consulta se mantuvo por
  debajo de 50 ms sobre más de 100.000 productos.
- The old site bullet said the review panel took the matches *below* the confidence
  threshold, which describes a system spending human attention on the matches it had already
  decided were wrong. The CV's three bands replace it.
- The 0,75 floor stays declined, as on the English edition: the bullet already carries four
  figures, and the floor is the only one a reader cannot weigh without knowing the scoring
  scale it sits on.
- "Sin revisión humana" is left off, and this one is not a length decision. The hedge guard
  from ADR 0004 bans "sin revisión" anywhere a visitor reads, in either language, because
  that is how an edition would tell a Spanish reader it is the unchecked copy. "Se servían
  automáticamente" carries the same fact, so the phrase is cheaper to give up than the
  guard is to weaken.

**5. La rehechura de la caché** — carried over, re-read.

- **CV:** Sobre esa migración, rehíce la caché para más de 2M de usuarios semanales: añadí
  una capa de caché y fijé políticas de revalidación y obsolescencia por endpoint tras
  investigar la tolerancia de cada uno, sobre la CDN existente y sin infraestructura
  adicional. La menor carga en origen permitió redimensionar los pods a la baja, recortando
  el recurso asignado y facturado por pod sin regresión en la disponibilidad.
- **Site:** Rehíce la caché para más de 2M de usuarios semanales: una capa de caché y
  revalidación por endpoint sobre la CDN existente y sin infraestructura adicional. La menor
  carga en origen permitió redimensionar los pods a la baja, recortando el recurso facturado
  por pod sin regresión en la disponibilidad.
- "Sobre esa migración" goes, as its English counterpart does: inside a nested list the
  migration is two items above, and the pointer is noise.

**6. Las extensiones del panel de administración** — new to the site.

- **CV:** Amplié el panel de administración de PayloadCMS con páginas a medida: una consola
  de purgado que da a los editores control sobre esa caché de Redis sin necesitar a un
  ingeniero, y el panel de revisión manual del emparejador de productos.
- **Site:** Amplié el panel de administración de PayloadCMS con páginas a medida: una
  consola de purgado que da a los editores control sobre la caché de consultas en Redis sin
  necesitar a un ingeniero, y el panel de revisión manual del emparejador de productos.
- "Esa caché de Redis" points back to a clause the migration bullet above declines to carry,
  so the site names the cache instead of pointing at it. The name is the CV's own.

**7. El inicio de sesión unificado** — carried over. The CV's sentence verbatim.

- **CV and site:** Unifiqué el inicio de sesión en cinco productos - los artículos de Bump,
  los nombres de bebé, el registro, la tienda y las apps nativas - de modo que una sola
  cuenta sustituyó a cinco accesos separados.
- New to this edition as a separate statement: the old module carried session continuity
  and not this.

**8. La continuidad de sesión** — carried over, re-read.

- **CV:** Construí la continuidad de sesión entre la plataforma Bump y Shop: un traspaso de
  token OAuth inicia la sesión del usuario en Shop con su cuenta existente de Bump al
  navegar, aprovisionando una cuenta al vuelo cuando no existe.
- **Site:** unchanged from the CV. The old site said the handoff "autentica a los usuarios";
  the CV says it starts their session, which is the narrower claim.

**9. El blindaje de la API** — rewritten. This is the CV's replacement for the audit bullet,
and the one string in the programme whose meaning changed rather than its position.

- **CV and site:** Blindé la API pública de e-commerce: cerré agujeros de inyección SQL,
  control de acceso y exposición de PII, incluido un IDOR de escritura en una primitiva de
  autorización compartida que cubría cinco colecciones, y la dejé protegida con pruebas de
  regresión que se ejecutan en CI.
- What went: the finding count, the four-class taxonomy, the service's first automated test
  suite and the CI security-regression detector. All four were the old bullet's, and the CV
  no longer makes any of them. See part 5.

---

## 2. The rest of the Principal role, in the CV's order

Five bullets stand on their own after the programme.

**1. Las herramientas MCP** — carried over, re-read.

- **CV:** Introduje herramientas de Model Context Protocol (MCP) que generan componentes de
  producción directamente desde Figma con fidelidad exacta a los tokens, eliminando el paso
  manual de traducción de diseño a código; hoy es el estándar de todo el equipo. En mi
  propio trabajo de implementación, llevó el diseño con componentes de alrededor de una
  semana a menos de un día, aproximadamente un 85 %.
- **Site:** Introduje herramientas de Model Context Protocol (MCP) que generan componentes
  de producción directamente desde Figma con fidelidad exacta a los tokens, eliminando el
  paso manual de diseño a código; hoy es el estándar de todo el equipo.
- The 85% cut stays declined; see part 5. "Tooling" became "herramientas", which is the CV's
  word: the old site left the English noun in a Spanish sentence.
- This is the one bullet the team-wide standard attaches to, on this edition as on the
  English one. The identity line above was rewritten to match.

**2. El flujo agéntico** — rewritten. The old site bullet called it "el flujo de desarrollo
con IA agéntica **del equipo**", which the CV does not say: it is Fran's own workflow whose
practices he drove into the team's process, and the difference is the whole claim.

- **CV:** Construí y operé un flujo de desarrollo agéntico con IA para mis propias entregas
  en producción: cuatro etapas, ocho agentes con roles acotados, enrutamiento de modelo
  según la tarea, un presupuesto de contexto de orquestador ligero y roles de revisión que
  tienen vetado escribir el código que auditan. Lo usé para entregar un programa de blindaje
  de seguridad, en el que el paso independiente detectó defectos que la pasada de
  implementación había pasado por alto; llevé sus prácticas al proceso del equipo.
- **Site:** the same, without the thin-orchestrator context budget. See part 5.
- The separation-of-duties clause stays, because it is what makes the workflow credible
  rather than fashionable.

**3. La estabilidad durante la reestructuración** — carried over, re-read. The CV's sentence
verbatim.

- **CV and site:** Di estabilidad al equipo de ingeniería durante una reestructuración de la
  empresa y defendí la capacidad de construcción frente al cumplimiento de objetivos en la
  revisión semestral de capacidad de OKR; arbitré disputas de revisión con evidencias y no
  por antigüedad.

**4. La app de editor de Contentful** — carried over, re-read.

- **CV:** Construí una app de editor a medida para Contentful en la plataforma editorial
  (React, Contentful App SDK), incluida su infraestructura de alojamiento en S3 + CloudFront;
  propagué el nuevo modelo de contenido de extremo a extremo en tres servicios con
  migraciones sin tiempo de inactividad.
- **Site:** Construí una app de editor a medida para Contentful en la plataforma editorial
  (React, Contentful App SDK) con su alojamiento en S3 y CloudFront; propagué el nuevo
  modelo de contenido de extremo a extremo en tres servicios con migraciones sin tiempo de
  inactividad.
- Same facts, fewer words.

**5. La incidencia de SEO** — promoted from a trailing clause to a bullet of its own.

- **CV:** Rastreé un desplome generalizado del tráfico orgánico de The Bump hasta que el
  sitio tomaba su propia dirección del host por el que llegaba cada petición. Una migración
  del ingress acababa de cambiar ese host, así que el sitio estaba diciendo a los buscadores
  que su origen interno era el canónico. Fijé esa identidad al dominio de la marca allí donde
  se deriva, de modo que ningún cambio posterior de infraestructura pueda moverla.
- **Site:** Rastreé un desplome generalizado del tráfico orgánico de The Bump hasta que el
  sitio tomaba su propia dirección del host por el que llegaba cada petición, que una
  migración del ingress acababa de cambiar: estaba diciendo a los buscadores que su origen
  interno era el canónico. Fijé esa identidad al dominio de la marca allí donde se deriva, de
  modo que ningún cambio posterior de infraestructura pueda moverla.
- Three sentences to two, and the diagnosis is the whole of it. The old site called it "una
  incidencia de SEO canónico servida desde Kubernetes", which is the shape of the answer
  without the answer.

---

## 3. The Lead role, in the CV's order

Five bullets. Two are new to the site, one is split off a bullet that carried it as a
clause, and one leaves.

**1. El traspaso de la plataforma** — new to the site.

- **CV:** Asumí la plataforma web de The Bump del equipo saliente: reconstruí internamente
  sus herramientas de build y release, sus entornos y sus runbooks, y formé parte del panel
  de contratación de cuatro puestos de ingeniería, definiendo la prueba técnica, para dotar
  al equipo que sería su propietario.
- **Site:** unchanged from the CV. Every clause is a distinct fact: what was taken over,
  what was rebuilt, and the hiring panel.

**2. El sistema de A/B** — carried over, re-read and narrowed.

- **CV:** Construí un sistema de pruebas A/B para The Bump, una plataforma donde la caché en
  el edge había hecho imposible experimentar: Akamai asigna una cookie de variante en el
  edge, la app la lee para renderizar el build etiquetado correspondiente, y la asignación se
  mantiene cacheada y persistente entre recargas hasta que la cookie expira. La plataforma no
  había ejecutado ningún experimento en más de 3 años; desde entonces se han ejecutado más
  de 10.
- **Site:** Construí un sistema de pruebas A/B para The Bump, una plataforma donde la caché
  en el edge había hecho imposible experimentar: Akamai asigna una cookie de variante en el
  edge y la app renderiza la build etiquetada correspondiente, estable entre recargas. La
  plataforma llevaba más de 3 años sin ejecutar un solo experimento; desde entonces se han
  ejecutado más de 10.
- The cookie-expiry clause is left off; "estable entre recargas" is what a reader needs. The
  platform is now named, as the CV names it.

**3. La variante ganadora** — split off the bullet above, which is where the CV puts it.

- **CV:** La variante ganadora de una prueba de disposición de anuncios en ese sistema elevó
  las impresiones de anuncios servidas un 23 % frente al control en una propiedad monetizada
  con publicidad; se publicó porque la profundidad de interacción se mantuvo en la línea base
  en Mixpanel y GA4, con la nueva combinación de anuncios situada fuera de la columna de
  artículo de ancho limitado.
- **Site:** the first clause. The mechanism and the result are each readable on their own,
  which is why the CV made them two bullets and the site follows.
- The shipping rationale is left off: it needs the whole of the second clause to mean
  anything, and what the bullet is evidence for is the lift.

**4. El equipo** — carried over, re-read.

- **CV:** Gestioné un equipo multidisciplinar de 8 personas; mentoricé a 5 desarrolladores,
  con 2 promociones como resultado y una retención del 100 % durante el periodo.
- **Site:** the same, without the retention figure. See part 5.

**5. El tiempo de despliegue** — carried over, re-read.

- **CV:** Reduje el tiempo de despliegue de más de 2 horas a 1 minuto, pasando de releases
  agrupadas a diarias.
- **Site:** unchanged from the CV. The old site said "habilitando despliegues diarios",
  which is the same fact with the before-state dropped.

**What leaves:** "Lideré el desarrollo de la plataforma de comercio integrada, llevándola de
la propuesta a un MVP en producción." The CV moved that statement up into the Shop headline,
where the site now carries it. Keeping both would have the site say it twice.

---

## 4. MOBIKO, Hiberus and the independent work

### MOBIKO — Team Lead y Arquitectura

**1. La arquitectura de microservicios** — carried over, re-read.

- **CV:** Definí la estrategia técnica y construí la arquitectura de microservicios detrás de
  la expansión enterprise de la empresa - tres alianzas enterprise globales, cada una definida
  directamente con el cliente e integrada por socio - procesando más de 500k eventos de
  movilidad diarios: un API gateway en NestJS delante de funciones serverless que se comunican
  por colas de mensajes NATS, contenerizado en Kubernetes con autoescalado dirigido por Keda y
  flujos de despliegue en GitHub Actions.
- **Site:** Definí la estrategia técnica y construí la arquitectura de microservicios detrás
  de la expansión enterprise de la empresa, procesando más de 500k eventos de movilidad
  diarios: un API gateway en NestJS delante de funciones serverless que se comunican por colas
  NATS, en Kubernetes con autoescalado dirigido por Keda.
- The three partnerships and the GitHub Actions flows are left off; see part 5. "Que sostuvo
  la expansión" became "detrás de la expansión", which is the CV's own relation.

**2. El proceso de revisión y release** — rewritten. The old site bullet said the team grew
and the cycles shortened *because of* the restructuring ("Hice crecer el equipo ... acorté los
ciclos ... reestructurando"). The CV puts both beside the period, not downstream of the work.

- **CV and site:** Reestructuré el proceso de revisión y release y acompañé a los ingenieros
  hasta que asumieron la responsabilidad; el equipo creció y los ciclos de entrega se
  acortaron durante el periodo.

### MOBIKO — Desarrollador Full-Stack Senior

Three bullets, in the site's existing order rather than the CV's, per decision D3-ES: the
ordering carries no factual weight and the two editions hold the same shape.

**1. La plataforma Vue y la PWA** — carried over, re-read.

- **CV:** Migré el producto completo a una nueva plataforma Vue y construí la PWA destinada a
  sustituir las aplicaciones multiplataforma existentes, sobre una arquitectura de estado
  Vuex/Flux en una base de código TypeScript estructurada en clases.
- **Site:** the same, without the class-structured TypeScript codebase: it describes how the
  code was laid out rather than what was delivered.

**2. La superficie de la API** — carried over, and the two figures the CV states are now on
the page.

- **CV:** Reconstruí la superficie de la API sobre NestJS con contratos anotados en Swagger y
  TypeORM contra PostgreSQL, recortando los tiempos de respuesta de la API un 72 % mediante
  caché y optimización de consultas a la base de datos; las cargas de página bajaron un 70 %
  en Lighthouse.
- **Site:** Rehíce la superficie de la API sobre NestJS, con contratos anotados en Swagger y
  TypeORM contra PostgreSQL, recortando los tiempos de respuesta un 72 % mediante caché y
  optimización de consultas a la base de datos; las cargas de página bajaron un 70 % en
  Lighthouse.
- The old site bullet said response times were reduced and gave no figure, which is the
  weaker claim and the less checkable one.

**3. El pipeline de despliegue** — carried over, re-read.

- **CV:** Automaticé el pipeline de despliegue, de ciclos de release de varios días a
  despliegue continuo, sobre Kubernetes con CircleCI ejecutando despliegues automatizados y
  comprobaciones de compatibilidad.
- **Site:** the same, without the trailing clause: "automated the pipeline" already says CI
  runs the deployments.

### Hiberus

Three entries with bullets tapering 2 / 1 / 1, per decision D2-ES. The CV carries 3 / 2 / 1,
and the two extra bullets stay off; see part 5.

**Senior, 1. Afición360** — carried over, re-read.

- **CV:** Construí Afición360, un único monorepo Angular que sirve los frontales de varios
  clubes de fútbol más un panel de administración interno, sobre una arquitectura de estado
  Flux compartida con microservicios REST en NestJS separados mediante Lerna; integré las APIs
  de La Liga y AVET, usando websockets deliberadamente para regular el tráfico y no
  sobrecargar los servicios externos.
- **Site:** the same, without the shared Flux state architecture. Present tense for what the
  platform still does, as the CV writes it.

**Senior, 2. El checkout de ticketing** — carried over, re-read.

- **CV and site:** Rehíce la ruta de checkout de una plataforma de venta de entradas en tiempo
  real bajo la carga de un día de partido de La Liga, integrando la API oficial para más de
  100k usuarios concurrentes.
- The old site said "los días de partido", plural; the CV says one.

**Full-Stack, 1. La plataforma distribuida** — carried over, and the uptime figure the CV
states is now on the page.

- **CV:** Construí una plataforma que procesa más de 1M de entradas diarias con sincronización
  en tiempo real entre 5 ubicaciones geográficas, sobre CouchDB como base de datos distribuida
  con capacidad offline que sincroniza en vivo datos repartidos entre varios sistemas, con un
  99,95 % de disponibilidad; sigue en producción.
- **Site:** the same, without the live-sync gloss on "distribuida con capacidad offline",
  which restates the clause before it.
- "Registros diarios" became "entradas diarias", which is the CV's noun.

**Junior, 1. El servicio agregador** — carried over, re-read.

- **CV:** Construí desde cero un servicio en NodeJS/Express que agrega APIs externas, todavía
  en producción, y una aplicación AngularJS para una multinacional que consume APIs del
  ecosistema de Google; trabajo de backend sobre un framework propio en Spring/Hibernate sobre
  MySQL y SQL Server.
- **Site:** the same, without the Spring/Hibernate clause. It names a stack rather than an
  outcome, and it is the only Java on either edition.

### Independent work

**1. Instagram Checker** — carried over, re-read.

- **CV:** En producción y construido de principio a fin con el mismo flujo agéntico: convierte
  una exportación de datos de Instagram que aporta el usuario en un panel de seguidores y
  seguidos, leyendo solo lo que el usuario proporciona en lugar de hacer scraping.
- **Site:** Construido de principio a fin con el mismo flujo agéntico que el trabajo de
  arriba: convierte la exportación de datos de Instagram que aporta el usuario en un panel de
  seguidores y seguidos, leyendo solo lo que el usuario proporciona en lugar de hacer
  scraping.
- "Que el trabajo de arriba" names what "el mismo" refers to, which the CV's layout does and
  the site's does not. No link, per decision D1: the project is live but lands on a login
  wall, and the Spanish CV hyperlinks the name exactly as the English one does.

**2. Harness de entrega multiagente** — new to the site, and second by design: the entry above
opens on "el mismo flujo agéntico que el trabajo de arriba", which points at the Principal
role, and anything between the two would leave that pointing at the wrong thing.

- **CV:** Construido y operado en solitario. La planificación sale de las aristas de
  dependencia del tracker, con el trabajo desbloqueado en paralelo. Una revisión independiente
  responde en un esquema que el harness parsea, y el veredicto parseado condiciona el merge; un
  hallazgo vuelve a la sesión de escritura como un reintento acotado. Cada paso aterriza en un
  flujo tipado de transiciones, y cada rol se ejecuta con el modelo y el esfuerzo que su coste
  de fallo justifica.
- **Site:** Construido y operado en solitario: deriva el orden en que se ejecuta el trabajo de
  las propias aristas de dependencia de un tracker, planificando en paralelo todo aquello que
  nada bloquea. Una revisión independiente responde en un esquema que el harness parsea, y ese
  veredicto parseado condiciona el merge; un hallazgo vuelve a la sesión que escribió el código
  como un reintento acotado y no como una reescritura.
- Two mechanisms are left off because each needs a sentence to mean anything: the typed
  transition stream, and the per-role model and effort routing. See part 5.
- No link, because there is nothing to visit: the harness is not a product.

### Recognitions, education and technologies

Re-read and unmoved, with one wording fix: uCode by Adidas is "Mejor Solución de Experiencia
del Aficionado", which is what the CV calls it. The site's own order (oldest first) and its
"Organisation, Award (date)" shape stay: the CV reversed its list to newest first, and the
order a list renders in is a presentation choice.

The technologies line is unchanged, per decision D1-ES: the section is called "Tecnologías"
rather than the CV's "Competencias Técnicas", because the list is technology names and a
heading with "competencia" in it invites capability nouns back in.

The languages line keeps "Español (nativo), Inglés (avanzado, Cambridge C1)". The CV adds the
certificate number, which is a document reference rather than a fact about the language.

---

## 5. Deliberate absences

The statements and figures the Spanish CV carries and the site declines to carry at all.
Clauses trimmed while condensing a bullet that did land are accounted for in that bullet's own
row above and are not repeated here.

| On the CV | Why it is not on the site |
| --- | --- |
| Los ocho hallazgos de la auditoría en cuatro clases de vulnerabilidad | The CV replaced that bullet with the shorter hardening one. A count the CV no longer makes is a claim the site cannot support. |
| El primer conjunto de pruebas automatizadas del servicio, y el detector de regresiones de seguridad en CI | Same bullet, same reason: both were the audit bullet's, and the CV's replacement keeps only "pruebas de regresión que se ejecutan en CI". |
| Los fallos de autenticación entre servicios, el fallo en la capa edge y la llamada de sesión de Cognito colgada | The CV dropped the bullet outright when the SEO incident became one of its own. |
| "Donde el orden de construcción se discutió, lo defendí a partir de lo que mostraban las métricas del producto" | Said in the specific by the first sub-bullet. See part 1. |
| El umbral de confianza de 0,75 | Declined on both editions: the bullet already carries four figures, and this is the one a reader cannot weigh without the scoring scale behind it. |
| "Sin revisión humana" | The fact survives in "se servían automáticamente"; the phrase itself trips the ADR 0004 hedge guard, which bans "sin revisión" on either edition. See part 1, item 4. |
| El 85 % del diseño con componentes | Declined on both editions, and listed in the test table's `declinedFigures` so it cannot return unnoticed. |
| El presupuesto de contexto de orquestador ligero | Declined on both editions: it needs a sentence of its own to mean anything. |
| La retención del 100 % del equipo | Declined on both editions. In a four-clause bullet it is the figure that says least about the work. |
| Las tres alianzas enterprise globales | Declined on both editions: the bullet is about the architecture, and the partnership count is a fact about the sales side of the same expansion. |
| El crecimiento de 3.000 a más de 10.000 usuarios, y su 233 % | Declined on both editions: a percentage on a three-thousand base reads as bigger than it is, and the bullet it sat in is not on the site. |
| Los flujos de despliegue en GitHub Actions (MOBIKO) | The bullet already names four pieces of infrastructure; the fifth is the one that adds nothing to the claim. |
| Jenkins montado desde cero en Hiberus, y las apps Ionic/Cordova/Electron con Fastlane | Decision D2-ES: Hiberus holds a 2 / 1 / 1 taper so that 2017 does not take the same visual weight as 2025. Both are real evidence and both stay off. |
| "Anteriormente: Desarrollador Web Freelance" y el rediseño para el estudio de fotografía | Decision D3 of the site refresh: the freelance entry is on the CV and not on the site, on both editions. `App.test.tsx` bans "freelance" and "autónomo" on this edition. |
| El certificado 14CES0055005 del Cambridge C1 | A document reference rather than a fact about the language. |
| El permiso de trabajo en la UE | Decision D4: work authorization stays on the CV, off the site, on both editions. |

Four of these were on the site until this ticket — the audit count and its taxonomy, the
service's first test suite, the cross-service authentication bullet, and the "flujo agéntico
**del equipo**" attribution — and all four are gone from `src/content.es.ts`.

Both editions now trace to the reworked CV. The English edition's record is
`bullet-approval.md` beside this file, which covers the Principal role; ticket #30 completes
it with the Lead role and the rest of that module.
