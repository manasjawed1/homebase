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
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
          <span className="text-sm font-semibold text-text">Screen 4: Ticket Tracking</span>
        </div>
      </div>

      {/* Ticket Detail */}
      <div className="p-6">
        <div className="bg-gray-50 rounded-xl p-6 max-w-lg mx-auto">
          {/* Ticket Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-text">#M-1247</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                In Progress
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-text-muted text-xs mb-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                SLA
              </div>
              <p className="text-2xl font-bold text-orange">1h 23m</p>
              <p className="text-xs text-text-muted">remaining</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-text mb-0.5">AC Repair</p>
          <p className="text-xs text-text-secondary mb-6">Unit 402, Al Barsha South</p>

          {/* Timeline */}
          <div className="space-y-0">
            {timelineSteps.map((step, index) => (
              <div key={step.label} className="flex items-start gap-4">
                {/* Dot + Line */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    step.completed
                      ? "bg-success"
                      : step.current
                        ? "bg-gray-200"
                        : "bg-gray-100"
                  )}>
                    {step.completed ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    ) : step.current ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                    )}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className={cn(
                      "w-0.5 h-10",
                      step.completed ? "bg-success" : "bg-gray-200"
                    )} />
                  )}
                </div>

                {/* Label */}
                <div className="pt-1.5">
                  <p className={cn(
                    "text-sm font-semibold",
                    step.completed ? "text-text" : step.current ? "text-text-secondary" : "text-text-muted"
                  )}>
                    {step.label}
                  </p>
                  {step.time && (
                    <p className="text-xs text-text-muted">{step.time}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
