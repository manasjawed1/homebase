"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PageInfoBannerProps {
  title: string;
  description: string;
  details?: string[];
}

export default function PageInfoBanner({ title, description, details }: PageInfoBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-navy-50 border border-border rounded-lg mb-6 overflow-hidden">
      <div
        className="px-5 py-3.5 cursor-pointer hover:bg-navy-100/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-1 h-5 bg-gold rounded-full"></div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-text mb-0.5">{title}</h3>
              <p className="text-xs text-text-secondary">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">Click to {isExpanded ? "collapse" : "expand"}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn("text-text-muted transition-transform", isExpanded && "rotate-180")}
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      </div>
      {isExpanded && details && (
        <div className="px-5 pb-4 border-t border-border pt-3 space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C5963A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <p className="text-xs text-text-secondary leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
