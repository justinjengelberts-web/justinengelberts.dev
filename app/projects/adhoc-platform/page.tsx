"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Layers,
  Search,
  Blocks,
  Globe2,
  ShoppingCart,
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
import { AdhocDatabaseShowcase } from "@/components/AdhocDatabaseShowcase";
import { useLanguage } from "@/lib/language-context";

const content: { en: CaseStudyContent; nl: CaseStudyContent } = {
  en: {
    backToProjects: "Back to Projects",
    title: "Ad Hoc Data: Platform & Website",
    subtitle:
      "A complete Angular 21 SSR rebuild for a data platform, public website, and self-service customer journey",
    badge: "Launch-ready Platform",
    stats: [
      { value: "7.1M", label: "Company records (2 databases)" },
      { value: "3", label: "Refactor iterations" },
      { value: "2", label: "Languages (NL / EN)" },
      { value: "4", label: "Countries (AI Leads)" },
    ],
    overviewTitle: "Overview",
    overviewText:
      "Over three refactor iterations I rebuilt Ad Hoc Data from a legacy AngularJS marketing site and selection tool into a complete Angular 21 SSR platform. The rebuild brings the public website, selection and checkout journey, customer portal, API documentation, and SEO content architecture into one coherent product. Its two data products, Register-data and Online-data, give customers access to 7.1 million company records across the Netherlands, Belgium, Germany, and France.",
    challengeTitle: "The Challenge",
    challengeText:
      "The original AngularJS estate was client-rendered, hard to maintain, and centred around one database. The challenge grew beyond replacing a selection tool: the business needed a trustworthy public presence, two different data products, a guided self-service flow, a customer area, and a crawlable content surface. All of that had to feel like one product while the existing service continued to support paying customers.",
    solutionTitle: "The Solution",
    solutionPoints: [
      {
        title: "A product platform, not a brochure site",
        description:
          "The new frontend covers the full journey: a bilingual public website, product and industry pages, selection starts, checkout, portal screens, API documentation, knowledge-base content, cases, and interactive tools. A light-first navy and orange design system gives all of those surfaces one recognisable, trustworthy visual language.",
      },
      {
        title: "Two data products, one guided flow",
        description:
          "Customers start by choosing Register-data or Online-data, each with its own filter model and strengths. Live counts, availability, and pricing make the process legible before export. The same product language carries through selection, checkout, portal, and API documentation instead of leaving users to bridge disconnected tools.",
      },
      {
        title: "SEO and content as product infrastructure",
        description:
          "The public platform has a dedicated content and discovery layer: industry and technology routes, comparison pages, a knowledge base, data pages, cases, calculators, and legal information. Server-side rendering, language pairs, canonical URLs, structured data, and image optimisation make that surface understandable to people and indexable by search engines.",
      },
      {
        title: "Quality built into the rebuild",
        description:
          "The app is server-rendered through Angular SSR and Node/Express, with a PostgreSQL and Drizzle data layer where the frontend needs it. Playwright coverage and a dedicated mobile audit keep the large route surface responsive, accessible, and stable across viewport sizes.",
      },
    ],
    featuresTitle: "Key Features",
    features: [
      {
        icon: Layers,
        title: "Public Platform",
        description: "Marketing, product, content, legal, and support surfaces in one frontend",
      },
      {
        icon: Search,
        title: "Guided Customer Journey",
        description: "Selection, live counts, checkout, portal, and API access designed as one flow",
      },
      {
        icon: Blocks,
        title: "Two Data Products",
        description: "Register-data and Online-data with distinct filters and international reach",
      },
      {
        icon: Globe2,
        title: "Bilingual SEO Architecture",
        description: "NL and EN routes with SSR, hreflang, structured data, and canonical URLs",
      },
      {
        icon: ShoppingCart,
        title: "Self-service Commerce",
        description: "A clear path from market selection to order and account management",
      },
      {
        icon: FlaskConical,
        title: "Playwright Testing",
        description: "Automated checks across 10 viewport sizes",
      },
    ],
    resultsTitle: "Results",
    resultsPoints: [
      "A complete, launch-ready frontend for Ad Hoc Data instead of a standalone tool refresh",
      "7.1 million company records searchable across two databases and four countries",
      "One coherent self-service journey from discovery through selection, checkout, and portal",
      "Legacy AngularJS fully replaced by a maintainable Angular 21 SSR codebase",
      "A scalable bilingual content surface built for search visibility and ongoing expansion",
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "Ad Hoc Data: Platform & Website",
    subtitle:
      "Een complete Angular 21 SSR-rebuild voor een dataplatform, publieke website en self-service customer journey",
    badge: "Klaar voor livegang",
    stats: [
      { value: "7,1M", label: "Bedrijfsrecords (2 databases)" },
      { value: "3", label: "Refactor-iteraties" },
      { value: "2", label: "Talen (NL / EN)" },
      { value: "4", label: "Landen (AI Leads)" },
    ],
    overviewTitle: "Overzicht",
    overviewText:
      "In drie refactor-iteraties bouwde ik Ad Hoc Data opnieuw op, van legacy AngularJS-marketingsite en selectietool naar een compleet Angular 21 SSR-platform. De rebuild brengt de publieke website, selectie- en checkoutflow, klantportal, API-documentatie en SEO-contentarchitectuur samen in één product. De twee databronnen, Register-data en Online-data, geven klanten toegang tot 7,1 miljoen bedrijfsrecords in Nederland, België, Duitsland en Frankrijk.",
    challengeTitle: "De Uitdaging",
    challengeText:
      "De oorspronkelijke AngularJS-omgeving was client-side gerenderd, lastig te onderhouden en gebouwd rond één database. De opgave werd groter dan een selectietool vervangen: het bedrijf had een betrouwbare publieke aanwezigheid, twee verschillende dataproducten, een begeleide self-serviceflow, een klantomgeving en een indexeerbaar contentoppervlak nodig. Alles moest als één product voelen, terwijl de bestaande service betalende klanten bleef ondersteunen.",
    solutionTitle: "De Oplossing",
    solutionPoints: [
      {
        title: "Een productplatform, geen brochuresite",
        description:
          "De nieuwe frontend bestrijkt de volledige klantreis: een tweetalige publieke website, product- en branchepagina’s, starts voor selecties, checkout, portalschermen, API-documentatie, kennisbankcontent, cases en interactieve tools. Een licht-first navy-oranje design system geeft al die onderdelen één herkenbare, betrouwbare visuele taal.",
      },
      {
        title: "Twee databronnen, één begeleide flow",
        description:
          "Klanten kiezen eerst tussen Register-data en Online-data, elk met een eigen filtermodel en eigen sterke kanten. Live aantallen, beschikbaarheid en prijs maken de uitkomst duidelijk vóór export. Dezelfde producttaal loopt door in selectie, checkout, portal en API-documentatie, in plaats van dat gebruikers losse tools aan elkaar moeten knopen.",
      },
      {
        title: "SEO en content als productinfrastructuur",
        description:
          "Het publieke platform heeft een eigen content- en discoverabilitylaag: branche- en technologieroutes, vergelijkingspagina’s, kennisbank, datapagina’s, cases, calculators en juridische informatie. Server-side rendering, taalparen, canonical URL’s, structured data en beeldoptimalisatie maken dat oppervlak begrijpelijk voor bezoekers en indexeerbaar voor zoekmachines.",
      },
      {
        title: "Kwaliteit ingebouwd in de rebuild",
        description:
          "De app draait server-side via Angular SSR en Node/Express, met waar nodig een PostgreSQL- en Drizzle-datalaag. Playwright-coverage en een aparte mobile audit houden het grote routeoppervlak responsief, toegankelijk en stabiel op verschillende viewportformaten.",
      },
    ],
    featuresTitle: "Belangrijkste Features",
    features: [
      {
        icon: Layers,
        title: "Publiek platform",
        description: "Marketing, product, content, juridisch en support in één frontend",
      },
      {
        icon: Search,
        title: "Begeleide klantreis",
        description: "Selectie, live aantallen, checkout, portal en API-toegang als één flow",
      },
      {
        icon: Blocks,
        title: "Twee dataproducten",
        description: "Register-data en Online-data met eigen filters en internationaal bereik",
      },
      {
        icon: Globe2,
        title: "Tweetalige SEO-architectuur",
        description: "NL- en EN-routes met SSR, hreflang, structured data en canonical URL’s",
      },
      {
        icon: ShoppingCart,
        title: "Self-service commerce",
        description: "Een heldere route van marktselectie naar bestelling en accountbeheer",
      },
      {
        icon: FlaskConical,
        title: "Playwright Testing",
        description: "Geautomatiseerde checks op 10 viewport-formaten",
      },
    ],
    resultsTitle: "Resultaten",
    resultsPoints: [
      "Een complete frontend klaar voor livegang, in plaats van alleen een vernieuwde tool",
      "7,1 miljoen bedrijfsrecords doorzoekbaar over twee databases en vier landen",
      "Eén consistente self-serviceflow van ontdekking via selectie en checkout naar het portal",
      "Legacy AngularJS volledig vervangen door een onderhoudbare Angular 21 SSR-codebase",
      "Een schaalbaar tweetalig contentoppervlak gebouwd voor vindbaarheid en verdere groei",
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
        title: "Continuity-first tool redesign",
        description:
          "The interim redesign deliberately stayed close to the workflow customers already knew: a clear tab strip, a broad filter workspace, and a persistent selection summary. Under that familiar shell, the tool moved to reusable filter components and a shared state layer. Drag to compare the legacy interface with this renewed working layout.",
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
    v3ToolTitle: "Step 2 — a familiar route for each data source",
    v3ToolIntro:
      "Register-data and Online-data each use the filter groups that fit their source. What stays consistent is a clear selection, live count, preview, and export flow — without forcing two distinct data sources into one generic screen.",
    v3SwitcherLabel: "Switch database view",
    v3KvkDetail: "Official register data with location, industry, legal-form, and property filters.",
    v3AiDetail: "Web-indexed company data with technology, contact, language, and classification filters.",
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
        title: "Redesign met een vertrouwde werkwijze",
        description:
          "De tussenversie bleef bewust dicht bij de werkwijze die klanten al kenden: een duidelijke tabstrip, een brede filterwerkruimte en een vaste selectiesamenvatting. Onder die vertrouwde shell verhuisde de tool naar herbruikbare filtercomponenten en één gedeelde statelaag. Sleep om de legacy-interface met deze vernieuwde werkende layout te vergelijken.",
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
    v3ToolTitle: "Stap 2 — een vertrouwde route per databron",
    v3ToolIntro:
      "Register-data en Online-data krijgen allebei filtergroepen die bij de bron passen. Wat gelijk blijft: een heldere selectie, live aantal, preview en exportflow — zonder twee verschillende databronnen in één generiek scherm te duwen.",
    v3SwitcherLabel: "Wissel databronweergave",
    v3KvkDetail: "Officiële registerdata met locatie-, branche-, rechtsvorm- en pandfilters.",
    v3AiDetail: "Webgeïndexeerde bedrijfsdata met technologie-, contact-, taal- en classificatiefilters.",
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

const engineering = {
  en: {
    eyebrow: "Selection tool engineering",
    title: "Replacing a growing tangle with a system that can evolve",
    intro:
      "The refactor was not a reskin. The selection tool moved from controller-led behaviour into an explicit architecture: a single state layer, configuration-driven filters, deterministic queries, and visible failure states.",
    before: "Before: coupled behaviour",
    after: "After: explicit boundaries",
    source: "Data source",
    registry: "Filter registry",
    state: "Angular signal state",
    query: "Query builder",
    surface: "Count, preview & export",
    dualState: "Independent state per data product",
    dualStateDetail:
      "Register-data and Online-data keep their own models, options, counts, and loading state while sharing one consistent journey.",
    shareable: "Shareable selections",
    shareableDetail:
      "Filters are serialised into compact URL parameters and restored through the same registry, so a selection can be revisited without hidden state.",
    stale: "Stale-request protection",
    staleDetail:
      "The record browser assigns request IDs and ignores an out-of-date response, so quick filter or page changes cannot paint the wrong results.",
    observabilityEyebrow: "Feedback & diagnostics",
    observabilityTitle: "A visual issue arrives with its context",
    observabilityIntro:
      "The team can pin feedback to a real page element instead of reporting a vague page-level problem. The issue carries the page URL, selector, text fragment, priority, optional screenshot, and a reply thread.",
    feedback: "Feedback record",
    page: "page URL + element selector",
    evidence: "text fragment + screenshot",
    triage: "priority + status + replies",
    server: "Server diagnostics",
    serverDetail:
      "Failed feedback requests log a scoped endpoint name, error message, underlying cause, and stacktrace before returning a typed 500 response. The UI separately handles rate limiting and recoverable errors.",
    asyncUpload: "Screenshot upload runs after the initial submit, so feedback is saved without waiting for image rendering.",
  },
  nl: {
    eyebrow: "Engineering van de selectietool",
    title: "Spaghetti-logica vervangen door een systeem dat kan meegroeien",
    intro:
      "De refactor was geen reskin. De selectietool ging van controllergedreven gedrag naar een expliciete architectuur: één centrale statelaag, configuratiegedreven filters, voorspelbare queries en zichtbare fouttoestanden.",
    before: "Eerst: gekoppeld gedrag",
    after: "Nu: expliciete grenzen",
    source: "Databron",
    registry: "Filterregistratie",
    state: "Angular signal-state",
    query: "Query builder",
    surface: "Aantal, preview & export",
    dualState: "Onafhankelijke state per dataproduct",
    dualStateDetail:
      "Register-data en Online-data houden hun eigen modellen, opties, aantallen en laadstatus, maar delen één consistente journey.",
    shareable: "Deelbare selecties",
    shareableDetail:
      "Filters worden als compacte URL-parameters opgeslagen en via dezelfde registry hersteld. Zo blijft een selectie reproduceerbaar, zonder verborgen state.",
    stale: "Bescherming tegen verouderde requests",
    staleDetail:
      "De recordbrowser kent request-ID's toe en negeert een achterhaalde response. Snel wisselen van filter of pagina kan daardoor niet de verkeerde resultaten tonen.",
    observabilityEyebrow: "Feedback & diagnostiek",
    observabilityTitle: "Een visueel issue komt binnen mét context",
    observabilityIntro:
      "Het team kan feedback vastpinnen op een echt pagina-element in plaats van een vaag probleem op paginaniveau te melden. Een issue bevat de pagina-URL, selector, tekstfragment, prioriteit, optionele screenshot en een reactiethread.",
    feedback: "Feedbackrecord",
    page: "pagina-URL + elementselector",
    evidence: "tekstfragment + screenshot",
    triage: "prioriteit + status + reacties",
    server: "Serverdiagnostiek",
    serverDetail:
      "Mislukte feedbackrequests loggen een scoped endpointnaam, foutmelding, onderliggende oorzaak en stacktrace voordat een getypeerde 500-response terugkomt. De UI handelt rate limits en herstelbare fouten afzonderlijk af.",
    asyncUpload: "De screenshot uploadt na de eerste submit, zodat feedback opgeslagen wordt zonder op beeldrendering te wachten.",
  },
};

function EngineeringSection() {
  const { language } = useLanguage();
  const t = engineering[language];

  const pipeline = [t.source, t.registry, t.state, t.query, t.surface];

  return (
    <section className="border-y border-white/10 bg-zinc-950/60 px-6 py-20 sm:py-24">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-orange-300">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
            {t.intro}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.75fr)]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                <span className="h-2 w-2 rounded-full bg-zinc-600" />
                <span className="h-2 w-2 rounded-full bg-zinc-700" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                filter.store.ts
              </span>
            </div>

            <div className="grid border-b border-white/10 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="border-b border-white/10 px-5 py-5 sm:border-b-0 sm:border-r">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  {t.before}
                </p>
                <div className="mt-4 space-y-2 opacity-60">
                  {['controller', 'template', 'api call', 'export'].map((item, index) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-500">{String(index + 1).padStart(2, '0')}</span>
                      <span className="h-px flex-1 bg-zinc-700" />
                      <span className="rounded bg-zinc-800 px-2 py-1 font-mono text-[11px] text-zinc-400">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 py-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-300">
                  {t.after}
                </p>
                <div className="mt-4 space-y-2.5">
                  <p className="font-mono text-xs text-zinc-400">
                    <span className="text-orange-300">const</span> activeDb = signal&lt;DatabaseId&gt;()
                  </p>
                  <p className="font-mono text-xs text-zinc-400">
                    <span className="text-orange-300">const</span> registry = computed(activeDb)
                  </p>
                  <p className="font-mono text-xs text-zinc-400">
                    <span className="text-orange-300">const</span> query = buildQueryFor(db, &apos;count&apos;)
                  </p>
                  <p className="font-mono text-xs text-zinc-400">
                    <span className="text-orange-300">const</span> url = serializeFilters(models, registry)
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-6">
              <div className="flex flex-wrap items-center gap-y-2">
                {pipeline.map((step, index) => (
                  <div key={step} className="flex items-center">
                    <span className="rounded-md border border-white/10 bg-zinc-950 px-2.5 py-1.5 font-mono text-[10px] text-zinc-300">
                      {step}
                    </span>
                    {index < pipeline.length - 1 ? (
                      <span className="mx-1.5 h-px w-4 bg-orange-400/60 sm:w-7" aria-hidden="true" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="border-t border-orange-400/70 pt-5"
          >
            <div className="space-y-6">
              {[
                [t.dualState, t.dualStateDetail],
                [t.shareable, t.shareableDetail],
                [t.stale, t.staleDetail],
              ].map(([title, detail], index) => (
                <div key={title} className="grid grid-cols-[1.5rem_1fr] gap-3">
                  <span className="pt-0.5 font-mono text-xs text-orange-300">0{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-medium text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-orange-300">
              {t.observabilityEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {t.observabilityTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">{t.observabilityIntro}</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50">
            <div className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                ['01', t.page],
                ['02', t.evidence],
                ['03', t.triage],
              ].map(([number, label]) => (
                <div key={number} className="px-4 py-4">
                  <span className="font-mono text-[10px] text-orange-300">{number}</span>
                  <p className="mt-2 text-sm font-medium leading-snug text-zinc-200">{label}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 px-5 py-5">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">{t.server}</p>
                <span className="rounded border border-red-400/30 bg-red-400/10 px-2 py-1 font-mono text-[10px] text-red-200">
                  500 / typed response
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{t.serverDetail}</p>
              <p className="mt-4 border-l border-orange-400/70 pl-3 text-xs leading-relaxed text-zinc-500">{t.asyncUpload}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EvolutionSection() {
  const { language } = useLanguage();
  const t = evolution[language];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-5xl">
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
                  <div className="sm:ml-12">
                    <ImageCompareSlider
                      beforeImage="/projects/adhoc/Before.jpg"
                      afterImage="/projects/adhoc/v2-tool.png"
                      width={1570}
                      height={883}
                      beforeLabel={t.beforeLabel}
                      afterLabel={t.afterLabel}
                      beforeAlt="Legacy selection tool interface"
                      afterAlt="Renewed selection tool with tabbed filters and a fixed selection summary"
                      dragHint={t.dragHint}
                      beforeObjectFit="contain"
                    />
                  </div>
                ) : null}

                {iteration.number === "3" ? (
                  <div className="mt-6 space-y-4 sm:ml-12">
                    <figure>
                      <div className="rounded-2xl overflow-hidden border border-white/10">
                        <Image
                          src="/projects/adhoc/v3-database-chooser.png"
                          alt="Database chooser: KVK Pro or AI Leads with live statistics"
                          width={1920}
                          height={1080}
                          sizes="(max-width: 1024px) 100vw, 976px"
                          className="w-full h-auto block"
                        />
                      </div>
                      <figcaption className="text-xs text-zinc-500 mt-2">
                        {t.v3ChooserCaption}
                      </figcaption>
                    </figure>
                    <AdhocDatabaseShowcase
                      copy={{
                        title: t.v3ToolTitle,
                        intro: t.v3ToolIntro,
                        switcherLabel: t.v3SwitcherLabel,
                        kvkTab: "KVK Pro",
                        aiTab: "AI Leads",
                        kvkDetail: t.v3KvkDetail,
                        aiDetail: t.v3AiDetail,
                        kvkCaption: t.v3KvkCaption,
                        aiCaption: t.v3AiCaption,
                      }}
                    />
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
      preview={<AdhocWebsitePreview variant="case-study" />}
      extraSections={<><EvolutionSection /><EngineeringSection /></>}
    />
  );
}
