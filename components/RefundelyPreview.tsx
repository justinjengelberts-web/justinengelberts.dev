"use client";

import { useState, useEffect } from "react";
import { FileUp, Sparkles, CheckCircle2, Banknote, UserCheck, ShieldCheck } from "lucide-react";

const steps = [
  { icon: FileUp, label: "Upload PDF" },
  { icon: Sparkles, label: "AI Extract", isAI: true },
  { icon: CheckCircle2, label: "Review" },
  { icon: Banknote, label: "SEPA Export" },
  { icon: UserCheck, label: "Done" },
];

function SparkleIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 0L13.5 9L22 12L13.5 15L12 24L10.5 15L2 12L10.5 9L12 0Z" />
    </svg>
  );
}

const dashMetrics = [
  { label: "Sessions", value: "2,847", change: "+12%" },
  { label: "Bounce Rate", value: "38%", change: "−4%" },
  { label: "Engagement", value: "73%", change: "+8%" },
  { label: "Conversions", value: "94", change: "+23%" },
];

const barHeights = [40, 65, 45, 80, 60, 90, 75];

function DashboardView({ visible }: { visible: boolean }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimated(true), 250);
      return () => clearTimeout(t);
    } else {
      setAnimated(false);
    }
  }, [visible]);

  return (
    <div
      className={`absolute inset-0 flex flex-col bg-gray-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Browser chrome */}
      <div className="bg-white border-b border-gray-200 px-3 py-1.5 flex items-center gap-2 flex-shrink-0">
        <div className="flex gap-1">
          {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
            <div key={c} className={`w-2 h-2 rounded-full ${c}`} />
          ))}
        </div>
        <div className="flex-1 bg-gray-100 rounded text-[8px] text-gray-400 px-2 py-0.5 text-center font-mono">
          refundely-dash
        </div>
      </div>

      {/* Tab nav */}
      <div
        className="bg-white border-b border-gray-100 px-2 py-1 flex gap-1 flex-shrink-0"
        style={{ scrollbarWidth: "none", overflowX: "auto" }}
      >
        {["Overzicht", "Kanban", "Roadmap", "Analytics"].map((tab, i) => (
          <span
            key={tab}
            className={`text-[8px] px-2 py-0.5 rounded whitespace-nowrap font-medium ${
              i === 3 ? "bg-emerald-500 text-white" : "text-gray-400"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-2 flex flex-col gap-1.5 overflow-hidden">
        {/* API badges */}
        <div className="flex gap-1 items-center flex-shrink-0">
          {[
            { name: "GA4", c: "bg-orange-50 text-orange-600 border border-orange-200" },
            { name: "Clarity", c: "bg-purple-50 text-purple-600 border border-purple-200" },
            { name: "Search Console", c: "bg-blue-50 text-blue-600 border border-blue-200" },
          ].map(({ name, c }) => (
            <span key={name} className={`text-[7px] px-1.5 py-0.5 rounded-full font-semibold ${c}`}>
              {name}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-0.5 text-[7px] text-emerald-500 font-semibold">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-1.5 flex-shrink-0">
          {dashMetrics.map((m) => (
            <div key={m.label} className="bg-white rounded-lg border border-gray-100 p-1.5 shadow-sm">
              <div className="text-[7px] text-gray-400 font-medium">{m.label}</div>
              <div
                className={`text-xs font-bold text-gray-800 mt-0.5 transition-all duration-500 ${
                  animated ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
              >
                {m.value}
              </div>
              <div className="text-[7px] text-emerald-500 font-semibold">{m.change}</div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="flex-1 bg-white rounded-lg border border-gray-100 p-1.5 shadow-sm min-h-0">
          <div className="text-[7px] text-gray-400 font-medium mb-1">Sessions (7d)</div>
          <div className="flex items-end gap-0.5 h-8">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-200 rounded-t-sm"
                style={{
                  height: animated ? `${h}%` : "0%",
                  transition: `height 0.4s ease ${i * 0.06}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom-left badges */}
      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-20 hidden md:flex flex-col gap-1">
        <span className="bg-slate-800 text-white px-2 py-0.5 rounded text-[9px] font-semibold">
          BFF Architecture
        </span>
        <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded text-[9px] font-semibold">
          Vanilla JS
        </span>
      </div>
    </div>
  );
}

export function RefundelyPreview() {
  const [activeStep, setActiveStep] = useState(0);
  const [view, setView] = useState<"platform" | "dashboard">("platform");

  // Step animation for platform view
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (steps.length + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Auto-switch between views every 5.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setView((v) => (v === "platform" ? "dashboard" : "platform"));
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const isComplete = activeStep >= steps.length;

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex items-start md:items-center justify-center pt-8 md:pt-0">
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.5; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* View toggle — top right */}
      <div className="absolute top-2 right-2 md:top-3 md:right-3 z-30 flex items-center gap-0.5 bg-black/10 backdrop-blur-sm rounded-full p-0.5">
        <button
          onClick={() => setView("platform")}
          className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded-full font-semibold transition-all duration-300 ${
            view === "platform" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Platform
        </button>
        <button
          onClick={() => setView("dashboard")}
          className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded-full font-semibold transition-all duration-300 ${
            view === "dashboard" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Dashboard
        </button>
      </div>

      {/* Dashboard view */}
      <DashboardView visible={view === "dashboard"} />

      {/* Platform view */}
      <div
        className={`relative z-10 flex flex-row items-center justify-center gap-6 md:gap-12 w-full md:w-auto px-4 md:px-0 transition-opacity duration-500 ${
          view === "platform" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Brand */}
        <div className="text-center">
          <div className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
            Re<span className="text-emerald-600">fundely</span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1 md:mt-2 font-medium">
            AI Invoice Processing
          </p>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg border border-slate-100 p-1.5 md:p-4">
          <div className="space-y-0.5 md:space-y-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;
              const isAIStep = step.isAI;

              return (
                <div key={index} className="flex items-center gap-1.5 md:gap-3">
                  {isAIStep ? (
                    <div
                      className={`relative w-5 h-5 md:w-8 md:h-8 flex items-center justify-center transition-all duration-500 ease-out ${
                        isCurrent ? "scale-110" : "scale-100"
                      }`}
                    >
                      {isActive && (
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 32 32"
                          style={{ animation: "spin 4s linear infinite", willChange: "transform" }}
                        >
                          <defs>
                            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="50%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="16" cy="16" r="14"
                            fill="none"
                            stroke="url(#aiGradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="50 88"
                          />
                        </svg>
                      )}
                      <div
                        className={`absolute inset-1 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isActive ? "bg-white shadow-[0_0_12px_rgba(139,92,246,0.4)]" : "bg-slate-100"
                        }`}
                      >
                        {isActive ? (
                          <div className="relative w-3 h-3 flex items-center justify-center">
                            <SparkleIcon className="w-2.5 h-2.5 text-purple-500" style={{ animation: "sparkle 3s ease-in-out infinite" }} />
                            <SparkleIcon className="absolute -top-0.5 -right-0.5 w-1 h-1 text-purple-400" style={{ animation: "sparkle 2.5s ease-in-out infinite 0.5s" }} />
                            <SparkleIcon className="absolute -bottom-0.5 -left-0.5 w-1 h-1 text-violet-400" style={{ animation: "sparkle 2.8s ease-in-out infinite 1s" }} />
                          </div>
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-out ${
                        isActive ? "bg-emerald-500 shadow-md shadow-emerald-500/30" : "bg-slate-100"
                      } ${isCurrent ? "scale-110" : "scale-100"}`}
                    >
                      <Icon
                        className={`w-2.5 h-2.5 md:w-4 md:h-4 transition-colors duration-500 ${
                          isActive ? "text-white" : "text-slate-400"
                        }`}
                      />
                    </div>
                  )}
                  <span
                    className={`text-[9px] md:text-xs font-semibold transition-colors duration-500 ${
                      isActive ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion badge (platform view only) */}
      <div
        className={`absolute bottom-2 right-2 md:bottom-4 md:right-4 z-20 bg-emerald-600 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg shadow-xl flex items-center gap-1 md:gap-2 transition-all duration-500 ease-out ${
          isComplete && view === "platform" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"
        }`}
      >
        <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
        <span className="text-[8px] md:text-[10px] font-bold leading-tight">
          GDPR Compliant<br />& IBANs Encrypted
        </span>
      </div>

      {/* Top-left badge (platform view only) */}
      <div
        className={`absolute top-2 left-2 md:top-4 md:left-4 z-20 bg-emerald-600 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1 md:gap-1.5 shadow-lg transition-opacity duration-300 ${
          view === "platform" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
        <span className="text-[10px] md:text-xs font-semibold">AI-Powered</span>
      </div>

      {/* Tech badges — platform view, hidden on mobile */}
      <div
        className={`hidden md:flex absolute bottom-4 left-4 z-20 flex-col gap-1.5 transition-opacity duration-300 ${
          view === "platform" ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="bg-slate-900 text-white px-2.5 py-1 rounded-md text-[10px] font-semibold">
          React + TypeScript
        </span>
        <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-[10px] font-semibold">
          Supabase
        </span>
      </div>
    </div>
  );
}
