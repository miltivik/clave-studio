export interface ServicePageContent {
  slug: string
  targetQuery: string
  title: string
  description: string
  h1: string
  hero: {
    eyebrow: string
    title: string
    subtitle: string
  }
  problems: string[]
  results: string[]
  deliverables: string[]
  stack: string[]
  process: { step: string; description: string }[]
  caseStudy: {
    client: string
    result: string
    category: string
    services: string[]
  } | null
  faq: { question: string; answer: string }[]
  cta: {
    primary: string
    secondary: string
  }
  internalLinks: {
    label: string
    href: string
  }[]
}

export interface HubPageContent {
  slug: string
  targetQuery: string
  title: string
  description: string
  h1: string
  hero: {
    eyebrow: string
    title: string
    subtitle: string
  }
  services: {
    title: string
    description: string
    href: string
  }[]
  marketSectionTitle: string
  whyUruguay: string[]
  process: { step: string; description: string }[]
  cases: {
    client: string
    result: string
    category: string
  }[]
  faq: { question: string; answer: string }[]
  cta: {
    primary: string
    secondary: string
  }
  internalLinks: {
    label: string
    href: string
  }[]
}

export const hubUruguayContent: HubPageContent = {
  slug: "agencia-digital-uruguay",
  targetQuery: "agencia digital uruguay",
  title: "Agencia Digital Uruguay | Desarrollo Web, E-commerce y Automatizaciones",
  description:
    "Somos una agencia digital en Uruguay. Creamos sitios web, tiendas online y automatizaciones para pymes que necesitan una presencia digital seria y resultados medibles.",
  h1: "Agencia Digital Uruguay",
  hero: {
    eyebrow: "Uruguay primero",
    title: "Tu socio digital para crecer con claridad",
    subtitle:
      "Creamos presencia digital para pymes uruguayas: sitios web rápidos, tiendas online que venden y automatizaciones que ahorran tiempo.",
  },
  services: [
    {
      title: "Desarrollo Web Uruguay",
      description: "Sitios corporativos, landing pages y productos web con SEO técnico incluido.",
      href: "/desarrollo-web-uruguay",
    },
    {
      title: "E-commerce Uruguay",
      description: "Tiendas online con Shopify, WooCommerce o desarrollo a medida.",
      href: "/ecommerce-uruguay",
    },
    {
      title: "Automatizaciones Uruguay",
      description: "Conectamos CRM, WhatsApp, email y procesos para que todo fluya mejor.",
      href: "/automatizaciones-uruguay",
    },
  ],
  marketSectionTitle: "Por qué trabajar con un estudio con foco en Uruguay",
  whyUruguay: [
    "Atención en horario Uruguay y reuniones claras desde el inicio.",
    "Entendemos los tiempos, expectativas y realidad de las pymes locales.",
    "Trabajamos con pagos, envíos y operaciones habituales de la región.",
    "Priorizamos entregas rápidas sin perder calidad técnica.",
    "El soporte es en español y con una sola persona responsable del proyecto.",
  ],
  process: [
    {
      step: "01 / Diagnóstico",
      description:
        "Analizamos el negocio, la competencia y el punto más importante para vender mejor.",
    },
    {
      step: "02 / Propuesta",
      description:
        "Definimos alcance, tiempos, entregables y presupuesto con una propuesta cerrada.",
    },
    {
      step: "03 / Diseño",
      description:
        "Trabajamos estructura, mensajes y visual para que la experiencia tenga foco comercial.",
    },
    {
      step: "04 / Desarrollo",
      description:
        "Implementamos con buena base técnica, performance y SEO esencial desde el inicio.",
    },
    {
      step: "05 / Lanzamiento",
      description:
        "Publicamos, conectamos medición y dejamos el proyecto listo para operar sin fricción.",
    },
  ],
  cases: [
    {
      client: "Porto Seguro",
      result: "Sitio inmobiliario con filtros dinámicos y catálogo administrable.",
      category: "Inmobiliaria",
    },
    {
      client: "Smile Leslieville",
      result: "Sistema de turnos automatizado con seguimiento por WhatsApp y email.",
      category: "Salud",
    },
  ],
  faq: [
    {
      question: "¿Trabajan solo con empresas de Uruguay?",
      answer:
        "No. El foco comercial de esta etapa es Uruguay, pero también trabajamos con equipos de la región cuando el proyecto encaja bien.",
    },
    {
      question: "¿Cuánto cuesta un proyecto digital en Uruguay?",
      answer:
        "Depende del alcance. Un sitio corporativo suele partir desde USD 1.500, una tienda online desde USD 2.500 y una capa de automatizaciones depende del flujo a resolver.",
    },
    {
      question: "¿Qué plazos manejan?",
      answer:
        "Un sitio corporativo puede resolverse en unas tres semanas. Proyectos más complejos, tiendas online o integraciones avanzadas pueden requerir entre cuatro y seis semanas.",
    },
    {
      question: "¿Cómo es el esquema de pago?",
      answer:
        "Normalmente trabajamos con un anticipo para iniciar y un saldo contra entrega o hitos definidos en la propuesta.",
    },
    {
      question: "¿Incluyen soporte después del lanzamiento?",
      answer:
        "Sí. Todos los proyectos incluyen una ventana inicial de soporte y después podemos seguir con mantenimiento o mejoras evolutivas.",
    },
  ],
  cta: {
    primary: "Solicitar propuesta",
    secondary: "Ver casos",
  },
  internalLinks: [
    { label: "Desarrollo Web Uruguay", href: "/desarrollo-web-uruguay" },
    { label: "E-commerce Uruguay", href: "/ecommerce-uruguay" },
    { label: "Automatizaciones Uruguay", href: "/automatizaciones-uruguay" },
  ],
}

export const hubLatamContent: HubPageContent = {
  slug: "agencia-digital-latam",
  targetQuery: "agencia digital latam",
  title: "Agencia Digital LATAM | Desarrollo Web, E-commerce y Automatizaciones",
  description:
    "Somos una agencia digital para LATAM. Creamos sitios web, tiendas online y automatizaciones para pymes que venden en varios mercados de la región.",
  h1: "Agencia Digital LATAM",
  hero: {
    eyebrow: "LATAM primero",
    title: "Presencia digital para vender mejor en la región",
    subtitle:
      "Trabajamos con pymes y equipos de LATAM que necesitan sitios rápidos, tiendas online y automatizaciones comerciales con soporte en español.",
  },
  services: [
    {
      title: "Desarrollo Web LATAM",
      description: "Sitios corporativos, landing pages y productos web preparados para captar demanda regional.",
      href: "/desarrollo-web-latam",
    },
    {
      title: "E-commerce LATAM",
      description: "Tiendas online con catálogo, pagos, envíos y comunicación pensada para mercados regionales.",
      href: "/ecommerce-latam",
    },
    {
      title: "Automatizaciones LATAM",
      description: "Flujos de CRM, WhatsApp, email y reportes para equipos distribuidos en la región.",
      href: "/automatizaciones-latam",
    },
  ],
  marketSectionTitle: "Por qué trabajar con un estudio que entiende LATAM",
  whyUruguay: [
    "Comunicación en español, horario compatible y reuniones claras sin fricción.",
    "Entendemos operaciones regionales con pagos, envíos, WhatsApp y equipos remotos.",
    "Diseñamos sitios y tiendas con foco en confianza, velocidad y conversión mobile.",
    "Priorizamos arquitectura escalable para sumar países, campañas y nuevas líneas de negocio.",
    "Trabajamos con entregables concretos para que el equipo pueda operar sin depender de soporte constante.",
  ],
  process: [
    {
      step: "01 / Diagnóstico",
      description:
        "Analizamos el negocio, los países objetivo, la competencia y la prioridad comercial.",
    },
    {
      step: "02 / Estrategia",
      description:
        "Definimos arquitectura, mensajes, rutas SEO y flujo de conversión por servicio o mercado.",
    },
    {
      step: "03 / Diseño",
      description:
        "Construimos una experiencia clara para usuarios mobile y decisiones rápidas.",
    },
    {
      step: "04 / Desarrollo",
      description:
        "Implementamos con performance, SEO técnico, medición y base para escalar contenido.",
    },
    {
      step: "05 / Lanzamiento",
      description:
        "Publicamos, validamos indexabilidad y dejamos un plan de mejora para campañas y crecimiento orgánico.",
    },
  ],
  cases: hubUruguayContent.cases,
  faq: [
    {
      question: "¿Trabajan con empresas de toda LATAM?",
      answer:
        "Sí. Priorizamos proyectos donde podemos aportar desarrollo web, e-commerce o automatización con impacto comercial claro.",
    },
    {
      question: "¿Pueden adaptar una web para varios países?",
      answer:
        "Sí. Podemos separar mensajes, URLs, medición y landings por país sin duplicar contenido de forma innecesaria.",
    },
    {
      question: "¿Cómo coordinan los proyectos regionales?",
      answer:
        "Trabajamos remoto, con reuniones breves, entregables por hito y documentación simple para equipos distribuidos.",
    },
    {
      question: "¿Incluyen SEO para LATAM?",
      answer:
        "Sí. Trabajamos estructura, metadata, performance, sitemap, enlazado interno y páginas por intención de búsqueda.",
    },
  ],
  cta: {
    primary: "Solicitar propuesta LATAM",
    secondary: "Ver servicios regionales",
  },
  internalLinks: [
    { label: "Desarrollo Web LATAM", href: "/desarrollo-web-latam" },
    { label: "E-commerce LATAM", href: "/ecommerce-latam" },
    { label: "Automatizaciones LATAM", href: "/automatizaciones-latam" },
    { label: "Agencia Digital Uruguay", href: "/agencia-digital-uruguay" },
  ],
}

export const desarrolloWebContent: ServicePageContent = {
  slug: "desarrollo-web-uruguay",
  targetQuery: "desarrollo web uruguay",
  title: "Desarrollo Web Uruguay | Sitios Rápidos y Visibles en Google",
  description:
    "Creamos sitios web en Uruguay con Next.js, SEO técnico y foco en conversión. Proyectos claros, rápidos y fáciles de mantener.",
  h1: "Desarrollo Web Uruguay",
  hero: {
    eyebrow: "Sitios web para vender mejor",
    title: "Sitios que se ven bien y trabajan por vos",
    subtitle:
      "Diseñamos y desarrollamos tu presencia digital para que cargue rápido, comunique mejor y convierta visitas en consultas.",
  },
  problems: [
    "Tu sitio actual carga lento y pierde visitas antes de mostrar valor.",
    "No aparecés en Google cuando alguien busca tus servicios.",
    "Cada cambio depende de un tercero y te frena.",
    "La experiencia en celular no acompaña la compra ni la consulta.",
    "No tenés una base clara para medir resultados.",
  ],
  results: [
    "Sitio rápido y estable en desktop y mobile.",
    "SEO técnico listo desde el lanzamiento.",
    "Arquitectura clara para comunicar mejor la oferta.",
    "Base simple para administrar contenido y crecer.",
    "Medición conectada para tomar decisiones con datos.",
  ],
  deliverables: [
    "Diseño UI y UX alineado a tu servicio y a tu marca.",
    "Desarrollo con Next.js, React y TypeScript.",
    "SEO técnico: metadata, schema, sitemap y performance.",
    "CMS o capa de edición si el proyecto lo necesita.",
    "Soporte post lanzamiento para cerrar la puesta en marcha.",
  ],
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "Sanity o CMS equivalente",
    "Vercel o Cloudflare",
  ],
  process: [
    {
      step: "01 / Briefing",
      description: "Aterrizamos objetivo comercial, público y foco de conversión.",
    },
    {
      step: "02 / Estructura",
      description: "Definimos contenido, recorrido y mensajes por sección.",
    },
    {
      step: "03 / Diseño",
      description: "Construimos una interfaz clara, sobria y alineada al negocio.",
    },
    {
      step: "04 / Desarrollo",
      description: "Implementamos, optimizamos y dejamos el SEO técnico listo.",
    },
    {
      step: "05 / QA y salida",
      description: "Probamos, ajustamos y publicamos con una base mantenible.",
    },
  ],
  caseStudy: {
    client: "Porto Seguro",
    result:
      "Sitio inmobiliario con filtros en vivo y catálogo dinámico, construido para velocidad y claridad comercial.",
    category: "Inmobiliaria",
    services: ["UI/UX", "Next.js", "SEO técnico"],
  },
  faq: [
    {
      question: "¿Cuánto tarda un sitio web en Uruguay?",
      answer:
        "Un sitio corporativo suele resolverse en unas tres semanas. Si hay integraciones, múltiples plantillas o una lógica más compleja, el plazo se estira.",
    },
    {
      question: "¿El diseño está incluido?",
      answer:
        "Sí. No trabajamos solo la capa visual o solo el código. El proyecto se define de forma integral para que la experiencia y el mensaje funcionen juntos.",
    },
    {
      question: "¿Voy a poder editar contenido después?",
      answer:
        "Si el proyecto necesita autonomía editorial, dejamos un CMS o una capa de edición simple para que no dependas de nosotros en cambios básicos.",
    },
    {
      question: "¿Incluyen SEO?",
      answer:
        "Sí. El SEO técnico forma parte del desarrollo: metadata, structured data, sitemap, indexabilidad y performance.",
    },
    {
      question: "¿Qué pasa si hay cambios durante el proceso?",
      answer:
        "Los cambios chicos se acomodan dentro del flujo. Si cambia el alcance, se reestima para no romper tiempos ni calidad.",
    },
  ],
  cta: {
    primary: "Solicitar presupuesto web",
    secondary: "Ver proyectos web",
  },
  internalLinks: [
    { label: "Agencia Digital Uruguay", href: "/agencia-digital-uruguay" },
    { label: "E-commerce Uruguay", href: "/ecommerce-uruguay" },
    { label: "Automatizaciones Uruguay", href: "/automatizaciones-uruguay" },
  ],
}

export const ecommerceContent: ServicePageContent = {
  slug: "ecommerce-uruguay",
  targetQuery: "ecommerce uruguay",
  title: "E-commerce Uruguay | Tiendas Online para Vender Mejor",
  description:
    "Creamos tiendas online en Uruguay con foco en conversión, catálogo claro, pagos y una operación simple de mantener.",
  h1: "E-commerce Uruguay",
  hero: {
    eyebrow: "Tiendas online para crecer",
    title: "Tu tienda lista para vender con menos fricción",
    subtitle:
      "Armamos tu e-commerce con catálogo, cobros, envíos y una experiencia de compra pensada para generar confianza.",
  },
  problems: [
    "El checkout actual pierde ventas antes de cerrar la compra.",
    "Los medios de pago o la operación local no están bien resueltos.",
    "El catálogo es difícil de actualizar y mantener.",
    "Los correos de compra o seguimiento no acompañan al cliente.",
    "La tienda no está preparada para posicionar productos en Google.",
  ],
  results: [
    "Checkout más claro y orientado a conversión.",
    "Catálogo administrable y fácil de escalar.",
    "Pagos, envíos y automatismos básicos listos para operar.",
    "SEO técnico para colecciones y productos.",
    "Base estable para crecer sin rehacer todo más adelante.",
  ],
  deliverables: [
    "Tienda en Shopify, WooCommerce o desarrollo a medida según el caso.",
    "Configuración de catálogo, productos, variantes y stock.",
    "Integración de pagos y lógica de envío.",
    "Correos transaccionales y mensajes clave del proceso de compra.",
    "SEO técnico para indexación de productos y categorías.",
    "Soporte inicial para salida a producción.",
  ],
  stack: [
    "Shopify",
    "WooCommerce",
    "Medusa",
    "Mercado Pago",
    "Stripe",
    "Klaviyo o Mailchimp",
  ],
  process: [
    {
      step: "01 / Diagnóstico",
      description: "Entendemos producto, operación y objetivo de venta.",
    },
    {
      step: "02 / Plataforma",
      description: "Elegimos la tecnología más razonable para tu escala.",
    },
    {
      step: "03 / Experiencia",
      description: "Definimos recorrido de compra, mensajes y estructura del catálogo.",
    },
    {
      step: "04 / Implementación",
      description: "Configuramos pagos, envíos, SEO y automatismos esenciales.",
    },
    {
      step: "05 / Pruebas",
      description: "Validamos el flujo completo antes de lanzar la tienda.",
    },
    {
      step: "06 / Entrega",
      description: "Te dejamos una operación clara para publicar, vender y administrar.",
    },
  ],
  caseStudy: {
    client: "Papas Lokas",
    result:
      "Canal de venta online para gastronomía con menú digital y pedidos claros, pensado para simplificar la compra.",
      category: "Gastronomía",
    services: ["E-commerce", "UX", "Operativa digital"],
  },
  faq: [
    {
      question: "¿Qué plataforma conviene para una tienda online en Uruguay?",
      answer:
        "Depende del volumen, autonomía que necesitás y complejidad operativa. Shopify suele ser una gran opción para salir rápido; WooCommerce sirve bien en otros casos; y una solución a medida solo tiene sentido cuando la operación lo justifica.",
    },
    {
      question: "¿Pueden migrar una tienda existente?",
      answer:
        "Sí. Podemos mover catálogo, contenido y estructura esencial, cuidando no perder valor SEO ni operación en el proceso.",
    },
    {
      question: "¿Integran pagos y envíos?",
      answer:
        "Sí. Definimos la configuración necesaria según el negocio y la plataforma elegida, incluyendo cobros, costos de envío y comunicaciones clave.",
    },
    {
      question: "¿Cuánto cuesta una tienda online?",
      answer:
        "El costo depende de la plataforma, el catálogo, los automatismos y la complejidad operativa. Una tienda bien resuelta suele partir más arriba que una landing o un sitio corporativo.",
    },
    {
      question: "¿Incluyen SEO en la tienda?",
      answer:
        "Sí. Trabajamos metadata, estructura, indexación y base técnica para que productos y categorías tengan mejores condiciones de posicionamiento.",
    },
  ],
  cta: {
    primary: "Crear mi tienda online",
    secondary: "Ver casos de e-commerce",
  },
  internalLinks: [
    { label: "Agencia Digital Uruguay", href: "/agencia-digital-uruguay" },
    { label: "Desarrollo Web Uruguay", href: "/desarrollo-web-uruguay" },
    { label: "Automatizaciones Uruguay", href: "/automatizaciones-uruguay" },
  ],
}

export const automatizacionesContent: ServicePageContent = {
  slug: "automatizaciones-uruguay",
  targetQuery: "automatizaciones para negocios uruguay",
  title: "Automatizaciones Uruguay | Procesos Más Claros y Menos Trabajo Manual",
  description:
    "Conectamos herramientas, CRM, formularios, WhatsApp y email para que los procesos repetitivos sucedan solos y el equipo gane tiempo.",
  h1: "Automatizaciones Uruguay",
  hero: {
    eyebrow: "Operar mejor sin sumar caos",
    title: "Menos tareas manuales, más tiempo para crecer",
    subtitle:
      "Diseñamos automatizaciones para que leads, seguimientos y procesos operativos no dependan de copiar y pegar todo el día.",
  },
  problems: [
    "Los leads se pierden porque nadie responde a tiempo.",
    "El equipo repite tareas manuales que ya deberían estar resueltas.",
    "Las herramientas no se hablan entre sí y todo queda fragmentado.",
    "No hay trazabilidad clara después del primer contacto.",
    "El negocio depende demasiado de recordatorios manuales y planillas.",
  ],
  results: [
    "Leads procesados con más velocidad y menos fricción.",
    "CRM actualizado automáticamente.",
    "Seguimientos consistentes sin depender de memoria humana.",
    "Reportes y alertas simples para ordenar la operación.",
    "Menos trabajo manual y más tiempo para tareas de valor.",
  ],
  deliverables: [
    "Diagnóstico de procesos y puntos de fricción.",
    "Diseño de flujos en Make, Zapier o n8n.",
    "Integración con CRM, formularios, email y mensajería.",
    "Documentación básica de lo implementado.",
    "Testing y puesta en marcha con casos reales.",
    "Soporte inicial para estabilizar la operación.",
  ],
  stack: [
    "Make",
    "Zapier",
    "n8n",
    "HubSpot",
    "Pipedrive",
    "WhatsApp Business API",
  ],
  process: [
    {
      step: "01 / Mapeo",
      description: "Documentamos qué pasa hoy y dónde se pierde tiempo.",
    },
    {
      step: "02 / Priorización",
      description: "Elegimos los flujos con mejor impacto en venta u operación.",
    },
    {
      step: "03 / Diseño",
      description: "Definimos la lógica de automatización y sus reglas.",
    },
    {
      step: "04 / Implementación",
      description: "Construimos integraciones y secuencias en la herramienta adecuada.",
    },
    {
      step: "05 / Testing",
      description: "Probamos escenarios reales antes de activar los flujos.",
    },
    {
      step: "06 / Transferencia",
      description: "Te dejamos visibilidad sobre cómo funciona y cómo mantenerlo.",
    },
  ],
  caseStudy: {
    client: "Smile Leslieville",
    result:
      "Sistema de turnos y seguimiento automatizado para reducir trabajo manual y ordenar la atención.",
    category: "Salud",
    services: ["Automatizaciones", "WhatsApp", "CRM"],
  },
  faq: [
    {
      question: "¿Qué es una automatización en este contexto?",
      answer:
        "Es conectar herramientas y pasos operativos para que ciertas tareas ocurran solas, con reglas claras y menos intervención manual.",
    },
    {
      question: "¿Cuánto cuesta automatizar un negocio?",
      answer:
        "Depende de la cantidad de flujos, integraciones y excepciones. Hay automatizaciones puntuales y otras que ordenan toda la operación comercial.",
    },
    {
      question: "¿Trabajan con herramientas ya existentes?",
      answer:
        "Sí. Siempre priorizamos usar bien el stack actual antes de proponer cambios innecesarios.",
    },
    {
      question: "¿Esto sirve también para WhatsApp?",
      answer:
        "Sí. Podemos conectar formularios, CRM, email y WhatsApp para mejorar velocidad de respuesta y seguimiento.",
    },
    {
      question: "¿Qué pasa si después cambian mis procesos?",
      answer:
        "Los flujos se pueden ajustar. Lo importante es dejarlos bien documentados y con una lógica simple desde el inicio.",
    },
  ],
  cta: {
    primary: "Automatizar mi negocio",
    secondary: "Ver casos de automatización",
  },
  internalLinks: [
    { label: "Agencia Digital Uruguay", href: "/agencia-digital-uruguay" },
    { label: "Desarrollo Web Uruguay", href: "/desarrollo-web-uruguay" },
    { label: "E-commerce Uruguay", href: "/ecommerce-uruguay" },
  ],
}

export const desarrolloWebLatamContent: ServicePageContent = {
  ...desarrolloWebContent,
  slug: "desarrollo-web-latam",
  targetQuery: "desarrollo web latam",
  title: "Desarrollo Web LATAM | Sitios Rápidos para Pymes Regionales",
  description:
    "Creamos sitios web para pymes en LATAM con Next.js, SEO técnico, performance y foco en conversión mobile.",
  h1: "Desarrollo Web LATAM",
  hero: {
    eyebrow: "Webs para mercados regionales",
    title: "Sitios rápidos para vender mejor en LATAM",
    subtitle:
      "Diseñamos y desarrollamos presencia digital para equipos que necesitan captar demanda, explicar mejor su oferta y medir resultados en la región.",
  },
  problems: [
    "Tu sitio no comunica bien para distintos mercados de LATAM.",
    "La carga mobile frena consultas antes de que el usuario entienda la oferta.",
    "No hay estructura SEO para campañas, servicios y países objetivo.",
    "Los formularios y canales de contacto no están conectados al proceso comercial.",
    "Cada mejora técnica depende de rehacer partes grandes del sitio.",
  ],
  results: [
    "Sitio rápido, claro y preparado para tráfico mobile regional.",
    "Arquitectura escalable para sumar landings, países y servicios.",
    "SEO técnico e indexabilidad listos desde el lanzamiento.",
    "Mensajes orientados a confianza, conversión y contacto.",
    "Medición conectada para comparar campañas y consultas por mercado.",
  ],
  cta: {
    primary: "Cotizar desarrollo web LATAM",
    secondary: "Ver servicios LATAM",
  },
  internalLinks: [
    { label: "Agencia Digital LATAM", href: "/agencia-digital-latam" },
    { label: "E-commerce LATAM", href: "/ecommerce-latam" },
    { label: "Automatizaciones LATAM", href: "/automatizaciones-latam" },
    { label: "Desarrollo Web Uruguay", href: "/desarrollo-web-uruguay" },
  ],
}

export const ecommerceLatamContent: ServicePageContent = {
  ...ecommerceContent,
  slug: "ecommerce-latam",
  targetQuery: "ecommerce latam",
  title: "E-commerce LATAM | Tiendas Online para Vender en la Región",
  description:
    "Creamos e-commerce para LATAM con catálogo claro, pagos, envíos, automatizaciones y experiencia de compra orientada a conversión.",
  h1: "E-commerce LATAM",
  hero: {
    eyebrow: "Tiendas online regionales",
    title: "Tu tienda preparada para vender en LATAM",
    subtitle:
      "Armamos e-commerce con base operativa clara para vender por país, ordenar catálogo y automatizar comunicaciones de compra.",
  },
  problems: [
    "La tienda no está preparada para operar con diferentes medios de pago o mercados.",
    "El catálogo crece sin estructura y cuesta encontrar productos clave.",
    "La experiencia mobile pierde ventas en pasos críticos.",
    "No hay base SEO para categorías, productos y campañas regionales.",
    "El seguimiento postcompra depende de tareas manuales.",
  ],
  results: [
    "Tienda online con recorrido de compra más claro.",
    "Catálogo y categorías preparados para escalar.",
    "Integraciones razonables para pagos, envíos y comunicaciones.",
    "SEO técnico para productos, colecciones y páginas comerciales.",
    "Automatismos iniciales para seguimiento y recuperación de oportunidades.",
  ],
  cta: {
    primary: "Cotizar e-commerce LATAM",
    secondary: "Ver servicios regionales",
  },
  internalLinks: [
    { label: "Agencia Digital LATAM", href: "/agencia-digital-latam" },
    { label: "Desarrollo Web LATAM", href: "/desarrollo-web-latam" },
    { label: "Automatizaciones LATAM", href: "/automatizaciones-latam" },
    { label: "E-commerce Uruguay", href: "/ecommerce-uruguay" },
  ],
}

export const automatizacionesLatamContent: ServicePageContent = {
  ...automatizacionesContent,
  slug: "automatizaciones-latam",
  targetQuery: "automatizaciones latam",
  title: "Automatizaciones LATAM | CRM, WhatsApp y Procesos Comerciales",
  description:
    "Diseñamos automatizaciones para equipos en LATAM: CRM, WhatsApp, formularios, email, reportes y seguimiento comercial.",
  h1: "Automatizaciones LATAM",
  hero: {
    eyebrow: "Procesos regionales sin caos",
    title: "Automatizaciones para equipos que venden en LATAM",
    subtitle:
      "Conectamos formularios, CRM, WhatsApp, email y reportes para que los leads avancen sin depender de copiar y pegar.",
  },
  problems: [
    "Los leads llegan desde varios canales y se pierden en planillas o chats.",
    "El seguimiento cambia según persona, país o herramienta.",
    "El equipo repite tareas manuales que deberían estar conectadas.",
    "No hay trazabilidad comercial para saber qué canal funciona mejor.",
    "WhatsApp, email y CRM no trabajan como un sistema único.",
  ],
  results: [
    "Leads centralizados y asignados con reglas claras.",
    "Seguimientos automáticos por canal y etapa comercial.",
    "CRM actualizado sin carga manual constante.",
    "Alertas y reportes para entender performance regional.",
    "Menos fricción operativa para equipos remotos o distribuidos.",
  ],
  cta: {
    primary: "Cotizar automatización LATAM",
    secondary: "Ver servicios regionales",
  },
  internalLinks: [
    { label: "Agencia Digital LATAM", href: "/agencia-digital-latam" },
    { label: "Desarrollo Web LATAM", href: "/desarrollo-web-latam" },
    { label: "E-commerce LATAM", href: "/ecommerce-latam" },
    { label: "Automatizaciones Uruguay", href: "/automatizaciones-uruguay" },
  ],
}

export const uruUruguayPagesContent = {
  hub: hubUruguayContent,
  desarrolloWeb: desarrolloWebContent,
  ecommerce: ecommerceContent,
  automatizaciones: automatizacionesContent,
} as const

export const latamPagesContent = {
  hub: hubLatamContent,
  desarrolloWeb: desarrolloWebLatamContent,
  ecommerce: ecommerceLatamContent,
  automatizaciones: automatizacionesLatamContent,
} as const

export type UruguayPageSlug = keyof typeof uruUruguayPagesContent

export function getUruguayPageContent(slug: UruguayPageSlug) {
  return uruUruguayPagesContent[slug]
}

export function getAllUruguayPages() {
  return Object.values(uruUruguayPagesContent)
}
