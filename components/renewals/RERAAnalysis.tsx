"use client";

export default function RERAAnalysis() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <span className="text-sm font-semibold text-text">Screen 2: RERA Rental Index Analysis</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
              <span className="text-sm">🇦🇪</span>
              RERA Compliant
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Live Data
          </span>
        </div>
      </div>

      {/* Property Info Bar */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-text-muted">Property Type</p>
              <p className="text-sm font-bold text-text">2BR Apartment</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-text-muted">Location</p>
              <p className="text-sm font-bold text-text">Al Barsha South</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-text-muted">Last Updated</p>
              <p className="text-sm font-bold text-text">Feb 7, 2026, 2:34 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Current Situation */}
          <div className="border border-border rounded-xl p-6">
            <h4 className="text-sm font-semibold text-text mb-4">Current Situation</h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-muted mb-1">Current Rent</p>
                <p className="text-3xl font-bold text-text">85,000 AED</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Market Average</p>
                <p className="text-2xl font-bold text-text">82,000 AED</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-secondary">Your rent vs market</p>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-green-100 text-green-700">+3.6%</span>
              </div>
            </div>
          </div>

          {/* RERA Guidelines */}
          <div className="border border-cyan-200 rounded-xl p-6 bg-cyan-50/30">
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              <h4 className="text-sm font-semibold text-text">RERA Guidelines</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-muted mb-1">Maximum Allowed Increase</p>
                <p className="text-3xl font-bold text-green-600">4.2%</p>
                <p className="text-xs text-text-muted">Based on RERA Rental Index 2026</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Recommended Renewal</p>
                <p className="text-3xl font-bold text-primary">87,000 AED</p>
                <div className="flex items-center gap-1 mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="text-xs font-medium text-green-600">Within RERA limits</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <h4 className="text-sm font-semibold text-text">AI Recommendation</h4>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            Based on the RERA Rental Index 2026 and current market conditions in Al Barsha South, 
            we recommend a renewal at <strong className="text-primary">87,000 AED</strong> (a 2.4% increase). 
            This is within the maximum allowed 4.2% increase and aligns with comparable 2BR apartments in the area. 
            The tenant has a strong payment history, which supports retention at a moderate increase.
          </p>
        </div>
      </div>
    </div>
  );
}
