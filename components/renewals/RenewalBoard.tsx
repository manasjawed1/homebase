"use client";

import { cn } from "@/lib/utils";

interface RenewalCard {
  id: string;
  name: string;
  unit: string;
  rent: string;
  expiry: string;
  days: number;
  note?: string;
}

interface Column {
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  cards: RenewalCard[];
}

const columns: Column[] = [
  {
    title: "90+ Days Out",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    cards: [
      {
        id: "R-5044",
        name: "Ahmed Khalil",
        unit: "Unit 305",
        rent: "78,000 AED",
        expiry: "15/05/2026",
        days: 97,
        note: "Scheduled for 60-day review",
      },
    ],
  },
  {
    title: "60-90 Days",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    cards: [
      {
        id: "R-5041",
        name: "Sara Ahmad",
        unit: "Unit 402",
        rent: "85,000 AED",
        expiry: "15/04/2026",
        days: 67,
        note: "Offer ready",
      },
    ],
  },
  {
    title: "30-60 Days",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    cards: [
      {
        id: "R-5042",
        name: "Mohammed Ali",
        unit: "Unit 203",
        rent: "120,000 AED",
        expiry: "28/03/2026",
        days: 49,
        note: "RERA check pending",
      },
    ],
  },
  {
    title: "<30 Days",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    cards: [
      {
        id: "R-5043",
        name: "Fatima Hassan",
        unit: "Unit 1505",
        rent: "95,000 AED",
        expiry: "08/03/2026",
        days: 29,
        note: "Sent to tenant",
      },
    ],
  },
];

export default function RenewalBoard() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            </svg>
            <span className="text-sm font-semibold text-text">Screen 1: Renewal Pipeline Dashboard</span>
          </div>
          <span className="text-xs font-medium text-text-secondary bg-gray-100 px-3 py-1 rounded-full">
            4 renewals
          </span>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-6 grid grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.title} className={cn("rounded-xl p-4", col.bgColor, "border", col.borderColor)}>
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className={cn("text-sm font-bold", col.color)}>{col.title}</h4>
              <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold", col.bgColor, col.color, "border", col.borderColor)}>
                {col.cards.length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {col.cards.map((card) => (
                <div key={card.id} className="bg-white rounded-lg p-3.5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-muted font-mono">{card.id}</span>
                    <span className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      card.days < 30
                        ? "bg-red-100 text-red-700"
                        : card.days < 60
                          ? "bg-yellow-100 text-yellow-700"
                          : "text-text-muted bg-gray-100"
                    )}>
                      {card.days}d
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-text mb-0.5">{card.name}</p>
                  <p className="text-xs text-text-muted mb-1">{card.unit}</p>
                  <p className="text-xs text-text-secondary">{card.rent}</p>
                  <p className="text-xs text-text-muted">Expiry: {card.expiry}</p>
                  {card.note && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-purple-600">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                      {card.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
