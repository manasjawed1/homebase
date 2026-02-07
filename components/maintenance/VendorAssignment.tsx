"use client";

import { cn } from "@/lib/utils";

interface Vendor {
  name: string;
  specialty: string;
  rating: number;
  jobs: number;
  response: string;
  location: string;
  available: boolean;
  recommended?: boolean;
}

const vendors: Vendor[] = [
  { name: "Ahmad HVAC", specialty: "HVAC", rating: 4.8, jobs: 234, response: "45 min", location: "Al Barsha", available: true, recommended: true },
  { name: "Dubai Cool Air", specialty: "HVAC", rating: 4.6, jobs: 189, response: "1.5 hrs", location: "JBR", available: true },
  { name: "FastFix Plumbing", specialty: "Plumbing", rating: 4.9, jobs: 312, response: "30 min", location: "Dubai Marina", available: false },
  { name: "PowerPro Electric", specialty: "Electrical", rating: 4.7, jobs: 276, response: "1 hr", location: "Downtown", available: true },
];

export default function VendorAssignment() {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
        <div className="w-1 h-4 bg-info rounded-full"></div>
        <span className="text-xs font-semibold text-text uppercase tracking-wider">Step 3</span>
        <span className="text-xs text-text-muted">Vendor Assignment Dashboard</span>
      </div>

      <div className="p-5 grid grid-cols-2 gap-4">
        {vendors.map((vendor) => (
          <div
            key={vendor.name}
            className={cn(
              "border rounded-lg p-4 relative transition-shadow hover:shadow-md cursor-pointer",
              vendor.recommended ? "border-gold ring-1 ring-gold/20 bg-gold/3" : "border-border"
            )}
          >
            {vendor.recommended && (
              <div className="absolute -top-0 left-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-semibold bg-gold text-white -translate-y-1/2 uppercase tracking-wider">
                  AI Recommended
                </span>
              </div>
            )}

            <div className="absolute top-4 right-4">
              <span className={cn("w-2.5 h-2.5 rounded-full inline-block", vendor.available ? "bg-emerald-500" : "bg-gray-300")}></span>
            </div>

            <div className="mb-3 mt-1">
              <p className="font-semibold text-text text-sm">{vendor.name}</p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">{vendor.specialty}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <div className="flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#C5963A" stroke="#C5963A" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span className="text-sm font-bold text-text">{vendor.rating}</span>
                </div>
                <p className="text-[10px] text-text-muted uppercase">Rating</p>
              </div>
              <div>
                <p className="text-sm font-bold text-text">{vendor.jobs}</p>
                <p className="text-[10px] text-text-muted uppercase">Jobs</p>
              </div>
              <div>
                <p className="text-sm font-bold text-text">{vendor.response}</p>
                <p className="text-[10px] text-text-muted uppercase">Response</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-text-muted">{vendor.location}</span>
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider",
                vendor.available
                  ? "bg-success/10 text-success border border-success/20"
                  : "bg-gray-100 text-gray-500 border border-gray-200"
              )}>
                {vendor.available ? "Available" : "Busy"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
