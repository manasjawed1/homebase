"use client";

import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  detail: string;
  time: string;
}

const steps: Step[] = [
  { number: 1, title: "Analyzed message", detail: "Detected: Maintenance (HVAC)", time: "0.5s" },
  { number: 2, title: "Checked tenant history", detail: "No previous AC issues", time: "1.2s" },
  { number: 3, title: "Searched 5 vendors", detail: "Filtered by: <2hr response, Al Barsha area", time: "2.1s" },
  { number: 4, title: "Selected vendor", detail: "Ahmad HVAC (4.8★, available now)", time: "2.8s" },
  { number: 5, title: "Notified parties", detail: "Tenant (Arabic) + Vendor (WhatsApp)", time: "3.2s" },
];

export default function AIReasoningPanel() {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-gold rounded-full"></div>
          <span className="text-xs font-semibold text-text uppercase tracking-wider">Step 2</span>
          <span className="text-xs text-text-muted">AI Agent Reasoning Panel</span>
        </div>
        <span className="px-2.5 py-1 rounded text-[10px] font-semibold bg-success/10 text-success border border-success/20 uppercase tracking-wider">
          Completed in 3.5s
        </span>
      </div>

      <div className="p-5">
        <div className="space-y-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {step.number}
                </div>
                {index < steps.length - 1 && <div className="w-px h-8 bg-border" />}
              </div>

              <div className={cn("flex-1 pb-3", index < steps.length - 1 ? "border-b border-border" : "")}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-text">{step.title}</p>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <p className="text-xs text-text-secondary">{step.detail}</p>
                  </div>
                  <span className="text-[10px] text-text-muted font-mono">{step.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
