# Bullet approval, Spanish edition: CV original vs proposed site copy

Gate for ticket 02. Nothing here lands in `src/content.es.ts` until Fran approves it.

Source of truth: `Fran_Menendez_CV_ES.pdf`, read as rendered pages (not text
extraction), per ADR 0001. Read from `~/Downloads/` because ticket 05 is what publishes
it into `public/`; the file read here was created 4 Aug 2026, 238,519 bytes.

**This is not a translation of the English site.** Every line below is condensed from the
Spanish CV, and the "English site" column appears only where the two came out different
enough to be worth explaining. Where they agree, they agree because both CVs say the same
thing, not because one was copied.

**How to review:** each item shows the CV original and the proposed site version. Mark
each one keep / change / cut. The three open decisions at the top are the only things
that block me.

---

## Open decisions

**All three resolved by Fran on 2026-08-04.** D1-ES and D2-ES to the recommended option,
D3-ES against it. Recorded inline below.

### D1-ES. What the technologies section is called

The CV heading is **COMPETENCIAS TÉCNICAS**. The English site deliberately does not call
that section "Skills": it renamed it to "Technologies" because the list is technology
names, and a heading with "competency" in it invites capability nouns back in.
`CONTEXT.md` lists "competency" under the words to avoid for `claim`.

So the rule "take the CV's section names" and the rule "no claims" pull against each
other here, and only here.

**Recommendation:** `Tecnologías`. The CV wins on facts, and a heading is not a fact. The
other four section names come straight from the CV, so this is a single deliberate
exception rather than a second Spanish vocabulary.

- [x] **`Tecnologías`** (chosen)
- [ ] `Competencias técnicas`, matching the CV heading exactly

### D2-ES. The Spanish CV has three more Hiberus bullets than the English site shows

Decision D2 of the last effort settled Hiberus as three entries with bullets tapering
2 / 1 / 1, so 2017 does not take the same visual weight as 2025. The Spanish CV carries
3 / 2 / 1, and the two extra bullets are real `evidence`:

- **Senior, 3rd bullet:** Jenkins set up from scratch, pipelines building and deploying
  every monorepo app and every backend in Docker on AWS.
- **Full-Stack, 2nd bullet:** Ionic cross-platform apps working fully offline or
  embedding existing web apps, Cordova for native device capabilities (bluetooth, GPS,
  push), Angular apps compiled into Electron to run as kiosks, build/test/store
  publication automated with Fastlane.

Nothing forces the editions to match here. But the taper argument was about the shape of
the page, and the page has the same shape in both languages.

**Recommendation:** cut both, hold the 2 / 1 / 1 taper, record them below as deliberate
omissions. Say the word and they go in.

- [x] **Cut both, 2 / 1 / 1 as in English** (chosen)
- [ ] Carry both, 3 / 2 / 1 as the Spanish CV has it
- [ ] Carry the Jenkins one only

### D3-ES. Bullet order in the Principal entry

The two CVs order the Principal bullets differently. The Spanish CV puts the Contentful
editor app **before** the PayloadCMS migration and the caching rework; the English CV puts
it after both. Same eleven bullets, one moved.

The clause that would have forced an order ("Partiendo de esa migración" / "Building on
that migration") is dropped in both editions, so either order reads correctly.

**Recommendation:** follow the Spanish CV. Each edition sits the same distance from its
own source, and no reader is diffing the two orderings.

- [ ] Spanish CV order: Contentful, then PayloadCMS, then caching (recommended)
- [x] **Match the English site: PayloadCMS, caching, then Contentful** (chosen)

Fran chose against the recommendation. Since ordering carries no factual weight, the two
editions presenting the same eleven items in the same sequence is worth more than each
following its own CV's layout. The bullets below are numbered in the chosen order.

---

## Identity line

**CV *Resumen*:**

> Ingeniero de software con más de 10 años construyendo plataformas que dan servicio a
> millones de usuarios. Trabajo en todo el stack y cada vez más en la capa de IA:
> búsqueda semántica en producción, tooling MCP y flujos de desarrollo agéntico que he
> convertido en estándar de todo el equipo. Lidero la arquitectura de todo el dominio,
> mentorizo a ingenieros y fijo estándares técnicos que escalan.

**Proposed site version:**

> Ingeniero de software, más de 10 años construyendo plataformas que dan servicio a
> millones de usuarios, trabajando en la capa de IA: búsqueda semántica en producción,
> tooling MCP y flujos de desarrollo agéntico convertidos en estándar de todo el equipo.

**Note:** same three moves as the English identity line, made against this paragraph
rather than translated from that one. Leads with `Ingeniero de software`, not
`Ingeniero de Software Principal`, per ADR 0001. Drops the third sentence (architecture,
mentoring, standards) because the entries below carry it as evidence rather than
assertion. Keeps the CV's lowercase "software" in the running sentence, which is Spanish
convention and what the *Resumen* itself does; the role titles below keep the CV's
capitalisation.

Name renders **Fran Menéndez**, as on the English edition. The CV header says "Fran
Menéndez Moya" in both languages and the English site already shortens it.

Location line: **Zaragoza, España** and **Remoto**. The CV header reads "Zaragoza, España
| Autorización de trabajo en la UE | Remoto"; work authorization is dropped, which is
decision D4 of the last effort applied unchanged.

---

## The Knot Worldwide

Remoto | Oct 2023 - Actualidad

### Ingeniero de Software Principal, Abr 2025 - Actualidad

Eleven bullets, as on the English edition, in the English edition's order per D3-ES.

**P1**

- CV: Reconstruí desde cero la plataforma de e-commerce Shop en un mes yo solo (frente a
  una estimación de tres meses con varios desarrolladores). La plataforma gestiona
  millones de productos de la API Rainforest de Amazon y contenido editorial vía
  Contentful, construida con Next.js y React con librerías de componentes compartidas, y
  hoy da servicio a cientos de miles de usuarios en producción.
- Site: Reconstruí desde cero la plataforma de e-commerce Shop en un mes yo solo, frente
  a una estimación de tres meses con varios desarrolladores. Next.js y React sobre la API
  Rainforest de Amazon y Contentful, dando servicio a cientos de miles de usuarios en
  producción.
- Note: drops "librerías de componentes compartidas" and "millones de productos", the
  latter because two scale figures in one bullet dilute each other and "cientos de miles
  de usuarios" is the stronger.

**P2**

- CV: Construí un sistema de emparejamiento semántico de productos con OpenSearch,
  combinando similitud vectorial k-NN y relevancia textual BM25, con un panel de revisión
  humana a medida dentro de PayloadCMS para los emparejamientos por debajo del umbral de
  confianza.
- Site: Construí el emparejamiento semántico de productos con OpenSearch, combinando
  similitud vectorial k-NN y relevancia textual BM25, con un panel de revisión humana en
  PayloadCMS para los emparejamientos por debajo del umbral de confianza.
- Note: condensed only.

**P3**

- CV: Construí el flujo de desarrollo con IA agéntica del equipo: arquitectura de
  orquestación y verificación con enrutado de modelos por rol, presupuesto de contexto y
  revisión independiente obligatoria; usado para entregas en producción, incluido trabajo
  crítico de seguridad.
- Site: Construí el flujo de desarrollo con IA agéntica del equipo: orquestación y
  verificación con enrutado de modelos por rol, presupuesto de contexto y revisión
  independiente obligatoria, usado para entregas en producción, incluido trabajo crítico
  de seguridad.
- Note: unchanged in substance.

**P4**

- CV: Introduje tooling de Model Context Protocol (MCP) que genera componentes de
  producción directamente desde Figma con fidelidad exacta a los tokens, eliminando el
  paso manual de traducir el diseño a código; hoy es el estándar de todo el equipo.
- Site: verbatim.
- Note: already tight. Keeps "Model Context Protocol" spelled out once on the page.

**P5**

- CV: Dirigí una auditoría de seguridad completa y un programa de hardening de la API del
  servicio público de e-commerce: ocho hallazgos en cuatro clases de vulnerabilidad,
  cerrando una inyección SQL, un control de acceso roto, un IDOR de escritura y una
  exposición de PII; construí el primer conjunto de pruebas automatizadas del servicio
  (dos niveles, capa de verificación en CI sin base de datos) y un detector regenerable
  de regresiones de seguridad en CI.
- Site: Dirigí la auditoría de seguridad y el programa de hardening de la API del
  servicio público de e-commerce: ocho hallazgos en cuatro clases de vulnerabilidad,
  cerrando una inyección SQL, un control de acceso roto, un IDOR de escritura y una
  exposición de PII; construí el primer conjunto de pruebas automatizadas del servicio y
  un detector de regresiones de seguridad en CI.
- Note: drops "(dos niveles, capa de verificación en CI sin base de datos)" and
  "regenerable", the same two cuts the English edition makes.

**P6**

- CV: Migré PayloadCMS de v2 a v3 para más de 100.000 productos sin downtime; los tiempos
  de respuesta de las consultas bajaron de 850 ms a 34 ms mediante optimización de base
  de datos y arquitectura de caché.
- Site: Migré PayloadCMS de v2 a v3 para más de 100.000 productos sin downtime; los
  tiempos de respuesta de las consultas bajaron de 850 ms a 34 ms.
- Note: **100.000, 850 ms and 34 ms all confirmed off the rendered PDF.** Spanish decimal
  convention, so the CV writes `100.000` where the English writes `100,000`; the site
  follows each CV. Drops the trailing mechanism clause; the numbers are the evidence.

**P7**

- CV: Partiendo de esa migración, rediseñé el cacheo para más de 2M de usuarios
  semanales: añadí una capa de caché y fijé políticas de revalidación y obsolescencia por
  endpoint tras estudiar la tolerancia de cada uno, sobre el CDN existente y sin
  infraestructura adicional. La menor carga en origen permitió redimensionar los pods a
  la baja, recortando el recurso asignado y facturado por pod sin regresión de
  disponibilidad.
- Site: Rediseñé el cacheo para más de 2M de usuarios semanales: una capa de caché y
  revalidación por endpoint sobre el CDN existente y sin infraestructura adicional. La
  menor carga en origen permitió redimensionar los pods a la baja, recortando el recurso
  facturado por pod sin regresión de disponibilidad.
- Note: keeps "sin infraestructura adicional" and "sin regresión de disponibilidad",
  which are what make it credible rather than boastful. Dropping "Partiendo de esa
  migración" is what freed the ordering in D3-ES, though the chosen order keeps the
  migration above this bullet anyway.

**P8** (Contentful editor app, position per D3-ES)

- CV: Construí una app de editor a medida para Contentful en la plataforma editorial
  (React, Contentful App SDK), incluida su infraestructura de alojamiento en S3 +
  CloudFront; propagué el nuevo modelo de contenido de extremo a extremo en tres
  servicios con migraciones sin downtime.
- Site: Construí una app de editor a medida para Contentful en la plataforma editorial
  (React, Contentful App SDK) con su alojamiento en S3 y CloudFront; propagué el nuevo
  modelo de contenido de extremo a extremo en tres servicios con migraciones sin
  downtime.
- Note: condensed only.

**P9**

- CV: Sostuve al equipo de ingeniería durante una reestructuración de la empresa y
  defendí la capacidad de construcción frente al cumplimiento de objetivos en la revisión
  semestral de capacidad de los OKR; resolví disputas de revisión con evidencia y no por
  antigüedad.
- Site: verbatim.

**P10**

- CV: Construí la continuidad de sesión entre la plataforma Bump y Shop: un traspaso de
  token OAuth autentica a los usuarios en Shop con su cuenta existente de Bump al
  navegar, aprovisionando una cuenta al vuelo cuando no existe.
- Site: verbatim.

**P11**

- CV: Diagnostiqué la causa raíz de fallos de autenticación entre servicios en esa misma
  frontera, aislando un fallo en la capa edge y una llamada de sesión de Cognito que se
  quedaba colgada; resolví una incidencia de SEO canónico servida desde Kubernetes.
- Site: verbatim.

### Ingeniero de Software Líder, Oct 2023 - Mar 2025

**L1**

- CV: Construí un sistema de tests A/B para una plataforma en la que el cacheo en el edge
  había hecho imposible experimentar: Akamai asigna una cookie de variante en el edge, la
  aplicación la lee para renderizar la build etiquetada correspondiente y la asignación
  permanece cacheada y estable entre recargas hasta que la cookie caduca. La plataforma
  llevaba más de 3 años sin ejecutar un solo experimento; desde entonces se han lanzado
  más de 10.
- Site: Construí un sistema de tests A/B para una plataforma en la que el cacheo en el
  edge había hecho imposible experimentar: Akamai asigna una cookie de variante en el
  edge y la aplicación renderiza la build etiquetada correspondiente, estable entre
  recargas. La plataforma llevaba más de 3 años sin ejecutar un solo experimento; desde
  entonces se han lanzado más de 10.
- Note: condensed. Both figures confirmed off the rendered PDF.

**L2**

- CV: Reduje el tiempo de despliegue de más de 2 horas a 1 minuto, habilitando despliegues
  diarios y acortando drásticamente el ciclo de trabajo de los desarrolladores.
- Site: Reduje el tiempo de despliegue de más de 2 horas a 1 minuto, habilitando
  despliegues diarios.
- Note: drops the trailing clause; "drásticamente" is the only adverb of its kind
  anywhere in either CV and it is the one word on the page that reads as a `claim`.

**L3**

- CV: Lideré el desarrollo de la plataforma de comercio integrada, llevándola de la
  propuesta a un MVP en producción.
- Site: verbatim.

**L4**

- CV: Gestioné un equipo multidisciplinar de 8 personas; mentoricé a 5 desarrolladores,
  con 2 promociones como resultado.
- Site: verbatim.

---

## MOBIKO GmbH

Múnich, Alemania (remoto) | Ago 2020 - Sep 2023

### Team Lead y Arquitectura, Mar 2023 - Sep 2023

**M1**

- CV: Definí la estrategia técnica y construí la arquitectura de microservicios que
  sostuvo la expansión enterprise de la empresa, procesando más de 500k eventos de
  movilidad diarios: un API gateway en NestJS delante de funciones serverless que se
  comunican mediante colas de mensajes NATS, contenerizadas en Kubernetes con autoescalado
  basado en Keda y flujos de despliegue con GitHub Actions.
- Site: Definí la estrategia técnica y construí la arquitectura de microservicios que
  sostuvo la expansión enterprise de la empresa, procesando más de 500k eventos de
  movilidad diarios: un API gateway en NestJS delante de funciones serverless sobre colas
  NATS, en Kubernetes con autoescalado basado en Keda.
- Note: drops "y flujos de despliegue con GitHub Actions", which the English CV does not
  carry either. It is a fourth tool in a bullet that already names four, and the
  deployment-pipeline evidence sits in the entry below. Easy to restore if you want it.

**M2**

- CV: Hice crecer el equipo de ingeniería y acorté los ciclos de entrega reestructurando
  el proceso de revisión y publicación, y acompañando a los ingenieros hasta que
  asumieron la responsabilidad de su propio trabajo.
- Site: verbatim.

### Desarrollador Full-Stack Senior, Ago 2020 - Mar 2023

**S1**

- CV: Migré todo el producto a una nueva plataforma Vue y construí la PWA destinada a
  sustituir las aplicaciones multiplataforma existentes, sobre una arquitectura de estado
  Vuex/Flux en una base de código TypeScript estructurada en clases.
- Site: Migré todo el producto a una nueva plataforma Vue y construí la PWA destinada a
  sustituir las aplicaciones multiplataforma existentes, sobre una arquitectura de estado
  Vuex/Flux.
- Note: drops "en una base de código TypeScript estructurada en clases". The English CV
  does not carry it, TypeScript is in the technologies line, and "structured in classes"
  is a fact about the code rather than about the outcome.

**S2**

- CV: Rehíce la superficie de API sobre NestJS, con contratos anotados con Swagger y
  TypeORM contra PostgreSQL, reduciendo los tiempos de respuesta mediante caché y
  optimización de consultas a la base de datos.
- Site: Rehíce la superficie de API sobre NestJS, con contratos anotados con Swagger y
  TypeORM contra PostgreSQL, reduciendo los tiempos de respuesta mediante caché y
  optimización de consultas.
- Note: condensed only.

**S3**

- CV: Automaticé el pipeline de despliegue, pasando de ciclos de publicación de varios
  días a despliegue continuo, sobre Kubernetes con CircleCI ejecutando despliegues y
  comprobaciones de compatibilidad automatizados.
- Site: Automaticé el pipeline de despliegue, pasando de ciclos de publicación de varios
  días a despliegue continuo, sobre Kubernetes con CircleCI.
- Note: drops the trailing clause, as the English edition does.

---

## Hiberus Tecnología

Zaragoza, España | Jul 2017 - Jul 2020

Three entries, one per role, per `CONTEXT.md`. Bullet counts per D2-ES.

### Desarrollador Full-Stack Senior, Ene 2020 - Jul 2020

**H1**

- CV: Construí Afición360, un único monorepo Angular que servía los front ends de varios
  clubes de fútbol más un panel de administración interno, sobre una arquitectura de
  estado Flux compartida con microservicios REST en NestJS separados mediante Lerna;
  integré las APIs de La Liga y AVET, usando websockets deliberadamente para regular el
  tráfico y no sobrecargar los servicios externos.
- Site: Construí Afición360, un único monorepo Angular que servía los front ends de
  varios clubes de fútbol más un panel de administración interno, con microservicios REST
  en NestJS separados mediante Lerna; integré las APIs de La Liga y AVET sobre websockets,
  deliberadamente regulados para no sobrecargar los servicios externos.
- Note: condensed. **The Spanish CV's clause order here is ambiguous** ("sobre una
  arquitectura de estado Flux compartida con microservicios REST en NestJS" reads as if
  the Flux state architecture were shared *with* the microservices). The English CV has
  the same shape. The site version sidesteps it by dropping the Flux clause rather than
  guessing which reading is meant. Flagging rather than inventing: if the intent is
  "a shared Flux state architecture, plus NestJS REST microservices", say so and it goes
  back in on both editions.

**H2**

- CV: Rehíce el flujo de compra de una plataforma de ticketing en tiempo real bajo la
  carga de los días de partido de La Liga, integrando la API oficial para más de 100k
  usuarios concurrentes.
- Site: verbatim.

### Desarrollador Full-Stack, Nov 2017 - Ene 2020

**F1**

- CV: Construí una plataforma que procesaba más de 1M de registros diarios con
  sincronización en tiempo real entre 5 ubicaciones geográficas, sobre CouchDB como base
  de datos distribuida con capacidad offline que sincronizaba en vivo datos repartidos
  entre varios sistemas; sigue en producción.
- Site: Construí una plataforma que procesaba más de 1M de registros diarios con
  sincronización en tiempo real entre 5 ubicaciones geográficas, sobre CouchDB como base
  de datos distribuida con capacidad offline; sigue en producción.
- Note: drops the sub-clause restating the sync, which the leading clause already says.

### Desarrollador Junior, E-commerce, Jul 2017 - Nov 2017

**J1**

- CV: Construí desde cero un servicio en NodeJS/Express que agregaba APIs externas,
  todavía en producción, y una aplicación AngularJS para una multinacional que consumía
  APIs del ecosistema de Google; trabajo de backend sobre un framework interno
  Spring/Hibernate con MySQL y SQL Server.
- Site: Construí desde cero un servicio en NodeJS/Express que agregaba APIs externas,
  todavía en producción, y una aplicación AngularJS para una multinacional que consumía
  APIs del ecosistema de Google.
- Note: drops the Spring/Hibernate clause, as the English edition does. It is the oldest
  entry on the page and a Java stack no other line supports.

---

## Trabajo independiente

**CV:**

> **Instagram Checker**, en producción y construido de extremo a extremo con ese mismo
> flujo agéntico: convierte la exportación de datos de Instagram que aporta el usuario en
> un panel de seguidores y seguidos, leyendo únicamente lo que el usuario proporciona en
> lugar de hacer scraping.

**Proposed site version:**

> **Instagram Checker.** Construido de extremo a extremo con el mismo flujo agéntico que
> el trabajo de arriba: convierte la exportación de datos de Instagram que aporta el
> usuario en un panel de seguidores y seguidos, leyendo únicamente lo que el usuario
> proporciona en lugar de hacer scraping.

**Note:** no link, per decision D1 of the last effort, which applies unchanged: the
project is live but lands on a login wall, which is a worse click than no click. The
Spanish CV hyperlinks the name exactly as the English one does, so the two editions stay
consistent with each other and both differ from their CVs in the same way. No claim here
depends on clicking through.

---

## Reconocimientos y premios

One compact line, not cards, per `CONTEXT.md`.

**Proposed site version:**

> Finalista global y premio Galactic Impact, NASA Space Apps (May 2017) · 100 Ideas
> Zaragoza, Tecnología Más Innovadora (Sep 2017) · 100 Ideas Zaragoza, Mejor Uso de la
> Tarjeta Ciudadana (Sep 2017) · uCode by Adidas, Mejor Solución de Experiencia para
> Aficionados (Mar 2018) · Ganador del ImagineCode Blockchain Challenge (Oct 2018) ·
> Ganador del hub local de NASA Space Apps Zaragoza (Oct 2018) · Ganador del hub de
> Google Hash Code Zaragoza (Feb 2019)

**Note:** verbatim from the CV, separator changed from `|` to `·` as on the English
edition. Every date confirmed off the rendered PDF. All five month abbreviations the CV
uses here (May, Sep, Mar, Oct, Feb) are spelled identically in both languages, so nothing
had to be decided. Organisation and award names are names, not chrome, and stay as the
CV has them.

---

## Formación e idiomas

**Proposed site version:**

> Ingeniería Informática (Especialidad en Ingeniería del Software), Universidad de
> Zaragoza, 2012 - 2017 · Español (nativo), Inglés (avanzado, Cambridge C1)

**Note:** the CV's own wording throughout. The Spanish CV says "Inglés (avanzado,
Cambridge C1)" where the English one says "English (C1)"; each edition follows its own
CV, so this is one of the places the two legitimately differ.

---

## Tecnologías

The CV's ten-category **Competencias técnicas** block becomes one factual line, as on the
English edition. The heading reads `Tecnologías`, per D1-ES.

**Proposed site version:**

> TypeScript · React · Next.js · Node.js · NestJS · Vue · Angular · React Native ·
> PostgreSQL · OpenSearch · MongoDB · AWS · Kubernetes · Docker

**Note:** identical to the English edition, and deliberately so. These are technology
names, not words in a language, and all fourteen appear in the Spanish CV's block too, so
following the Spanish CV independently arrives at the same list. Two editions disagreeing
on which technologies are worth naming would be a difference with nothing behind it.

Still deliberately excluded, per ADR 0001: "Búsqueda semántica", "Flujos de desarrollo
agéntico", "Ingeniería de contexto" and "Seguridad de aplicaciones". As line items they
read as `claim`s; the entries above already evidence all four.

---

## Chrome

The words the layout says about itself. Section names come from the CV; the rest has no
CV behind it because the CV has no navigation.

| Key | Proposed | Source |
| --- | --- | --- |
| `nav.label` | Secciones | chrome, no CV equivalent |
| `nav.experience` | Experiencia | shortened from the CV heading, see below |
| `nav.contact` | Contacto | chrome |
| `nav.toDarkMode` | Cambiar a modo oscuro | chrome, accessible name |
| `nav.toLightMode` | Cambiar a modo claro | chrome, accessible name |
| `hero.cv` | Descargar CV | chrome |
| `sections.experience` | Experiencia profesional | CV heading |
| `sections.independentWork` | Trabajo independiente | CV heading |
| `sections.recognitions` | Reconocimientos y premios | CV heading |
| `sections.technologies` | Tecnologías | D1-ES; the one heading not taken from the CV |
| `sections.contact` | Contacto | chrome; the CV has no contact heading |
| `contact.email` | Email | chrome; used in Spanish as-is |
| `contact.linkedin` | LinkedIn | a name, unchanged in every edition |
| `contact.location` | Ubicación | chrome |
| `recognitions.education` | Formación e idiomas | CV heading |

**Why the nav says "Experiencia" and the section says "Experiencia profesional":** the CV
heading cannot sit in the masthead and keep it one line at every width. Ticket 01 already
separated the nav labels from the section headings for exactly this; they coincide in
English and do not here.

**Anchors stay English** (`#experience`, `#independent-work`, `#recognitions`,
`#technologies`, `#contact`). Only the visible labels above are Spanish, so the language
selector carries a fragment across unchanged and the two editions' anchor sets cannot
drift.

**Not chrome, and staying in the components that draw them:** "FM", "GitHub", and the
icon labels. Translating a name would be wrong rather than localised.

---

## Deliberately absent from the site

Everything on the Spanish CV that does not appear on `/es`, so a later reader does not
mistake an omission for an oversight.

| On the CV | Why it is not on the site |
| --- | --- |
| **Anteriormente: Desarrollador Web Freelance, 2016 - Jul 2017** and its paragraph on the graduation photography studio | Cut, decision D3 of the last effort applied unchanged: the weakest evidence on the page, and the CV is one click away. Absent from the English edition too. |
| Phone number, +34 678 77 91 50 | Not on the English edition either. A credibility anchor does not need a phone number, and publishing one invites recruiter cold-calls the site is not a funnel for. |
| **Autorización de trabajo en la UE** | Decision D4 of the last effort: recruiter-funnel signalling. The CV still carries it for the job-search case. |
| `fmenemo.github.io` in the CV header | The site does not link to itself. |
| The ten **Competencias técnicas** category labels (Lenguajes, Ingeniería de IA, Seguridad de aplicaciones, Frontend, Móvil y multiplataforma, Backend, Datos y búsqueda, Infraestructura, CMS y comercio, CI/CD y herramientas) | Collapsed into one line of technology names, as on the English edition. The categories are the CV's organisation, not evidence. |
| Technologies named only in that block: HTML/CSS, SQL, Astro, PWAs, Ionic, Cordova, Electron, Redis, Lambda, Cognito, CloudFront, CDN, colas de mensajes, GraphQL, Jenkins, GitHub Actions, CircleCI, Fastlane, Git, MySQL, SQL Server, Contentful, PayloadCMS | The line is fourteen items on both editions. Everything here is either implied by a listed technology, named in an entry above, or too small to earn a slot. |
| Hiberus Senior 3rd bullet (Jenkins from scratch, Docker/AWS pipelines) and Full-Stack 2nd bullet (Ionic offline apps, Cordova native capabilities, Angular in Electron as kiosks, Fastlane) | Cut per D2-ES, to hold the 2 / 1 / 1 taper the English edition uses. Both are real evidence; neither is on the English edition, and carrying them would let 2017 outweigh MOBIKO's Team Lead entry on bullet count. |
| The Instagram Checker URL | Per decision D1 of the last effort: live, but behind a login wall. |
| Sentence fragments dropped from individual bullets | Each recorded in the Note under its bullet above. |

---

## Nothing needed flagging as unreadable

Every figure on this page was read off the rendered PDF: 100.000 productos, 850 ms, 34 ms,
2M usuarios semanales, 500k eventos diarios, 1M registros diarios, 5 ubicaciones, 100k
usuarios concurrentes, 8 personas, 5 desarrolladores, 2 promociones, 3 años, 10
experimentos, 2 horas a 1 minuto, ocho hallazgos, cuatro clases de vulnerabilidad, tres
servicios. None was inferred, and none came out of the extraction mangled the way several
of the English CV's dates did.

One thing is a judgement call rather than a reading problem, recorded above rather than
guessed: the Flux clause in H1.
