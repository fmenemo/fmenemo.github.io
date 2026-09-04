// Every string a visitor reads on the Spanish edition. The shape it satisfies
// is in `content.ts`.
//
// It is condensed from `Fran_Menendez_CV_ES.pdf`, which is the source of truth
// for this edition: where the two disagree, the CV wins and this file is wrong
// (ADR 0001). It is **not** a translation of `content.en.ts`, and the two are
// not expected to correspond key by key: each is condensed from a different CV,
// and their bullets may legitimately split, merge or land differently
// (ADR 0004).
//
// Two copies live outside it, both of them condensations of `identity.line`
// below: the metadata in `es/index.html`, which is what a link scraper reads,
// and the share image copy in `tools/assets/og-image.es.html`. Change the
// identity line and all three move together; a test in `App.test.tsx` fails if
// they drift apart.
//
// Each bullet was approved against its CV original in
// `.scratch/the-reworked-cv-with-nesting/bullet-approval-es.md`, which is the
// record for the whole of this module and for everything on the Spanish CV that
// is deliberately absent from it. It replaces
// `.scratch/spanish-edition/bullet-approval-es.md`, which approved this edition
// against the CV as it stood on 2026-08-04 and is now history. Do not add a
// statement that is not in the current record.
//
// The PDF this copy traces to is the one in the public directory, SHA-256
// `34727f84d73d2ffaa735a566a83df9de2a93f3d4f7e9dbb8812f7ed3ead10350`. A digest
// rather than a commit because the Spanish markdown was retired upstream on
// 2026-08-17: this edition's CV has no source file left to diff and no commit
// to name, and a digest is the one thing about a generated artefact that still
// compares. Next sweep: run `shasum -a 256 public/Fran_Menendez_CV_ES.pdf`, and
// if it differs from the digest above, read the new PDF against this file.
//
// What the digest buys is knowing in a second whether the CV moved at all. It
// does not say what moved, it does not prevent drift, and nothing fails when
// this file falls behind. No test asserts over it and no build checks it.

import type { SiteContent } from './content';

export const es: SiteContent = {
  identity: {
    name: 'Fran Menéndez',
    // Condensed from the Spanish CV's summary, and it leads as that summary
    // leads: "Ingeniero full-stack". The three AI-layer items keep the
    // summary's order, and the team-wide standard attaches to MCP alone, as it
    // does there — the old line hung it off all three.
    line: 'Ingeniero full-stack, más de 10 años entregando productos completos de principio a fin en TypeScript, trabajando en la capa de IA: búsqueda semántica en producción, herramientas MCP convertidas en el estándar de todo el equipo y un flujo de ingeniería agéntico construido y operado para entregas en producción.',
    location: 'Zaragoza, España',
    mode: 'Remoto',
  },

  contact: {
    email: 'fmenendezmoya@gmail.com',
    linkedin: 'https://www.linkedin.com/in/fmenemo/',
    linkedinLabel: 'linkedin.com/in/fmenemo',
    github: 'https://github.com/fmenemo',
    // El CV en español es la descarga principal, y el original en inglés va al
    // lado: quien recluta desde una empresa española necesita a menudo un
    // documento en inglés para un ATS o un comité internacional, y obligarle a
    // pedirlo es justo la falta de cercanía que esta edición viene a corregir.
    //
    // Sobre la palabra "original" y sobre por qué los dos CV se publican
    // juntos, ver `CvDownload` en `content.ts`.
    cvs: [
      { href: '/Fran_Menendez_CV_ES.pdf', label: 'Descargar CV' },
      { href: '/Fran_Menendez_CV.pdf', label: 'CV en inglés (original)' },
    ],
  },

  employers: [
    {
      name: 'The Knot Worldwide',
      location: 'Remoto',
      span: 'Oct 2023 - Jul 2026',
      roles: [
        {
          title: 'Ingeniero de Software Principal',
          dates: 'Abr 2025 - Jul 2026',
          // Shop es un programa en el CV y un bullet aquí: un titular que lleva
          // debajo las partes de las que está hecho, en el orden del CV. Los
          // bullets sueltos que antes lo contaban por separado, repartidos entre
          // los once del puesto, se leían como trabajos sin relación entre sí,
          // que es justo lo contrario de lo que son.
          bullets: [
            {
              text: 'Llevé Shop de la propuesta a producción: la plataforma de e-commerce que propuse como Lead, sobre una proyección de más de 2M$ de ingresos anuales, entregada como MVP en vivo con el equipo y llevada a producción como Principal, siendo por momentos su único contribuidor.',
              // La segunda frase del titular, la de haber defendido el orden de
              // construcción con lo que mostraban las métricas, se queda fuera:
              // el primer sub-bullet *es* ese argumento, y decirlo dos veces
              // convierte el titular en el prólogo de su propia evidencia.
              subBullets: [
                'Tras el MVP solo para móvil, el plan era construir la versión de escritorio a continuación; argumenté a partir de Mixpanel y GA, con un abandono en el onboarding en una audiencia mayoritariamente móvil, que la retención en móvil iba primero, y ese orden fue el adoptado.',
                'Migré PayloadCMS de v2 a v3 para más de 100.000 productos sin tiempo de inactividad; los tiempos de respuesta de las consultas bajaron de 850 ms a 34 ms.',
                'Reconstruí desde cero la plataforma de e-commerce Shop en un mes y en solitario, frente a una estimación de tres meses con varios desarrolladores. Next.js y React sobre la Rainforest API de Amazon y Contentful, sirviendo a cientos de miles de usuarios en producción.',
                // "Sin revisión humana" se cae del CV aquí, y no por espacio:
                // "se servían automáticamente" ya lo dice, y la frase literal
                // hace saltar el guard de coletillas de ADR 0004, que prohíbe
                // "sin revisión" en toda la página. Ceder la frase es más
                // barato que abrir un agujero en ese guard.
                'Construí el emparejamiento semántico de productos con OpenSearch, combinando similitud vectorial k-NN y relevancia textual BM25, segmentado por confianza: las coincidencias más sólidas se servían automáticamente - cerca del 90 % del volumen -, las más débiles se descartaban y la franja intermedia se enviaba a un panel de revisión a medida que construí dentro de PayloadCMS. La latencia p95 de consulta se mantuvo por debajo de 50 ms sobre más de 100.000 productos.',
                'Rehíce la caché para más de 2M de usuarios semanales: una capa de caché y revalidación por endpoint sobre la CDN existente y sin infraestructura adicional. La menor carga en origen permitió redimensionar los pods a la baja, recortando el recurso facturado por pod sin regresión en la disponibilidad.',
                'Amplié el panel de administración de PayloadCMS con páginas a medida: una consola de purgado que da a los editores control sobre la caché de consultas en Redis sin necesitar a un ingeniero, y el panel de revisión manual del emparejador de productos.',
                'Unifiqué el inicio de sesión en cinco productos - los artículos de Bump, los nombres de bebé, el registro, la tienda y las apps nativas - de modo que una sola cuenta sustituyó a cinco accesos separados.',
                'Construí la continuidad de sesión entre la plataforma Bump y Shop: un traspaso de token OAuth inicia la sesión del usuario en Shop con su cuenta existente de Bump al navegar, aprovisionando una cuenta al vuelo cuando no existe.',
                // Sustituye al bullet de la auditoría, que contaba hallazgos. El
                // CV dejó de dar la cifra y la taxonomía de cuatro clases, así
                // que este dice qué se cerró y con qué se quedó protegido.
                'Blindé la API pública de e-commerce: cerré agujeros de inyección SQL, control de acceso y exposición de PII, incluido un IDOR de escritura en una primitiva de autorización compartida que cubría cinco colecciones, y la dejé protegida con pruebas de regresión que se ejecutan en CI.',
              ],
            },
            'Introduje herramientas de Model Context Protocol (MCP) que generan componentes de producción directamente desde Figma con fidelidad exacta a los tokens, eliminando el paso manual de diseño a código; hoy es el estándar de todo el equipo.',
            'Construí y operé un flujo de desarrollo agéntico con IA para mis propias entregas en producción: cuatro etapas, ocho agentes con roles acotados, enrutamiento de modelo según la tarea y roles de revisión que tienen vetado escribir el código que auditan. Lo usé para entregar un programa de blindaje de seguridad, en el que el paso independiente detectó defectos que la pasada de implementación había pasado por alto; llevé sus prácticas al proceso del equipo.',
            'Di estabilidad al equipo de ingeniería durante una reestructuración de la empresa y defendí la capacidad de construcción frente al cumplimiento de objetivos en la revisión semestral de capacidad de OKR; arbitré disputas de revisión con evidencias y no por antigüedad.',
            'Construí una app de editor a medida para Contentful en la plataforma editorial (React, Contentful App SDK) con su alojamiento en S3 y CloudFront; propagué el nuevo modelo de contenido de extremo a extremo en tres servicios con migraciones sin tiempo de inactividad.',
            // La incidencia que el bullet retirado de los fallos de
            // autenticación entre servicios mencionaba de pasada. En el CV es
            // ahora un bullet propio, contado como qué se rastreó y qué se fijó.
            'Rastreé un desplome generalizado del tráfico orgánico de The Bump hasta que el sitio tomaba su propia dirección del host por el que llegaba cada petición, que una migración del ingress acababa de cambiar: estaba diciendo a los buscadores que su origen interno era el canónico. Fijé esa identidad al dominio de la marca allí donde se deriva, de modo que ningún cambio posterior de infraestructura pueda moverla.',
          ],
        },
        {
          title: 'Ingeniero de Software Líder',
          dates: 'Oct 2023 - Mar 2025',
          bullets: [
            'Asumí la plataforma web de The Bump del equipo saliente: reconstruí internamente sus herramientas de build y release, sus entornos y sus runbooks, y formé parte del panel de contratación de cuatro puestos de ingeniería, definiendo la prueba técnica, para dotar al equipo que sería su propietario.',
            'Construí un sistema de pruebas A/B para The Bump, una plataforma donde la caché en el edge había hecho imposible experimentar: Akamai asigna una cookie de variante en el edge y la app renderiza la build etiquetada correspondiente, estable entre recargas. La plataforma llevaba más de 3 años sin ejecutar un solo experimento; desde entonces se han ejecutado más de 10.',
            // El mecanismo y su resultado, cada uno legible por su cuenta, como
            // los separa el CV. Antes iban en un solo bullet y el resultado se
            // leía como una cláusula del sistema.
            'La variante ganadora de una prueba de disposición de anuncios en ese sistema elevó las impresiones de anuncios servidas un 23 % frente al control en una propiedad monetizada con publicidad.',
            'Gestioné un equipo multidisciplinar de 8 personas; mentoricé a 5 desarrolladores, con 2 promociones como resultado.',
            'Reduje el tiempo de despliegue de más de 2 horas a 1 minuto, pasando de releases agrupadas a diarias.',
          ],
        },
      ],
    },
    {
      name: 'MOBIKO GmbH',
      location: 'Múnich, Alemania (remoto)',
      span: 'Ago 2020 - Sep 2023',
      roles: [
        {
          title: 'Team Lead y Arquitectura',
          dates: 'Mar 2023 - Sep 2023',
          bullets: [
            'Definí la estrategia técnica y construí la arquitectura de microservicios detrás de la expansión enterprise de la empresa, procesando más de 500k eventos de movilidad diarios: un API gateway en NestJS delante de funciones serverless que se comunican por colas NATS, en Kubernetes con autoescalado dirigido por Keda.',
            // El CV pone al equipo y a los ciclos de entrega junto al periodo,
            // no como consecuencia de la reestructuración. La versión anterior
            // atribuía una causa que el CV no afirma.
            'Reestructuré el proceso de revisión y release y acompañé a los ingenieros hasta que asumieron la responsabilidad; el equipo creció y los ciclos de entrega se acortaron durante el periodo.',
          ],
        },
        {
          title: 'Desarrollador Full-Stack Senior',
          dates: 'Ago 2020 - Mar 2023',
          bullets: [
            'Migré el producto completo a una nueva plataforma Vue y construí la PWA destinada a sustituir las aplicaciones multiplataforma existentes, sobre una arquitectura de estado Vuex/Flux.',
            'Rehíce la superficie de la API sobre NestJS, con contratos anotados en Swagger y TypeORM contra PostgreSQL, recortando los tiempos de respuesta un 72 % mediante caché y optimización de consultas a la base de datos; las cargas de página bajaron un 70 % en Lighthouse.',
            'Automaticé el pipeline de despliegue, de ciclos de release de varios días a despliegue continuo, sobre Kubernetes con CircleCI.',
          ],
        },
      ],
    },
    {
      name: 'Hiberus Tecnología',
      location: 'Zaragoza, España',
      span: 'Jul 2017 - Jul 2020',
      roles: [
        {
          title: 'Desarrollador Full-Stack Senior',
          dates: 'Ene 2020 - Jul 2020',
          bullets: [
            'Construí Afición360, un único monorepo Angular que sirve los frontales de varios clubes de fútbol más un panel de administración interno, con microservicios REST en NestJS separados mediante Lerna; integré las APIs de La Liga y AVET sobre websockets, usados deliberadamente para regular el tráfico y no sobrecargar los servicios externos.',
            'Rehíce la ruta de checkout de una plataforma de venta de entradas en tiempo real bajo la carga de un día de partido de La Liga, integrando la API oficial para más de 100k usuarios concurrentes.',
          ],
        },
        {
          title: 'Desarrollador Full-Stack',
          dates: 'Nov 2017 - Ene 2020',
          bullets: [
            'Construí una plataforma que procesa más de 1M de entradas diarias con sincronización en tiempo real entre 5 ubicaciones geográficas, sobre CouchDB como base de datos distribuida con capacidad offline, con un 99,95 % de disponibilidad; sigue en producción.',
          ],
        },
        {
          title: 'Desarrollador Junior, E-commerce',
          dates: 'Jul 2017 - Nov 2017',
          bullets: [
            'Construí desde cero un servicio en NodeJS/Express que agrega APIs externas, todavía en producción, y una aplicación AngularJS para una multinacional que consume APIs del ecosistema de Google.',
          ],
        },
      ],
    },
  ],

  // No public URL, for the reason recorded as decision D1 of the site refresh:
  // the project is live but lands on a login wall. The Spanish CV hyperlinks the
  // name exactly as the English one does, so both editions differ from their CV
  // in the same way. The copy stands alone either way.
  independentWork: [
    {
      name: 'Instagram Checker',
      description:
        'Construido de principio a fin con el mismo flujo agéntico que el trabajo de arriba: convierte la exportación de datos de Instagram que aporta el usuario en un panel de seguidores y seguidos, leyendo solo lo que el usuario proporciona en lugar de hacer scraping.',
    },
    // Segundo a propósito, como en la edición inglesa. La entrada de arriba
    // abre con "el mismo flujo agéntico que el trabajo de arriba", que apunta
    // al puesto de Principal de la sección anterior, y meter algo entre las dos
    // dejaría esa referencia señalando a lo que tiene justo encima.
    //
    // Sin enlace, porque no hay nada que visitar: el harness no es un producto.
    // Sin cifras y sin nombres de dependencias tampoco - el párrafo del CV no
    // lleva ninguno, y esto es una condensación suya (ADR 0001), no una
    // ampliación.
    //
    // Abre por lo que la cosa hace mecánicamente y no por el hecho de que haya
    // IA de por medio, que es toda la diferencia entre esto y haber usado un
    // asistente de código. Del párrafo del CV se quedan fuera dos mecanismos,
    // porque cada uno necesita una frase para significar algo: el flujo tipado
    // de transiciones, y el enrutado de modelo y esfuerzo por rol.
    {
      name: 'Harness de entrega multiagente',
      description:
        'Construido y operado en solitario: deriva el orden en que se ejecuta el trabajo de las propias aristas de dependencia de un tracker, planificando en paralelo todo aquello que nada bloquea. Una revisión independiente responde en un esquema que el harness parsea, y ese veredicto parseado condiciona el merge; un hallazgo vuelve a la sesión que escribió el código como un reintento acotado y no como una reescritura.',
    },
  ],

  // Organisation and award names are names, not chrome. The month abbreviations
  // the CV uses here happen to be spelled the same in both languages.
  recognitions: [
    'Finalista global y premio Galactic Impact, NASA Space Apps (May 2017)',
    '100 Ideas Zaragoza, Tecnología Más Innovadora (Sep 2017)',
    '100 Ideas Zaragoza, Mejor Uso de la Tarjeta Ciudadana (Sep 2017)',
    'uCode by Adidas, Mejor Solución de Experiencia del Aficionado (Mar 2018)',
    'Ganador del ImagineCode Blockchain Challenge (Oct 2018)',
    'Ganador del hub local de NASA Space Apps Zaragoza (Oct 2018)',
    'Ganador del hub de Google Hash Code Zaragoza (Feb 2019)',
  ],

  education: {
    degree: 'Ingeniería Informática (Especialidad en Ingeniería del Software)',
    institution: 'Universidad de Zaragoza',
    years: '2012 - 2017',
    // The Spanish CV is more specific than the English one here, which says only
    // "English (C1)". Each edition follows its own CV.
    languages: 'Español (nativo), Inglés (avanzado, Cambridge C1)',
  },

  // Identical to the English edition, and deliberately so: these are technology
  // names rather than words in a language, and all fourteen appear in the
  // Spanish CV's block too. The same four capability nouns are excluded here as
  // there, for the same reason.
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
      label: 'Secciones',
      // Not the section heading below: "Experiencia profesional" cannot sit in
      // the masthead and keep it one line at every width.
      experience: 'Experiencia',
      contact: 'Contacto',
      toDarkMode: 'Cambiar a modo oscuro',
      toLightMode: 'Cambiar a modo claro',
    },
    // "EN" y "ES" son códigos de idioma, no palabras, así que se escriben igual
    // en las dos ediciones. Lo que cambia es cuál de los dos es el otro.
    language: {
      label: 'Idioma',
      current: 'ES',
      other: { label: 'EN', path: '/', lang: 'en', name: 'Ver esta página en inglés' },
    },
    // The CV's own headings, with one exception: the CV calls this section
    // "Competencias técnicas", and the site does not, for the same reason the
    // English edition says "Technologies" rather than "Skills" (decision D1-ES).
    sections: {
      experience: 'Experiencia profesional',
      independentWork: 'Trabajo independiente',
      recognitions: 'Reconocimientos y premios',
      technologies: 'Tecnologías',
      contact: 'Contacto',
    },
    contact: {
      email: 'Email',
      linkedin: 'LinkedIn',
      location: 'Ubicación',
    },
    recognitions: {
      education: 'Formación e idiomas',
    },
  },
};
