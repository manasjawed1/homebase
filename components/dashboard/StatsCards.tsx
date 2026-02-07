"use client";

import { cn } from "@/lib/utils";

interface StatCard {
  label: string;
  value: string;
  subtitle: string;
  trend?: "up" | "down" | "neutral";
  accentColor: string;
}

const stats: StatCard[] = [
  {
    label: "Active Tickets",
    value: "12",
    subtitle: "+3 today",
    trend: "up",
    accentColor: "border-t-warning",
  },
  {
    label: "Pending Renewals",
    value: "8",
    subtitle: "62 days to deadline",
    trend: "neutral",
    accentColor: "border-t-info",
  },
  {
    label: "Agent Actions Today",
    value: "47",
    subtitle: "94% auto-resolved",
    trend: "up",
    accentColor: "border-t-gold",
  },
  {
    label: "Avg Response Time",
    value: "8s",
    subtitle: "within SLA",
    trend: "down",
    accentColor: "border-t-success",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "bg-white rounded-lg border border-border border-t-3 p-5",
            stat.accentColor
          )}
        >
          <p className="text-[11px] text-text-muted uppercase tracking-wider font-medium mb-2">{stat.label}</p>
          <p className="text-3xl font-bold text-text mb-1">{stat.value}</p>
          <div className="flex items-center gap-1.5">
            {stat.trend === "up" && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            )}
            {stat.trend === "down" && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            )}
            <p className="text-xs text-text-secondary">{stat.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
