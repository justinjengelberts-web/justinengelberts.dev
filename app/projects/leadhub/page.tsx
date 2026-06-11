"use client";

import { Bot, Plug, BarChart3, Send, CreditCard, Database } from "lucide-react";
import {
  CaseStudyPage,
  type CaseStudyContent,
} from "@/components/case-study/CaseStudyPage";
import { LeadHubPreview } from "@/components/LeadHubPreview";

const content: { en: CaseStudyContent; nl: CaseStudyContent } = {
  en: {
    backToProjects: "Back to Projects",
    title: "LeadHub",
    subtitle:
      "Personal AI command center: agent platform, CRM, and analytics cockpit on one serverless backend",
    badge: "AI Platform",
    stats: [
      { value: "48+", label: "Edge functions" },
      { value: "4", label: "AI providers" },
      { value: "3", label: "Sites on one backend" },
      { value: "24/7", label: "Agents online" },
    ],
    overviewTitle: "Overview",
    overviewText:
      "LeadHub is the platform that powers my personal AI infrastructure: a React 19 + Supabase application running 48+ production edge functions for AI agents, lead management, email automation, billing, and analytics. Its most visible component is the Justin AI widget — the chat agent running live on this website, answering questions about my work and booking appointments in real time.",
    challengeTitle: "The Challenge",
    challengeText:
      "Running multiple AI agents in production raises hard platform questions: how to switch between AI providers per agent without rewrites, how to keep long domain-specific system prompts fast and affordable, how to hand a conversation to a human mid-session, and how to connect agent output to external CRMs. Off-the-shelf automation tools solve none of this with enough control — so I built the platform myself.",
    solutionTitle: "The Solution",
    solutionPoints: [
      {
        title: "Multi-provider agent runtime",
        description:
          "Each agent is configured with its own provider (Gemini, Claude, Mistral, or OpenAI), system prompt, and fallback chain. Domain-specific prompts run 650+ lines, with caching strategies to keep response cost and latency down.",
      },
      {
        title: "The Justin AI widget",
        description:
          "An embeddable chat widget — live on this site — combining canned Q&A, free AI conversation, and real-time appointment booking. Conversations stream through Supabase Edge Functions with proactive nudge triggers and a dark theme matching the host site.",
      },
      {
        title: "HubSpot OAuth2 platform app",
        description:
          "A verified HubSpot app (platform 2025.2) with a CRM Record Card that shows AI conversation transcripts and sync status inside HubSpot itself, including live staff takeover of an ongoing agent conversation.",
      },
      {
        title: "CRM & lead pipeline",
        description:
          "A full CRM sits behind the agents: leads flow in from the connected sites with a combined lead score, pipeline and MRR tracking, and Postmark email flows triggered by lifecycle status — so agent conversations turn into a managed sales pipeline automatically.",
      },
      {
        title: "Analytics cockpit",
        description:
          "Google Search Console, GA4, and Microsoft Clarity wired into one dashboard with real-time KPIs and anomaly alerts — one place to watch every property I run.",
      },
    ],
    featuresTitle: "Key Features",
    features: [
      {
        icon: Bot,
        title: "Agent Runtime",
        description: "Per-agent provider config with multi-model fallback",
      },
      {
        icon: Plug,
        title: "HubSpot App",
        description: "OAuth2 platform app with CRM Record Card integration",
      },
      {
        icon: Database,
        title: "RAG on pgvector",
        description: "Knowledge bases ground every agent's answers",
      },
      {
        icon: Send,
        title: "Email Automation",
        description: "Postmark-driven flows triggered by lead lifecycle",
      },
      {
        icon: CreditCard,
        title: "Stripe Billing",
        description: "Subscription and checkout handling on edge functions",
      },
      {
        icon: BarChart3,
        title: "Analytics Cockpit",
        description: "GSC + GA4 + Clarity unified with anomaly alerts",
      },
    ],
    resultsTitle: "Results",
    resultsPoints: [
      "48+ Supabase Edge Functions running in production",
      "One Supabase backend serves three sites: this portfolio, crewvee.com, and LeadHub itself",
      "The Justin AI widget answers visitors on this site 24/7 — try it",
      "HubSpot integration verified end-to-end, including live human takeover",
      "Four AI providers orchestrated behind one agent configuration model",
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "LeadHub",
    subtitle:
      "Persoonlijk AI command center: agent-platform, CRM en analytics-cockpit op één serverless backend",
    badge: "AI Platform",
    stats: [
      { value: "48+", label: "Edge functions" },
      { value: "4", label: "AI-providers" },
      { value: "3", label: "Sites op één backend" },
      { value: "24/7", label: "Agents online" },
    ],
    overviewTitle: "Overzicht",
    overviewText:
      "LeadHub is het platform achter mijn persoonlijke AI-infrastructuur: een React 19 + Supabase applicatie met 48+ productie edge functions voor AI-agents, leadbeheer, e-mailautomatisering, facturering en analytics. Het meest zichtbare onderdeel is de Justin AI widget — de chatagent die live op deze website draait, vragen over mijn werk beantwoordt en realtime afspraken inplant.",
    challengeTitle: "De Uitdaging",
    challengeText:
      "Meerdere AI-agents in productie draaien levert lastige platformvragen op: hoe wissel je per agent van AI-provider zonder herbouw, hoe houd je lange domeinspecifieke system prompts snel en betaalbaar, hoe neemt een mens een gesprek halverwege over, en hoe koppel je agent-output aan externe CRM's? Kant-en-klare automatiseringstools lossen dit niet met genoeg controle op — dus bouwde ik het platform zelf.",
    solutionTitle: "De Oplossing",
    solutionPoints: [
      {
        title: "Multi-provider agent runtime",
        description:
          "Elke agent heeft een eigen provider (Gemini, Claude, Mistral of OpenAI), system prompt en fallback-keten. Domeinspecifieke prompts beslaan 650+ regels, met caching-strategieën om kosten en latency laag te houden.",
      },
      {
        title: "De Justin AI widget",
        description:
          "Een embedbare chatwidget — live op deze site — die voorgedefinieerde Q&A, vrije AI-conversatie en realtime afspraakplanning combineert. Gesprekken streamen via Supabase Edge Functions, met proactieve nudge-triggers en een dark theme dat meekleurt met de hostsite.",
      },
      {
        title: "HubSpot OAuth2 platform-app",
        description:
          "Een geverifieerde HubSpot-app (platform 2025.2) met een CRM Record Card die AI-gesprekstranscripten en sync-status in HubSpot zelf toont, inclusief live overname van een lopend agentgesprek door een medewerker.",
      },
      {
        title: "CRM & lead pipeline",
        description:
          "Achter de agents zit een volwaardig CRM: leads stromen binnen vanaf de gekoppelde sites met een gecombineerde leadscore, pipeline- en MRR-tracking, en Postmark e-mailflows getriggerd door lifecycle-status — zo worden agentgesprekken automatisch een beheerde salespipeline.",
      },
      {
        title: "Analytics-cockpit",
        description:
          "Google Search Console, GA4 en Microsoft Clarity samengebracht in één dashboard met realtime KPI's en anomaliemeldingen — één plek om elke property die ik beheer in de gaten te houden.",
      },
    ],
    featuresTitle: "Belangrijkste Features",
    features: [
      {
        icon: Bot,
        title: "Agent Runtime",
        description: "Provider-configuratie per agent met multi-model fallback",
      },
      {
        icon: Plug,
        title: "HubSpot App",
        description: "OAuth2 platform-app met CRM Record Card integratie",
      },
      {
        icon: Database,
        title: "RAG op pgvector",
        description: "Kennisbanken onderbouwen de antwoorden van elke agent",
      },
      {
        icon: Send,
        title: "E-mailautomatisering",
        description: "Postmark-flows getriggerd door de lead-lifecycle",
      },
      {
        icon: CreditCard,
        title: "Stripe Facturering",
        description: "Abonnementen en checkout op edge functions",
      },
      {
        icon: BarChart3,
        title: "Analytics-Cockpit",
        description: "GSC + GA4 + Clarity verenigd met anomaliemeldingen",
      },
    ],
    resultsTitle: "Resultaten",
    resultsPoints: [
      "48+ Supabase Edge Functions in productie",
      "Eén Supabase-backend bedient drie sites: dit portfolio, crewvee.com en LeadHub zelf",
      "De Justin AI widget beantwoordt bezoekers op deze site 24/7 — probeer maar",
      "HubSpot-integratie end-to-end geverifieerd, inclusief live menselijke overname",
      "Vier AI-providers georkestreerd achter één agent-configuratiemodel",
    ],
  },
};

const techStack = [
  { name: "React", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "Supabase", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { name: "Edge Functions", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { name: "pgvector", color: "bg-emerald-600/20 text-emerald-300 border-emerald-600/30" },
  { name: "Stripe", color: "bg-purple-600/20 text-purple-300 border-purple-600/30" },
  { name: "HubSpot", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
];

export default function LeadHubPage() {
  return (
    <CaseStudyPage
      accent="violet"
      content={content}
      techStack={techStack}
      preview={<LeadHubPreview />}
    />
  );
}
