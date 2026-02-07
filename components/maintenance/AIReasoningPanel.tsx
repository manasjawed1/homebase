"use client";

import { cn } from "@/lib/utils";

interface Step {
  number: number;
  icon: string;
  title: string;
  detail: string;
  time: string;
  color: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: "chat",
    title: "Analyzed message",
    detail: "Detected: Maintenance (HVAC)",
    time: "0.5s",
    color: "bg-blue-50 text-blue-600",
  },
  {
    number: 2,
    icon: "user",
    title: "Checked tenant history",
    detail: "No previous AC issues",
    time: "1.2s",
    color: "bg-purple-50 text-purple-600",
  },
  {
    number: 3,
    icon: "location",
    title: "Searched 5 vendors",
    detail: "Filtered by: <2hr response, Al Barsha area",
    time: "2.1s",
    color: "bg-orange-50 text-orange-600",
  },
  {
    number: 4,
    icon: "star",
    title: "Selected vendor",
    detail: "Ahmad HVAC (4.8★, available now)",
    time: "2.8s",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    number: 5,
    icon: "notify",
    title: "Notified parties",
    detail: "Tenant (Arabic) + Vendor (WhatsApp)",
    time: "3.2s",
    color: "bg-green-50 text-green-600",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  chat: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  user: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  location: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  notify: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
};

export default function AIReasoningPanel() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <span className="text-sm font-semibold text-text">Screen 2: AI Agent Reasoning Panel</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              AI
            </span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
            Completed in 3.5s
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="p-6">
        <div className="space-y-1">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4 group">
              {/* Icon */}
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", step.color)}>
                {iconMap[step.icon]}
              </div>

              {/* Content */}
              <div className={cn(
                "flex-1 py-3",
                index < steps.length - 1 ? "border-b border-border" : ""
              )}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-text-muted">Step {step.number}</span>
                      <span className="text-xs text-text-muted">{step.time}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-text">{step.title}</p>
                    <p className="text-xs text-text-secondary">{step.detail}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
