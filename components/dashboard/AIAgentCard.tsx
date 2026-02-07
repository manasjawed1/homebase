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
    <div className="bg-primary rounded-lg border border-primary-light overflow-hidden">
      <div className="p-5 flex items-center gap-5">
        <div className="relative">
          <div className="w-12 h-12 rounded-lg border-2 border-gold/40 bg-gold/10 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5963A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8"/>
              <rect width="16" height="12" x="4" y="8" rx="2"/>
              <path d="M2 14h2"/>
              <path d="M20 14h2"/>
              <path d="M15 13v2"/>
              <path d="M9 13v2"/>
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-primary"></div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-base font-bold text-white">AI Operations Agent</h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Active
            </span>
          </div>
          <p className="text-xs text-navy-300 mb-3">Automated property management intelligence for Dubai/UAE operations</p>

          <div className="bg-white/5 border border-white/10 rounded px-3 py-2 inline-flex items-center gap-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C5963A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <div>
              <span className="text-[10px] text-navy-400 uppercase tracking-wider">Current Task</span>
              <p className="text-xs text-navy-200 font-medium flex items-center gap-2">
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-gold animate-pulse"></span>
                  <span className="w-1 h-1 rounded-full bg-gold animate-pulse [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 rounded-full bg-gold animate-pulse [animation-delay:0.4s]"></span>
                </span>
                {activities[activityIndex]}
              </p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-navy-400 uppercase tracking-wider mb-1">Today&apos;s Actions</p>
          <p className="text-2xl font-bold text-gold">47</p>
          <p className="text-[10px] text-navy-300">94% auto-resolved</p>
        </div>
      </div>
    </div>
  );
}
