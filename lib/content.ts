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
      "Creamos presencia digital para pymes uruguayas: sitios web rapidos, tiendas online que venden y automatizaciones que ahorran tiempo.",
  },
  services: [
    {
      title: "Desarrollo Web Uruguay",
      description: "Sitios corporativos, landing pages y productos web con SEO tecnico incluido.",
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
  whyUruguay: [
    "Atencion en horario Uruguay y reuniones claras desde el inicio.",
    "Entendemos los tiempos, expectativas y realidad de las pymes locales.",
    "Trabajamos con pagos, envios y operaciones habituales de la region.",
    "Priorizamos entregas rapidas sin perder calidad tecnica.",
    "El soporte es en espanol y con una sola persona responsable del proyecto.",
  ],
  process: [
    {
      step: "01 / Diagnostico",
      description:
        "Analizamos el negocio, la competencia y el punto mas importante para vender mejor.",
    },
    {
      step: "02 / Propuesta",
      description:
        "Definimos alcance, tiempos, entregables y presupuesto con una propuesta cerrada.",
    },
    {
      step: "03 / Diseno",
      description:
        "Trabajamos estructura, mensajes y visual para que la experiencia tenga foco comercial.",
    },
    {
      step: "04 / Desarrollo",
      description:
        "Implementamos con buena base tecnica, performance y SEO esencial desde el inicio.",
    },
    {
      step: "05 / Lanzamiento",
      description:
        "Publicamos, conectamos medicion y dejamos el proyecto listo para operar sin friccion.",
    },
  ],
  cases: [
    {
      client: "Porto Seguro",
      result: "Sitio inmobiliario con filtros dinamicos y catalogo administrable.",
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
      question: "Trabajan solo con empresas de Uruguay?",
      answer:
        "No. El foco comercial de esta etapa es Uruguay, pero tambien trabajamos con equipos de la region cuando el proyecto encaja bien.",
    },
    {
      question: "Cuanto cuesta un proyecto digital en Uruguay?",
      answer:
        "Depende del alcance. Un sitio corporativo suele partir desde USD 1.500, una tienda online desde USD 2.500 y una capa de automatizaciones depende del flujo a resolver.",
    },
    {
      question: "Que plazos manejan?",
      answer:
        "Un sitio corporativo puede resolverse en unas tres semanas. Proyectos mas complejos, tiendas online o integraciones avanzadas pueden requerir entre cuatro y seis semanas.",
    },
    {
      question: "Como es el esquema de pago?",
      answer:
        "Normalmente trabajamos con un anticipo para iniciar y un saldo contra entrega o hitos definidos en la propuesta.",
    },
    {
      question: "Incluyen soporte despues del lanzamiento?",
      answer:
        "Si. Todos los proyectos incluyen una ventana inicial de soporte y despues podemos seguir con mantenimiento o mejoras evolutivas.",
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

export const desarrolloWebContent: ServicePageContent = {
  slug: "desarrollo-web-uruguay",
  targetQuery: "desarrollo web uruguay",
  title: "Desarrollo Web Uruguay | Sitios Rapidos y Visibles en Google",
  description:
    "Creamos sitios web en Uruguay con Next.js, SEO tecnico y foco en conversion. Proyectos claros, rapidos y faciles de mantener.",
  h1: "Desarrollo Web Uruguay",
  hero: {
    eyebrow: "Sitios web para vender mejor",
    title: "Sitios que se ven bien y trabajan por vos",
    subtitle:
      "Disenamos y desarrollamos tu presencia digital para que cargue rapido, comunique mejor y convierta visitas en consultas.",
  },
  problems: [
    "Tu sitio actual carga lento y pierde visitas antes de mostrar valor.",
    "No apareces en Google cuando alguien busca tus servicios.",
    "Cada cambio depende de un tercero y te frena.",
    "La experiencia en celular no acompana la compra ni la consulta.",
    "No tenes una base clara para medir resultados.",
  ],
  results: [
    "Sitio rapido y estable en desktop y mobile.",
    "SEO tecnico listo desde el lanzamiento.",
    "Arquitectura clara para comunicar mejor la oferta.",
    "Base simple para administrar contenido y crecer.",
    "Medicion conectada para tomar decisiones con datos.",
  ],
  deliverables: [
    "Diseno UI y UX alineado a tu servicio y a tu marca.",
    "Desarrollo con Next.js, React y TypeScript.",
    "SEO tecnico: metadata, schema, sitemap y performance.",
    "CMS o capa de edicion si el proyecto lo necesita.",
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
      description: "Aterrizamos objetivo comercial, publico y foco de conversion.",
    },
    {
      step: "02 / Estructura",
      description: "Definimos contenido, recorrido y mensajes por seccion.",
    },
    {
      step: "03 / Diseno",
      description: "Construimos una interfaz clara, sobria y alineada al negocio.",
    },
    {
      step: "04 / Desarrollo",
      description: "Implementamos, optimizamos y dejamos el SEO tecnico listo.",
    },
    {
      step: "05 / QA y salida",
      description: "Probamos, ajustamos y publicamos con una base mantenible.",
    },
  ],
  caseStudy: {
    client: "Porto Seguro",
    result:
      "Sitio inmobiliario con filtros en vivo y catalogo dinamico, construido para velocidad y claridad comercial.",
    category: "Inmobiliaria",
    services: ["UI/UX", "Next.js", "SEO tecnico"],
  },
  faq: [
    {
      question: "Cuanto tarda un sitio web en Uruguay?",
      answer:
        "Un sitio corporativo suele resolverse en unas tres semanas. Si hay integraciones, multiples plantillas o una logica mas compleja, el plazo se estira.",
    },
    {
      question: "El diseno esta incluido?",
      answer:
        "Si. No trabajamos solo la capa visual o solo el codigo. El proyecto se define de forma integral para que la experiencia y el mensaje funcionen juntos.",
    },
    {
      question: "Voy a poder editar contenido despues?",
      answer:
        "Si el proyecto necesita autonomia editorial, dejamos un CMS o una capa de edicion simple para que no dependas de nosotros en cambios basicos.",
    },
    {
      question: "Incluyen SEO?",
      answer:
        "Si. El SEO tecnico forma parte del desarrollo: metadata, structured data, sitemap, indexabilidad y performance.",
    },
    {
      question: "Que pasa si hay cambios durante el proceso?",
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
    "Creamos tiendas online en Uruguay con foco en conversion, catalogo claro, pagos y una operacion simple de mantener.",
  h1: "E-commerce Uruguay",
  hero: {
    eyebrow: "Tiendas online para crecer",
    title: "Tu tienda lista para vender con menos friccion",
    subtitle:
      "Armamos tu e-commerce con catalogo, cobros, envios y una experiencia de compra pensada para generar confianza.",
  },
  problems: [
    "El checkout actual pierde ventas antes de cerrar la compra.",
    "Los medios de pago o la operacion local no estan bien resueltos.",
    "El catalogo es dificil de actualizar y mantener.",
    "Los correos de compra o seguimiento no acompanian al cliente.",
    "La tienda no esta preparada para posicionar productos en Google.",
  ],
  results: [
    "Checkout mas claro y orientado a conversion.",
    "Catalogo administrable y facil de escalar.",
    "Pagos, envios y automatismos basicos listos para operar.",
    "SEO tecnico para colecciones y productos.",
    "Base estable para crecer sin rehacer todo mas adelante.",
  ],
  deliverables: [
    "Tienda en Shopify, WooCommerce o desarrollo a medida segun el caso.",
    "Configuracion de catalogo, productos, variantes y stock.",
    "Integracion de pagos y logica de envio.",
    "Correos transaccionales y mensajes clave del proceso de compra.",
    "SEO tecnico para indexacion de productos y categorias.",
    "Soporte inicial para salida a produccion.",
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
      step: "01 / Diagnostico",
      description: "Entendemos producto, operacion y objetivo de venta.",
    },
    {
      step: "02 / Plataforma",
      description: "Elegimos la tecnologia mas razonable para tu escala.",
    },
    {
      step: "03 / Experiencia",
      description: "Definimos recorrido de compra, mensajes y estructura del catalogo.",
    },
    {
      step: "04 / Implementacion",
      description: "Configuramos pagos, envios, SEO y automatismos esenciales.",
    },
    {
      step: "05 / Pruebas",
      description: "Validamos el flujo completo antes de lanzar la tienda.",
    },
    {
      step: "06 / Entrega",
      description: "Te dejamos una operacion clara para publicar, vender y administrar.",
    },
  ],
  caseStudy: {
    client: "Papas Lokas",
    result:
      "Canal de venta online para gastronomia con menu digital y pedidos claros, pensado para simplificar la compra.",
    category: "Gastronomia",
    services: ["E-commerce", "UX", "Operativa digital"],
  },
  faq: [
    {
      question: "Que plataforma conviene para una tienda online en Uruguay?",
      answer:
        "Depende del volumen, autonomia que necesitas y complejidad operativa. Shopify suele ser una gran opcion para salir rapido; WooCommerce sirve bien en otros casos; y una solucion a medida solo tiene sentido cuando la operacion lo justifica.",
    },
    {
      question: "Pueden migrar una tienda existente?",
      answer:
        "Si. Podemos mover catalogo, contenido y estructura esencial, cuidando no perder valor SEO ni operacion en el proceso.",
    },
    {
      question: "Integran pagos y envios?",
      answer:
        "Si. Definimos la configuracion necesaria segun el negocio y la plataforma elegida, incluyendo cobros, costos de envio y comunicaciones clave.",
    },
    {
      question: "Cuanto cuesta una tienda online?",
      answer:
        "El costo depende de la plataforma, el catalogo, los automatismos y la complejidad operativa. Una tienda bien resuelta suele partir mas arriba que una landing o un sitio corporativo.",
    },
    {
      question: "Incluyen SEO en la tienda?",
      answer:
        "Si. Trabajamos metadata, estructura, indexacion y base tecnica para que productos y categorias tengan mejores condiciones de posicionamiento.",
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
  title: "Automatizaciones Uruguay | Procesos Mas Claros y Menos Trabajo Manual",
  description:
    "Conectamos herramientas, CRM, formularios, WhatsApp y email para que los procesos repetitivos sucedan solos y el equipo gane tiempo.",
  h1: "Automatizaciones Uruguay",
  hero: {
    eyebrow: "Operar mejor sin sumar caos",
    title: "Menos tareas manuales, mas tiempo para crecer",
    subtitle:
      "Disenamos automatizaciones para que leads, seguimientos y procesos operativos no dependan de copiar y pegar todo el dia.",
  },
  problems: [
    "Los leads se pierden porque nadie responde a tiempo.",
    "El equipo repite tareas manuales que ya deberian estar resueltas.",
    "Las herramientas no se hablan entre si y todo queda fragmentado.",
    "No hay trazabilidad clara despues del primer contacto.",
    "El negocio depende demasiado de recordatorios manuales y planillas.",
  ],
  results: [
    "Leads procesados con mas velocidad y menos friccion.",
    "CRM actualizado automaticamente.",
    "Seguimientos consistentes sin depender de memoria humana.",
    "Reportes y alertas simples para ordenar la operacion.",
    "Menos trabajo manual y mas tiempo para tareas de valor.",
  ],
  deliverables: [
    "Diagnostico de procesos y puntos de friccion.",
    "Diseno de flujos en Make, Zapier o n8n.",
    "Integracion con CRM, formularios, email y mensajeria.",
    "Documentacion basica de lo implementado.",
    "Testing y puesta en marcha con casos reales.",
    "Soporte inicial para estabilizar la operacion.",
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
      description: "Documentamos que pasa hoy y donde se pierde tiempo.",
    },
    {
      step: "02 / Priorizacion",
      description: "Elegimos los flujos con mejor impacto en venta u operacion.",
    },
    {
      step: "03 / Diseno",
      description: "Definimos la logica de automatizacion y sus reglas.",
    },
    {
      step: "04 / Implementacion",
      description: "Construimos integraciones y secuencias en la herramienta adecuada.",
    },
    {
      step: "05 / Testing",
      description: "Probamos escenarios reales antes de activar los flujos.",
    },
    {
      step: "06 / Transferencia",
      description: "Te dejamos visibilidad sobre como funciona y como mantenerlo.",
    },
  ],
  caseStudy: {
    client: "Smile Leslieville",
    result:
      "Sistema de turnos y seguimiento automatizado para reducir trabajo manual y ordenar la atencion.",
    category: "Salud",
    services: ["Automatizaciones", "WhatsApp", "CRM"],
  },
  faq: [
    {
      question: "Que es una automatizacion en este contexto?",
      answer:
        "Es conectar herramientas y pasos operativos para que ciertas tareas ocurran solas, con reglas claras y menos intervencion manual.",
    },
    {
      question: "Cuanto cuesta automatizar un negocio?",
      answer:
        "Depende de la cantidad de flujos, integraciones y excepciones. Hay automatizaciones puntuales y otras que ordenan toda la operacion comercial.",
    },
    {
      question: "Trabajan con herramientas ya existentes?",
      answer:
        "Si. Siempre priorizamos usar bien el stack actual antes de proponer cambios innecesarios.",
    },
    {
      question: "Esto sirve tambien para WhatsApp?",
      answer:
        "Si. Podemos conectar formularios, CRM, email y WhatsApp para mejorar velocidad de respuesta y seguimiento.",
    },
    {
      question: "Que pasa si despues cambian mis procesos?",
      answer:
        "Los flujos se pueden ajustar. Lo importante es dejarlos bien documentados y con una logica simple desde el inicio.",
    },
  ],
  cta: {
    primary: "Automatizar mi negocio",
    secondary: "Ver casos de automatizacion",
  },
  internalLinks: [
    { label: "Agencia Digital Uruguay", href: "/agencia-digital-uruguay" },
    { label: "Desarrollo Web Uruguay", href: "/desarrollo-web-uruguay" },
    { label: "E-commerce Uruguay", href: "/ecommerce-uruguay" },
  ],
}

export const uruUruguayPagesContent = {
  hub: hubUruguayContent,
  desarrolloWeb: desarrolloWebContent,
  ecommerce: ecommerceContent,
  automatizaciones: automatizacionesContent,
} as const

export type UruguayPageSlug = keyof typeof uruUruguayPagesContent

export function getUruguayPageContent(slug: UruguayPageSlug) {
  return uruUruguayPagesContent[slug]
}

export function getAllUruguayPages() {
  return Object.values(uruUruguayPagesContent)
}
