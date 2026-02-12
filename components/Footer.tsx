"use client";

import { motion } from "framer-motion";
import { Github, Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="py-24 px-6 bg-black border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            {t.footer.title}
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            {t.footer.subtitle}
          </p>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <a
            href="mailto:Justin Engelberts <me@justinengelberts.dev>"
            className="flex items-center gap-3 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors"
          >
            <Mail className="w-5 h-5" />
            {t.footer.getInTouch}
          </a>
          <a
            href="https://github.com/justinengelberts"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors"
          >
            <Github className="w-5 h-5" />
            {t.footer.viewGitHub}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo/Name */}
            <div className="text-white font-semibold text-lg">
              Justin Engelberts
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/justinengelberts"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/justinengelberts"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:Justin Engelberts <me@justinengelberts.dev>"
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-zinc-500 text-sm">
              {new Date().getFullYear()} Justin Engelberts
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
