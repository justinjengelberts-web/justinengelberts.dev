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

// Sparkle star component
function Sparkle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 0L13.5 9L22 12L13.5 15L12 24L10.5 15L2 12L10.5 9L12 0Z" />
    </svg>
  );
}

export function RefundelyPreview() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (steps.length + 1));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const isComplete = activeStep >= steps.length;

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 flex items-start md:items-center justify-center pt-8 md:pt-0">
      {/* Keyframes for animations */}
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

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex flex-row items-center justify-between md:justify-center gap-6 md:gap-12 w-full md:w-auto px-4 md:px-0">
        {/* Brand */}
        <div className="text-left md:text-center">
          <div className="text-2xl md:text-4xl font-black tracking-tight">
            <span className="text-slate-900">Re</span>
            <span className="text-emerald-600">fundely</span>
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
                  {/* Icon */}
                  {isAIStep ? (
                    // Special AI step with gradient ring and sparkles
                    <div
                      className={`
                        relative w-5 h-5 md:w-8 md:h-8 flex items-center justify-center
                        transition-all duration-500 ease-out
                        ${isCurrent ? "scale-110" : "scale-100"}
                      `}
                    >
                      {/* Gradient spinning ring */}
                      {isActive && (
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 32 32"
                          style={{
                            animation: "spin 4s linear infinite",
                            willChange: "transform",
                          }}
                        >
                          <defs>
                            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="50%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="16"
                            cy="16"
                            r="14"
                            fill="none"
                            stroke="url(#aiGradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="50 88"
                          />
                        </svg>
                      )}
                      {/* White circle background */}
                      <div
                        className={`
                          absolute inset-1 rounded-full flex items-center justify-center
                          transition-all duration-500
                          ${isActive
                            ? "bg-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                            : "bg-slate-100"
                          }
                        `}
                      >
                        {/* Sparkles inside */}
                        {isActive ? (
                          <div className="relative w-3 h-3 flex items-center justify-center">
                            <Sparkle className="w-2.5 h-2.5 text-purple-500" style={{ animation: "sparkle 3s ease-in-out infinite" }} />
                            <Sparkle className="absolute -top-0.5 -right-0.5 w-1 h-1 text-purple-400" style={{ animation: "sparkle 2.5s ease-in-out infinite 0.5s" }} />
                            <Sparkle className="absolute -bottom-0.5 -left-0.5 w-1 h-1 text-violet-400" style={{ animation: "sparkle 2.8s ease-in-out infinite 1s" }} />
                          </div>
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  ) : (
                    // Regular step icon
                    <div
                      className={`
                        w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center
                        transition-all duration-500 ease-out
                        ${isActive
                          ? "bg-emerald-500 shadow-md shadow-emerald-500/30"
                          : "bg-slate-100"
                        }
                        ${isCurrent ? "scale-110" : "scale-100"}
                      `}
                    >
                      <Icon
                        className={`w-2.5 h-2.5 md:w-4 md:h-4 transition-colors duration-500 ${
                          isActive ? "text-white" : "text-slate-400"
                        }`}
                      />
                    </div>
                  )}

                  {/* Label */}
                  <span
                    className={`
                      text-[9px] md:text-xs font-semibold transition-colors duration-500
                      ${isActive ? "text-slate-900" : "text-slate-400"}
                    `}
                  >
                    {step.label}
                  </span>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion badge */}
      <div
        className={`
          absolute bottom-2 right-2 md:bottom-4 md:right-4 z-20 bg-emerald-600 text-white
          px-2 py-1 md:px-3 md:py-1.5 rounded-lg shadow-xl
          flex items-center gap-1 md:gap-2
          transition-all duration-500 ease-out
          ${isComplete
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-90"
          }
        `}
      >
        <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
        <span className="text-[8px] md:text-[10px] font-bold leading-tight">GDPR Compliant<br />& IBANs Encrypted</span>
      </div>

      {/* Top badge */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 bg-emerald-600 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1 md:gap-1.5 shadow-lg">
        <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
        <span className="text-[10px] md:text-xs font-semibold">AI-Powered</span>
      </div>

      {/* Tech badges - hidden on mobile */}
      <div className="hidden md:flex absolute bottom-4 left-4 z-20 flex-col gap-1.5">
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
