"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Shield, Clock, FileText, CreditCard, Users, Lock, Zap, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { RefundelyPreview } from "@/components/RefundelyPreview";

const content = {
  en: {
    backToProjects: "Back to Projects",
    title: "Refundely",
    subtitle: "AI-Powered Invoice Management & SEPA Payment Platform",
    overview: "Overview",
    overviewText: "Refundely is an enterprise-grade SaaS platform designed specifically for the Dutch rental and property management industry. It automates the tedious, error-prone process of manual invoice processing and deposit refunds. Companies traditionally spend 5-10 minutes per invoice manually opening documents, entering data, verifying IBANs, and generating SEPA payment files. Refundely reduces this to just 30 seconds through AI-powered extraction and automated workflows.",
    challenge: "The Challenge",
    challengeText: "Rental companies and property managers in the Netherlands and Belgium process hundreds of deposit refunds monthly. Each refund requires extracting invoice data, verifying bank details, generating compliant SEPA XML files, and maintaining audit trails for financial compliance. Manual processing is slow, error-prone, and doesn't scale. The solution needed to handle sensitive financial data securely while integrating with existing banking workflows.",
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
    ]
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "Refundely",
    subtitle: "AI-Aangedreven Factuurbeheer & SEPA Betalingsplatform",
    overview: "Overzicht",
    overviewText: "Refundely is een enterprise-grade SaaS-platform specifiek ontworpen voor de Nederlandse verhuur- en vastgoedbeheersector. Het automatiseert het tijdrovende, foutgevoelige proces van handmatige factuurverwerking en borgteruggaves. Bedrijven besteden traditioneel 5-10 minuten per factuur aan het handmatig openen van documenten, invoeren van gegevens, verifiëren van IBANs en genereren van SEPA-betalingsbestanden. Refundely reduceert dit tot slechts 30 seconden door AI-gestuurde extractie en geautomatiseerde workflows.",
    challenge: "De Uitdaging",
    challengeText: "Verhuurbedrijven en vastgoedbeheerders in Nederland en België verwerken maandelijks honderden borgteruggaves. Elke teruggave vereist het extraheren van factuurgegevens, verifiëren van bankgegevens, genereren van SEPA XML-bestanden en bijhouden van audit trails voor financiële compliance. Handmatige verwerking is traag, foutgevoelig en schaalt niet. De oplossing moest gevoelige financiële data veilig verwerken en integreren met bestaande bankworkflows.",
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
    ]
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
