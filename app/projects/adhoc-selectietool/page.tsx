"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { BelgiumMapPreview } from "@/components/BelgiumMapPreview";
import { NaceSearchPreview } from "@/components/NaceSearchPreview";
import { ImageCompareSlider } from "@/components/ImageCompareSlider";

const content = {
  en: {
    backToProjects: "Back to Projects",
    title: "Ad Hoc Data Selectietool",
    subtitle: "Geographic Search Enhancement for Legacy B2B Data Platform",
    overview: "Overview",
    overviewText: "Ad Hoc Data is a leading B2B data provider in the Netherlands and Belgium, established since 2005. With over 1.2 million Belgian companies in their database and a Trustpilot score of 4.7/5, they provide businesses with comprehensive company data for marketing and sales. Their selection tool allows users to filter and export company data based on industry, location, company type, and employee count. I was tasked with adding geographic search capabilities to their existing platform.",
    challenge: "The Challenge",
    challengeText: "The existing codebase was built with legacy technologies (Angular 1.x, LESS, vanilla JavaScript) and had strict API compatibility requirements. Any new features needed to integrate seamlessly without breaking existing functionality or requiring changes to the backend API structure.",
    solution: "The Solution",
    solutionPoints: [
      {
        title: "GeoJSON Polygon Integration",
        description: "Implemented geographic boundaries for all Belgian provinces, arrondissements, and postal code areas using GeoJSON polygons. This enables precise geographic filtering of company data."
      },
      {
        title: "Coordinate Extraction from Exports",
        description: "Analyzed the existing data export structure to extract company coordinates, enabling geographic point-in-polygon calculations without backend modifications."
      },
      {
        title: "Legacy-Compatible Architecture",
        description: "Built the feature using vanilla JavaScript and Angular 1.x patterns to ensure seamless integration with the existing codebase. All API payloads remain unchanged."
      },
      {
        title: "Interactive Map Interface",
        description: "Created an intuitive map interface allowing users to select regions visually, with support for multi-selection across different geographic levels."
      }
    ],
    techStack: "Technology Stack",
    results: "Results",
    resultsPoints: [
      "Geographic search: filter 1.2M+ companies across 43 arrondissements, 10 provinces, and 1,000+ postal codes",
      "Thematic search: 400+ search terms to find companies by industry without knowing NACE codes",
      "Code refactored from 0 to 33 organized modules with 0 TODOs remaining",
      "Design system: 352 → 5,848 lines of CSS with 40+ design tokens and 100% scoped styles",
      "Full backward compatibility - zero changes to existing API endpoints"
    ],
    thematicSearch: {
      title: "Thematic Search",
      subtitle: "Search by industry theme instead of NACE codes",
      description: "Users no longer need to know exact NACE codes. Simply type 'horeca', 'bakker', or 'advocaat' and the system automatically maps these terms to the correct NACE codes. Supports 400+ search terms in both Dutch and French, including singular and plural forms.",
      examples: ["horeca → I, 55, 56", "bakker → 10.71, 47.24", "advocaat → 69.10"]
    },
    stats: [
      { value: "400+", label: "Search Terms", subtext: "Thematic Search", before: "0" },
      { value: "1,053", label: "Regions", subtext: "Geographic Search", before: "0" },
      { value: "33", label: "Modules", subtext: "Code Architecture", before: "0" },
      { value: "0", label: "TODOs", subtext: "Production Ready", before: "9" },
      { value: "40+", label: "Design Tokens", subtext: "Design System", before: "17" },
      { value: "100%", label: "Scoped CSS", subtext: "Zero Conflicts", before: "0%" }
    ],
    codeRefactor: {
      title: "Code Refactoring",
      subtitle: "From spaghetti to structured: a complete architectural overhaul",
      metrics: [
        { label: "Controller", before: "4,726", after: "5,678", reason: "Around same size, now in 33 modules" },
        { label: "CSS / LESS", before: "352", after: "5,848", reason: "Full design system with 40+ tokens" },
        { label: "HTML", before: "1,055", after: "2,323", reason: "Semantic structure & accessibility" }
      ],
      comparisons: [
        {
          title: "Error Handling",
          problem: "Haiku poems as error messages",
          solution: "Try/catch with meaningful logging",
          legacy: `const explanations = {
  noField: \`
    expectation void
    a mystery wavering
    surge of heat and cold
  \`,
  notAFunction: \`
    action required
    laziness or negligence
    action required
  \`,
};`,
          fixed: `function saveFilterState() {
  try {
    var state = {
      selectedNaceCodes: vm.selectedNaceCodes || [],
      selectedLocations: vm.selectedLocations || { included: [], excluded: [] },
      filters: {}
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    console.log('[SessionStorage] Filter state saved');
  } catch (e) {
    console.warn('[SessionStorage] Could not save:', e);
  }
}`
        },
        {
          title: "Code Structure",
          problem: "No sections, mixed concerns, jQuery in Angular",
          solution: "Clear sections with config objects",
          legacy: `Object.assign(window, {
  vars, vm: this,
  $http, $params, $webhooks, $scope, $filter,
  wipe: () => {
    sessionStorage.clear();
    localStorage.clear();
  },
});

$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="collapse"]').on('click', function () {
  var e = $(this);
  setTimeout(function () { /* nested callbacks */ }, 400);
});`,
          fixed: `// ============================================
// API CONFIGURATIE
// ============================================
var API_CONFIG = {
  baseUrl: '/api',
  merchantId: null,
  langKey: 'NL'
};

// ============================================
// LOOKUP ID MAPPING
// ============================================
var LOOKUP_IDS = {
  NACE_2025: { NL: '2025_nace', FR: '2025_nace' },
  WERKKLASSE: { NL: 'NLBE_WERKNEMERSKLASSE', FR: 'FRBE_WERKNEMERSKLASSE' },
  // ...
};`
        },
        {
          title: "Initialization Flow",
          problem: "Nested setTimeout callbacks with magic delays",
          solution: "Clean promise chain with named functions",
          legacy: `Promise.allSettled(FilterField.lookupRequestList)
.then((values) => {
  setTimeout( () => {
    if (isModelDictUsed) {
      for (let item of fieldContainer.getItems()) {
        // deep nesting continues...
      }
    }
    vm.addressCount.count();
  }, 500); // magic number delay
});`,
          fixed: `function initializeApp() {
  loadLookupData()
    .then(buildFilterTree)
    .then(restoreFilterState)
    .then(updateCount)
    .catch(handleError);
}

function restoreFilterState() {
  var stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  var state = JSON.parse(stored);
  // Clean restore logic
}`
        },
        {
          title: "CSS Design System",
          problem: "Hardcoded values, no scoping, Bootstrap overrides",
          solution: "40+ design tokens, fully scoped styles",
          legacy: `#pills-tab:before {
  border-left: 1px solid var(--bs-secondary);
  border-top-right-radius: 0.375rem;
}

ul.fancytree-container ul {
  padding: 0 !important;
  padding-left: 1em !important;
}`,
          fixed: `// Design Tokens
@ahd-primary:       #2563eb;
@ahd-border-radius: 10px;
@ahd-shadow-md:     0 4px 6px rgba(0,0,0,0.05);

// All styles scoped
.ahd-selectietool-modern {
  background: @ahd-bg-main;
  border-radius: @ahd-border-radius;
  box-shadow: @ahd-shadow-md;
}`
        }
      ]
    },
    uiRedesign: {
      title: "UI/UX Redesign",
      subtitle: "From minimal Bootstrap to a complete custom design system",
      beforeLabel: "Before",
      afterLabel: "After",
      dragHint: "Drag to compare",
      metrics: [
        { icon: "palette", before: "0", value: "22", label: "Colors", description: "Complete palette", color: "text-purple-400" },
        { icon: "tokens", before: "0", value: "40+", label: "Design Tokens", description: "Consistent styling", color: "text-blue-400" },
        { icon: "shadows", before: "0", value: "3", label: "Shadow Levels", description: "Depth hierarchy", color: "text-amber-400" },
        { icon: "scoped", before: "0%", value: "100%", label: "Scoped CSS", description: "Zero conflicts", color: "text-emerald-400" }
      ],
      highlights: [
        { title: "Color System", description: "22 color tokens: primary, secondary, accent, backgrounds, text, and status colors" },
        { title: "Spacing Scale", description: "5 spacing tokens (xs to xl) for consistent margins and padding" },
        { title: "Shadow Hierarchy", description: "3 shadow levels (sm, md, lg) for visual depth without harshness" },
        { title: "Scoped Styles", description: "All CSS scoped under .ahd-selectietool-modern - zero conflicts with existing styles" }
      ]
    }
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "Ad Hoc Data Selectietool",
    subtitle: "Geografische Zoekfunctie voor Legacy B2B Data Platform",
    overview: "Overzicht",
    overviewText: "Ad Hoc Data is een toonaangevende B2B dataleverancier in Nederland en België, opgericht in 2005. Met meer dan 1,2 miljoen Belgische bedrijven in hun database en een Trustpilot-score van 4,7/5, bieden zij bedrijven uitgebreide bedrijfsdata voor marketing en sales. Hun selectietool stelt gebruikers in staat om bedrijfsdata te filteren en exporteren op basis van branche, locatie, bedrijfstype en aantal medewerkers. Ik kreeg de opdracht om geografische zoekmogelijkheden toe te voegen aan hun bestaande platform.",
    challenge: "De Uitdaging",
    challengeText: "De bestaande codebase was gebouwd met legacy technologieën (Angular 1.x, LESS, vanilla JavaScript) en had strikte API-compatibiliteitseisen. Nieuwe features moesten naadloos integreren zonder bestaande functionaliteit te breken of wijzigingen aan de backend API-structuur te vereisen.",
    solution: "De Oplossing",
    solutionPoints: [
      {
        title: "GeoJSON Polygon Integratie",
        description: "Geografische grenzen geïmplementeerd voor alle Belgische provincies, arrondissementen en postcodegebieden met GeoJSON polygons. Dit maakt precieze geografische filtering van bedrijfsdata mogelijk."
      },
      {
        title: "Coördinaten Extractie uit Exports",
        description: "De bestaande data export structuur geanalyseerd om bedrijfscoördinaten te extraheren, waardoor geografische point-in-polygon berekeningen mogelijk zijn zonder backend wijzigingen."
      },
      {
        title: "Legacy-Compatibele Architectuur",
        description: "De feature gebouwd met vanilla JavaScript en Angular 1.x patronen voor naadloze integratie met de bestaande codebase. Alle API payloads blijven ongewijzigd."
      },
      {
        title: "Interactieve Kaart Interface",
        description: "Een intuïtieve kaartinterface gemaakt waarmee gebruikers visueel regio's kunnen selecteren, met ondersteuning voor multi-selectie over verschillende geografische niveaus."
      }
    ],
    techStack: "Technologie Stack",
    results: "Resultaten",
    resultsPoints: [
      "Geografisch zoeken: filter 1,2M+ bedrijven over 43 arrondissementen, 10 provincies en 1.000+ postcodes",
      "Thematisch zoeken: 400+ zoektermen om bedrijven te vinden op industrie zonder NACE-codes te kennen",
      "Code gerefactored van 0 naar 33 georganiseerde modules met 0 TODOs",
      "Design system: 352 → 5.848 regels CSS met 40+ design tokens en 100% gescoped",
      "Volledige backward compatibility - geen wijzigingen aan bestaande API endpoints"
    ],
    thematicSearch: {
      title: "Thematisch Zoeken",
      subtitle: "Zoek op branche-thema in plaats van NACE-codes",
      description: "Gebruikers hoeven geen exacte NACE-codes meer te kennen. Typ simpelweg 'horeca', 'bakker' of 'advocaat' en het systeem mapt deze termen automatisch naar de juiste NACE-codes. Ondersteunt 400+ zoektermen in zowel Nederlands als Frans, inclusief enkelvoud en meervoud.",
      examples: ["horeca → I, 55, 56", "bakker → 10.71, 47.24", "advocaat → 69.10"]
    },
    stats: [
      { value: "400+", label: "Zoektermen", subtext: "Thematisch Zoeken", before: "0" },
      { value: "1.053", label: "Regio's", subtext: "Geografisch Zoeken", before: "0" },
      { value: "33", label: "Modules", subtext: "Code Architectuur", before: "0" },
      { value: "0", label: "TODOs", subtext: "Production Ready", before: "9" },
      { value: "40+", label: "Design Tokens", subtext: "Design System", before: "17" },
      { value: "100%", label: "Scoped CSS", subtext: "Geen Conflicten", before: "0%" }
    ],
    codeRefactor: {
      title: "Code Refactoring",
      subtitle: "Van spaghetti naar gestructureerd: een complete architectuur-overhaul",
      metrics: [
        { label: "Controller", before: "4.726", after: "5.678", reason: "Ongeveer zelfde grootte, nu in 33 modules" },
        { label: "CSS / LESS", before: "352", after: "5.848", reason: "Volledig design system met 40+ tokens" },
        { label: "HTML", before: "1.055", after: "2.323", reason: "Semantische structuur & toegankelijkheid" }
      ],
      comparisons: [
        {
          title: "Error Handling",
          problem: "Haiku gedichten als error messages",
          solution: "Try/catch met duidelijke logging",
          legacy: `const explanations = {
  noField: \`
    expectation void
    a mystery wavering
    surge of heat and cold
  \`,
  notAFunction: \`
    action required
    laziness or negligence
    action required
  \`,
};`,
          fixed: `function saveFilterState() {
  try {
    var state = {
      selectedNaceCodes: vm.selectedNaceCodes || [],
      selectedLocations: vm.selectedLocations || { included: [], excluded: [] },
      filters: {}
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    console.log('[SessionStorage] Filter state saved');
  } catch (e) {
    console.warn('[SessionStorage] Could not save:', e);
  }
}`
        },
        {
          title: "Code Structuur",
          problem: "Geen secties, mixed concerns, jQuery in Angular",
          solution: "Duidelijke secties met config objecten",
          legacy: `Object.assign(window, {
  vars, vm: this,
  $http, $params, $webhooks, $scope, $filter,
  wipe: () => {
    sessionStorage.clear();
    localStorage.clear();
  },
});

$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="collapse"]').on('click', function () {
  var e = $(this);
  setTimeout(function () { /* nested callbacks */ }, 400);
});`,
          fixed: `// ============================================
// API CONFIGURATIE
// ============================================
var API_CONFIG = {
  baseUrl: '/api',
  merchantId: null,
  langKey: 'NL'
};

// ============================================
// LOOKUP ID MAPPING
// ============================================
var LOOKUP_IDS = {
  NACE_2025: { NL: '2025_nace', FR: '2025_nace' },
  WERKKLASSE: { NL: 'NLBE_WERKNEMERSKLASSE', FR: 'FRBE_WERKNEMERSKLASSE' },
  // ...
};`
        },
        {
          title: "Initialisatie Flow",
          problem: "Geneste setTimeout callbacks met magic delays",
          solution: "Schone promise chain met named functions",
          legacy: `Promise.allSettled(FilterField.lookupRequestList)
.then((values) => {
  setTimeout( () => {
    if (isModelDictUsed) {
      for (let item of fieldContainer.getItems()) {
        // deep nesting continues...
      }
    }
    vm.addressCount.count();
  }, 500); // magic number delay
});`,
          fixed: `function initializeApp() {
  loadLookupData()
    .then(buildFilterTree)
    .then(restoreFilterState)
    .then(updateCount)
    .catch(handleError);
}

function restoreFilterState() {
  var stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  var state = JSON.parse(stored);
  // Clean restore logic
}`
        },
        {
          title: "CSS Design System",
          problem: "Hardcoded waarden, geen scoping, Bootstrap overrides",
          solution: "40+ design tokens, volledig gescoped",
          legacy: `#pills-tab:before {
  border-left: 1px solid var(--bs-secondary);
  border-top-right-radius: 0.375rem;
}

ul.fancytree-container ul {
  padding: 0 !important;
  padding-left: 1em !important;
}`,
          fixed: `// Design Tokens
@ahd-primary:       #2563eb;
@ahd-border-radius: 10px;
@ahd-shadow-md:     0 4px 6px rgba(0,0,0,0.05);

// Alle styles gescoped
.ahd-selectietool-modern {
  background: @ahd-bg-main;
  border-radius: @ahd-border-radius;
  box-shadow: @ahd-shadow-md;
}`
        }
      ]
    },
    uiRedesign: {
      title: "UI/UX Redesign",
      subtitle: "Van minimale Bootstrap naar een compleet custom design system",
      beforeLabel: "Voor",
      afterLabel: "Na",
      dragHint: "Sleep om te vergelijken",
      metrics: [
        { icon: "palette", before: "0", value: "22", label: "Kleuren", description: "Complete palette", color: "text-purple-400" },
        { icon: "tokens", before: "0", value: "40+", label: "Design Tokens", description: "Consistente styling", color: "text-blue-400" },
        { icon: "shadows", before: "0", value: "3", label: "Shadow Levels", description: "Diepte hiërarchie", color: "text-amber-400" },
        { icon: "scoped", before: "0%", value: "100%", label: "Scoped CSS", description: "Zero conflicten", color: "text-emerald-400" }
      ],
      highlights: [
        { title: "Kleuren Systeem", description: "22 kleur tokens: primary, secondary, accent, achtergronden, tekst en status kleuren" },
        { title: "Spacing Schaal", description: "5 spacing tokens (xs tot xl) voor consistente margins en padding" },
        { title: "Shadow Hiërarchie", description: "3 shadow levels (sm, md, lg) voor visuele diepte zonder hardheid" },
        { title: "Gescoped Styles", description: "Alle CSS gescoped onder .ahd-selectietool-modern - zero conflicten met bestaande styles" }
      ]
    }
  }
};

const techStack = [
  { name: "JavaScript", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  { name: "Angular 1.x", color: "bg-red-500/20 text-red-300 border-red-500/30" },
  { name: "GeoJSON", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "LESS", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
  { name: "Leaflet", color: "bg-green-500/20 text-green-300 border-green-500/30" },
];

export default function AdHocSelectietoolPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToProjects}
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl text-zinc-400 mb-6">{t.subtitle}</p>

            {/* CTA */}
            <a
              href="https://www.adhocdata.be/selecties-2026-justin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 mb-8 text-sm font-semibold bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors"
            >
              {language === 'nl' ? 'Bekijk AdHocData.be' : 'Visit AdHocData.be'}
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1 text-sm font-medium rounded-full border ${tech.color}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Map Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] md:aspect-video"
          >
            <BelgiumMapPreview />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8"
          >
            {t.stats.map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 border border-white/10 rounded-xl text-center"
              >
                {'subtext' in stat && (
                  <div className="text-[9px] text-emerald-400 font-semibold uppercase tracking-wider mb-1">{stat.subtext}</div>
                )}
                <div className="flex items-center justify-center gap-2 mb-1">
                  {'before' in stat && (
                    <span className="text-lg md:text-xl font-bold text-red-400/70 line-through">{stat.before}</span>
                  )}
                  <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <div className="text-xs text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{t.overview}</h2>
            <p className="text-zinc-400 leading-relaxed">{t.overviewText}</p>
          </motion.div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-16 px-6 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{t.challenge}</h2>
            <p className="text-zinc-400 leading-relaxed">{t.challengeText}</p>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-8">{t.solution}</h2>
            <div className="grid gap-6">
              {t.solutionPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl"
                >
                  <h3 className="text-lg font-medium mb-2">{point.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{point.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Thematic Search */}
      <section className="py-16 px-6 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{t.thematicSearch.title}</h2>
            <p className="text-zinc-400 mb-6">{t.thematicSearch.subtitle}</p>

            {/* Description */}
            <div className="mb-6">
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {t.thematicSearch.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {t.thematicSearch.examples.map((example, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm bg-white/5 px-3 py-2 rounded-lg">
                    <code className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded text-xs font-mono">
                      {example.split(' → ')[0]}
                    </code>
                    <span className="text-zinc-500">→</span>
                    <code className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-mono">
                      {example.split(' → ')[1]}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl overflow-hidden border border-white/10 aspect-[2/3] md:aspect-square"
            >
              <NaceSearchPreview />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* UI/UX Redesign */}
      {t.uiRedesign && (
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-2">{t.uiRedesign.title}</h2>
              <p className="text-zinc-400 mb-8">{t.uiRedesign.subtitle}</p>

              {/* Before/After Comparison Slider */}
              <div className="mb-10">
                <ImageCompareSlider
                  beforeImage="/projects/adhoc/Before.jpg"
                  afterImage="/projects/adhoc/After.jpg"
                  beforeLabel={t.uiRedesign.beforeLabel}
                  afterLabel={t.uiRedesign.afterLabel}
                  beforeAlt="Legacy Bootstrap UI"
                  afterAlt="Modern custom design system"
                  dragHint={t.uiRedesign.dragHint}
                />
              </div>

              {/* Maintainability Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {t.uiRedesign.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 bg-black/50 border border-white/10 rounded-xl text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-lg font-bold text-red-400/70 line-through">{metric.before}</span>
                      <span className={`text-2xl font-bold ${metric.color}`}>{metric.value}</span>
                    </div>
                    <div className="text-xs text-zinc-400 mb-1">{metric.label}</div>
                    <div className="text-[10px] text-zinc-500">{metric.description}</div>
                  </motion.div>
                ))}
              </div>

              {/* Design Highlights */}
              <div className="grid md:grid-cols-2 gap-4">
                {t.uiRedesign.highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <h3 className="text-sm font-semibold text-white mb-1">{highlight.title}</h3>
                    <p className="text-xs text-zinc-400">{highlight.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Code Refactoring */}
      <section className="py-16 px-6 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{t.codeRefactor.title}</h2>
            <p className="text-zinc-400 mb-8">{t.codeRefactor.subtitle}</p>

            {/* Metrics - Before/After per file */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {t.codeRefactor.metrics.map((metric, index) => (
                <div key={index} className="p-4 bg-black/50 border border-white/10 rounded-xl text-center">
                  <div className="text-xs text-zinc-500 mb-2">{metric.label}</div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-lg font-bold text-red-400/70 line-through">{metric.before}</span>
                    <span className="text-zinc-500">→</span>
                    <span className="text-xl font-bold text-emerald-400">{metric.after}</span>
                  </div>
                  <div className="text-[10px] text-zinc-600">lines</div>
                  <div className="text-[10px] text-emerald-400/80 mt-2">✓ {metric.reason}</div>
                </div>
              ))}
            </div>

            {/* Code Comparisons */}
            <div className="space-y-8">
              {t.codeRefactor.comparisons.map((comparison, index) => (
                <motion.div
                  key={comparison.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-white/10 rounded-xl overflow-hidden"
                >
                  <div className="p-4 bg-white/5 border-b border-white/10">
                    <h3 className="font-semibold text-white">{comparison.title}</h3>
                    <div className="grid md:grid-cols-2 gap-2 md:gap-4 mt-2">
                      <p className="text-sm text-red-400">⚠️ {comparison.problem}</p>
                      <p className="text-sm text-emerald-400">✓ {comparison.solution}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2">
                    {/* Legacy Code */}
                    <div className="border-b md:border-b-0 md:border-r border-white/10">
                      <div className="px-4 py-2 bg-red-500/10 border-b border-white/10">
                        <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Legacy</span>
                      </div>
                      <pre className="p-4 text-[10px] md:text-xs text-zinc-400 overflow-x-auto bg-black/30">
                        <code>{comparison.legacy}</code>
                      </pre>
                    </div>
                    {/* Fixed Code */}
                    <div>
                      <div className="px-4 py-2 bg-emerald-500/10 border-b border-white/10">
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Refactored</span>
                      </div>
                      <pre className="p-4 text-[10px] md:text-xs text-zinc-400 overflow-x-auto bg-black/30">
                        <code>{comparison.fixed}</code>
                      </pre>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* Results */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-8">{t.results}</h2>
            <div className="grid gap-4">
              {t.resultsPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <p className="text-zinc-300">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToProjects}
          </Link>
        </div>
      </section>
    </main>
  );
}
