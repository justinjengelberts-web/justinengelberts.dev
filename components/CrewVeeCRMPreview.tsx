"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Target, Bot, TrendingUp, AlertCircle, Zap, Users } from "lucide-react";

type Tab = "dashboard" | "leads" | "agents";

// ─── Mock data ────────────────────────────────────────────────────────────────
const kpiCards = [
  { label: "Totaal leads",     value: "47",    trend: "+8 deze week",  bg: "#eff6ff", iconColor: "#2563eb", Icon: Target       },
  { label: "Pipeline MRR",     value: "€12.4K",trend: "+€1.2K",        bg: "#dcfce7", iconColor: "#059669", Icon: TrendingUp   },
  { label: "Gewogen pipeline", value: "€8.1K", trend: "65% win rate",  bg: "#ede9fe", iconColor: "#7c3aed", Icon: Zap          },
  { label: "Won (maand)",      value: "€2.8K", trend: "3 deals",       bg: "#fef3c7", iconColor: "#d97706", Icon: Users        },
];

const hotLeads = [
  { naam: "Thomas Janssen",   bedrijf: "SalesNL",       status: "Demo gepland",      score: 91 },
  { naam: "Lena Verstappen",  bedrijf: "TechNL B.V.",   status: "Gekwalificeerd",    score: 87 },
  { naam: "Marc Dubois",      bedrijf: "BruxellesTech", status: "Offerte verstuurd", score: 79 },
];

const leadsData = [
  { naam: "Thomas Janssen",    bedrijf: "SalesNL",       bron: "CrewVee",    status: "Demo gepland",      score: 91 },
  { naam: "Lena Verstappen",   bedrijf: "TechNL B.V.",   bron: "CrewVee",    status: "Gekwalificeerd",    score: 87 },
  { naam: "Marc Dubois",       bedrijf: "BruxellesTech", bron: "CrewVee",    status: "Offerte verstuurd", score: 79 },
  { naam: "Sara van den Berg", bedrijf: "DataFlow AG",   bron: "Website",    status: "Gecontacteerd",     score: 64 },
  { naam: "Pieter Claes",      bedrijf: "Claes & Co",    bron: "CSV Import", status: "Nieuw",             score: 42 },
];

const agentsData = [
  { naam: "Sam",       klant: "SalesNL",     type: "Inbound Sales",   model: "claude-3-5-sonnet", status: "Actief",  gesprekken: 124 },
  { naam: "Aria",      klant: "TechNL B.V.", type: "Planner Support", model: "gpt-4o-mini",       status: "Actief",  gesprekken: 67  },
  { naam: "TestAgent", klant: "DataFlow AG", type: "Custom",          model: "claude-3-haiku",    status: "Concept", gesprekken: 0   },
];

// ─── Colour maps ──────────────────────────────────────────────────────────────
const statusTag: Record<string, { bg: string; color: string }> = {
  "Gekwalificeerd":    { bg: "#dcfce7", color: "#166534" },
  "Demo gepland":      { bg: "#ede9fe", color: "#5b21b6" },
  "Gecontacteerd":     { bg: "#dbeafe", color: "#1e40af" },
  "Nieuw":             { bg: "#f1f5f9", color: "#475569" },
  "Offerte verstuurd": { bg: "#fef3c7", color: "#92400e" },
};

const agentStatusTag: Record<string, { bg: string; color: string }> = {
  "Actief":    { bg: "#dcfce7", color: "#166634" },
  "Concept":   { bg: "#f1f5f9", color: "#475569" },
};

function scoreStyle(s: number): React.CSSProperties {
  if (s >= 70) return { background: "linear-gradient(135deg,#059669,#10b981)", color: "#fff" };
  if (s >= 40) return { background: "linear-gradient(135deg,#d97706,#f59e0b)", color: "#fff" };
  return           { background: "linear-gradient(135deg,#3b82f6,#60a5fa)",   color: "#fff" };
}

function Pill({ label, s }: { label: string; s: { bg: string; color: string } }) {
  return (
    <span className="inline-block px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap"
      style={{ backgroundColor: s.bg, color: s.color, fontSize: 9.5 }}>
      {label}
    </span>
  );
}

// ─── Tab content ──────────────────────────────────────────────────────────────
function DashboardView() {
  return (
    <div className="flex-1 overflow-hidden p-3 bg-[#f8fafc] flex flex-col gap-2.5">
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-2">
        {kpiCards.map(({ label, value, trend, bg, iconColor, Icon }) => (
          <div key={label} className="bg-white rounded-lg border border-slate-200 p-2.5 shadow-sm">
            <div className="w-5 h-5 rounded-md flex items-center justify-center mb-1.5" style={{ backgroundColor: bg }}>
              <Icon style={{ width: 10, height: 10, color: iconColor }} />
            </div>
            <div className="font-bold text-slate-900 leading-none mb-0.5" style={{ fontSize: 13 }}>{value}</div>
            <div className="text-slate-500 leading-tight" style={{ fontSize: 8.5 }}>{label}</div>
            <div className="font-medium leading-tight mt-0.5" style={{ fontSize: 8, color: iconColor }}>{trend}</div>
          </div>
        ))}
      </div>

      {/* Hot leads */}
      <div className="flex-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-1.5">
          <div className="w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: "#fef3c7" }}>
            <Zap style={{ width: 8, height: 8, color: "#d97706" }} />
          </div>
          <span className="font-semibold text-slate-800" style={{ fontSize: 10.5 }}>Hot leads</span>
        </div>
        <div>
          {hotLeads.map((l, i) => (
            <div key={i} className="px-3 py-1.5 flex items-center gap-2 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ backgroundColor: "#2563eb", fontSize: 7 }}>
                {l.naam[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-800 truncate" style={{ fontSize: 9.5 }}>{l.naam}</div>
                <div className="text-slate-400 truncate" style={{ fontSize: 8 }}>{l.bedrijf}</div>
              </div>
              <Pill label={l.status} s={statusTag[l.status] ?? statusTag["Nieuw"]} />
              <div className="w-7 h-5 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                style={{ ...scoreStyle(l.score), fontSize: 8.5 }}>
                {l.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadsView() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f8fafc]">
      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 px-3 py-1.5 flex items-center gap-2 flex-shrink-0">
        <div className="flex-1 flex items-center gap-1.5 bg-slate-100 rounded px-2 py-1">
          <Target style={{ width: 9, height: 9, color: "#94a3b8" }} />
          <span className="text-slate-400" style={{ fontSize: 8.5 }}>Zoek op naam of bedrijf…</span>
        </div>
        <div className="flex-shrink-0 bg-[#2563eb] text-white rounded px-2 py-1 font-medium cursor-pointer"
          style={{ fontSize: 8.5 }}>
          + Nieuwe lead
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full">
          <thead className="border-b border-slate-200 sticky top-0 bg-white">
            <tr>
              {["Naam", "Bron", "Status", "Score"].map(h => (
                <th key={h} className="px-3 py-1.5 text-left font-semibold text-slate-400 uppercase tracking-wide"
                  style={{ fontSize: 7.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leadsData.map((lead, i) => (
              <tr key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                className="border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors"
                style={{ backgroundColor: selected === i ? "#eff6ff" : undefined }}>
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ backgroundColor: "#2563eb", fontSize: 7 }}>
                      {lead.naam[0]}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800 whitespace-nowrap" style={{ fontSize: 9.5 }}>{lead.naam}</div>
                      <div className="text-slate-400" style={{ fontSize: 8 }}>{lead.bedrijf}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  <Pill label={lead.bron}
                    s={lead.bron === "CrewVee" ? { bg: "#ede9fe", color: "#5b21b6" }
                      : lead.bron === "Website" ? { bg: "#dbeafe", color: "#1e40af" }
                      : { bg: "#f1f5f9", color: "#475569" }} />
                </td>
                <td className="px-3 py-1.5">
                  <Pill label={lead.status} s={statusTag[lead.status] ?? statusTag["Nieuw"]} />
                </td>
                <td className="px-3 py-1.5">
                  <div className="w-8 h-5 rounded-full flex items-center justify-center font-bold"
                    style={{ ...scoreStyle(lead.score), fontSize: 8.5 }}>
                    {lead.score}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AgentsView() {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f8fafc]">
      <div className="bg-white border-b border-slate-200 px-3 py-1.5 flex items-center gap-2 flex-shrink-0">
        <div className="flex-1 flex items-center gap-1.5 bg-slate-100 rounded px-2 py-1">
          <Bot style={{ width: 9, height: 9, color: "#94a3b8" }} />
          <span className="text-slate-400" style={{ fontSize: 8.5 }}>Zoek op agent naam…</span>
        </div>
        <div className="flex-shrink-0 bg-[#2563eb] text-white rounded px-2 py-1 font-medium cursor-pointer"
          style={{ fontSize: 8.5 }}>
          + Nieuwe agent
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-white">
        {agentsData.map((a, i) => (
          <div key={i} className="px-3 py-2 flex items-center gap-2.5 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#7c3aed" }}>
              <Bot style={{ width: 12, height: 12, color: "#fff" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800" style={{ fontSize: 10.5 }}>{a.naam}</div>
              <div className="text-slate-400" style={{ fontSize: 8.5 }}>{a.klant}</div>
            </div>
            <div>
              <Pill label={a.type}
                s={a.type === "Inbound Sales" ? { bg: "#ede9fe", color: "#5b21b6" }
                  : a.type === "Planner Support" ? { bg: "#dbeafe", color: "#1e40af" }
                  : { bg: "#f1f5f9", color: "#475569" }} />
            </div>
            <div>
              <div className="flex items-center gap-1">
                {a.status === "Actief" && (
                  <motion.span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#059669" }}
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                )}
                <Pill label={a.status} s={agentStatusTag[a.status] ?? agentStatusTag["Concept"]} />
              </div>
            </div>
            <div className="text-slate-500 font-semibold text-right" style={{ fontSize: 9, minWidth: 28 }}>
              {a.gesprekken > 0 ? a.gesprekken : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sidebar nav ──────────────────────────────────────────────────────────────
const sidebarNav: { id: Tab | null; label: string; Icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard",   Icon: LayoutDashboard },
  { id: "leads",     label: "Leads",       Icon: Target          },
  { id: null,        label: "Klanten",     Icon: Users           },
  { id: "agents",    label: "Agents",      Icon: Bot             },
  { id: null,        label: "Acties",      Icon: AlertCircle     },
  { id: null,        label: "Rapportages", Icon: TrendingUp      },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function CrewVeeCRMPreview() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div className="w-full h-full flex overflow-hidden select-none" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Sidebar */}
      <div className="w-[110px] flex flex-col flex-shrink-0" style={{ backgroundColor: "#0f172a" }}>
        {/* Logo */}
        <div className="px-3 py-2.5 flex items-center gap-1.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#2563eb" }}>
            <span className="text-white font-bold" style={{ fontSize: 7 }}>≡</span>
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-white font-bold truncate" style={{ fontSize: 9.5 }}>LeadHub</span>
            <span className="font-semibold rounded px-1 flex-shrink-0"
              style={{ backgroundColor: "rgba(16,185,129,0.2)", color: "#34d399", fontSize: 6 }}>CRM</span>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 py-2 px-1.5 space-y-0.5 overflow-hidden">
          {sidebarNav.map(({ id, label, Icon: NavIcon }) => {
            const active = id !== null && tab === id;
            const clickable = id !== null;
            return (
              <button key={label}
                onClick={() => id && setTab(id)}
                disabled={!clickable}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-left transition-colors"
                style={{
                  backgroundColor: active ? "#2563eb" : "transparent",
                  color: active ? "#fff" : clickable ? "#94a3b8" : "#374151",
                  cursor: clickable ? "pointer" : "default",
                }}>
                <NavIcon style={{ width: 10, height: 10, flexShrink: 0 }} />
                <span className="font-medium leading-none" style={{ fontSize: 9 }}>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-2 py-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-1.5 px-2 py-1" style={{ color: "#475569" }}>
            <span style={{ fontSize: 9 }}>↩</span>
            <span style={{ fontSize: 8.5 }}>Uitloggen</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Page header */}
        <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="font-bold text-slate-900 leading-none" style={{ fontSize: 12 }}>
              {tab === "dashboard" ? "Dashboard" : tab === "leads" ? "Leads" : "Agents"}
            </div>
            <div className="text-slate-400 mt-0.5" style={{ fontSize: 8 }}>
              {tab === "dashboard" ? "Overzicht van je pipeline" : tab === "leads" ? "5 leads" : "3 agents"}
            </div>
          </div>
          {/* Live agent indicator */}
          <motion.div className="flex items-center gap-1"
            animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#059669", display: "inline-block" }} />
            <span className="font-medium" style={{ color: "#059669", fontSize: 8 }}>Sam actief</span>
          </motion.div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.13 }}
            className="flex flex-1 min-h-0 flex-col">
            {tab === "dashboard" && <DashboardView />}
            {tab === "leads"     && <LeadsView />}
            {tab === "agents"    && <AgentsView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
