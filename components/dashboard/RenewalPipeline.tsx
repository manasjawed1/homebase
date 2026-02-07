"use client";

import { cn } from "@/lib/utils";

interface Renewal {
  id: string;
  name: string;
  location: string;
  area: string;
  rent: string;
  expiry: string;
  days: number;
  status?: string;
  highlight?: boolean;
}

const renewals: Renewal[] = [
  {
    id: "R-5041",
    name: "Sara Ahmad",
    location: "Unit 402",
    area: "Al Barsha South",
    rent: "85,000 AED",
    expiry: "15/04/2026",
    days: 67,
    status: "Offer Ready",
  },
  {
    id: "R-5042",
    name: "Mohammed Ali",
    location: "Unit 203",
    area: "JBR",
    rent: "120,000 AED",
    expiry: "22/04/2026",
    days: 74,
    status: "RERA Check",
    highlight: true,
  },
  {
    id: "R-5043",
    name: "Fatima Hassan",
    location: "Unit 1505",
    area: "Dubai Marina",
    rent: "95,000 AED",
    expiry: "08/03/2026",
    days: 29,
    status: "Urgent",
  },
];

export default function RenewalPipeline() {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
          </svg>
          <h3 className="font-semibold text-text">Renewal Pipeline</h3>
        </div>
        <span className="text-sm text-orange font-medium">3 pending</span>
      </div>

      <div className="space-y-3">
        {renewals.map((renewal) => (
          <div
            key={renewal.id}
            className={cn(
              "border rounded-xl p-4 hover:shadow-sm transition-shadow cursor-pointer",
              renewal.highlight ? "border-warning bg-warning/5" : "border-border"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">{renewal.id}</span>
                {renewal.status && (
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium",
                    renewal.status === "Urgent" 
                      ? "bg-red-100 text-red-700" 
                      : renewal.status === "RERA Check"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-900 text-white"
                  )}>
                    {renewal.status}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-sm font-medium",
                renewal.days < 30 ? "text-danger" : "text-text-secondary"
              )}>
                {renewal.days < 30 ? (
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {renewal.days} days
                  </span>
                ) : (
                  `${renewal.days} days`
                )}
              </span>
            </div>
            <p className="text-sm font-semibold text-text mb-1">{renewal.name}</p>
            <div className="flex items-center gap-1 text-text-muted text-xs mb-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {renewal.location}, {renewal.area}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">Current Rent: {renewal.rent}</span>
              <span className="text-xs text-text-muted">Expiry: {renewal.expiry}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2.5 text-sm text-text-secondary font-medium bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
        View All Renewals
      </button>
    </div>
  );
}
