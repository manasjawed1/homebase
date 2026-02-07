"use client";

import { useState, useEffect } from "react";

const activities = [
  "Verifying vendor compliance documentation...",
  "Processing tenant maintenance request...",
  "Analyzing RERA rental index data...",
  "Checking lease renewal deadlines...",
  "Matching vendor for plumbing issue...",
];

export default function AIAgentCard() {
  const [activityIndex, setActivityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="p-5 flex items-center gap-5">
        <div className="relative">
          <div className="w-12 h-12 rounded-lg border-2 border-primary/20 bg-primary/5 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C47FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8"/>
              <rect width="16" height="12" x="4" y="8" rx="2"/>
              <path d="M2 14h2"/>
              <path d="M20 14h2"/>
              <path d="M15 13v2"/>
              <path d="M9 13v2"/>
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"></div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-base font-bold text-text">AI Operations Agent</h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-success/10 text-success border border-success/20 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
              Active
            </span>
          </div>
          <p className="text-xs text-text-muted mb-3">Automated property management intelligence for Dubai/UAE operations</p>

          <div className="bg-navy-50 border border-border rounded px-3 py-2 inline-flex items-center gap-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6C47FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <div>
              <span className="text-[10px] text-text-muted uppercase tracking-wider">Current Task</span>
              <p className="text-xs text-text-secondary font-medium flex items-center gap-2">
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:0.4s]"></span>
                </span>
                {activities[activityIndex]}
              </p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Today&apos;s Actions</p>
          <p className="text-2xl font-bold text-primary">47</p>
          <p className="text-[10px] text-text-muted">94% auto-resolved</p>
        </div>
      </div>
    </div>
  );
}
