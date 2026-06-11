"use client";

import {
  Cloud,
  Lock,
  Upload,
  Package,
  GitFork,
  Pencil,
} from "lucide-react";
import {
  CaseStudyPage,
  type CaseStudyContent,
} from "@/components/case-study/CaseStudyPage";
import { WebModernPreview } from "@/components/WebModernPreview";

const content: { en: CaseStudyContent; nl: CaseStudyContent } = {
  en: {
    backToProjects: "Back to Projects",
    title: "WebModern Platform",
    subtitle:
      "Multi-tenant CMS with a security-hardened AWS media pipeline for Dutch SMB websites",
    badge: "SaaS Platform",
    stats: [
      { value: "0", label: "Public S3 access" },
      { value: "1", label: "IAM permission (PutObject)" },
      { value: "100%", label: "Infra as code (CDK)" },
      { value: "v0.4", label: "SDK on npm" },
    ],
    overviewTitle: "Overview",
    overviewText:
      "WebModern Platform lets non-technical small business owners edit the content of their custom-designed websites without touching code. An admin dashboard (cms.webmodern.nl) connects to a network of client sites that fetch and render content in real time. Every client site is its own repository forked from a shared template, while a published npm SDK (@webmodern/cms-sdk) keeps all sites compatible with the CMS backend.",
    challengeTitle: "The Challenge",
    challengeText:
      "Client image uploads needed to be fast, cheap, and above all secure: no AWS credentials in the browser, no publicly readable storage, and no shared failure modes between client sites. At the same time, each client needed full design freedom and isolated deployments — a classic multi-tenancy trade-off that a dynamic site router would not solve cleanly.",
    solutionTitle: "The Solution",
    solutionPoints: [
      {
        title: "Private-by-default AWS media pipeline",
        description:
          "Built with AWS CDK (TypeScript): a fully private S3 bucket that blocks all public access, fronted by CloudFront with Origin Access Control as the only entity allowed to read it. The CDN is the single public endpoint for every image URL. Deployed to eu-central-1, reproducible from code.",
      },
      {
        title: "Presigned uploads, least-privilege IAM",
        description:
          "The CMS generates temporary presigned PUT URLs so the browser uploads directly to S3 — credentials never leave the server. The uploader IAM user has exactly one permission: s3:PutObject on the sites/* prefix. It cannot read, delete, or modify anything. Its secret key lives in AWS Secrets Manager.",
      },
      {
        title: "SDK-first architecture",
        description:
          "A published npm package (@webmodern/cms-sdk) is the single contract between the CMS, the site template, and every forked client site. Editable content flows through <Editable> and <EditableImage> components keyed by (siteId, blockId), with mandatory canonical blocks enforced at build time.",
      },
      {
        title: "Visual editing with realtime preview",
        description:
          "Client sites load inside the CMS in an iframe with ?edit=1, activating a visual editor overlay. Changes broadcast to the preview over Supabase Realtime channels per site. Clients mark accent words with *asterisks* — the site controls the styling, the client only marks the words.",
      },
    ],
    featuresTitle: "Key Features",
    features: [
      {
        icon: Cloud,
        title: "S3 + CloudFront OAC",
        description:
          "Private bucket, CDN-only reads — a textbook secure media setup",
      },
      {
        icon: Lock,
        title: "Least-Privilege IAM",
        description:
          "Single PutObject permission, secrets in AWS Secrets Manager",
      },
      {
        icon: Upload,
        title: "Presigned Uploads",
        description:
          "Browser uploads straight to S3 without exposing credentials",
      },
      {
        icon: GitFork,
        title: "Fork-per-Client",
        description:
          "Every client site is an isolated repo with its own deploys",
      },
      {
        icon: Package,
        title: "npm SDK",
        description:
          "@webmodern/cms-sdk: one stable contract for all client sites",
      },
      {
        icon: Pencil,
        title: "Visual Editor",
        description:
          "Iframe edit mode with instant preview via Supabase Realtime",
      },
    ],
    resultsTitle: "Results",
    resultsPoints: [
      "Image upload pipeline live in production — presigned flow verified end-to-end",
      "Zero AWS credentials in the browser, zero public bucket access",
      "Entire infrastructure reproducible from a single CDK stack",
      "Clients edit content with magic-link login — no passwords, no code",
      "Complete deploy isolation: one client's issue never affects another",
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "WebModern Platform",
    subtitle:
      "Multi-tenant CMS met een security-hardened AWS media pipeline voor Nederlandse MKB-websites",
    badge: "SaaS Platform",
    stats: [
      { value: "0", label: "Publieke S3-toegang" },
      { value: "1", label: "IAM-permissie (PutObject)" },
      { value: "100%", label: "Infra as code (CDK)" },
      { value: "v0.4", label: "SDK op npm" },
    ],
    overviewTitle: "Overzicht",
    overviewText:
      "Met WebModern Platform kunnen niet-technische ondernemers de content van hun op maat ontworpen website aanpassen zonder code aan te raken. Een admin dashboard (cms.webmodern.nl) is verbonden met een netwerk van klantsites die content realtime ophalen en renderen. Elke klantsite is een eigen repository, geforkt vanaf een gedeeld template, terwijl een gepubliceerde npm SDK (@webmodern/cms-sdk) alle sites compatibel houdt met de CMS-backend.",
    challengeTitle: "De Uitdaging",
    challengeText:
      "Afbeeldingen uploaden moest snel, goedkoop en vooral veilig: geen AWS-credentials in de browser, geen publiek leesbare storage, en geen gedeelde failure modes tussen klantsites. Tegelijkertijd had elke klant volledige designvrijheid en geïsoleerde deployments nodig — een klassieke multi-tenancy afweging die een dynamische site-router niet netjes oplost.",
    solutionTitle: "De Oplossing",
    solutionPoints: [
      {
        title: "Private-by-default AWS media pipeline",
        description:
          "Gebouwd met AWS CDK (TypeScript): een volledig private S3-bucket die alle publieke toegang blokkeert, met CloudFront via Origin Access Control als enige partij die mag lezen. De CDN is het enige publieke endpoint voor elke afbeeldings-URL. Gedeployed naar eu-central-1, reproduceerbaar vanuit code.",
      },
      {
        title: "Presigned uploads, least-privilege IAM",
        description:
          "Het CMS genereert tijdelijke presigned PUT URLs zodat de browser direct naar S3 uploadt — credentials verlaten de server nooit. De uploader IAM-user heeft precies één permissie: s3:PutObject op het sites/* prefix. Lezen, verwijderen of aanpassen kan niet. De secret key staat in AWS Secrets Manager.",
      },
      {
        title: "SDK-first architectuur",
        description:
          "Een gepubliceerd npm-package (@webmodern/cms-sdk) is hét contract tussen het CMS, het site-template en elke geforkte klantsite. Bewerkbare content loopt via <Editable> en <EditableImage> componenten op basis van (siteId, blockId), met verplichte canonical blocks die bij build-time worden afgedwongen.",
      },
      {
        title: "Visueel bewerken met realtime preview",
        description:
          "Klantsites laden in het CMS in een iframe met ?edit=1, wat een visuele editor-overlay activeert. Wijzigingen worden via Supabase Realtime channels per site naar de preview gebroadcast. Klanten markeren accentwoorden met *sterretjes* — de site bepaalt de styling, de klant alleen de woorden.",
      },
    ],
    featuresTitle: "Belangrijkste Features",
    features: [
      {
        icon: Cloud,
        title: "S3 + CloudFront OAC",
        description:
          "Private bucket, alleen CDN-reads — een schoolvoorbeeld van veilige media",
      },
      {
        icon: Lock,
        title: "Least-Privilege IAM",
        description:
          "Eén PutObject-permissie, secrets in AWS Secrets Manager",
      },
      {
        icon: Upload,
        title: "Presigned Uploads",
        description:
          "Browser uploadt direct naar S3 zonder credentials bloot te stellen",
      },
      {
        icon: GitFork,
        title: "Fork-per-Klant",
        description:
          "Elke klantsite is een geïsoleerde repo met eigen deploys",
      },
      {
        icon: Package,
        title: "npm SDK",
        description:
          "@webmodern/cms-sdk: één stabiel contract voor alle klantsites",
      },
      {
        icon: Pencil,
        title: "Visuele Editor",
        description:
          "Iframe edit-modus met directe preview via Supabase Realtime",
      },
    ],
    resultsTitle: "Resultaten",
    resultsPoints: [
      "Image upload pipeline live in productie — presigned flow end-to-end geverifieerd",
      "Nul AWS-credentials in de browser, nul publieke bucket-toegang",
      "Volledige infrastructuur reproduceerbaar vanuit één CDK-stack",
      "Klanten bewerken content met magic-link login — geen wachtwoorden, geen code",
      "Volledige deploy-isolatie: een probleem bij één klant raakt nooit een andere",
    ],
  },
};

const techStack = [
  { name: "Next.js 16", color: "bg-white/15 text-zinc-200 border-white/20" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "AWS CDK", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { name: "S3", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  { name: "CloudFront", color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  { name: "Supabase", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { name: "Drizzle", color: "bg-lime-500/20 text-lime-300 border-lime-500/30" },
];

export default function WebModernPlatformPage() {
  return (
    <CaseStudyPage
      accent="orange"
      content={content}
      techStack={techStack}
      preview={<WebModernPreview />}
    />
  );
}
