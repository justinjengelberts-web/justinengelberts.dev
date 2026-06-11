"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Server,
  Layers,
  Search,
  Blocks,
  Map,
  FlaskConical,
} from "lucide-react";
import {
  CaseStudyPage,
  type CaseStudyContent,
} from "@/components/case-study/CaseStudyPage";
import { AdhocWebsitePreview } from "@/components/AdhocWebsitePreview";
import { BelgiumMapPreview } from "@/components/BelgiumMapPreview";
import { ImageCompareSlider } from "@/components/ImageCompareSlider";
import { LazyMount } from "@/components/LazyMount";
import { useLanguage } from "@/lib/language-context";

const content: { en: CaseStudyContent; nl: CaseStudyContent } = {
  en: {
    backToProjects: "Back to Projects",
    title: "Ad Hoc Data Platform",
    subtitle:
      "Three refactor iterations: from legacy AngularJS to an Angular 21 SSR platform with a dual-database selection tool",
    badge: "Production Platform",
    stats: [
      { value: "7.1M", label: "Company records (2 databases)" },
      { value: "3", label: "Refactor iterations" },
      { value: "137", label: "Components, 50+ routes" },
      { value: "4", label: "Countries (AI Leads)" },
    ],
    overviewTitle: "Overview",
    overviewText:
      "Over three refactor iterations I rebuilt Ad Hoc Data's entire web platform: from a legacy AngularJS marketing site and selection tool to a modern Angular 21 application with server-side rendering. The platform now combines a fully SEO-optimized marketing site with a dual-database selection tool: KVK Pro (3.7 million Dutch companies, refreshed monthly from the official trade register) and AI Leads (3.4 million web-indexed companies across the Netherlands, Belgium, Germany and France, refreshed daily).",
    challengeTitle: "The Challenge",
    challengeText:
      "The original stack was legacy AngularJS: client-side rendered (invisible to search engines), hard to maintain, and built around a single database. The business needed geographic search, then a modern design system, and eventually a second data product with a completely different filter model — all while the existing tool kept serving paying customers in production. That forced an iterative approach instead of a big-bang rewrite.",
    solutionTitle: "The Solution",
    solutionPoints: [
      {
        title: "Three iterations, one platform",
        description:
          "Iteration 1: refactored the legacy Angular 1.x selection tool and added geographic search with GeoJSON polygons and Turf.js — finding companies by province, arrondissement, or postal code area on the Belgian database (1.2M companies). Iteration 2: rebuilt the tool around industry-standard lead-gen UX (Apollo-style): sidebar filter navigation, a credits system, and live result counts. Iteration 3: full rebuild as Angular 21 SSR with a new, dual-database selection tool.",
      },
      {
        title: "Dual-database selection tool",
        description:
          "A database switcher lets users select from KVK Pro (official trade register data) or AI Leads (web-indexed companies) — each with its own filter registry, since the filter models never cross databases. Live record counts update on every filter change via a signal-based FilterStore, and users can export two separate lists in one flow with combined pricing.",
      },
      {
        title: "3,800+ technology filters",
        description:
          "The AI Leads database is filterable on the technology a company's website runs (Shopify, WordPress, HubSpot, Salesforce — 3,800+ detectable technologies), plus TLD, languages, B2B/B2C classification and verified contact data. KVK Pro filters cover SBI industry codes, legal form, building/energy-label data and fine-grained location trees.",
      },
      {
        title: "SEO architecture",
        description:
          "Server-side rendering via Node/Express, dual-language NL/EN with hreflang pairs, JSON-LD structured data, canonical tags, and Sharp-generated WebP images. Backed by PostgreSQL with Drizzle ORM, deployed on Railway, and regression-tested with Playwright across 10 viewports.",
      },
    ],
    featuresTitle: "Key Features",
    features: [
      {
        icon: Layers,
        title: "Dual Database",
        description: "KVK Pro (3.7M) + AI Leads (3.4M) behind one switcher",
      },
      {
        icon: Search,
        title: "Live Counts",
        description: "Matching record count updates on every filter change",
      },
      {
        icon: Blocks,
        title: "3,800+ Tech Filters",
        description: "Filter companies by the technology their website runs",
      },
      {
        icon: Map,
        title: "Geographic Search",
        description: "GeoJSON polygons: provinces, municipalities, postcodes",
      },
      {
        icon: Server,
        title: "Angular 21 SSR",
        description: "Server-rendered, crawlable, NL/EN with hreflang",
      },
      {
        icon: FlaskConical,
        title: "Playwright Testing",
        description: "Automated checks across 10 viewport sizes",
      },
    ],
    resultsTitle: "Results",
    resultsPoints: [
      "Three major iterations shipped while the tool kept serving paying customers",
      "7.1 million company records searchable across two databases and four countries",
      "Live counts before export — pay-per-record from €0.09, no subscription required",
      "Legacy AngularJS fully replaced by a maintainable Angular 21 SSR codebase",
      "Every route server-rendered and indexable, with structured data and hreflang",
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "Ad Hoc Data Platform",
    subtitle:
      "Drie refactor-iteraties: van legacy AngularJS naar een Angular 21 SSR-platform met dual-database selectietool",
    badge: "Production Platform",
    stats: [
      { value: "7,1M", label: "Bedrijfsrecords (2 databases)" },
      { value: "3", label: "Refactor-iteraties" },
      { value: "137", label: "Componenten, 50+ routes" },
      { value: "4", label: "Landen (AI Leads)" },
    ],
    overviewTitle: "Overzicht",
    overviewText:
      "In drie refactor-iteraties bouwde ik het complete webplatform van Ad Hoc Data opnieuw: van een legacy AngularJS marketingsite en selectietool naar een moderne Angular 21-applicatie met server-side rendering. Het platform combineert nu een volledig SEO-geoptimaliseerde marketingsite met een dual-database selectietool: KVK Pro (3,7 miljoen Nederlandse bedrijven, maandelijks ververst vanuit het Handelsregister) en AI Leads (3,4 miljoen web-geïndexeerde bedrijven in Nederland, België, Duitsland en Frankrijk, dagelijks ververst).",
    challengeTitle: "De Uitdaging",
    challengeText:
      "De oorspronkelijke stack was legacy AngularJS: client-side gerenderd (onzichtbaar voor zoekmachines), lastig te onderhouden en gebouwd rond één database. Het bedrijf had geografisch zoeken nodig, daarna een modern design system, en uiteindelijk een tweede dataproduct met een compleet ander filtermodel — terwijl de bestaande tool in productie betalende klanten bleef bedienen. Dat dwong tot een iteratieve aanpak in plaats van een big-bang rewrite.",
    solutionTitle: "De Oplossing",
    solutionPoints: [
      {
        title: "Drie iteraties, één platform",
        description:
          "Iteratie 1: de legacy Angular 1.x selectietool gerefactord en geografisch zoeken toegevoegd met GeoJSON-polygonen en Turf.js — bedrijven vinden per provincie, arrondissement of postcodegebied op de Belgische database (1,2M bedrijven). Iteratie 2: de tool herbouwd rond industry-standard lead-gen UX (Apollo-stijl): sidebar-filternavigatie, een credits-systeem en live aantallen. Iteratie 3: volledige rebuild als Angular 21 SSR met een nieuwe, dual-database selectietool.",
      },
      {
        title: "Dual-database selectietool",
        description:
          "Een database-switcher laat gebruikers kiezen tussen KVK Pro (officiële Handelsregisterdata) en AI Leads (web-geïndexeerde bedrijven) — elk met een eigen filterregister, omdat de filtermodellen nooit kruisen tussen databases. Live aantallen updaten bij elke filterwijziging via een signal-based FilterStore, en gebruikers exporteren twee aparte lijsten in één flow met gecombineerde prijsberekening.",
      },
      {
        title: "3.800+ technologiefilters",
        description:
          "De AI Leads-database is filterbaar op de technologie waar de website van een bedrijf op draait (Shopify, WordPress, HubSpot, Salesforce — 3.800+ detecteerbare technologieën), plus TLD, talen, B2B/B2C-classificatie en geverifieerde contactdata. KVK Pro-filters dekken SBI-codes, rechtsvorm, pand- en energielabeldata en fijnmazige locatiebomen.",
      },
      {
        title: "SEO-architectuur",
        description:
          "Server-side rendering via Node/Express, tweetalig NL/EN met hreflang-paren, JSON-LD structured data, canonical tags en door Sharp gegenereerde WebP-afbeeldingen. Onderbouwd door PostgreSQL met Drizzle ORM, gedeployed op Railway, en regressie-getest met Playwright op 10 viewports.",
      },
    ],
    featuresTitle: "Belangrijkste Features",
    features: [
      {
        icon: Layers,
        title: "Dual Database",
        description: "KVK Pro (3,7M) + AI Leads (3,4M) achter één switcher",
      },
      {
        icon: Search,
        title: "Live Aantallen",
        description: "Aantal matchende records updatet bij elke filterwijziging",
      },
      {
        icon: Blocks,
        title: "3.800+ Techfilters",
        description: "Filter bedrijven op de technologie achter hun website",
      },
      {
        icon: Map,
        title: "Geografisch Zoeken",
        description: "GeoJSON-polygonen: provincies, gemeentes, postcodes",
      },
      {
        icon: Server,
        title: "Angular 21 SSR",
        description: "Server-gerenderd, crawlbaar, NL/EN met hreflang",
      },
      {
        icon: FlaskConical,
        title: "Playwright Testing",
        description: "Geautomatiseerde checks op 10 viewport-formaten",
      },
    ],
    resultsTitle: "Resultaten",
    resultsPoints: [
      "Drie grote iteraties opgeleverd terwijl de tool betalende klanten bleef bedienen",
      "7,1 miljoen bedrijfsrecords doorzoekbaar over twee databases en vier landen",
      "Live aantallen vóór export — pay-per-record vanaf €0,09, geen abonnement nodig",
      "Legacy AngularJS volledig vervangen door een onderhoudbare Angular 21 SSR-codebase",
      "Elke route server-gerenderd en indexeerbaar, met structured data en hreflang",
    ],
  },
};

const evolution = {
  en: {
    title: "From legacy to platform",
    subtitle: "The three iterations, with artifacts from each stage.",
    iterations: [
      {
        number: "1",
        title: "Refactor + geographic search",
        description:
          "Refactored the legacy Angular 1.x selection tool and added geographic search: GeoJSON polygons with Turf.js to find companies by province, arrondissement, or postal code area on the Belgian database (1.2M companies). Try it below — this is the actual map interaction.",
      },
      {
        number: "2",
        title: "Apollo-style rebuild",
        description:
          "Rebuilt the tool around industry-standard lead-gen UX, inspired by tools like Apollo: sidebar filter navigation, a credits system, live result counts, and a focus mode. Drag the slider to compare the legacy interface with this iteration.",
      },
      {
        number: "3",
        title: "Angular 21: one platform, two databases",
        description:
          "Complete platform rewrite as Angular 21 SSR. The selection tool now starts with a database choice — KVK Pro (3.8M Dutch companies from the official register) or AI Leads (3.4M web-indexed companies) — each with its own filter set, live counts, and a dual-export flow.",
      },
    ],
    beforeLabel: "Before",
    afterLabel: "After",
    dragHint: "Drag to compare",
    v3ChooserCaption: "Step 1 — database choice with live statistics",
    v3KvkCaption: "KVK Pro: 3.8M companies, live count and pricing",
    v3AiCaption: "AI Leads: 3.4M companies, same flow, own filter set",
  },
  nl: {
    title: "Van legacy naar platform",
    subtitle: "De drie iteraties, met artefacten uit elke fase.",
    iterations: [
      {
        number: "1",
        title: "Refactor + geografisch zoeken",
        description:
          "De legacy Angular 1.x selectietool gerefactord en geografisch zoeken toegevoegd: GeoJSON-polygonen met Turf.js om bedrijven te vinden per provincie, arrondissement of postcodegebied op de Belgische database (1,2M bedrijven). Probeer hieronder — dit is de echte kaartinteractie.",
      },
      {
        number: "2",
        title: "Apollo-stijl rebuild",
        description:
          "De tool herbouwd rond industry-standard lead-gen UX, geïnspireerd op tools als Apollo: sidebar-filternavigatie, een credits-systeem, live aantallen en een focus mode. Sleep de slider om de legacy-interface met deze iteratie te vergelijken.",
      },
      {
        number: "3",
        title: "Angular 21: één platform, twee databases",
        description:
          "Complete platform-rewrite als Angular 21 SSR. De selectietool begint nu met een databasekeuze — KVK Pro (3,8M Nederlandse bedrijven uit het Handelsregister) of AI Leads (3,4M web-geïndexeerde bedrijven) — elk met een eigen filterset, live aantallen en een dual-export flow.",
      },
    ],
    beforeLabel: "Voor",
    afterLabel: "Na",
    dragHint: "Sleep om te vergelijken",
    v3ChooserCaption: "Stap 1 — databasekeuze met live statistieken",
    v3KvkCaption: "KVK Pro: 3,8M bedrijven, live aantal en prijsberekening",
    v3AiCaption: "AI Leads: 3,4M bedrijven, zelfde flow, eigen filterset",
  },
};

const techStack = [
  { name: "Angular 21", color: "bg-red-500/20 text-red-300 border-red-500/30" },
  { name: "SSR", color: "bg-zinc-400/20 text-zinc-300 border-zinc-400/30" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "PostgreSQL", color: "bg-blue-600/20 text-blue-300 border-blue-600/30" },
  { name: "Drizzle", color: "bg-lime-500/20 text-lime-300 border-lime-500/30" },
  { name: "GeoJSON", color: "bg-green-500/20 text-green-300 border-green-500/30" },
  { name: "Turf.js", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
  { name: "Playwright", color: "bg-green-600/20 text-green-300 border-green-600/30" },
];

function EvolutionSection() {
  const { language } = useLanguage();
  const t = evolution[language];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-2">{t.title}</h2>
          <p className="text-zinc-400 mb-8">{t.subtitle}</p>

          <div className="grid gap-8">
            {t.iterations.map((iteration) => (
              <motion.div
                key={iteration.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 font-bold flex items-center justify-center flex-shrink-0">
                    {iteration.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {iteration.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mt-1">
                      {iteration.description}
                    </p>
                  </div>
                </div>

                {iteration.number === "1" ? (
                  <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video relative ml-12">
                    <LazyMount rootMargin="300px">
                      <BelgiumMapPreview />
                    </LazyMount>
                  </div>
                ) : null}

                {iteration.number === "2" ? (
                  <div className="ml-12">
                    <ImageCompareSlider
                      beforeImage="/projects/adhoc/Before.jpg"
                      afterImage="/projects/adhoc/After.jpg"
                      width={1769}
                      height={903}
                      beforeLabel={t.beforeLabel}
                      afterLabel={t.afterLabel}
                      beforeAlt="Legacy Bootstrap UI"
                      afterAlt="Apollo-style rebuild with sidebar filters and credits"
                      dragHint={t.dragHint}
                    />
                  </div>
                ) : null}

                {iteration.number === "3" ? (
                  <div className="ml-12 space-y-4">
                    <figure>
                      <div className="rounded-2xl overflow-hidden border border-white/10">
                        <Image
                          src="/projects/adhoc/v3-database-chooser.png"
                          alt="Database chooser: KVK Pro or AI Leads with live statistics"
                          width={1920}
                          height={1080}
                          sizes="(max-width: 896px) 100vw, 848px"
                          className="w-full h-auto block"
                        />
                      </div>
                      <figcaption className="text-xs text-zinc-500 mt-2">
                        {t.v3ChooserCaption}
                      </figcaption>
                    </figure>
                    <div className="grid md:grid-cols-2 gap-4">
                      <figure>
                        <div className="rounded-2xl overflow-hidden border border-white/10">
                          <Image
                            src="/projects/adhoc/v3-kvk-pro.png"
                            alt="KVK Pro selection tool with live count of 3.8 million companies"
                            width={1920}
                            height={1080}
                            sizes="(max-width: 896px) 100vw, 416px"
                            className="w-full h-auto block"
                          />
                        </div>
                        <figcaption className="text-xs text-zinc-500 mt-2">
                          {t.v3KvkCaption}
                        </figcaption>
                      </figure>
                      <figure>
                        <div className="rounded-2xl overflow-hidden border border-white/10">
                          <Image
                            src="/projects/adhoc/v3-ai-leads.png"
                            alt="AI Leads selection tool with live count of 3.4 million companies"
                            width={1920}
                            height={1080}
                            sizes="(max-width: 896px) 100vw, 416px"
                            className="w-full h-auto block"
                          />
                        </div>
                        <figcaption className="text-xs text-zinc-500 mt-2">
                          {t.v3AiCaption}
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AdhocPlatformPage() {
  return (
    <CaseStudyPage
      accent="orange"
      content={content}
      techStack={techStack}
      preview={<AdhocWebsitePreview />}
      extraSections={<EvolutionSection />}
    />
  );
}
