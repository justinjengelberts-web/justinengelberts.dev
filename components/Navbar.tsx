"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const USFlag = () => (
  <svg viewBox="0 0 512 512" className="w-5 h-5 rounded-sm">
    <rect width="512" height="512" fill="#fff"/>
    <g fill="#bf0a30">
      {[0, 2, 4, 6, 8, 10, 12].map(i => (
        <rect key={i} y={i * 39.4} width="512" height="39.4"/>
      ))}
    </g>
    <rect width="204.8" height="275.7" fill="#002868"/>
    {/* Simplified stars pattern */}
    <g fill="#fff">
      {[0,1,2,3,4,5,6,7,8].map(row => (
        [0,1,2,3,4,5].slice(0, row % 2 === 0 ? 6 : 5).map(col => (
          <circle key={`${row}-${col}`} cx={17 + col * 34 + (row % 2 === 0 ? 0 : 17)} cy={15 + row * 30} r="8"/>
        ))
      ))}
    </g>
  </svg>
);

const NLFlag = () => (
  <svg viewBox="0 0 512 512" className="w-5 h-5 rounded-sm">
    <rect width="512" height="170.7" fill="#AE1C28"/>
    <rect y="170.7" width="512" height="170.7" fill="#fff"/>
    <rect y="341.3" width="512" height="170.7" fill="#21468B"/>
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
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors"
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
              className="flex items-center justify-center w-10 h-10"
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
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
                >
                  {t.nav.getInTouch}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
