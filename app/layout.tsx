import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { cookies } from "next/headers";
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
  const languageCookie = cookieStore.get("language")?.value;
  const initialLanguage: Language = languageCookie === "nl" ? "nl" : "en";

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
      </body>
    </html>
  );
}
