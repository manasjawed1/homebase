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
  {
    id: "M-1247",
    status: "In Progress",
    type: "HVAC",
    location: "Unit 402",
    area: "Al Barsha",
    time: "1h 23m",
  },
  {
    id: "M-1248",
    status: "Assigned",
    type: "Plumbing",
    location: "Unit 105",
    area: "JBR",
    time: "45m",
  },
  {
    id: "M-1249",
    status: "Pending",
    type: "Electrical",
    location: "Unit 701",
    area: "Dubai Marina",
    time: "3h",
  },
];

const statusStyles: Record<string, string> = {
  "In Progress": "bg-gray-900 text-white",
  Assigned: "bg-gray-100 text-gray-800",
  Pending: "bg-gray-100 text-gray-600",
};

export default function MaintenancePipeline() {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
          <h3 className="font-semibold text-text">Maintenance Pipeline</h3>
        </div>
        <span className="text-sm text-orange font-medium">3 active</span>
      </div>

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="border border-border rounded-xl p-4 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text">{ticket.id}</span>
                <span className={cn("px-2 py-0.5 rounded text-xs font-medium", statusStyles[ticket.status])}>
                  {ticket.status}
                </span>
              </div>
              <div className="flex items-center gap-1 text-text-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="text-xs">{ticket.time}</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-text mb-1">{ticket.type}</p>
            <div className="flex items-center gap-1 text-text-muted text-xs">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {ticket.location}, {ticket.area}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2.5 text-sm text-text-secondary font-medium bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
        View All Tickets
      </button>
    </div>
  );
}
