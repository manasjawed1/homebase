"use client";

import { cn } from "@/lib/utils";

interface RenewalCard {
  id: string;
  name: string;
  unit: string;
  rent: string;
  proposed: string;
  expiry: string;
  days: number;
  note?: string;
  paymentScore: number;
  tenure: string;
  language: string;
  ejariStatus: string;
}

interface Column {
  title: string;
  color: string;
  accentColor: string;
  cards: RenewalCard[];
}

const columns: Column[] = [
  {
    title: "90+ Days Out",
    color: "text-success",
    accentColor: "border-t-success",
    cards: [{ id: "R-5044", name: "Ahmed Khalil", unit: "Unit 305, Tower B", rent: "78,000", proposed: "80,000", expiry: "15/05/2026", days: 97, note: "Scheduled for 60-day review", paymentScore: 98, tenure: "3 yrs", language: "AR", ejariStatus: "Active" }],
  },
  {
    title: "60-90 Days",
    color: "text-info",
    accentColor: "border-t-info",
    cards: [{ id: "R-5041", name: "Sara Ahmad", unit: "Unit 402, Al Barsha South", rent: "85,000", proposed: "87,000", expiry: "15/04/2026", days: 67, note: "Offer ready — awaiting send", paymentScore: 100, tenure: "2 yrs", language: "EN/AR", ejariStatus: "Active" }],
  },
  {
    title: "30-60 Days",
    color: "text-warning",
    accentColor: "border-t-warning",
    cards: [{ id: "R-5042", name: "Mohammed Ali", unit: "Unit 203, JBR Walk", rent: "120,000", proposed: "124,500", expiry: "28/03/2026", days: 49, note: "RERA check pending", paymentScore: 85, tenure: "1 yr", language: "EN", ejariStatus: "Pending" }],
  },
  {
    title: "<30 Days",
    color: "text-danger",
    accentColor: "border-t-danger",
    cards: [{ id: "R-5043", name: "Fatima Hassan", unit: "Unit 1505, Marina Gate", rent: "95,000", proposed: "97,500", expiry: "08/03/2026", days: 29, note: "Offer sent — tenant reviewing", paymentScore: 92, tenure: "4 yrs", language: "AR", ejariStatus: "Active" }],
  },
];

export default function RenewalBoard() {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gold rounded-full"></div>
          <h3 className="font-semibold text-sm text-text">Renewal Pipeline Dashboard</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-text-muted">Total portfolio value:</span>
          <span className="text-xs font-bold text-text">378,000 AED/yr</span>
          <span className="text-xs font-medium text-text-secondary bg-navy-50 px-2.5 py-1 rounded border border-border">4 renewals</span>
        </div>
      </div>

      <div className="p-5 grid grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.title} className={cn("bg-navy-50 rounded-lg border border-border border-t-3 p-3", col.accentColor)}>
            <div className="flex items-center justify-between mb-3">
              <h4 className={cn("text-[10px] font-bold uppercase tracking-wider", col.color)}>{col.title}</h4>
              <span className="w-5 h-5 rounded bg-white border border-border flex items-center justify-center text-[10px] font-bold text-text-secondary">
                {col.cards.length}
              </span>
            </div>

            <div className="space-y-3">
              {col.cards.map((card) => (
                <div key={card.id} className="bg-white rounded-lg p-3 border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] text-text-muted font-mono font-bold">{card.id}</span>
                    <span className={cn(
                      "text-[9px] font-bold px-1.5 py-0.5 rounded",
                      card.days < 30 ? "bg-danger/10 text-danger" : card.days < 60 ? "bg-warning/10 text-warning" : "text-text-muted bg-navy-100"
                    )}>
                      {card.days}d
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-text mb-0.5">{card.name}</p>
                  <p className="text-[9px] text-text-muted mb-2">{card.unit}</p>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-2">
                    <div>
                      <p className="text-[8px] text-text-muted uppercase">Current</p>
                      <p className="text-[10px] font-bold text-text">{card.rent} AED</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-text-muted uppercase">Proposed</p>
                      <p className="text-[10px] font-bold text-success">{card.proposed} AED</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-text-muted uppercase">Payment</p>
                      <div className="flex items-center gap-1">
                        <div className="w-12 h-1.5 bg-navy-100 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", card.paymentScore >= 95 ? "bg-success" : card.paymentScore >= 85 ? "bg-warning" : "bg-danger")} style={{ width: `${card.paymentScore}%` }}></div>
                        </div>
                        <span className="text-[9px] font-bold text-text">{card.paymentScore}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] text-text-muted uppercase">Tenure</p>
                      <p className="text-[10px] font-semibold text-text">{card.tenure}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-navy-100 text-navy-600 font-semibold">{card.language}</span>
                    <span className={cn("text-[8px] px-1.5 py-0.5 rounded font-semibold", card.ejariStatus === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning")}>{card.ejariStatus === "Active" ? "Ejari ✓" : "Ejari ⏳"}</span>
                  </div>

                  <p className="text-[9px] text-text-muted">Exp: {card.expiry}</p>

                  {card.note && (
                    <div className="mt-2 pt-2 border-t border-border flex items-center gap-1 text-[9px] text-gold-dark font-medium">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
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
