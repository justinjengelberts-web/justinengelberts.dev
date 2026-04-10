import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/lib/language-context";
import type { Language } from "@/lib/translations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Justin Engelberts",
  description: "Full-stack product engineer building high-end SaaS solutions with AI-native workflows",
  metadataBase: new URL("https://justinengelberts.dev"),
  openGraph: {
    title: "Justin Engelberts",
    description: "Full-stack product engineer building high-end SaaS solutions with AI-native workflows",
    url: "https://justinengelberts.dev",
    siteName: "Justin Engelberts",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Engelberts",
    description: "Full-stack product engineer building high-end SaaS solutions with AI-native workflows",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const languageCookie = cookieStore.get("language")?.value;

  // Determine language: cookie first, then Accept-Language header, default to en
  let initialLanguage: Language = "en";
  if (languageCookie === "nl" || languageCookie === "en") {
    initialLanguage = languageCookie;
  } else {
    const acceptLanguage = headerStore.get("accept-language") || "";
    if (acceptLanguage.toLowerCase().includes("nl")) {
      initialLanguage = "nl";
    }
  }

  return (
    <html lang={initialLanguage} className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <LanguageProvider initialLanguage={initialLanguage}>
          <Navbar />
          {children}
        </LanguageProvider>
        <Analytics />
        {/* Justin AI — portfolio chat widget */}
        <script
          src="https://tryjxzfkufcybljpnlsz.supabase.co/storage/v1/object/public/widget/agent-widget.js"
          data-widget-id="5bb625fd959542b387da06b4ab4b1a74"
          data-theme="dark"
          data-auto-open="15"
          data-api-url="https://tryjxzfkufcybljpnlsz.supabase.co/functions/v1"
          data-api-key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyeWp4emZrdWZjeWJsanBubHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NTM2OTksImV4cCI6MjA4ODIyOTY5OX0.fqkuyU0sjsUaQXam-oPk514kBhC0ZNT0lkZ9Be68fzo"
          defer
        />
      </body>
    </html>
  );
}
