"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, Translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Cookie helper to set language preference
function setLanguageCookie(lang: Language) {
  document.cookie = `language=${lang};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export function LanguageProvider({ children, initialLanguage = "en" }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // On first visit (no cookie), persist the server-detected language to cookie
  useEffect(() => {
    const cookieMatch = document.cookie.match(/language=(en|nl)/);
    if (!cookieMatch) {
      setLanguageCookie(initialLanguage);
    }
  }, [initialLanguage]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setLanguageCookie(lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
