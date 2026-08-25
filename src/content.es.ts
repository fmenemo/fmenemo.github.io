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
// Each bullet was approved against its CV original in
// `.scratch/spanish-edition/bullet-approval-es.md`, which also records why
// anything on the Spanish CV is missing here. Do not add a statement that is
// not in that document.
//
// The PDF this copy traces to is the one in the public directory, SHA-256
// `a7ce21c9135e72875fc904c7f614d9605488207fa859478a56d80cfc639fb2d9`. A digest
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
    line: 'Ingeniero de software, más de 10 años construyendo plataformas que dan servicio a millones de usuarios, trabajando en la capa de IA: búsqueda semántica en producción, tooling MCP y flujos de desarrollo agéntico convertidos en estándar de todo el equipo.',
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
          bullets: [
            'Reconstruí desde cero la plataforma de e-commerce Shop en un mes yo solo, frente a una estimación de tres meses con varios desarrolladores. Next.js y React sobre la API Rainforest de Amazon y Contentful, dando servicio a cientos de miles de usuarios en producción.',
            'Construí el emparejamiento semántico de productos con OpenSearch, combinando similitud vectorial k-NN y relevancia textual BM25, con un panel de revisión humana en PayloadCMS para los emparejamientos por debajo del umbral de confianza.',
            'Construí el flujo de desarrollo con IA agéntica del equipo: orquestación y verificación con enrutado de modelos por rol, presupuesto de contexto y revisión independiente obligatoria, usado para entregas en producción, incluido trabajo crítico de seguridad.',
            'Introduje tooling de Model Context Protocol (MCP) que genera componentes de producción directamente desde Figma con fidelidad exacta a los tokens, eliminando el paso manual de traducir el diseño a código; hoy es el estándar de todo el equipo.',
            'Dirigí la auditoría de seguridad y el programa de hardening de la API del servicio público de e-commerce: ocho hallazgos en cuatro clases de vulnerabilidad, cerrando una inyección SQL, un control de acceso roto, un IDOR de escritura y una exposición de PII; construí el primer conjunto de pruebas automatizadas del servicio y un detector de regresiones de seguridad en CI.',
            'Migré PayloadCMS de v2 a v3 para más de 100.000 productos sin downtime; los tiempos de respuesta de las consultas bajaron de 850 ms a 34 ms.',
            'Rediseñé el cacheo para más de 2M de usuarios semanales: una capa de caché y revalidación por endpoint sobre el CDN existente y sin infraestructura adicional. La menor carga en origen permitió redimensionar los pods a la baja, recortando el recurso facturado por pod sin regresión de disponibilidad.',
            'Construí una app de editor a medida para Contentful en la plataforma editorial (React, Contentful App SDK) con su alojamiento en S3 y CloudFront; propagué el nuevo modelo de contenido de extremo a extremo en tres servicios con migraciones sin downtime.',
            'Sostuve al equipo de ingeniería durante una reestructuración de la empresa y defendí la capacidad de construcción frente al cumplimiento de objetivos en la revisión semestral de capacidad de los OKR; resolví disputas de revisión con evidencia y no por antigüedad.',
            'Construí la continuidad de sesión entre la plataforma Bump y Shop: un traspaso de token OAuth autentica a los usuarios en Shop con su cuenta existente de Bump al navegar, aprovisionando una cuenta al vuelo cuando no existe.',
            'Diagnostiqué la causa raíz de fallos de autenticación entre servicios en esa misma frontera, aislando un fallo en la capa edge y una llamada de sesión de Cognito que se quedaba colgada; resolví una incidencia de SEO canónico servida desde Kubernetes.',
          ],
        },
        {
          title: 'Ingeniero de Software Líder',
          dates: 'Oct 2023 - Mar 2025',
          bullets: [
            'Construí un sistema de tests A/B para una plataforma en la que el cacheo en el edge había hecho imposible experimentar: Akamai asigna una cookie de variante en el edge y la aplicación renderiza la build etiquetada correspondiente, estable entre recargas. La plataforma llevaba más de 3 años sin ejecutar un solo experimento; desde entonces se han lanzado más de 10.',
            'Reduje el tiempo de despliegue de más de 2 horas a 1 minuto, habilitando despliegues diarios.',
            'Lideré el desarrollo de la plataforma de comercio integrada, llevándola de la propuesta a un MVP en producción.',
            'Gestioné un equipo multidisciplinar de 8 personas; mentoricé a 5 desarrolladores, con 2 promociones como resultado.',
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
            'Definí la estrategia técnica y construí la arquitectura de microservicios que sostuvo la expansión enterprise de la empresa, procesando más de 500k eventos de movilidad diarios: un API gateway en NestJS delante de funciones serverless sobre colas NATS, en Kubernetes con autoescalado basado en Keda.',
            'Hice crecer el equipo de ingeniería y acorté los ciclos de entrega reestructurando el proceso de revisión y publicación, y acompañando a los ingenieros hasta que asumieron la responsabilidad de su propio trabajo.',
          ],
        },
        {
          title: 'Desarrollador Full-Stack Senior',
          dates: 'Ago 2020 - Mar 2023',
          bullets: [
            'Migré todo el producto a una nueva plataforma Vue y construí la PWA destinada a sustituir las aplicaciones multiplataforma existentes, sobre una arquitectura de estado Vuex/Flux.',
            'Rehíce la superficie de API sobre NestJS, con contratos anotados con Swagger y TypeORM contra PostgreSQL, reduciendo los tiempos de respuesta mediante caché y optimización de consultas.',
            'Automaticé el pipeline de despliegue, pasando de ciclos de publicación de varios días a despliegue continuo, sobre Kubernetes con CircleCI.',
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
            'Construí Afición360, un único monorepo Angular que servía los front ends de varios clubes de fútbol más un panel de administración interno, con microservicios REST en NestJS separados mediante Lerna; integré las APIs de La Liga y AVET sobre websockets, deliberadamente regulados para no sobrecargar los servicios externos.',
            'Rehíce el flujo de compra de una plataforma de ticketing en tiempo real bajo la carga de los días de partido de La Liga, integrando la API oficial para más de 100k usuarios concurrentes.',
          ],
        },
        {
          title: 'Desarrollador Full-Stack',
          dates: 'Nov 2017 - Ene 2020',
          bullets: [
            'Construí una plataforma que procesaba más de 1M de registros diarios con sincronización en tiempo real entre 5 ubicaciones geográficas, sobre CouchDB como base de datos distribuida con capacidad offline; sigue en producción.',
          ],
        },
        {
          title: 'Desarrollador Junior, E-commerce',
          dates: 'Jul 2017 - Nov 2017',
          bullets: [
            'Construí desde cero un servicio en NodeJS/Express que agregaba APIs externas, todavía en producción, y una aplicación AngularJS para una multinacional que consumía APIs del ecosistema de Google.',
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
        'Construido de extremo a extremo con el mismo flujo agéntico que el trabajo de arriba: convierte la exportación de datos de Instagram que aporta el usuario en un panel de seguidores y seguidos, leyendo únicamente lo que el usuario proporciona en lugar de hacer scraping.',
    },
  ],

  // Organisation and award names are names, not chrome. The month abbreviations
  // the CV uses here happen to be spelled the same in both languages.
  recognitions: [
    'Finalista global y premio Galactic Impact, NASA Space Apps (May 2017)',
    '100 Ideas Zaragoza, Tecnología Más Innovadora (Sep 2017)',
    '100 Ideas Zaragoza, Mejor Uso de la Tarjeta Ciudadana (Sep 2017)',
    'uCode by Adidas, Mejor Solución de Experiencia para Aficionados (Mar 2018)',
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
    skipToContent: 'Saltar al contenido',
    nav: {
      label: 'Secciones',
      // Not the section heading below: "Experiencia profesional" cannot sit in
      // the masthead and keep it one line at every width.
      experience: 'Experiencia',
      contact: 'Contacto',
      // Una palabra, no "Modo oscuro": el control ya está junto al selector de
      // idioma, y "modo" es lo único que las dos palabras comparten.
      toDark: 'Oscuro',
      toLight: 'Claro',
    },
    // "EN" y "ES" son códigos de idioma, no palabras, así que se escriben igual
    // en las dos ediciones. Lo que cambia es cuál de los dos es el otro.
    language: {
      label: 'Idioma',
      current: 'ES',
      other: { label: 'EN', path: '/', lang: 'en', name: 'Ver esta página en inglés' },
    },
    // The CV's own headings.
    sections: {
      experience: 'Experiencia profesional',
      independentWork: 'Trabajo independiente',
      recognitions: 'Reconocimientos y premios',
      contact: 'Contacto',
    },
    contact: {
      email: 'Email',
      linkedin: 'LinkedIn',
      location: 'Ubicación',
    },
    recognitions: {
      education: 'Formación e idiomas',
      // The CV calls this block "Competencias técnicas", and the site does not,
      // for the same reason the English edition says "Technologies" rather than
      // "Skills" (decision D1-ES).
      technologies: 'Tecnologías',
    },
  },
};
