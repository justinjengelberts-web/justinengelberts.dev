"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Bot, Database, Zap, Shield, Link2, BarChart2, Lock } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { CrewVeeCRMPreview } from "@/components/CrewVeeCRMPreview";

const content = {
  en: {
    backToProjects: "Back to Projects",
    title: "CrewVee CRM",
    subtitle: "Full-Stack B2B CRM with Agentic AI",
    internalBadge: "Internal Tool",
    overview: "Overview",
    overviewText: "CrewVee CRM is a full-stack B2B SaaS CRM I built for internal sales operations. It combines a traditional lead management pipeline with autonomous AI sales agents that qualify leads 24/7 via website chat. The platform supports multi-LLM configurations (Claude, GPT-4o, Gemini, Mistral), RAG-powered knowledge bases, and deep CRM integrations — all deployed on Supabase Edge Functions for near-zero latency.",
    challenge: "The Challenge",
    challengeText: "Sales teams spend hours on repetitive lead qualification, answering the same questions, and manually logging CRM activity. I needed a system where an AI agent handles the top of the funnel autonomously — capturing leads from website visitors, qualifying them through conversation, and syncing the results directly into a CRM pipeline. The architecture had to support multiple LLM providers, custom knowledge bases per agent, and real-time conversation handoff to human staff.",
    solution: "The Solution",
    solutionPoints: [
      {
        title: "Agentic AI Sales Engine",
        description: "Each agent is fully configurable: system prompt, LLM provider (Claude, GPT-4o, Gemini, Mistral), temperature, max tokens, and conversation history limit. Agents run on Supabase Edge Functions with streaming responses and automatic lead capture via regex extraction of email, phone, name, and company from conversation context."
      },
      {
        title: "RAG-Powered Knowledge Base",
        description: "Documents (PDF, text, website scrape) are chunked and embedded into pgvector. At inference time the agent retrieves the 5 most relevant chunks via semantic search (cosine similarity threshold 0.5) to ground its responses in accurate product/pricing information."
      },
      {
        title: "CRM Integrations (OAuth + API key)",
        description: "Two-mode authentication supports OAuth flows for HubSpot and Pipedrive, and API key auth for Salesforce, Zoho, and ActiveCampaign. Field mappings are configurable per agent, with a full sync log tracking lead_push, deal_create, and activity_log events."
      },
      {
        title: "Lead Pipeline & Scoring",
        description: "Leads flow through a status pipeline: new → contacted → qualified → demo_scheduled → proposal_sent → won/lost. Each lead has a composite ML + manual score, estimated MRR contribution, and a next_action_date for follow-up scheduling."
      }
    ],
    techStack: "Technology Stack",
    results: "What It Delivers",
    resultsPoints: [
      "24/7 AI lead qualification without human intervention on top-of-funnel",
      "Multi-LLM flexibility — switch between Claude, GPT-4o, Gemini per agent",
      "Automatic lead capture from unstructured conversation (zero friction)",
      "5 CRM integrations with configurable field mapping and audit trail",
      "RAG knowledge base with semantic search — agents answer from real product data",
      "Real-time staff takeover: jump into any live conversation mid-session",
      "Package-based feature gating enforced at Edge Function level, not just UI"
    ],
    keyFeatures: "Key Features",
    features: [
      { icon: Bot, title: "AI Agents", description: "Autonomous inbound sales agents with configurable LLM, prompt, and conversation limits" },
      { icon: Database, title: "RAG Knowledge Base", description: "Vector search over uploaded documents and scraped website content" },
      { icon: Link2, title: "CRM Sync", description: "OAuth + API key integrations with HubSpot, Pipedrive, Salesforce, Zoho, ActiveCampaign" },
      { icon: Zap, title: "Edge Functions", description: "Streaming AI responses on Supabase Deno edge for near-zero latency" },
      { icon: Shield, title: "Rate Limiting", description: "Per-visitor 60 msg/hr limit + CORS origin validation at the edge" },
      { icon: BarChart2, title: "Pipeline Analytics", description: "Weighted pipeline, MRR tracking, lead scoring, and overdue action alerts" },
    ],
    stats: [
      { value: "24/7", label: "Lead Qualification" },
      { value: "4", label: "LLM Providers" },
      { value: "5", label: "CRM Integrations" },
      { value: "RAG", label: "Knowledge Base" },
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "CrewVee CRM",
    subtitle: "Full-Stack B2B CRM met Agentic AI",
    internalBadge: "Intern Tool",
    overview: "Overzicht",
    overviewText: "CrewVee CRM is een full-stack B2B SaaS CRM dat ik heb gebouwd voor interne salesoperaties. Het combineert een traditionele lead management pipeline met autonome AI-salesagenten die leads 24/7 kwalificeren via websitechat. Het platform ondersteunt multi-LLM configuraties (Claude, GPT-4o, Gemini, Mistral), RAG-powered kennisbanken en diepgaande CRM-integraties — gebouwd op Supabase Edge Functions.",
    challenge: "De Uitdaging",
    challengeText: "Salesteams besteden veel tijd aan repetitieve lead kwalificatie, het beantwoorden van dezelfde vragen en het handmatig loggen van CRM-activiteit. Ik had een systeem nodig waarbij een AI-agent de bovenkant van de funnel autonoom afhandelt — leads opvangen via websitebezoekers, kwalificeren via gesprek en de resultaten direct in een CRM-pipeline synchroniseren. De architectuur moest meerdere LLM-providers ondersteunen, aangepaste kennisbanken per agent en real-time gespreksovername door menselijke medewerkers.",
    challenge2: "",
    solution: "De Oplossing",
    solutionPoints: [
      {
        title: "Agentic AI Sales Engine",
        description: "Elke agent is volledig configureerbaar: systeem-prompt, LLM-provider (Claude, GPT-4o, Gemini, Mistral), temperature, max tokens en gespreksgeschiedenisnlimiet. Agenten draaien op Supabase Edge Functions met streaming responses en automatische leadregistratie via regex-extractie van e-mail, telefoon, naam en bedrijf uit gesprekscontext."
      },
      {
        title: "RAG-Powered Kennisbank",
        description: "Documenten (PDF, tekst, websitescrape) worden gechunked en geëmbedded in pgvector. Bij inferentie haalt de agent de 5 meest relevante chunks op via semantische zoekfunctie (cosine similarity drempel 0.5) om antwoorden te baseren op nauwkeurige product- en prijsinformatie."
      },
      {
        title: "CRM-Integraties (OAuth + API-sleutel)",
        description: "Twee authenticatiemodi: OAuth-flows voor HubSpot en Pipedrive, en API-sleutelauthenticatie voor Salesforce, Zoho en ActiveCampaign. Veldmappings zijn configureerbaar per agent, met een volledig synchronisatielog van lead_push-, deal_create- en activity_log-events."
      },
      {
        title: "Lead Pipeline & Scoring",
        description: "Leads doorlopen een statuspipeline: nieuw → gecontacteerd → gekwalificeerd → demo_gepland → voorstel_verstuurd → gewonnen/verloren. Elke lead heeft een samengestelde ML + handmatige score, geschatte MRR-bijdrage en een next_action_date voor follow-up planning."
      }
    ],
    techStack: "Technologie Stack",
    results: "Wat Het Oplevert",
    resultsPoints: [
      "24/7 AI lead kwalificatie zonder menselijke tussenkomst bovenin de funnel",
      "Multi-LLM flexibiliteit — schakel per agent tussen Claude, GPT-4o, Gemini",
      "Automatische leadregistratie uit ongestructureerde gesprekken (zero friction)",
      "5 CRM-integraties met configureerbare veldmapping en audittrail",
      "RAG kennisbank met semantisch zoeken — agenten antwoorden vanuit echte productdata",
      "Real-time gespreksovername door medewerkers midden in een live sessie",
      "Pakketgebaseerde feature-gating afgedwongen op Edge Function niveau, niet alleen UI"
    ],
    keyFeatures: "Kernfuncties",
    features: [
      { icon: Bot, title: "AI Agenten", description: "Autonome inbound salesagenten met configureerbare LLM, prompt en gesprekslimieten" },
      { icon: Database, title: "RAG Kennisbank", description: "Vector zoekfunctie over geüploade documenten en gescrapte websiteinhoud" },
      { icon: Link2, title: "CRM Sync", description: "OAuth + API-sleutel integraties met HubSpot, Pipedrive, Salesforce, Zoho, ActiveCampaign" },
      { icon: Zap, title: "Edge Functions", description: "Streaming AI-responses op Supabase Deno edge voor minimale latency" },
      { icon: Shield, title: "Rate Limiting", description: "Per-bezoeker 60 berichten/uur limiet + CORS origin-validatie op de edge" },
      { icon: BarChart2, title: "Pipeline Analyse", description: "Gewogen pipeline, MRR-tracking, lead scoring en vervallen acties meldingen" },
    ],
    stats: [
      { value: "24/7", label: "Lead Kwalificatie" },
      { value: "4", label: "LLM Providers" },
      { value: "5", label: "CRM Integraties" },
      { value: "RAG", label: "Kennisbank" },
    ],
  },
};

const techStack = [
  { name: "React", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "Supabase", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { name: "Claude AI", color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  { name: "OpenAI", color: "bg-zinc-400/20 text-zinc-300 border-zinc-400/30" },
  { name: "Edge Functions", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { name: "React Query", color: "bg-red-600/20 text-red-300 border-red-600/30" },
  { name: "Tailwind CSS", color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
  { name: "pgvector", color: "bg-blue-600/20 text-blue-300 border-blue-600/30" },
  { name: "Vite", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
];

export default function CrewVeeCRMPage() {
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

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">{t.title}</h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium">
                <Lock className="w-3.5 h-3.5" />
                {t.internalBadge}
              </span>
            </div>
            <p className="text-xl text-zinc-400 mb-6">{t.subtitle}</p>

            {/* Tech stack pills */}
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

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] md:aspect-video"
          >
            <CrewVeeCRMPreview />
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
            <div className="grid md:grid-cols-2 gap-4">
              {t.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-5 bg-black/40 border border-white/10 rounded-xl flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{feature.description}</p>
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
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
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
