"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const USFlag = () => (
  <svg viewBox="0 0 24 18" className="w-5 h-4 rounded-[3px] overflow-hidden">
    <rect width="24" height="18" fill="#B22234"/>
    <rect y="1.38" width="24" height="1.38" fill="#fff"/>
    <rect y="4.15" width="24" height="1.38" fill="#fff"/>
    <rect y="6.92" width="24" height="1.38" fill="#fff"/>
    <rect y="9.69" width="24" height="1.38" fill="#fff"/>
    <rect y="12.46" width="24" height="1.38" fill="#fff"/>
    <rect y="15.23" width="24" height="1.38" fill="#fff"/>
    <rect width="9.6" height="9.69" fill="#3C3B6E"/>
  </svg>
);

const NLFlag = () => (
  <svg viewBox="0 0 24 18" className="w-5 h-4 rounded-[3px] overflow-hidden">
    <rect width="24" height="6" fill="#AE1C28"/>
    <rect y="6" width="24" height="6" fill="#fff"/>
    <rect y="12" width="24" height="6" fill="#21468B"/>
  </svg>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "#projects", label: t.nav.projects },
    { href: "#about", label: t.nav.about },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "nl" : "en");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-white font-semibold text-lg tracking-tight">
            Justin Engelberts
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all"
              aria-label="Toggle language"
            >
              {language === "en" ? <USFlag /> : <NLFlag />}
            </button>

            <a
              href="#contact"
              className="px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors min-w-[108px] text-center"
            >
              {t.nav.getInTouch}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all"
              aria-label="Toggle language"
            >
              {language === "en" ? <USFlag /> : <NLFlag />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 pt-6 pb-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label="Contact"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
