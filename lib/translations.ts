export const translations = {
  en: {
    // Hero
    hero: {
      headline: "I build things that are",
      words: ["scalable", "intelligent", "intuitive", "AI-powered", "different", "faster"],
      mobileWords: ["scalable", "intelligent", "intuitive", "different", "faster"],
      wordsSuffix: "",
      description:
        "Stop building at yesterday's speed. I combine full-stack engineering with AI-native workflows to ship high-end SaaS solutions and complex data tools faster than ever.",
      viewWork: "View my work",
      viewWorkMobile: "View my work",
      letsTalk: "Let's talk",
      letsTalkMobile: "Let's talk",
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
        "React",
        "Tailwind CSS",
        "Supabase",
        "PostgreSQL",
        "AWS",
        "CloudFront",
        "Python",
        "FastAPI",
        "Angular",
        "SvelteKit",
        "Mistral AI",
        "Gemini",
        "Claude Code",
        "Edge Functions",
        "Node.js",
        "Playwright",
        "Turf.js",
        "Leaflet",
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
          slug: "refundely",
          title: "Refundely",
          description:
            "AI-powered invoice management and SEPA payment platform for the European rental industry. Uses Mistral AI with intelligent model fallback: starts with a small model, validates quality, and escalates to larger models only when needed. IBANs are encrypted with AES-256-GCM, and serverless edge functions handle OCR and data extraction.",
          techStack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Mistral AI", "Edge Functions", "AES-256-GCM"],
        },
        {
          slug: "adhoc-platform",
          title: "Ad Hoc Data Platform",
          description:
            "Complete rebuild of Ad Hoc Data's web platform across three refactor iterations: from legacy AngularJS to Angular 21 SSR, including a dual-database selection tool — KVK Pro (3.7M Dutch companies) and AI Leads (3.4M web-indexed companies across four countries) — with live record counts, 3,800+ technology filters, and dual export.",
          techStack: ["Angular 21", "SSR", "TypeScript", "PostgreSQL", "Drizzle", "GeoJSON", "Playwright"],
        },
        {
          slug: "webmodern-platform",
          title: "WebModern Platform",
          description:
            "Multi-tenant CMS that lets non-technical business owners edit their custom websites. Built on a security-hardened AWS media pipeline: a fully private S3 bucket behind CloudFront Origin Access Control, presigned browser uploads, and least-privilege IAM — all defined as code with AWS CDK. A published npm SDK keeps every forked client site compatible.",
          techStack: ["Next.js", "TypeScript", "AWS CDK", "S3", "CloudFront", "Supabase", "Drizzle"],
        },
        {
          slug: "contenttool",
          title: "ContentTool",
          description:
            "Agentic AI content engine built for Ad Hoc Data's marketing: a daily GitHub Actions pipeline scrapes industry sources, scores inspiration with Gemini, matches it against CBS open-data statistics, and drafts a full content calendar — three social posts a week, a weekly blog, and a monthly newsletter.",
          techStack: ["Python", "FastAPI", "SvelteKit", "TypeScript", "Gemini", "GitHub Actions"],
        },
        {
          slug: "leadhub",
          title: "LeadHub",
          description:
            "My personal AI command center: an agent platform running 48+ Supabase Edge Functions with multi-provider AI (Gemini, Claude, Mistral, OpenAI), RAG knowledge bases on pgvector, a HubSpot OAuth2 app, and an analytics cockpit. Its public face is the Justin AI chat widget — running live on this site right now.",
          techStack: ["React", "TypeScript", "Supabase", "Edge Functions", "pgvector", "Stripe", "HubSpot"],
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
      agentsTitle: "AI Agents & Automation",
      agentsDescription:
        "AI agents and pg_cron jobs handle the repetitive work automatically — from lead qualification in CrewVee CRM to nightly data pipelines running in the background.",
      rapidTitle: "Rapid Iteration",
      rapidDescription:
        "From concept to production-ready code in hours, not days. Complex features shipped faster.",
    },
    // Footer
    footer: {
      title: "Let's Talk About Our Next Project",
      subtitle:
        "Looking for an AI-native developer who ships fast and builds to last?",
      getInTouch: "Get in Touch",
      viewGitHub: "View GitHub",
    },
  },
  nl: {
    // Hero
    hero: {
      headline: "Ik bouw",
      words: ["schaalbaar", "intelligent", "intuïtief", "AI-powered", "anders", "sneller"],
      mobileWords: ["schaalbaar", "intelligent", "intuïtief", "anders", "sneller"],
      wordsSuffix: "",
      description:
        "Stop met bouwen op het tempo van gisteren. Ik combineer full-stack engineering met AI-native workflows om high-end SaaS-oplossingen en complexe datatools sneller dan ooit te leveren.",
      viewWork: "Bekijk mijn werk",
      viewWorkMobile: "Projecten",
      letsTalk: "Neem contact op",
      letsTalkMobile: "Contact",
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
        "React",
        "Tailwind CSS",
        "Supabase",
        "PostgreSQL",
        "AWS",
        "CloudFront",
        "Python",
        "FastAPI",
        "Angular",
        "SvelteKit",
        "Mistral AI",
        "Gemini",
        "Claude Code",
        "Edge Functions",
        "Node.js",
        "Playwright",
        "Turf.js",
        "Leaflet",
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
          slug: "refundely",
          title: "Refundely",
          description:
            "AI-aangedreven factuurbeheer en SEPA-betalingsplatform voor de Europese verhuursector. Gebruikt Mistral AI met slimme model-fallback: start goedkoop, valideert kwaliteit, en escaleert alleen wanneer nodig. IBANs worden versleuteld met AES-256-GCM, en serverless edge functions voor OCR en data-extractie.",
          techStack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Mistral AI", "Edge Functions", "AES-256-GCM"],
        },
        {
          slug: "adhoc-platform",
          title: "Ad Hoc Data Platform",
          description:
            "Complete rebuild van het webplatform van Ad Hoc Data in drie refactor-iteraties: van legacy AngularJS naar Angular 21 SSR, inclusief een dual-database selectietool — KVK Pro (3,7M Nederlandse bedrijven) en AI Leads (3,4M web-geïndexeerde bedrijven in vier landen) — met live aantallen, 3.800+ technologiefilters en dual export.",
          techStack: ["Angular 21", "SSR", "TypeScript", "PostgreSQL", "Drizzle", "GeoJSON", "Playwright"],
        },
        {
          slug: "webmodern-platform",
          title: "WebModern Platform",
          description:
            "Multi-tenant CMS waarmee niet-technische ondernemers hun op maat gemaakte website zelf bewerken. Gebouwd op een security-hardened AWS media pipeline: een volledig private S3-bucket achter CloudFront Origin Access Control, presigned browser-uploads en least-privilege IAM — volledig als code gedefinieerd met AWS CDK. Een gepubliceerde npm SDK houdt elke geforkte klantsite compatibel.",
          techStack: ["Next.js", "TypeScript", "AWS CDK", "S3", "CloudFront", "Supabase", "Drizzle"],
        },
        {
          slug: "contenttool",
          title: "ContentTool",
          description:
            "Agentic AI content engine gebouwd voor de marketing van Ad Hoc Data: een dagelijkse GitHub Actions pipeline scrapet industriebronnen, scoort inspiratie met Gemini, matcht met CBS open data, en vult een complete contentkalender — drie social posts per week, een wekelijkse blog en een maandelijkse nieuwsbrief.",
          techStack: ["Python", "FastAPI", "SvelteKit", "TypeScript", "Gemini", "GitHub Actions"],
        },
        {
          slug: "leadhub",
          title: "LeadHub",
          description:
            "Mijn persoonlijke AI command center: een agent-platform met 48+ Supabase Edge Functions, multi-provider AI (Gemini, Claude, Mistral, OpenAI), RAG-kennisbanken op pgvector, een HubSpot OAuth2-app en een analytics-cockpit. Het publieke gezicht is de Justin AI chatwidget — die nu live op deze site draait.",
          techStack: ["React", "TypeScript", "Supabase", "Edge Functions", "pgvector", "Stripe", "HubSpot"],
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
      agentsTitle: "AI Agents & Automatisering",
      agentsDescription:
        "AI agents en pg_cron jobs nemen het repetitieve werk over — van leadkwalificatie in CrewVee CRM tot nachtelijke data pipelines die automatisch op de achtergrond draaien.",
      rapidTitle: "Snelle Iteratie",
      rapidDescription:
        "Van concept naar productie-klare code in uren, niet dagen. Complexe features sneller geleverd.",
    },
    // Footer
    footer: {
      title: "Laten We Praten Over Ons Volgende Project",
      subtitle:
        "Op zoek naar een AI-native developer die snel levert en bouwt voor de lange termijn?",
      getInTouch: "Neem Contact Op",
      viewGitHub: "Bekijk GitHub",
    },
  },
};

export type Language = keyof typeof translations;

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
}

export interface Translations {
  hero: {
    headline: string;
    words: string[];
    mobileWords: string[];
    wordsSuffix: string;
    description: string;
    viewWork: string;
    viewWorkMobile: string;
    letsTalk: string;
    letsTalkMobile: string;
  };
  nav: {
    projects: string;
    about: string;
    getInTouch: string;
  };
  techStack: {
    technologies: string[];
  };
  projects: {
    title: string;
    subtitle: string;
    viewCaseStudy: string;
    items: ProjectItem[];
  };
  workflow: {
    badge: string;
    title: string;
    description: string;
    terminalTitle: string;
    terminalDescription: string;
    agentsTitle: string;
    agentsDescription: string;
    rapidTitle: string;
    rapidDescription: string;
  };
  footer: {
    title: string;
    subtitle: string;
    getInTouch: string;
    viewGitHub: string;
  };
}
