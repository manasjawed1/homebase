"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface HelpTipProps {
  content: string;
  className?: string;
  size?: "sm" | "md";
}

export default function HelpTip({ content, className, size = "sm" }: HelpTipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className={cn("relative inline-flex items-center justify-center shrink-0 cursor-help", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className={cn(
        "rounded-full bg-navy-100 text-navy-500 font-bold flex items-center justify-center border border-navy-200 hover:bg-navy-200 transition-colors",
        size === "sm" ? "w-4 h-4 text-[9px]" : "w-5 h-5 text-[10px]"
      )}>
        ?
      </span>
      {isVisible && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-primary text-white text-[11px] leading-relaxed rounded-lg shadow-lg w-64 text-left pointer-events-none before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-primary">
          {content}
        </span>
      )}
    </span>
  );
}

export function HelpTipLight({ content, className, size = "sm" }: HelpTipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className={cn("relative inline-flex items-center justify-center shrink-0 cursor-help", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className={cn(
        "rounded-full bg-white/10 text-white/60 font-bold flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors",
        size === "sm" ? "w-4 h-4 text-[9px]" : "w-5 h-5 text-[10px]"
      )}>
        ?
      </span>
      {isVisible && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white text-text text-[11px] leading-relaxed rounded-lg shadow-lg w-64 text-left pointer-events-none border border-border before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-white">
          {content}
        </span>
      )}
    </span>
  );
}
