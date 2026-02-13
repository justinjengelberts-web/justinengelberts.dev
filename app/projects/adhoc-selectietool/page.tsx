"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, MapPin, Database, Code2, Layers } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { BelgiumMapPreview } from "@/components/BelgiumMapPreview";
import { NaceSearchPreview } from "@/components/NaceSearchPreview";

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
      "Users can now filter 1.2M+ Belgian companies by geographic region with a single click",
      "43 arrondissements, 10 provinces, and 1,000+ postal codes available for selection",
      "Zero changes required to existing API endpoints - full backward compatibility",
      "Seamless integration with legacy Angular 1.x codebase",
      "Monthly data updates continue to work without modification"
    ],
    thematicSearch: {
      title: "Thematic Search",
      subtitle: "Search by industry theme instead of NACE codes",
      description: "Users no longer need to know exact NACE codes. Simply type 'horeca', 'bakker', or 'advocaat' and the system automatically maps these terms to the correct NACE codes. Supports 200+ search terms in both Dutch and French, including singular and plural forms.",
      examples: ["horeca → I, 55, 56", "bakker → 10.71, 47.24", "advocaat → 69.10"]
    },
    keyFeatures: "Key Features",
    features: [
      { icon: MapPin, title: "Geographic Search", description: "Find companies within any Belgian province, arrondissement, or postal code area" },
      { icon: Database, title: "Data Compatibility", description: "Works with existing data exports and API structure" },
      { icon: Code2, title: "Legacy Integration", description: "Built to work with Angular 1.x and vanilla JavaScript" },
      { icon: Layers, title: "Multi-level Selection", description: "Combine selections across provinces, arrondissements, and postal codes" }
    ],
    stats: [
      { value: "200+", label: "Thematic Search", subtext: "New Feature" },
      { value: "54", label: "Geographic Search", subtext: "New Feature" },
      { value: "100%", label: "Backward Compatible" },
      { value: "Full", label: "UI/UX Redesign" }
    ],
    codeRefactor: {
      title: "Code Refactoring",
      subtitle: "From spaghetti to structured: a complete architectural overhaul",
      metrics: [
        { value: "4,726", label: "Lines Legacy", color: "text-red-400" },
        { value: "5,678", label: "Lines New", color: "text-emerald-400" },
        { value: "~20%", label: "More Features", color: "text-blue-400" },
        { value: "100%", label: "Restructured", color: "text-purple-400" }
      ],
      comparisons: [
        {
          title: "Error Handling",
          problem: "Haiku poems as error messages",
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
        }
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
      "Gebruikers kunnen nu 1,2M+ Belgische bedrijven filteren op geografische regio met één klik",
      "43 arrondissementen, 10 provincies en 1.000+ postcodes beschikbaar voor selectie",
      "Geen wijzigingen nodig aan bestaande API endpoints - volledige backward compatibility",
      "Naadloze integratie met legacy Angular 1.x codebase",
      "Maandelijkse data-updates blijven werken zonder aanpassingen"
    ],
    thematicSearch: {
      title: "Thematisch Zoeken",
      subtitle: "Zoek op branche-thema in plaats van NACE-codes",
      description: "Gebruikers hoeven geen exacte NACE-codes meer te kennen. Typ simpelweg 'horeca', 'bakker' of 'advocaat' en het systeem mapt deze termen automatisch naar de juiste NACE-codes. Ondersteunt 200+ zoektermen in zowel Nederlands als Frans, inclusief enkelvoud en meervoud.",
      examples: ["horeca → I, 55, 56", "bakker → 10.71, 47.24", "advocaat → 69.10"]
    },
    keyFeatures: "Belangrijkste Features",
    features: [
      { icon: MapPin, title: "Geografisch Zoeken", description: "Vind bedrijven binnen elke Belgische provincie, arrondissement of postcodegebied" },
      { icon: Database, title: "Data Compatibiliteit", description: "Werkt met bestaande data exports en API structuur" },
      { icon: Code2, title: "Legacy Integratie", description: "Gebouwd om te werken met Angular 1.x en vanilla JavaScript" },
      { icon: Layers, title: "Multi-level Selectie", description: "Combineer selecties over provincies, arrondissementen en postcodes" }
    ],
    stats: [
      { value: "200+", label: "Thematisch Zoeken", subtext: "Nieuwe Feature" },
      { value: "54", label: "Geografisch Zoeken", subtext: "Nieuwe Feature" },
      { value: "100%", label: "Backward Compatible" },
      { value: "Volledig", label: "UI/UX Redesign" }
    ],
    codeRefactor: {
      title: "Code Refactoring",
      subtitle: "Van spaghetti naar gestructureerd: een complete architectuur-overhaul",
      metrics: [
        { value: "4.726", label: "Regels Legacy", color: "text-red-400" },
        { value: "5.678", label: "Regels Nieuw", color: "text-emerald-400" },
        { value: "~20%", label: "Meer Features", color: "text-blue-400" },
        { value: "100%", label: "Herstructureerd", color: "text-purple-400" }
      ],
      comparisons: [
        {
          title: "Error Handling",
          problem: "Haiku gedichten als error messages",
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
        }
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
            className="rounded-2xl overflow-hidden bg-slate-800/50 p-4 md:p-6"
          >
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
              <BelgiumMapPreview />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {t.stats.map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 border border-white/10 rounded-xl text-center"
              >
                {'subtext' in stat && (
                  <div className="text-[9px] text-emerald-400 font-semibold uppercase tracking-wider mb-1">{stat.subtext}</div>
                )}
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
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

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {t.codeRefactor.metrics.map((metric, index) => (
                <div key={index} className="p-4 bg-black/50 border border-white/10 rounded-xl text-center">
                  <div className={`text-2xl font-bold mb-1 ${metric.color}`}>{metric.value}</div>
                  <div className="text-xs text-zinc-500">{metric.label}</div>
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
                    <p className="text-sm text-red-400 mt-1">⚠️ {comparison.problem}</p>
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

      {/* Thematic Search */}
      <section className="py-16 px-6">
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
              className="rounded-2xl overflow-hidden bg-slate-800/50 p-4 md:p-6"
            >
              <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
                <NaceSearchPreview />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-8">{t.keyFeatures}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {t.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-black/50 border border-white/10 rounded-xl"
                >
                  <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm">{feature.description}</p>
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
