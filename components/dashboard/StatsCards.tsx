"use client";

import { cn } from "@/lib/utils";

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
  iconBg: string;
}

const stats: StatCard[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    label: "Active Tickets",
    value: "12",
    subtitle: "+3 today",
    iconBg: "bg-orange-50",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
        <path d="M10 18v-1"/>
        <path d="M14 18v-3"/>
      </svg>
    ),
    label: "Pending Renewals",
    value: "8",
    subtitle: "62 days to deadline",
    iconBg: "bg-blue-50",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    label: "Agent Actions Today",
    value: "47",
    subtitle: "94% auto-resolved",
    iconBg: "bg-purple-50",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: "Response Time",
    value: "8s",
    subtitle: "avg",
    iconBg: "bg-green-50",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl border border-border p-5 flex flex-col items-center text-center"
        >
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-3", stat.iconBg)}>
            {stat.icon}
          </div>
          <p className="text-xs text-text-secondary mb-1">{stat.label}</p>
          <p className="text-3xl font-bold text-text mb-0.5">{stat.value}</p>
          <p className="text-xs text-text-muted">{stat.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
