"use client";

import { cn } from "@/lib/utils";

interface Ticket {
  id: string;
  status: "In Progress" | "Assigned" | "Pending";
  type: string;
  location: string;
  area: string;
  time: string;
}

const tickets: Ticket[] = [
  { id: "M-1247", status: "In Progress", type: "HVAC", location: "Unit 402", area: "Al Barsha", time: "1h 23m" },
  { id: "M-1248", status: "Assigned", type: "Plumbing", location: "Unit 105", area: "JBR", time: "45m" },
  { id: "M-1249", status: "Pending", type: "Electrical", location: "Unit 701", area: "Dubai Marina", time: "3h" },
];

const statusStyles: Record<string, string> = {
  "In Progress": "bg-primary text-white",
  Assigned: "bg-navy-100 text-navy-700",
  Pending: "bg-warning/10 text-warning border border-warning/20",
};

export default function MaintenancePipeline() {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-warning rounded-full"></div>
          <h3 className="font-semibold text-sm text-text">Maintenance Pipeline</h3>
        </div>
        <span className="text-xs font-semibold text-warning bg-warning/10 px-2.5 py-1 rounded">3 active</span>
      </div>

      <div className="divide-y divide-border">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="px-5 py-3.5 hover:bg-navy-50/30 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-text">{ticket.id}</span>
                <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold", statusStyles[ticket.status])}>
                  {ticket.status}
                </span>
              </div>
              <div className="flex items-center gap-1 text-text-muted">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="text-[11px] font-medium">{ticket.time}</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-text mb-0.5">{ticket.type}</p>
            <p className="text-xs text-text-muted">{ticket.location}, {ticket.area}</p>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-border bg-navy-50/30">
        <button className="w-full text-xs text-primary font-semibold hover:text-primary-light transition-colors uppercase tracking-wider">
          View All Tickets
        </button>
      </div>
    </div>
  );
}
