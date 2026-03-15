"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Cookie, Eye, Database, UserCheck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

const content = {
  nl: {
    backToHome: "Terug naar Home",
    title: "Privacyverklaring",
    lastUpdated: "Laatst bijgewerkt: 15 maart 2026",
    sections: [
      {
        icon: Shield,
        title: "Wie ben ik",
        text: "Deze website (justinengelberts.dev) is het persoonlijke portfolio en carriere-platform van Justin Engelberts. Ik gebruik deze site om mijn werk te presenteren, inclusief interactieve demo's en een AI-chatwidget waarmee bezoekers met mij in contact kunnen komen.",
      },
      {
        icon: Eye,
        title: "Welke gegevens worden verzameld",
        text: "Op deze website worden twee trackingdiensten gebruikt, uitsluitend na jouw expliciete toestemming:",
        subsections: [
          {
            subtitle: "Microsoft Clarity",
            items: [
              "Sessie-opnames: muisbewegingen, klikken en scrollgedrag",
              "Heatmaps: geaggregeerde weergave van klikpatronen",
              "Sessiemetadata: duur, paginaweergaven, apparaattype",
            ],
          },
          {
            subtitle: "Google Analytics 4",
            items: [
              "Paginaweergaven en navigatiepatronen",
              "Aangepaste events: chatinteracties, topic-klikken, demo-gebruik",
              "Geanonimiseerde gebruikersgegevens (geen IP-adressen opgeslagen)",
            ],
          },
          {
            subtitle: "Server-side events (zonder cookies)",
            items: [
              "Bepaalde technische events (zoals het starten van een chatgesprek of het verwerken van een vacature) worden server-side geregistreerd via de GA4 Measurement Protocol",
              "Deze events bevatten geen persoonsgegevens en zijn niet herleidbaar tot individuele bezoekers",
              "Ze worden gebruikt voor operationele telemetrie (bijv. hoeveel chats er worden gestart)",
            ],
          },
        ],
      },
      {
        icon: Database,
        title: "Waarom worden deze gegevens verzameld",
        text: "Ik gebruik deze gegevens uitsluitend om te begrijpen hoe bezoekers mijn demopagina's en chatwidget gebruiken, zodat ik de ervaring kan verbeteren. De data wordt niet verkocht, niet gedeeld met derden buiten de genoemde verwerkers, en niet gebruikt voor advertentiedoeleinden.",
      },
      {
        icon: Cookie,
        title: "Cookies en toestemming",
        text: "Tracking start alleen na jouw expliciete toestemming via de cookiebanner. Als je weigert:",
        subsections: [
          {
            subtitle: "Bij weigering",
            items: [
              "Microsoft Clarity wordt helemaal niet geladen",
              "Google Analytics draait in anonieme, cookieloze modus (geen persoonsgegevens)",
              "Server-side events draaien altijd (bevatten geen persoonsgegevens)",
            ],
          },
          {
            subtitle: "Gebruikte cookies bij toestemming",
            items: [
              "Clarity: _clck, _clsk, CLID, ANONCHK, SM, MR",
              "GA4: _ga, _ga_* (meet-ID-specifiek)",
              "Toestemming: consent_granted (localStorage, geen cookie)",
            ],
          },
        ],
      },
      {
        icon: Database,
        title: "Bewaartermijnen",
        text: "Microsoft Clarity bewaart sessiedata standaard 30 dagen. Google Analytics bewaart gegevens standaard 14 maanden (configureerbaar). Server-side events volgen de standaard GA4-bewaartermijnen.",
      },
      {
        icon: Shield,
        title: "Derde partijen (verwerkers)",
        text: "De volgende partijen verwerken gegevens namens deze website:",
        subsections: [
          {
            subtitle: "",
            items: [
              "Microsoft (Clarity) - sessie-opnames en heatmaps",
              "Google (Analytics 4) - websitestatistieken en events",
              "Vercel (hosting) - serverlogs en analytics",
              "Supabase (backend) - database en edge functions",
            ],
          },
        ],
      },
      {
        icon: UserCheck,
        title: "Jouw rechten",
        text: "Je hebt de volgende rechten met betrekking tot je gegevens:",
        subsections: [
          {
            subtitle: "",
            items: [
              "Toestemming intrekken: verwijder cookies en localStorage via je browserinstellingen",
              "Inzage en verwijdering: neem contact op via justin@crewvee.com",
              "Bezwaar maken: je kunt altijd bezwaar maken tegen gegevensverwerking via bovenstaand e-mailadres",
            ],
          },
        ],
      },
    ],
    contact: "Vragen over deze privacyverklaring? Neem contact op via justin@crewvee.com.",
  },
  en: {
    backToHome: "Back to Home",
    title: "Privacy Statement",
    lastUpdated: "Last updated: March 15, 2026",
    sections: [
      {
        icon: Shield,
        title: "Who am I",
        text: "This website (justinengelberts.dev) is the personal portfolio and career platform of Justin Engelberts. I use this site to showcase my work, including interactive demos and an AI chat widget for visitor engagement.",
      },
      {
        icon: Eye,
        title: "What data is collected",
        text: "Two tracking services are used on this website, only after your explicit consent:",
        subsections: [
          {
            subtitle: "Microsoft Clarity",
            items: [
              "Session recordings: mouse movements, clicks, and scroll behavior",
              "Heatmaps: aggregated click pattern visualization",
              "Session metadata: duration, page views, device type",
            ],
          },
          {
            subtitle: "Google Analytics 4",
            items: [
              "Page views and navigation patterns",
              "Custom events: chat interactions, topic clicks, demo usage",
              "Anonymized user data (no IP addresses stored)",
            ],
          },
          {
            subtitle: "Server-side events (no cookies)",
            items: [
              "Certain technical events (like starting a chat or processing a vacancy) are logged server-side via the GA4 Measurement Protocol",
              "These events contain no personal data and cannot be traced to individual visitors",
              "They are used for operational telemetry (e.g., how many chats are started)",
            ],
          },
        ],
      },
      {
        icon: Database,
        title: "Why this data is collected",
        text: "I use this data solely to understand how visitors use my demo pages and chat widget, so I can improve the experience. The data is not sold, not shared with third parties beyond the listed processors, and not used for advertising.",
      },
      {
        icon: Cookie,
        title: "Cookies and consent",
        text: "Tracking only starts after your explicit consent via the cookie banner. If you decline:",
        subsections: [
          {
            subtitle: "When declined",
            items: [
              "Microsoft Clarity is not loaded at all",
              "Google Analytics runs in anonymous, cookieless mode (no personal data)",
              "Server-side events always run (they contain no personal data)",
            ],
          },
          {
            subtitle: "Cookies used when consent is given",
            items: [
              "Clarity: _clck, _clsk, CLID, ANONCHK, SM, MR",
              "GA4: _ga, _ga_* (measurement ID specific)",
              "Consent: consent_granted (localStorage, not a cookie)",
            ],
          },
        ],
      },
      {
        icon: Database,
        title: "Data retention",
        text: "Microsoft Clarity retains session data for 30 days by default. Google Analytics retains data for 14 months by default (configurable). Server-side events follow standard GA4 retention periods.",
      },
      {
        icon: Shield,
        title: "Third parties (processors)",
        text: "The following parties process data on behalf of this website:",
        subsections: [
          {
            subtitle: "",
            items: [
              "Microsoft (Clarity) - session recordings and heatmaps",
              "Google (Analytics 4) - website statistics and events",
              "Vercel (hosting) - server logs and analytics",
              "Supabase (backend) - database and edge functions",
            ],
          },
        ],
      },
      {
        icon: UserCheck,
        title: "Your rights",
        text: "You have the following rights regarding your data:",
        subsections: [
          {
            subtitle: "",
            items: [
              "Withdraw consent: clear cookies and localStorage via your browser settings",
              "Access and deletion: contact justin@crewvee.com",
              "Object: you can always object to data processing via the email above",
            ],
          },
        ],
      },
    ],
    contact: "Questions about this privacy statement? Contact justin@crewvee.com.",
  },
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToHome}
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
          <p className="text-sm text-neutral-500">{t.lastUpdated}</p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-10">
          {t.sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-neutral-800/50 border border-neutral-700/50">
                    <Icon className="w-5 h-5 text-neutral-300" />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>

                <p className="text-neutral-400 leading-relaxed pl-12">
                  {section.text}
                </p>

                {section.subsections?.map((sub, j) => (
                  <div key={j} className="pl-12 space-y-2">
                    {sub.subtitle && (
                      <h3 className="text-sm font-medium text-neutral-300">
                        {sub.subtitle}
                      </h3>
                    )}
                    <ul className="list-disc list-inside space-y-1 text-neutral-400 text-sm">
                      {sub.items.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.section>
            );
          })}
        </div>

        {/* Contact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 pt-8 border-t border-neutral-800 text-sm text-neutral-500"
        >
          {t.contact}
        </motion.p>
      </div>
    </main>
  );
}
