"use client";

import { cn } from "@/lib/utils";

interface TimelineStep {
  label: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

const timelineSteps: TimelineStep[] = [
  { label: "Reported", time: "14:23", completed: true },
  { label: "Assigned", time: "14:24", completed: true },
  { label: "En Route", time: "14:45", completed: true },
  { label: "In Progress", time: "15:00", completed: false, current: true },
  { label: "Resolved", time: "", completed: false },
];

export default function TicketTracking() {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
        <div className="w-1 h-4 bg-warning rounded-full"></div>
        <span className="text-xs font-semibold text-text uppercase tracking-wider">Step 4</span>
        <span className="text-xs text-text-muted">Ticket Tracking</span>
      </div>

      <div className="p-6">
        <div className="bg-navy-50 rounded-lg p-6 max-w-lg mx-auto border border-border">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-text font-mono">#M-1247</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-success/10 text-success border border-success/20 uppercase tracking-wider">
                In Progress
              </span>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">SLA Remaining</p>
              <p className="text-xl font-bold text-warning">1h 23m</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-text mb-0.5">AC Repair</p>
          <p className="text-xs text-text-secondary mb-6">Unit 402, Al Barsha South</p>

          <div className="space-y-0">
            {timelineSteps.map((step, index) => (
              <div key={step.label} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                    step.completed ? "bg-success" : step.current ? "bg-navy-200" : "bg-navy-100"
                  )}>
                    {step.completed ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    ) : step.current ? (
                      <div className="w-2 h-2 rounded-full bg-navy-500"></div>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-navy-300"></div>
                    )}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className={cn("w-px h-8", step.completed ? "bg-success" : "bg-navy-200")} />
                  )}
                </div>

                <div className="pt-1">
                  <p className={cn(
                    "text-sm font-semibold",
                    step.completed ? "text-text" : step.current ? "text-text-secondary" : "text-text-muted"
                  )}>
                    {step.label}
                  </p>
                  {step.time && <p className="text-[10px] text-text-muted font-mono">{step.time}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
