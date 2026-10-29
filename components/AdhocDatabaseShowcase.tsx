"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Copy = {
  title: string;
  intro: string;
  switcherLabel: string;
  kvkTab: string;
  aiTab: string;
  kvkDetail: string;
  aiDetail: string;
  kvkCaption: string;
  aiCaption: string;
};

export function AdhocDatabaseShowcase({ copy }: { copy: Copy }) {
  const [activeDatabase, setActiveDatabase] = useState<"kvk" | "ai">("kvk");
  const isKvk = activeDatabase === "kvk";

  return (
    <div className="space-y-6">
      <div className="border-t border-white/10 pt-7 sm:pt-9">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-orange-300">
            {copy.switcherLabel}
          </p>
          <h4 className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">
            {copy.title}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{copy.intro}</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeDatabase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={isKvk ? "/projects/adhoc/v3-kvk-pro.png" : "/projects/adhoc/v3-ai-leads.png"}
                alt={isKvk ? "KVK Pro selection tool with filters, live results, and export" : "AI Leads selection tool with filters, live results, and export"}
                width={1920}
                height={1080}
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="block h-auto w-full"
                priority={isKvk}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          {isKvk ? copy.kvkCaption : copy.aiCaption}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2" role="tablist" aria-label={copy.switcherLabel}>
        <button
          type="button"
          role="tab"
          aria-selected={isKvk}
          onClick={() => setActiveDatabase("kvk")}
          className={`border p-4 text-left transition-[border-color,background-color,transform] duration-300 ease-out active:translate-y-px ${
            isKvk
              ? "border-orange-400/70 bg-orange-400/10"
              : "border-white/10 bg-zinc-900/30 hover:border-white/25 hover:bg-zinc-900/60"
          }`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-300">01 / Register</span>
          <span className="mt-2 block text-sm font-medium text-white">{copy.kvkTab}</span>
          <span className="mt-1 block text-xs leading-relaxed text-zinc-400">{copy.kvkDetail}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isKvk}
          onClick={() => setActiveDatabase("ai")}
          className={`border p-4 text-left transition-[border-color,background-color,transform] duration-300 ease-out active:translate-y-px ${
            !isKvk
              ? "border-orange-400/70 bg-orange-400/10"
              : "border-white/10 bg-zinc-900/30 hover:border-white/25 hover:bg-zinc-900/60"
          }`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-300">02 / Web</span>
          <span className="mt-2 block text-sm font-medium text-white">{copy.aiTab}</span>
          <span className="mt-1 block text-xs leading-relaxed text-zinc-400">{copy.aiDetail}</span>
        </button>
      </div>
    </div>
  );
}
