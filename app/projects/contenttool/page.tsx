"use client";

import { Bot, Rss, BarChart3, CalendarDays, Mail, Workflow } from "lucide-react";
import {
  CaseStudyPage,
  type CaseStudyContent,
} from "@/components/case-study/CaseStudyPage";
import { ContentToolPreview } from "@/components/ContentToolPreview";

const content: { en: CaseStudyContent; nl: CaseStudyContent } = {
  en: {
    backToProjects: "Back to Projects",
    title: "ContentTool",
    subtitle:
      "Agentic AI content engine that plans, writes, and schedules a company's full marketing cadence",
    badge: "Internal Tool",
    stats: [
      { value: "3/wk", label: "Social posts" },
      { value: "1/wk", label: "Blog article" },
      { value: "1/mo", label: "Newsletter" },
      { value: "Daily", label: "Scrape & score run" },
    ],
    overviewTitle: "Overview",
    overviewText:
      "ContentTool is a full-stack agentic system I built at Ad Hoc Data to run the company's content marketing on autopilot. Every day it scrapes industry sources into an inspiration pool, scores each item with Gemini, enriches promising angles with CBS open-data statistics, and drafts posts onto a content calendar — three social posts a week, a weekly blog, and a monthly newsletter.",
    challengeTitle: "The Challenge",
    challengeText:
      "Consistent, relevant B2B content takes hours of recurring manual work: finding inspiration, validating it against real data, writing in the company's voice, and keeping a steady cadence. Generic AI writing tools produce generic output because they lack the company's data context. The system needed to generate content that is grounded in actual market statistics and runs without anyone remembering to trigger it.",
    solutionTitle: "The Solution",
    solutionPoints: [
      {
        title: "Daily scrape-and-score pipeline",
        description:
          "A GitHub Actions cron triggers the daily run: httpx, BeautifulSoup and feedparser collect from industry sources (Playwright handles JS-rendered pages), then Gemini scores every item for relevance and freshness before it enters the inspiration pool.",
      },
      {
        title: "Data-grounded drafting",
        description:
          "Promising inspiration is matched against CBS open-data statistics, so generated angles and hooks reference real numbers instead of generic claims. Gemini drafts the posts; the content calendar enforces the publishing cadence.",
      },
      {
        title: "FastAPI backend, SvelteKit dashboard",
        description:
          "Python 3.12 with FastAPI and SQLAlchemy 2.0 (Alembic migrations) powers the pipeline; a typed SvelteKit + Tailwind dashboard gives the marketing team review-and-edit control before anything ships.",
      },
      {
        title: "Newsletter delivery via Brevo",
        description:
          "The monthly newsletter is assembled from the month's best-performing content and delivered through Brevo — the whole loop from inspiration to inbox is automated.",
      },
    ],
    featuresTitle: "Key Features",
    features: [
      {
        icon: Rss,
        title: "Daily Scraping",
        description: "httpx + BeautifulSoup + Playwright for JS-heavy sources",
      },
      {
        icon: BarChart3,
        title: "Gemini Scoring",
        description: "Every inspiration item scored for relevance before use",
      },
      {
        icon: Bot,
        title: "Agentic Drafting",
        description: "Angles, hooks, and full drafts generated from scored input",
      },
      {
        icon: CalendarDays,
        title: "Content Calendar",
        description: "Steady cadence: 3 socials, weekly blog, monthly newsletter",
      },
      {
        icon: Workflow,
        title: "CI-Driven",
        description: "GitHub Actions cron runs migrate → seed → scrape → score",
      },
      {
        icon: Mail,
        title: "Brevo Delivery",
        description: "Automated newsletter assembly and sending",
      },
    ],
    resultsTitle: "Results",
    resultsPoints: [
      "Live and operational for Ad Hoc Data's marketing",
      "Full weekly content cadence maintained without manual planning",
      "Content grounded in CBS statistics instead of generic AI claims",
      "Human review built in: the team approves drafts from the dashboard",
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "ContentTool",
    subtitle:
      "Agentic AI content engine die de volledige marketingcadans van een bedrijf plant, schrijft en inplant",
    badge: "Internal Tool",
    stats: [
      { value: "3/wk", label: "Social posts" },
      { value: "1/wk", label: "Blogartikel" },
      { value: "1/mnd", label: "Nieuwsbrief" },
      { value: "Dagelijks", label: "Scrape & score run" },
    ],
    overviewTitle: "Overzicht",
    overviewText:
      "ContentTool is een full-stack agentic systeem dat ik bij Ad Hoc Data bouwde om de contentmarketing op de automatische piloot te laten draaien. Elke dag scrapet het industriebronnen naar een inspiratiepool, scoort elk item met Gemini, verrijkt kansrijke invalshoeken met CBS open data, en zet concepten op een contentkalender — drie social posts per week, een wekelijkse blog en een maandelijkse nieuwsbrief.",
    challengeTitle: "De Uitdaging",
    challengeText:
      "Consistente, relevante B2B-content kost uren terugkerend handwerk: inspiratie vinden, toetsen aan echte data, schrijven in de tone of voice van het bedrijf, en een vast ritme aanhouden. Generieke AI-schrijftools leveren generieke output omdat ze de datacontext van het bedrijf missen. Het systeem moest content genereren die is onderbouwd met echte marktstatistieken en draaien zonder dat iemand eraan hoeft te denken.",
    solutionTitle: "De Oplossing",
    solutionPoints: [
      {
        title: "Dagelijkse scrape-en-score pipeline",
        description:
          "Een GitHub Actions cron start de dagelijkse run: httpx, BeautifulSoup en feedparser verzamelen uit industriebronnen (Playwright voor JS-gerenderde pagina's), waarna Gemini elk item scoort op relevantie en versheid voordat het de inspiratiepool in gaat.",
      },
      {
        title: "Data-onderbouwd schrijven",
        description:
          "Kansrijke inspiratie wordt gematcht met CBS open-datastatistieken, zodat gegenereerde invalshoeken en hooks naar echte cijfers verwijzen in plaats van generieke claims. Gemini schrijft de concepten; de contentkalender bewaakt de publicatiecadans.",
      },
      {
        title: "FastAPI backend, SvelteKit dashboard",
        description:
          "Python 3.12 met FastAPI en SQLAlchemy 2.0 (Alembic-migraties) drijft de pipeline aan; een getypeerd SvelteKit + Tailwind dashboard geeft het marketingteam review- en bewerkcontrole voordat iets live gaat.",
      },
      {
        title: "Nieuwsbrief via Brevo",
        description:
          "De maandelijkse nieuwsbrief wordt samengesteld uit de best presterende content van die maand en verstuurd via Brevo — de hele loop van inspiratie tot inbox is geautomatiseerd.",
      },
    ],
    featuresTitle: "Belangrijkste Features",
    features: [
      {
        icon: Rss,
        title: "Dagelijks Scrapen",
        description: "httpx + BeautifulSoup + Playwright voor JS-zware bronnen",
      },
      {
        icon: BarChart3,
        title: "Gemini Scoring",
        description: "Elk inspiratie-item gescoord op relevantie vóór gebruik",
      },
      {
        icon: Bot,
        title: "Agentic Schrijven",
        description: "Invalshoeken, hooks en volledige concepten uit gescoorde input",
      },
      {
        icon: CalendarDays,
        title: "Contentkalender",
        description: "Vast ritme: 3 socials, wekelijkse blog, maandelijkse nieuwsbrief",
      },
      {
        icon: Workflow,
        title: "CI-Gedreven",
        description: "GitHub Actions cron draait migrate → seed → scrape → score",
      },
      {
        icon: Mail,
        title: "Brevo Verzending",
        description: "Geautomatiseerde samenstelling en verzending van de nieuwsbrief",
      },
    ],
    resultsTitle: "Resultaten",
    resultsPoints: [
      "Live en operationeel voor de marketing van Ad Hoc Data",
      "Volledige wekelijkse contentcadans zonder handmatige planning",
      "Content onderbouwd met CBS-statistieken in plaats van generieke AI-claims",
      "Menselijke review ingebouwd: het team keurt concepten goed vanuit het dashboard",
    ],
  },
};

const techStack = [
  { name: "Python", color: "bg-sky-600/20 text-sky-300 border-sky-600/30" },
  { name: "FastAPI", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
  { name: "SvelteKit", color: "bg-orange-600/20 text-orange-300 border-orange-600/30" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "Gemini", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
  { name: "GitHub Actions", color: "bg-blue-400/20 text-blue-300 border-blue-400/30" },
];

export default function ContentToolPage() {
  return (
    <CaseStudyPage
      accent="sky"
      content={content}
      techStack={techStack}
      preview={<ContentToolPreview />}
    />
  );
}
