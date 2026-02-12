export const translations = {
  en: {
    // Hero
    hero: {
      headline: "I build things that are",
      words: ["scalable", "intelligent", "intuitive", "AI-powered", "high-performance"],
      mobileWords: ["scalable", "intelligent", "intuitive", "AI-powered"],
      wordsSuffix: "",
      description:
        "Stop building at yesterday's speed. I combine full-stack engineering with AI-native workflows to ship high-end SaaS solutions and complex data tools faster than ever.",
      viewWork: "View my work",
      letsTalk: "Let's talk",
    },
    // Navbar
    nav: {
      projects: "Projects",
      about: "About",
      getInTouch: "Get in Touch",
    },
    // Tech Stack
    techStack: {
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "PostgreSQL",
        "Mistral AI",
        "Framer Motion",
        "Node.js",
        "React",
        "Vercel",
        "PostGIS",
        "Claude AI",
      ],
    },
    // Featured Projects
    projects: {
      title: "Featured Projects",
      subtitle:
        "Recent work showcasing full-stack development with AI integration and complex data systems.",
      viewCaseStudy: "View Case Study",
      items: [
        {
          slug: "b2b-saas-platform",
          title: "B2B SaaS Platform",
          description:
            "AI-powered analytics dashboard built with serverless architecture. Integrates Mistral AI for intelligent data processing and Supabase for real-time database operations.",
          techStack: ["Next.js", "TypeScript", "Supabase", "Mistral AI", "Tailwind"],
        },
        {
          slug: "adhoc-selectietool",
          title: "Ad Hoc Data Selectietool",
          description:
            "Refactored and modernized the selection tool for Ad Hoc Data, a leading B2B data provider in the Netherlands and Belgium with 1.2M+ Belgian companies in their database. Added geographic search using GeoJSON polygons, enabling users to find companies within provinces, arrondissements, or postal code areas.",
          techStack: ["JavaScript", "Angular", "GeoJSON", "LESS", "Legacy Integration"],
        },
      ],
    },
    // AI Workflow
    workflow: {
      badge: "AI-Native Development",
      title: "Building with High Velocity: AI-Native Workflow",
      description:
        "I leverage Claude Code directly in my terminal to accelerate development without sacrificing code quality. By offloading the boilerplate to AI, I maintain my focus on high-level architecture and system design. This AI-native approach allows me to tackle complex logic and ship production-ready features at a pace that traditional workflows can't match.",
      terminalTitle: "Terminal-First Workflow",
      terminalDescription:
        "Claude Code integrated directly into my development environment for seamless AI assistance.",
      rapidTitle: "Rapid Iteration",
      rapidDescription:
        "From concept to production-ready code in hours, not days. Complex features shipped faster.",
    },
    // Footer
    footer: {
      title: "Let's Build Something Together",
      subtitle:
        "Looking for an AI-native developer who ships fast and builds to last? Let's talk about your next project.",
      getInTouch: "Get in Touch",
      viewGitHub: "View GitHub",
    },
  },
  nl: {
    // Hero
    hero: {
      headline: "Ik bouw software die",
      words: ["schaalbaar", "intelligent", "intuïtief", "AI-powered", "high-performance"],
      mobileWords: ["schaalbaar", "intelligent", "intuïtief", "AI-powered"],
      wordsSuffix: " is",
      description:
        "Stop met bouwen op het tempo van gisteren. Ik combineer full-stack engineering met AI-native workflows om high-end SaaS-oplossingen en complexe datatools sneller dan ooit te leveren.",
      viewWork: "Bekijk mijn werk",
      letsTalk: "Neem contact op",
    },
    // Navbar
    nav: {
      projects: "Projecten",
      about: "Over mij",
      getInTouch: "Contact",
    },
    // Tech Stack
    techStack: {
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "PostgreSQL",
        "Mistral AI",
        "Framer Motion",
        "Node.js",
        "React",
        "Vercel",
        "PostGIS",
        "Claude AI",
      ],
    },
    // Featured Projects
    projects: {
      title: "Uitgelichte Projecten",
      subtitle:
        "Recent werk dat full-stack development met AI-integratie en complexe datasystemen laat zien.",
      viewCaseStudy: "Bekijk Case Study",
      items: [
        {
          slug: "b2b-saas-platform",
          title: "B2B SaaS Platform",
          description:
            "AI-aangedreven analytics dashboard gebouwd met serverless architectuur. Integreert Mistral AI voor intelligente dataverwerking en Supabase voor real-time database operaties.",
          techStack: ["Next.js", "TypeScript", "Supabase", "Mistral AI", "Tailwind"],
        },
        {
          slug: "adhoc-selectietool",
          title: "Ad Hoc Data Selectietool",
          description:
            "De selectietool van Ad Hoc Data gerefactored en gemoderniseerd. Ad Hoc Data is een toonaangevende B2B dataleverancier in Nederland en België met 1,2M+ Belgische bedrijven in hun database. Geografisch zoeken toegevoegd met GeoJSON polygons voor het vinden van bedrijven binnen provincies, arrondissementen of postcodegebieden.",
          techStack: ["JavaScript", "Angular", "GeoJSON", "LESS", "Legacy Integration"],
        },
      ],
    },
    // AI Workflow
    workflow: {
      badge: "AI-Native Development",
      title: "Bouwen met High Velocity: AI-Native Workflow",
      description:
        "Ik gebruik Claude Code direct in mijn terminal om ontwikkeling te versnellen zonder in te leveren op codekwaliteit. Door boilerplate aan AI over te laten, blijf ik gefocust op high-level architectuur en systeemontwerp. Deze AI-native aanpak stelt me in staat om complexe logica aan te pakken en productie-klare features te leveren in een tempo dat traditionele workflows niet kunnen evenaren.",
      terminalTitle: "Terminal-First Workflow",
      terminalDescription:
        "Claude Code direct geïntegreerd in mijn ontwikkelomgeving voor naadloze AI-assistentie.",
      rapidTitle: "Snelle Iteratie",
      rapidDescription:
        "Van concept naar productie-klare code in uren, niet dagen. Complexe features sneller geleverd.",
    },
    // Footer
    footer: {
      title: "Laten We Samen Iets Bouwen",
      subtitle:
        "Op zoek naar een AI-native developer die snel levert en bouwt voor de lange termijn? Laten we praten over je volgende project.",
      getInTouch: "Neem Contact Op",
      viewGitHub: "Bekijk GitHub",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type Translations = typeof translations.en;
