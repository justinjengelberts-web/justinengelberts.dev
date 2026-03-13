"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, FileText, CreditCard, Users, Lock, Zap, CheckCircle2, ExternalLink, BarChart2, Kanban, Server, Target, TrendingUp, Mail } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { RefundelyPreview } from "@/components/RefundelyPreview";

const content = {
  en: {
    backToProjects: "Back to Projects",
    title: "Refundely",
    subtitle: "AI-Powered Invoice Management & SEPA Payment Platform",
    overview: "Overview",
    overviewText: "Refundely is an enterprise-grade SaaS platform designed for the European rental and property management industry. It automates the tedious, error-prone process of manual invoice processing and deposit refunds. Companies traditionally spend 5-10 minutes per invoice manually opening documents, entering data, verifying IBANs, and generating SEPA payment files. Refundely reduces this to just 30 seconds through AI-powered extraction and automated workflows.",
    challenge: "The Challenge",
    challengeText: "Rental companies and property managers across Europe process hundreds of deposit refunds monthly. Each refund requires extracting invoice data, verifying bank details, generating compliant SEPA XML files, and maintaining audit trails for financial compliance. Manual processing is slow, error-prone, and doesn't scale. The solution needed to handle sensitive financial data securely while integrating with existing banking workflows.",
    solution: "The Solution",
    solutionPoints: [
      {
        title: "AI-Powered Document Extraction",
        description: "Built serverless edge functions using Mistral AI with intelligent model fallback. Starts with mistral-small for cost efficiency, validates extraction quality, and automatically escalates to mistral-medium or mistral-large when critical fields like deposit amounts or IBANs need better accuracy. Per-branch AI rules allow customization for specific invoice formats."
      },
      {
        title: "SEPA Payment Automation",
        description: "Built ISO 20022 compliant SEPA XML generator for batch deposit refunds. Users select approved invoices and export payment files ready for bank upload, reducing hours of manual work to seconds."
      },
      {
        title: "Enterprise Security & Encryption",
        description: "Implemented AES-256-GCM client-side encryption for all IBAN data. Bank details are encrypted before transmission and stored securely, with server-side decryption only when needed. Full audit trail for compliance."
      },
      {
        title: "Multi-Tenant Architecture",
        description: "Designed organizations with multiple branches (vestigingen), each with their own settings, AI rules, and team access. Row-level security ensures complete data isolation between organizations."
      }
    ],
    techStack: "Technology Stack",
    results: "Results",
    resultsPoints: [
      "Invoice processing time reduced from 5-10 minutes to ~30 seconds (95% reduction)",
      "Zero manual data entry errors through AI extraction with human review",
      "GDPR-compliant with end-to-end encryption of financial data",
      "Supports 3 languages (Dutch, English, Spanish) with automatic detection",
      "Integrated Stripe billing with usage-based pricing tiers"
    ],
    keyFeatures: "Key Features",
    features: [
      { icon: Sparkles, title: "AI Extraction", description: "Mistral AI with smart model fallback: starts cheap, escalates when quality demands it" },
      { icon: CreditCard, title: "SEPA Export", description: "ISO 20022 compliant XML generation for bank payments" },
      { icon: Lock, title: "AES-256 Encryption", description: "Client-side encryption for all sensitive financial data" },
      { icon: Users, title: "Multi-Tenant", description: "Organizations with branches, team roles, and access control" },
      { icon: FileText, title: "Audit Trail", description: "Complete change history for financial compliance" },
      { icon: Zap, title: "Real-Time Sync", description: "Supabase Realtime for collaborative editing" }
    ],
    stats: [
      { value: "30s", label: "Per Invoice" },
      { value: "95%", label: "Time Saved" },
      { value: "AES-256", label: "Encryption" },
      { value: "3", label: "Languages" }
    ],
    crm: "Custom Sales CRM",
    crmText: "To sell Refundely, I needed a pipeline tailored to the rental industry — not a generic CRM. So I built one. A full React + TypeScript + Supabase application with dynamic lead scoring that weighs engagement behaviour, AI analysis, and manual qualification into a single combined score.",
    crmFeatures: [
      { icon: Target, title: "Dynamic Lead Scoring", description: "Combined score = manual (40%) + engagement decay (35%) + AI scoring (25%). Leads that go silent automatically drop in priority." },
      { icon: Mail, title: "Email Flows & Templates", description: "Built-in email sequence builder with reusable templates, send tracking, and lifecycle triggers per lead status." },
      { icon: TrendingUp, title: "Analytics & Pipeline", description: "Custom analytics page with funnel metrics, conversion rates, and stage velocity — no third-party dashboards needed." },
    ],
    internalTooling: "Internal Founder Dashboard",
    internalToolingText: "Alongside the SaaS platform, I built an internal operations dashboard for day-to-day management. Built with vanilla HTML/CSS/JS and a Node.js BFF (Backend For Frontend), it keeps API keys server-side while the frontend stays clean. It integrates live data from three external analytics APIs.",
    internalFeatures: [
      { icon: BarChart2, title: "GA4 + Clarity + Search Console", description: "Live analytics pulled through a BFF proxy — no API keys in the browser. Metrics update in real time." },
      { icon: Server, title: "BFF Architecture", description: "Node.js acts as a secure middleware layer: caches responses, handles auth, and exposes simple /api/* endpoints to the frontend." },
      { icon: Kanban, title: "Kanban & Roadmap", description: "Task management, software roadmap, milestones and B.V.-checklist — all powered by localStorage with drag & drop." },
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "Refundely",
    subtitle: "AI-Aangedreven Factuurbeheer & SEPA Betalingsplatform",
    overview: "Overzicht",
    overviewText: "Refundely is een enterprise-grade SaaS-platform ontworpen voor de Europese verhuur- en vastgoedbeheersector. Het automatiseert het tijdrovende, foutgevoelige proces van handmatige factuurverwerking en borgteruggaves. Bedrijven besteden traditioneel 5-10 minuten per factuur aan het handmatig openen van documenten, invoeren van gegevens, verifiëren van IBANs en genereren van SEPA-betalingsbestanden. Refundely reduceert dit tot slechts 30 seconden door AI-gestuurde extractie en geautomatiseerde workflows.",
    challenge: "De Uitdaging",
    challengeText: "Verhuurbedrijven en vastgoedbeheerders in Europa verwerken maandelijks honderden borgteruggaves. Elke teruggave vereist het extraheren van factuurgegevens, verifiëren van bankgegevens, genereren van SEPA XML-bestanden en bijhouden van audit trails voor financiële compliance. Handmatige verwerking is traag, foutgevoelig en schaalt niet. De oplossing moest gevoelige financiële data veilig verwerken en integreren met bestaande bankworkflows.",
    solution: "De Oplossing",
    solutionPoints: [
      {
        title: "AI-Gestuurde Document Extractie",
        description: "Serverless edge functions gebouwd met Mistral AI en intelligente model-fallback. Start met mistral-small voor kostenefficiëntie, valideert extractiekwaliteit, en escaleert automatisch naar mistral-medium of mistral-large wanneer kritieke velden zoals borgbedragen of IBANs betere nauwkeurigheid nodig hebben. Per-vestiging AI-regels voor specifieke factuurformaten."
      },
      {
        title: "SEPA Betaling Automatisering",
        description: "ISO 20022 compliant SEPA XML-generator gebouwd voor batch borgteruggaves. Gebruikers selecteren goedgekeurde facturen en exporteren betalingsbestanden klaar voor bankupload, waardoor uren handmatig werk tot seconden wordt gereduceerd."
      },
      {
        title: "Enterprise Security & Encryptie",
        description: "AES-256-GCM client-side encryptie geïmplementeerd voor alle IBAN-gegevens. Bankgegevens worden versleuteld voor verzending en veilig opgeslagen, met server-side decryptie alleen wanneer nodig. Volledige audit trail voor compliance."
      },
      {
        title: "Multi-Tenant Architectuur",
        description: "Organisaties ontworpen met meerdere vestigingen, elk met eigen instellingen, AI-regels en teamtoegang. Row-level security zorgt voor volledige data-isolatie tussen organisaties."
      }
    ],
    techStack: "Technologie Stack",
    results: "Resultaten",
    resultsPoints: [
      "Factuurverwerkingstijd gereduceerd van 5-10 minuten naar ~30 seconden (95% reductie)",
      "Nul handmatige data-invoerfouten door AI-extractie met menselijke review",
      "GDPR-compliant met end-to-end encryptie van financiële data",
      "Ondersteunt 3 talen (Nederlands, Engels, Spaans) met automatische detectie",
      "Geïntegreerde Stripe-facturering met usage-based pricing tiers"
    ],
    keyFeatures: "Belangrijkste Features",
    features: [
      { icon: Sparkles, title: "AI Extractie", description: "Mistral AI met slimme model-fallback: start goedkoop, escaleert wanneer kwaliteit het vraagt" },
      { icon: CreditCard, title: "SEPA Export", description: "ISO 20022 compliant XML-generatie voor bankbetalingen" },
      { icon: Lock, title: "AES-256 Encryptie", description: "Client-side encryptie voor alle gevoelige financiële data" },
      { icon: Users, title: "Multi-Tenant", description: "Organisaties met vestigingen, teamrollen en toegangscontrole" },
      { icon: FileText, title: "Audit Trail", description: "Volledige wijzigingshistorie voor financiële compliance" },
      { icon: Zap, title: "Real-Time Sync", description: "Supabase Realtime voor collaboratief bewerken" }
    ],
    stats: [
      { value: "30s", label: "Per Factuur" },
      { value: "95%", label: "Tijd Bespaard" },
      { value: "AES-256", label: "Encryptie" },
      { value: "3", label: "Talen" }
    ],
    crm: "Eigen Sales CRM",
    crmText: "Om Refundely te verkopen had ik een pipeline nodig die past bij de verhuursector — geen generiek CRM. Dus bouwde ik er één. Een volwaardige React + TypeScript + Supabase applicatie met dynamisch leadscoring dat engagement-gedrag, AI-analyse en handmatige kwalificatie combineert in één score.",
    crmFeatures: [
      { icon: Target, title: "Dynamisch Leadscoring", description: "Combined score = handmatig (40%) + engagement decay (35%) + AI-scoring (25%). Leads die stil vallen zakken automatisch in prioriteit." },
      { icon: Mail, title: "E-mailflows & Templates", description: "Ingebouwde e-mailsequence builder met herbruikbare templates, verzendtracking en lifecycle-triggers per leadstatus." },
      { icon: TrendingUp, title: "Analytics & Pipeline", description: "Eigen analytics-pagina met funnelmetrics, conversieratio's en fase-doorlooptijd — geen externe dashboards nodig." },
    ],
    internalTooling: "Intern Founder Dashboard",
    internalToolingText: "Naast het SaaS-platform bouwde ik een intern dashboard voor dagelijkse operaties. Gebouwd met vanilla HTML/CSS/JS en een Node.js BFF (Backend For Frontend): API-sleutels blijven server-side, de frontend doet simpelweg fetch('/api/...'). Het integreert live data van drie externe analytics-APIs.",
    internalFeatures: [
      { icon: BarChart2, title: "GA4 + Clarity + Search Console", description: "Live analytics via een BFF-proxy — geen API-sleutels in de browser. Metrics updaten in real time." },
      { icon: Server, title: "BFF Architectuur", description: "Node.js als beveiligd tussenniveau: cachet responses, beheert authenticatie en exposeert simpele /api/*-endpoints naar de frontend." },
      { icon: Kanban, title: "Kanban & Roadmap", description: "Takenbeheer, software roadmap, milestones en B.V.-checklist — volledig op localStorage met drag & drop." },
    ],
  }
};

const techStack = [
  { name: "React", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "Supabase", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { name: "Mistral AI", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  { name: "Edge Functions", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { name: "Tailwind CSS", color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
];

export default function RefundelyPage() {
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
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-white">Re</span>
                <span className="text-emerald-500">fundely</span>
              </h1>
              <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                SaaS
              </span>
            </div>
            <p className="text-xl text-zinc-400 mb-6">{t.subtitle}</p>

            {/* CTA */}
            <a
              href="https://refundely.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 mb-8 text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors"
            >
              {language === 'nl' ? 'Bekijk Refundely.com' : 'Visit Refundely.com'}
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

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-white/10 aspect-video relative"
          >
            <RefundelyPreview />
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
                <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-1">{stat.value}</div>
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
                  <h3 className="text-lg font-medium mb-2 text-emerald-400">{point.title}</h3>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-black/50 border border-white/10 rounded-xl"
                >
                  <feature.icon className="w-8 h-8 text-emerald-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CRM */}
      <section className="py-16 px-6 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold">{t.crm}</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/25 rounded-full">
                Internal Tool
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-8">{t.crmText}</p>

            {/* CRM mini preview */}
            <div className="rounded-xl overflow-hidden border border-white/10 mb-8" style={{ height: 240 }}>
              <div className="relative h-full flex flex-col">
                {/* Browser chrome */}
                <div className="bg-[#1e293b] px-4 py-2 flex items-center gap-2 flex-shrink-0">
                  <div className="flex gap-1.5">
                    {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
                      <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                    ))}
                  </div>
                  <div className="flex-1 bg-white/10 rounded text-xs text-white/40 px-3 py-1 text-center font-mono max-w-xs mx-auto">
                    refundely-crm
                  </div>
                </div>

                {/* App shell */}
                <div className="flex flex-1 min-h-0 bg-[#f8fafc]">
                  {/* Sidebar */}
                  <div className="w-28 bg-[#0f172a] flex flex-col flex-shrink-0">
                    <div className="px-3 py-2 border-b border-white/5">
                      <span className="text-white font-bold" style={{ fontSize: 10 }}>Re<span className="text-emerald-400">fundely</span> CRM</span>
                    </div>
                    <div className="py-1.5 px-2 space-y-0.5">
                      {[
                        { label: "Dashboard", active: false },
                        { label: "Leads", active: true },
                        { label: "Klanten", active: false },
                        { label: "E-mailflows", active: false },
                        { label: "Analytics", active: false },
                        { label: "Scoringregels", active: false },
                      ].map(({ label, active }) => (
                        <div key={label} className={`px-2 py-1 rounded text-[9px] font-medium ${active ? "bg-violet-600 text-white" : "text-slate-400"}`}>
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 flex min-h-0 overflow-hidden">
                    {/* Lead table */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="bg-white border-b border-slate-200 px-3 py-1.5 flex items-center justify-between flex-shrink-0">
                        <span className="font-bold text-slate-800" style={{ fontSize: 11 }}>Leads</span>
                        <span className="text-[9px] text-slate-400">47 leads</span>
                      </div>
                      <div className="flex-1 overflow-auto bg-white">
                        <table className="w-full">
                          <thead className="border-b border-slate-100 sticky top-0 bg-white">
                            <tr>
                              {["Naam", "Status", "Score"].map((h) => (
                                <th key={h} className="px-3 py-1 text-left text-slate-400 uppercase font-semibold tracking-wide" style={{ fontSize: 7 }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { naam: "Thomas Janssen", bedrijf: "SalesNL B.V.", status: "Demo gepland", statusC: "#5b21b6", statusBg: "#ede9fe", score: 91, manual: 78, engage: 95, ai: 88 },
                              { naam: "Lena Verstappen", bedrijf: "TechNL", status: "Gekwalificeerd", statusC: "#166534", statusBg: "#dcfce7", score: 84, manual: 82, engage: 71, ai: 90 },
                              { naam: "Marc Dubois", bedrijf: "BruxellesTech", status: "Offerte verstuurd", statusC: "#92400e", statusBg: "#fef3c7", score: 76, manual: 70, engage: 65, ai: 81 },
                              { naam: "Sara van den Berg", bedrijf: "DataFlow AG", status: "Gecontacteerd", statusC: "#1e40af", statusBg: "#dbeafe", score: 52, manual: 60, engage: 31, ai: 58 },
                            ].map((lead, i) => (
                              <tr key={i} className={`border-b border-slate-50 ${i === 0 ? "bg-violet-50" : ""}`}>
                                <td className="px-3 py-1.5">
                                  <div className="font-medium text-slate-800" style={{ fontSize: 9 }}>{lead.naam}</div>
                                  <div className="text-slate-400" style={{ fontSize: 7.5 }}>{lead.bedrijf}</div>
                                </td>
                                <td className="px-3 py-1.5">
                                  <span className="px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap" style={{ backgroundColor: lead.statusBg, color: lead.statusC, fontSize: 7.5 }}>
                                    {lead.status}
                                  </span>
                                </td>
                                <td className="px-3 py-1.5">
                                  <div className="flex items-center gap-1">
                                    <div className="w-7 h-4 rounded-full flex items-center justify-center font-bold text-white" style={{ fontSize: 8, background: lead.score >= 80 ? "linear-gradient(135deg,#059669,#10b981)" : lead.score >= 60 ? "linear-gradient(135deg,#d97706,#f59e0b)" : "linear-gradient(135deg,#3b82f6,#60a5fa)" }}>
                                      {lead.score}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Score breakdown panel */}
                    <div className="w-36 border-l border-slate-200 bg-white flex-shrink-0 p-2.5 flex flex-col gap-2">
                      <div className="text-[9px] font-bold text-slate-700">Score breakdown</div>
                      <div className="text-[8px] text-slate-400 font-medium -mt-1">Thomas Janssen · 91</div>
                      {[
                        { label: "Handmatig", pct: 40, val: 78, color: "#2563eb" },
                        { label: "Engagement", pct: 35, val: 95, color: "#059669" },
                        { label: "AI-score", pct: 25, val: 88, color: "#7c3aed" },
                      ].map(({ label, pct, val, color }) => (
                        <div key={label}>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-[7.5px] text-slate-500">{label} <span className="text-slate-300">({pct}%)</span></span>
                            <span className="text-[7.5px] font-bold" style={{ color }}>{val}</span>
                          </div>
                          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${val}%`, backgroundColor: color }} />
                          </div>
                        </div>
                      ))}
                      <div className="mt-auto pt-1.5 border-t border-slate-100">
                        <div className="flex justify-between items-center">
                          <span className="text-[7.5px] text-slate-500 font-medium">Combined</span>
                          <span className="text-[10px] font-bold text-emerald-600">91</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {t.crmFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-5 bg-black/30 border border-white/10 rounded-xl"
                >
                  <feature.icon className="w-6 h-6 text-violet-400 mb-3" />
                  <h3 className="text-sm font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internal Tooling */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold">{t.internalTooling}</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25 rounded-full">
                Internal Tool
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-8">{t.internalToolingText}</p>

            {/* Mini dashboard preview */}
            <div className="rounded-xl overflow-hidden border border-white/10 mb-8 bg-gray-50" style={{ height: 220 }}>
              <div className="relative h-full">
                {/* Browser chrome */}
                <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
                      <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                    ))}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded text-xs text-gray-400 px-3 py-1 text-center font-mono max-w-xs mx-auto">
                    refundely-dash
                  </div>
                </div>
                {/* Tab nav */}
                <div className="bg-white border-b border-gray-100 px-3 py-1.5 flex gap-2">
                  {["Overzicht", "Kanban", "Roadmap", "Milestones", "B.V.-Checklist", "CRM", "Analytics"].map((tab, i) => (
                    <span
                      key={tab}
                      className={`text-[10px] px-2.5 py-1 rounded font-medium whitespace-nowrap ${
                        i === 6 ? "bg-emerald-500 text-white" : "text-gray-400"
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
                {/* Content */}
                <div className="p-4 flex gap-3">
                  {/* API badges */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {[
                      { name: "GA4", c: "bg-orange-50 text-orange-600 border border-orange-200" },
                      { name: "Clarity", c: "bg-purple-50 text-purple-600 border border-purple-200" },
                      { name: "Search Console", c: "bg-blue-50 text-blue-600 border border-blue-200" },
                    ].map(({ name, c }) => (
                      <span key={name} className={`text-[10px] px-2 py-1 rounded-full font-semibold whitespace-nowrap ${c}`}>
                        {name}
                      </span>
                    ))}
                  </div>
                  {/* Metric cards */}
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    {[
                      { label: "Sessions", value: "2,847", change: "+12%" },
                      { label: "Bounce Rate", value: "38%", change: "−4%" },
                      { label: "Engagement", value: "73%", change: "+8%" },
                      { label: "Conversions", value: "94", change: "+23%" },
                    ].map((m) => (
                      <div key={m.label} className="bg-white rounded-lg border border-gray-100 p-2 shadow-sm">
                        <div className="text-[9px] text-gray-400 font-medium">{m.label}</div>
                        <div className="text-sm font-bold text-gray-800 mt-0.5">{m.value}</div>
                        <div className="text-[9px] text-emerald-500 font-semibold">{m.change}</div>
                      </div>
                    ))}
                  </div>
                  {/* Mini bar chart */}
                  <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm w-28 flex-shrink-0">
                    <div className="text-[9px] text-gray-400 font-medium mb-2">Sessions 7d</div>
                    <div className="flex items-end gap-0.5 h-12">
                      {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                        <div key={i} className="flex-1 bg-emerald-200 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {t.internalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-5 bg-white/5 border border-white/10 rounded-xl"
                >
                  <feature.icon className="w-6 h-6 text-amber-400 mb-3" />
                  <h3 className="text-sm font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
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
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
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
