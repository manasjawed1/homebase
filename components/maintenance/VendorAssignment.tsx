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
  icon: string;
}

const vendors: Vendor[] = [
  {
    name: "Ahmad HVAC",
    specialty: "HVAC",
    rating: 4.8,
    jobs: 234,
    response: "45 min",
    location: "Al Barsha",
    available: true,
    recommended: true,
    icon: "hvac",
  },
  {
    name: "Dubai Cool Air",
    specialty: "HVAC",
    rating: 4.6,
    jobs: 189,
    response: "1.5 hrs",
    location: "JBR",
    available: true,
    icon: "hvac",
  },
  {
    name: "FastFix Plumbing",
    specialty: "Plumbing",
    rating: 4.9,
    jobs: 312,
    response: "30 min",
    location: "Dubai Marina",
    available: false,
    icon: "plumbing",
  },
  {
    name: "PowerPro Electric",
    specialty: "Electrical",
    rating: 4.7,
    jobs: 276,
    response: "1 hr",
    location: "Downtown",
    available: true,
    icon: "electrical",
  },
];

const specialtyIcons: Record<string, React.ReactNode> = {
  hvac: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  plumbing: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6"/><path d="M8 8h8v4a4 4 0 0 1-8 0V8z"/><path d="M12 16v6"/></svg>,
  electrical: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
};

export default function VendorAssignment() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span className="text-sm font-semibold text-text">Screen 3: Vendor Assignment Dashboard</span>
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div className="p-6 grid grid-cols-2 gap-4">
        {vendors.map((vendor) => (
          <div
            key={vendor.name}
            className={cn(
              "border rounded-xl p-5 relative transition-shadow hover:shadow-md cursor-pointer",
              vendor.recommended ? "border-primary ring-1 ring-primary/20" : "border-border"
            )}
          >
            {/* Recommended Badge */}
            {vendor.recommended && (
              <div className="absolute -top-0 left-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-sm -translate-y-1/2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  AI Recommended
                </span>
              </div>
            )}

            {/* Availability Dot */}
            <div className="absolute top-4 right-4">
              <span className={cn(
                "w-3 h-3 rounded-full inline-block",
                vendor.available ? "bg-success" : "bg-gray-300"
              )}></span>
            </div>

            {/* Icon + Name */}
            <div className="flex items-center gap-3 mb-4 mt-1">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                {specialtyIcons[vendor.icon]}
              </div>
              <div>
                <p className="font-semibold text-text text-sm">{vendor.name}</p>
                <p className="text-xs text-text-muted">{vendor.specialty}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span className="text-sm font-semibold text-orange">{vendor.rating}</span>
                </div>
                <p className="text-xs text-text-muted">Rating</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-text">{vendor.jobs}</p>
                <p className="text-xs text-text-muted">Jobs</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-text">{vendor.response}</p>
                <p className="text-xs text-text-muted">Response</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-1 text-text-muted text-xs">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {vendor.location}
              </div>
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                vendor.available
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
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
