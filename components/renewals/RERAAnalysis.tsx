"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ComparableUnit {
  unit: string;
  type: string;
  area: string;
  rent: string;
  trend: "up" | "down" | "flat";
}

const comparables: ComparableUnit[] = [
  { unit: "Unit 501", type: "2BR", area: "Al Barsha South", rent: "83,000", trend: "up" },
  { unit: "Unit 208", type: "2BR", area: "Al Barsha South", rent: "87,000", trend: "flat" },
  { unit: "Unit 1102", type: "2BR", area: "Al Barsha 1", rent: "80,000", trend: "up" },
  { unit: "Unit 305", type: "2BR", area: "Al Barsha South", rent: "84,500", trend: "up" },
  { unit: "Unit 714", type: "2BR", area: "Al Barsha 2", rent: "79,000", trend: "down" },
];

interface ProcessStep {
  id: number;
  label: string;
  detail: string;
  time: string;
  source: string;
}

const processSteps: ProcessStep[] = [
  { id: 1, label: "Pulled RERA Rental Index", detail: "Decree No. 43/2025 — 2BR Apartment, Al Barsha South", time: "0.3s", source: "Dubai Land Dept API" },
  { id: 2, label: "Fetched comparable units", detail: "5 similar units within 2km radius from Crustdata", time: "0.8s", source: "Crustdata API" },
  { id: 3, label: "Calculated market average", detail: "82,700 AED — weighted by proximity & recency", time: "1.1s", source: "Internal Model" },
  { id: 4, label: "Checked tenant profile", detail: "Sara Ahmad — 100% on-time, 2yr tenure, preferred tenant", time: "1.4s", source: "Homebase DB" },
  { id: 5, label: "Generated recommendation", detail: "87,000 AED (+2.4%) — retention-optimized", time: "1.8s", source: "AI Decision Engine" },
  { id: 6, label: "Verified RERA compliance", detail: "Within 4.2% max allowed increase — compliant", time: "2.0s", source: "Compliance Module" },
  { id: 7, label: "Drafted renewal notice", detail: "Generated bilingual offer (EN/AR) + Ejari prep", time: "2.3s", source: "Document Engine" },
];

export default function RERAAnalysis() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = processSteps.map((_, idx) =>
      setTimeout(() => setVisibleCount(idx + 1), 800 + idx * 600)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const visibleProcessSteps = processSteps.slice(0, visibleCount);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-info rounded-full"></div>
              <h3 className="font-semibold text-sm text-text">RERA Rental Index Analysis</h3>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-danger/10 text-danger border border-danger/20 uppercase tracking-wider">
                RERA Compliant
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-semibold bg-success/10 text-success border border-success/20 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
              Live Data
            </span>
          </div>

          <div className="px-5 py-3 bg-navy-50 border-b border-border">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[9px] text-text-muted uppercase tracking-wider">Property</p>
                <p className="text-xs font-bold text-text">2BR Apartment</p>
              </div>
              <div className="w-px h-6 bg-border"></div>
              <div>
                <p className="text-[9px] text-text-muted uppercase tracking-wider">Location</p>
                <p className="text-xs font-bold text-text">Al Barsha South</p>
              </div>
              <div className="w-px h-6 bg-border"></div>
              <div>
                <p className="text-[9px] text-text-muted uppercase tracking-wider">Tenant</p>
                <p className="text-xs font-bold text-text">Sara Ahmad</p>
              </div>
              <div className="w-px h-6 bg-border"></div>
              <div>
                <p className="text-[9px] text-text-muted uppercase tracking-wider">Updated</p>
                <p className="text-xs font-bold text-text">Feb 7, 2026</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="border border-border rounded-lg p-4 text-center">
                <p className="text-[9px] text-text-muted uppercase tracking-wider mb-1">Current Rent</p>
                <p className="text-xl font-bold text-text">85,000</p>
                <p className="text-[9px] text-text-muted">AED / year</p>
              </div>
              <div className="border border-border rounded-lg p-4 text-center">
                <p className="text-[9px] text-text-muted uppercase tracking-wider mb-1">Market Avg</p>
                <p className="text-xl font-bold text-text">82,700</p>
                <p className="text-[9px] text-text-muted">AED / year</p>
                <span className="text-[9px] font-bold text-success">+2.8% above</span>
              </div>
              <div className="border border-info/30 rounded-lg p-4 text-center bg-info/3">
                <p className="text-[9px] text-text-muted uppercase tracking-wider mb-1">AI Proposed</p>
                <p className="text-xl font-bold text-primary">87,000</p>
                <p className="text-[9px] text-text-muted">AED / year</p>
                <span className="text-[9px] font-bold text-success">+2.4% increase</span>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4 mb-5">
              <h4 className="text-[10px] font-semibold text-text uppercase tracking-wider mb-3">RERA Compliance Check</h4>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-text-secondary">Max allowed increase (Decree 43/2025)</span>
                <span className="text-xs font-bold text-success">4.2%</span>
              </div>
              <div className="w-full h-3 bg-navy-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-success to-info rounded-full" style={{ width: "57%" }}></div>
              </div>
              <div className="flex items-center justify-between text-[9px] text-text-muted">
                <span>0%</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-semibold text-primary">Proposed: 2.4%</span>
                </div>
                <span>Max: 4.2%</span>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="text-[10px] font-semibold text-text uppercase tracking-wider mb-3">Comparable Units (Crustdata)</h4>
              <div className="space-y-2">
                {comparables.map((c) => (
                  <div key={c.unit} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <div>
                      <span className="text-xs font-semibold text-text">{c.unit}</span>
                      <span className="text-[9px] text-text-muted ml-2">{c.area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-text">{c.rent} AED</span>
                      <span className={cn("text-[9px] font-bold", c.trend === "up" ? "text-success" : c.trend === "down" ? "text-danger" : "text-text-muted")}>
                        {c.trend === "up" ? "↑" : c.trend === "down" ? "↓" : "→"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-gold rounded-full"></div>
              <h3 className="font-semibold text-sm text-text">AI Decision Engine</h3>
            </div>
            <span className="px-2.5 py-1 rounded text-[10px] font-semibold bg-success/10 text-success border border-success/20 uppercase tracking-wider">
              {visibleProcessSteps.length}/{processSteps.length} steps
            </span>
          </div>

          <div className="p-5 max-h-[580px] overflow-y-auto">
            {visibleProcessSteps.length === 0 ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  </div>
                  <p className="text-xs text-text-muted">Processing...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {visibleProcessSteps.map((step, idx) => (
                  <div key={step.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {step.id}
                      </div>
                      {idx < visibleProcessSteps.length - 1 && <div className="w-px h-6 bg-border" />}
                    </div>
                    <div className={cn("flex-1 pb-3", idx < visibleProcessSteps.length - 1 ? "border-b border-border" : "")}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-xs font-semibold text-text">{step.label}</p>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <p className="text-[10px] text-text-secondary mb-1">{step.detail}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-navy-100 text-navy-600 font-mono font-semibold">{step.source}</span>
                        <span className="text-[9px] text-text-muted font-mono">{step.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {visibleProcessSteps.length < processSteps.length && (
                  <div className="flex items-start gap-3 mt-1">
                    <div className="w-7 h-7 rounded bg-navy-100 border-2 border-dashed border-navy-300 flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#829AB1" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </div>
                    <p className="text-[10px] text-text-muted italic pt-1.5">Processing...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      

      <div className="bg-navy-50 border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-gold rounded-full"></div>
          <h4 className="text-xs font-semibold text-text uppercase tracking-wider">AI Recommendation Summary</h4>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          Based on the RERA Rental Index (Decree 43/2025), 5 comparable units from Crustdata, and Sara&apos;s tenant profile (100% payment, 2yr tenure),
          we recommend a renewal at <strong className="text-primary font-bold">87,000 AED</strong> (+2.4%). This is well within the 4.2% RERA cap
          and optimized for retention — Sara is a low-risk tenant with excellent history. Bilingual notices have been sent via WhatsApp and email.
          Ejari registration will auto-initiate upon tenant acceptance.
        </p>
      </div>
    </div>
  );
}
