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
}

const renewals: Renewal[] = [
  { id: "R-5041", name: "Sara Ahmad", location: "Unit 402", area: "Al Barsha South", rent: "85,000 AED", expiry: "15/04/2026", days: 67, status: "Offer Ready" },
  { id: "R-5042", name: "Mohammed Ali", location: "Unit 203", area: "JBR", rent: "120,000 AED", expiry: "22/04/2026", days: 74, status: "RERA Check" },
  { id: "R-5043", name: "Fatima Hassan", location: "Unit 1505", area: "Dubai Marina", rent: "95,000 AED", expiry: "08/03/2026", days: 29, status: "Urgent" },
];

export default function RenewalPipeline() {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-info rounded-full"></div>
          <h3 className="font-semibold text-sm text-text">Renewal Pipeline</h3>
        </div>
        <span className="text-xs font-semibold text-info bg-info/10 px-2.5 py-1 rounded">3 pending</span>
      </div>

      <div className="divide-y divide-border">
        {renewals.map((renewal) => (
          <div
            key={renewal.id}
            className={cn(
              "px-5 py-3.5 hover:bg-navy-50/30 transition-colors cursor-pointer",
              renewal.days < 30 && "bg-danger/3 border-l-2 border-l-danger"
            )}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-text-secondary">{renewal.id}</span>
                {renewal.status && (
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-semibold",
                    renewal.status === "Urgent"
                      ? "bg-danger/10 text-danger border border-danger/20"
                      : renewal.status === "RERA Check"
                        ? "bg-warning/10 text-warning border border-warning/20"
                        : "bg-primary text-white"
                  )}>
                    {renewal.status}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded",
                renewal.days < 30
                  ? "bg-danger/10 text-danger"
                  : "text-text-muted"
              )}>
                {renewal.days} days
              </span>
            </div>
            <p className="text-sm font-semibold text-text mb-0.5">{renewal.name}</p>
            <p className="text-xs text-text-muted mb-1">{renewal.location}, {renewal.area}</p>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-secondary">{renewal.rent}</span>
              <span className="text-[11px] text-text-muted">Exp: {renewal.expiry}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-border bg-navy-50/30">
        <button className="w-full text-xs text-primary font-semibold hover:text-primary-light transition-colors uppercase tracking-wider">
          View All Renewals
        </button>
      </div>
    </div>
  );
}
