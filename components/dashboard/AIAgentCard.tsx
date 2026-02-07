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
    <div className="bg-white rounded-2xl border border-border p-6 flex items-center gap-6">
      {/* AI Avatar */}
      <div className="relative">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8"/>
            <rect width="16" height="12" x="4" y="8" rx="2"/>
            <path d="M2 14h2"/>
            <path d="M20 14h2"/>
            <path d="M15 13v2"/>
            <path d="M9 13v2"/>
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-lg font-bold text-text">Homebase AI Agent</h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
            Active
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            AI
          </span>
        </div>
        <p className="text-sm text-text-secondary mb-3">Your AI co-pilot for property management in Dubai/UAE</p>
        
        {/* Current Activity */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 inline-flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <div>
            <span className="text-xs text-text-muted">Current Activity:</span>
            <p className="text-sm text-text font-medium flex items-center gap-2">
              <span className="flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse [animation-delay:0.4s]"></span>
              </span>
              {activities[activityIndex]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
