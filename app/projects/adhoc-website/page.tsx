"use client";

import { Server, Search, Globe, Gauge, Map, FlaskConical } from "lucide-react";
import {
  CaseStudyPage,
  type CaseStudyContent,
} from "@/components/case-study/CaseStudyPage";
import { AdhocWebsitePreview } from "@/components/AdhocWebsitePreview";

const content: { en: CaseStudyContent; nl: CaseStudyContent } = {
  en: {
    backToProjects: "Back to Projects",
    title: "Ad Hoc Data Website",
    subtitle:
      "Full rewrite of a legacy AngularJS marketing site to Angular 21 with server-side rendering",
    badge: "Production Rebuild",
    stats: [
      { value: "137", label: "Components" },
      { value: "50+", label: "Routes" },
      { value: "2", label: "Languages (hreflang)" },
      { value: "10", label: "Viewports tested" },
    ],
    overviewTitle: "Overview",
    overviewText:
      "Ad Hoc Data's marketing website ran on legacy AngularJS — unmaintainable, slow, and invisible to modern SEO. I rebuilt it from scratch as an Angular 21 application with server-side rendering: 137 components across 50+ routes, a custom design system, full Dutch/English localization, and live search across the complete SBI-2025 industry taxonomy.",
    challengeTitle: "The Challenge",
    challengeText:
      "The legacy site rendered everything client-side, so search engines saw empty pages and Core Web Vitals suffered. The rebuild had to ship a modern stack without losing existing rankings: correct hreflang pairs for NL/EN, structured data, canonical tags, and image optimization — while also adding product features like live industry search and geographic filtering by province and postcode.",
    solutionTitle: "The Solution",
    solutionPoints: [
      {
        title: "Angular 21 with SSR",
        description:
          "A Node/Express SSR server renders every route server-side for crawlers and first paint, with Angular hydrating on the client. Drizzle ORM on PostgreSQL backs the dynamic content.",
      },
      {
        title: "SEO architecture",
        description:
          "Dual-language NL/EN with hreflang tags, JSON-LD structured data with deduplication, Open Graph metadata, and canonical tags on every route. Sharp generates optimized WebP images at build time.",
      },
      {
        title: "Live search across SBI-2025",
        description:
          "Visitors search the full SBI-2025 industry taxonomy with instant results, plus location filtering by province and postcode — the marketing site doubles as a product entry point.",
      },
      {
        title: "Own design system + motion",
        description:
          "A custom component library with consistent tokens, and IntersectionObserver-driven animation directives that only animate elements as they enter the viewport.",
      },
    ],
    featuresTitle: "Key Features",
    features: [
      {
        icon: Server,
        title: "Server-Side Rendering",
        description: "Node/Express SSR for crawlable pages and fast first paint",
      },
      {
        icon: Globe,
        title: "NL/EN Localization",
        description: "Full dual-language routing with hreflang pairs",
      },
      {
        icon: Search,
        title: "Live SBI Search",
        description: "Instant search across the SBI-2025 industry taxonomy",
      },
      {
        icon: Map,
        title: "MapLibre Maps",
        description: "Province and postcode-based location filtering",
      },
      {
        icon: Gauge,
        title: "WebP Optimization",
        description: "Sharp-generated responsive images at build time",
      },
      {
        icon: FlaskConical,
        title: "Playwright Testing",
        description: "Automated checks across 10 viewport sizes",
      },
    ],
    resultsTitle: "Results",
    resultsPoints: [
      "Legacy AngularJS fully replaced by a maintainable Angular 21 SSR codebase",
      "Every route server-rendered and indexable, with structured data and hreflang",
      "137 components and 50+ routes built on a single custom design system",
      "Regression safety through Playwright tests across 10 viewports",
      "Deployed on Railway with a PostgreSQL + Drizzle backend",
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "Ad Hoc Data Website",
    subtitle:
      "Volledige rewrite van een legacy AngularJS marketingsite naar Angular 21 met server-side rendering",
    badge: "Production Rebuild",
    stats: [
      { value: "137", label: "Componenten" },
      { value: "50+", label: "Routes" },
      { value: "2", label: "Talen (hreflang)" },
      { value: "10", label: "Geteste viewports" },
    ],
    overviewTitle: "Overzicht",
    overviewText:
      "De marketingwebsite van Ad Hoc Data draaide op legacy AngularJS — niet te onderhouden, traag en onzichtbaar voor moderne SEO. Ik bouwde hem vanaf nul opnieuw als Angular 21-applicatie met server-side rendering: 137 componenten over 50+ routes, een eigen design system, volledige NL/EN-lokalisatie en live search door de complete SBI-2025 bedrijfstakkenstructuur.",
    challengeTitle: "De Uitdaging",
    challengeText:
      "De oude site renderde alles client-side, waardoor zoekmachines lege pagina's zagen en de Core Web Vitals leden. De rebuild moest een moderne stack opleveren zonder bestaande rankings te verliezen: correcte hreflang-paren voor NL/EN, structured data, canonical tags en afbeeldingsoptimalisatie — en tegelijk productfeatures toevoegen zoals live branchezoeken en geografisch filteren op provincie en postcode.",
    solutionTitle: "De Oplossing",
    solutionPoints: [
      {
        title: "Angular 21 met SSR",
        description:
          "Een Node/Express SSR-server rendert elke route server-side voor crawlers en first paint, waarna Angular hydrateert op de client. Drizzle ORM op PostgreSQL ondersteunt de dynamische content.",
      },
      {
        title: "SEO-architectuur",
        description:
          "Tweetalig NL/EN met hreflang-tags, JSON-LD structured data met deduplicatie, Open Graph-metadata en canonical tags op elke route. Sharp genereert geoptimaliseerde WebP-afbeeldingen tijdens de build.",
      },
      {
        title: "Live search door SBI-2025",
        description:
          "Bezoekers doorzoeken de volledige SBI-2025 bedrijfstakkenstructuur met directe resultaten, plus locatiefilters op provincie en postcode — de marketingsite is meteen een product-instappunt.",
      },
      {
        title: "Eigen design system + motion",
        description:
          "Een eigen componentenbibliotheek met consistente tokens, en IntersectionObserver-gedreven animatiedirectives die elementen pas animeren zodra ze in beeld komen.",
      },
    ],
    featuresTitle: "Belangrijkste Features",
    features: [
      {
        icon: Server,
        title: "Server-Side Rendering",
        description: "Node/Express SSR voor crawlbare pagina's en snelle first paint",
      },
      {
        icon: Globe,
        title: "NL/EN Lokalisatie",
        description: "Volledig tweetalige routing met hreflang-paren",
      },
      {
        icon: Search,
        title: "Live SBI Search",
        description: "Direct zoeken door de SBI-2025 bedrijfstakkenstructuur",
      },
      {
        icon: Map,
        title: "MapLibre Kaarten",
        description: "Locatiefilters op provincie en postcode",
      },
      {
        icon: Gauge,
        title: "WebP Optimalisatie",
        description: "Door Sharp gegenereerde responsive afbeeldingen bij de build",
      },
      {
        icon: FlaskConical,
        title: "Playwright Testing",
        description: "Geautomatiseerde checks op 10 viewport-formaten",
      },
    ],
    resultsTitle: "Resultaten",
    resultsPoints: [
      "Legacy AngularJS volledig vervangen door een onderhoudbare Angular 21 SSR-codebase",
      "Elke route server-gerenderd en indexeerbaar, met structured data en hreflang",
      "137 componenten en 50+ routes op één eigen design system",
      "Regressieveiligheid door Playwright-tests op 10 viewports",
      "Gedeployed op Railway met een PostgreSQL + Drizzle backend",
    ],
  },
};

const techStack = [
  { name: "Angular 21", color: "bg-red-500/20 text-red-300 border-red-500/30" },
  { name: "SSR", color: "bg-zinc-400/20 text-zinc-300 border-zinc-400/30" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "PostgreSQL", color: "bg-blue-600/20 text-blue-300 border-blue-600/30" },
  { name: "Drizzle", color: "bg-lime-500/20 text-lime-300 border-lime-500/30" },
  { name: "MapLibre", color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
  { name: "Playwright", color: "bg-green-600/20 text-green-300 border-green-600/30" },
];

export default function AdhocWebsitePage() {
  return (
    <CaseStudyPage
      accent="rose"
      content={content}
      techStack={techStack}
      preview={<AdhocWebsitePreview />}
    />
  );
}
