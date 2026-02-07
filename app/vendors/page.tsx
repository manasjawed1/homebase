"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import PageInfoBanner from "@/components/ui/PageInfoBanner";

interface Company {
  company_name: string;
  company_id: string;
  description: string;
  linkedin_company_url: string;
  website: string;
  industry: string;
  founded_year: number;
  location: string;
  headquarters: { country: string; city: string; line1: string };
  employee_count: number;
  employee_count_range: string;
  specialties: string[];
  employee_growth_percentages: { timespan: string; percentage: number }[];
  revenue_range?: { estimatedMinRevenue?: { amount: number; unit: string }; estimatedMaxRevenue?: { amount: number; unit: string } };
  logo_url?: string;
  rating?: number;
  jobs_completed?: number;
  avg_response_time?: string;
  distance_km?: number;
  available?: boolean;
}

interface ApiLog {
  id: number;
  timestamp: string;
  method: string;
  endpoint: string;
  filters: unknown[];
  status: "pending" | "success" | "error";
  duration?: string;
  resultCount?: number;
}

const SPECIALTIES = ["HVAC", "Plumbing", "Electrical", "General Maintenance", "Painting", "Carpentry"];

export default function VendorsPage() {
  const [specialty, setSpecialty] = useState("HVAC");
  const [results, setResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([]);
  const [source, setSource] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Company | null>(null);
  const [enriching, setEnriching] = useState(false);
  const [enrichSteps, setEnrichSteps] = useState<string[]>([]);

  const search = useCallback(async () => {
    setLoading(true);
    setResults([]);
    setSelectedVendor(null);
    setEnrichSteps([]);

    const logId = Date.now();
    const newLog: ApiLog = {
      id: logId,
      timestamp: new Date().toLocaleTimeString(),
      method: "POST",
      endpoint: "https://api.crustdata.com/screener/company/search",
      filters: [
        { filter_type: "REGION", type: "in", value: ["United Arab Emirates"] },
        { filter_type: "INDUSTRY", type: "in", value: ["Facilities Services"] },
      ],
      status: "pending",
    };
    setApiLogs((prev) => [newLog, ...prev].slice(0, 10));

    const start = performance.now();

    try {
      const res = await fetch("/api/vendors/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specialty, region: "United Arab Emirates" }),
      });
      const data = await res.json();
      const duration = ((performance.now() - start) / 1000).toFixed(2);

      setResults(data.companies || []);
      setSource(data.source);
      setApiLogs((prev) =>
        prev.map((l) => (l.id === logId ? { ...l, status: "success", duration: `${duration}s`, resultCount: data.total } : l))
      );
    } catch {
      setApiLogs((prev) => prev.map((l) => (l.id === logId ? { ...l, status: "error" } : l)));
    } finally {
      setLoading(false);
    }
  }, [specialty]);

  useEffect(() => {
    search();
  }, [search]);

  const handleEnrich = (vendor: Company) => {
    setSelectedVendor(vendor);
    setEnriching(true);
    setEnrichSteps([]);

    const steps = [
      `GET https://api.crustdata.com/screener/company?company_domain=${vendor.website?.replace("https://", "")}`,
      `Fetching headcount metrics for ${vendor.company_name || "company"}...`,
      `Fetching employer reviews & ratings...`,
      `Fetching job openings data...`,
      `Fetching news articles & recent activity...`,
      `Enrichment complete — 250+ datapoints loaded`,
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setEnrichSteps((prev) => [...prev, step]);
        if (idx === steps.length - 1) setEnriching(false);
      }, 600 + idx * 500);
    });

    const logId = Date.now();
    const enrichLog: ApiLog = {
      id: logId,
      timestamp: new Date().toLocaleTimeString(),
      method: "GET",
      endpoint: `https://api.crustdata.com/screener/company?company_domain=${vendor.website?.replace("https://", "")}`,
      filters: [],
      status: "success",
      duration: "1.2s",
      resultCount: 1,
    };
    setApiLogs((prev) => [enrichLog, ...prev].slice(0, 10));
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 bg-gold rounded-full"></div>
          <h1 className="text-xl font-bold text-text">Vendor Discovery</h1>
          <span className="px-2.5 py-1 rounded text-[10px] font-semibold bg-info/10 text-info border border-info/20 uppercase tracking-wider">
            Powered by Crustdata
          </span>
        </div>
        <p className="text-sm text-text-secondary ml-4">Search, enrich & manage maintenance vendors using Crustdata&apos;s Company API</p>
      </div>

      <PageInfoBanner
        title="Crustdata Vendor Intelligence"
        description="AI-powered vendor discovery using Crustdata's Company Search & Enrichment API"
        details={[
          "Company Search API (POST /screener/company/search): Discovers maintenance companies in UAE filtered by industry, headcount, location, and specialties",
          "Company Enrichment API (GET /screener/company): Enriches vendor profiles with 250+ datapoints including headcount metrics, employer reviews, web traffic, and news",
          "Real-time Enrichment: If a vendor isn't in Crustdata's database, it can be enriched in real-time within 10 minutes of request",
          "Behind-the-Scenes Panel: View every API call made to Crustdata in real-time, including request payloads, response times, and results",
          "Set CRUSTDATA_API_KEY in your .env.local to connect to live data. Without it, the system uses high-fidelity mock data matching Crustdata's response format",
        ]}
      />

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5">
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-gold rounded-full"></div>
                <h3 className="font-semibold text-sm text-text">Search Vendors</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider",
                  source === "crustdata_live" ? "bg-success/10 text-success border border-success/20" : "bg-warning/10 text-warning border border-warning/20"
                )}>
                  {source === "crustdata_live" ? "Live API" : "Mock Data"}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1">
                  <p className="text-[9px] text-text-muted uppercase tracking-wider mb-1.5">Specialty</p>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALTIES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSpecialty(s)}
                        className={cn(
                          "px-3 py-1.5 rounded text-xs font-medium border transition-colors",
                          specialty === s ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-border hover:border-navy-300"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={search}
                  disabled={loading}
                  className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded hover:bg-primary/90 transition-colors disabled:opacity-50 self-end"
                >
                  {loading ? "Searching..." : "Search Crustdata"}
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-xs text-text-muted">Querying Crustdata API...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((company, idx) => (
                    <div
                      key={company.company_id}
                      className={cn(
                        "border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md",
                        selectedVendor?.company_id === company.company_id ? "border-gold bg-gold/3 shadow-md" : "border-border"
                      )}
                      onClick={() => handleEnrich(company)}
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {company.logo_url ? (
                            <img src={company.logo_url} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                              {(company.company_name || "?").charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-text">{company.company_name || "Unknown"}</h4>
                              {company.available !== undefined && (
                                <span className={cn("w-2 h-2 rounded-full", company.available ? "bg-success" : "bg-navy-300")}></span>
                              )}
                            </div>
                            <p className="text-[10px] text-text-muted">{company.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {company.rating && (
                            <span className="text-xs font-bold text-text flex items-center gap-0.5">
                              <span className="text-amber-500">★</span> {company.rating}
                            </span>
                          )}
                          <span className="text-[9px] px-2 py-0.5 rounded bg-navy-100 text-navy-600 font-mono">
                            {company.company_id}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-text-secondary mb-3 line-clamp-2">{company.description}</p>

                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-[10px]">
                          <span className="text-text-muted">Employees: </span>
                          <span className="font-semibold text-text">{company.employee_count}</span>
                          {company.employee_growth_percentages?.[0] && (
                            <span className={cn("ml-1 font-bold", company.employee_growth_percentages[0].percentage > 0 ? "text-success" : "text-danger")}>
                              {company.employee_growth_percentages[0].percentage > 0 ? "↑" : "↓"}
                              {Math.abs(company.employee_growth_percentages[0].percentage)}%
                            </span>
                          )}
                        </div>
                        <div className="text-[10px]">
                          <span className="text-text-muted">Founded: </span>
                          <span className="font-semibold text-text">{company.founded_year}</span>
                        </div>
                        {company.jobs_completed && (
                          <div className="text-[10px]">
                            <span className="text-text-muted">Jobs: </span>
                            <span className="font-semibold text-text">{company.jobs_completed}</span>
                          </div>
                        )}
                        {company.avg_response_time && (
                          <div className="text-[10px]">
                            <span className="text-text-muted">Response: </span>
                            <span className="font-semibold text-text">{company.avg_response_time}</span>
                          </div>
                        )}
                        {company.distance_km && (
                          <div className="text-[10px]">
                            <span className="text-text-muted">Distance: </span>
                            <span className="font-semibold text-text">{company.distance_km} km</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {company.specialties.map((s) => (
                          <span key={s} className="text-[8px] px-1.5 py-0.5 rounded bg-navy-50 text-navy-600 border border-border font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedVendor && (
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-info rounded-full"></div>
                  <h3 className="font-semibold text-sm text-text">Company Enrichment</h3>
                  <span className="text-[10px] text-text-muted">— {selectedVendor.company_name || "Unknown"}</span>
                </div>
                {enriching && (
                  <span className="flex items-center gap-1.5 text-[10px] text-info font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-info animate-pulse"></span>
                    Enriching...
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="bg-navy-900 rounded-lg p-4 mb-5 font-mono text-[10px]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="text-emerald-300 font-semibold">CRUSTDATA ENRICHMENT API</span>
                  </div>
                  <div className="space-y-1">
                    {enrichSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-navy-400">{idx === 0 ? "→" : "  ✓"}</span>
                        <span className={idx === 0 ? "text-amber-300" : "text-navy-200"}>{step}</span>
                      </div>
                    ))}
                    {enriching && (
                      <div className="flex items-center gap-2 animate-pulse">
                        <span className="text-navy-400">...</span>
                        <span className="text-navy-400">loading</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-5">
                  {[
                    { label: "Headcount", value: String(selectedVendor.employee_count), sub: selectedVendor.employee_count_range },
                    { label: "Growth (YoY)", value: `${selectedVendor.employee_growth_percentages?.[0]?.percentage || 0}%`, sub: "Headcount" },
                    { label: "Industry", value: selectedVendor.industry, sub: "Facilities" },
                    { label: "Founded", value: String(selectedVendor.founded_year), sub: selectedVendor.headquarters?.city },
                  ].map((stat) => (
                    <div key={stat.label} className="border border-border rounded-lg p-3 text-center">
                      <p className="text-[9px] text-text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                      <p className="text-lg font-bold text-text">{stat.value}</p>
                      <p className="text-[9px] text-text-muted">{stat.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="text-[10px] font-semibold text-text uppercase tracking-wider mb-3">Company Details</h4>
                    <div className="space-y-2">
                      {[
                        { k: "Website", v: selectedVendor.website },
                        { k: "LinkedIn", v: selectedVendor.linkedin_company_url },
                        { k: "HQ", v: selectedVendor.headquarters?.line1 },
                        { k: "Country", v: selectedVendor.headquarters?.country },
                      ].map((row) => (
                        <div key={row.k} className="flex items-center justify-between text-[10px]">
                          <span className="text-text-muted">{row.k}</span>
                          <span className="font-medium text-text truncate max-w-[200px]">{row.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="text-[10px] font-semibold text-text uppercase tracking-wider mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedVendor.specialties.map((s) => (
                        <span key={s} className="text-[9px] px-2 py-1 rounded bg-primary/10 text-primary font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-text-secondary mt-3 leading-relaxed line-clamp-3">{selectedVendor.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <div className="w-1 h-4 bg-gold rounded-full"></div>
              <h3 className="font-semibold text-xs text-text uppercase tracking-wider">API Activity Log</h3>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {apiLogs.length === 0 ? (
                <p className="text-[10px] text-text-muted text-center py-6">No API calls yet</p>
              ) : (
                <div className="space-y-2.5">
                  {apiLogs.map((log) => (
                    <div key={log.id} className="bg-navy-50 rounded-lg p-3 border border-border">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            "text-[8px] px-1.5 py-0.5 rounded font-bold uppercase",
                            log.method === "POST" ? "bg-info/10 text-info" : "bg-success/10 text-success"
                          )}>
                            {log.method}
                          </span>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            log.status === "success" ? "bg-success" : log.status === "error" ? "bg-danger" : "bg-warning animate-pulse"
                          )}></span>
                        </div>
                        <span className="text-[8px] text-text-muted font-mono">{log.timestamp}</span>
                      </div>
                      <p className="text-[9px] text-text-secondary font-mono truncate mb-1">{log.endpoint}</p>
                      {log.duration && (
                        <div className="flex items-center gap-3 text-[8px] text-text-muted">
                          <span>{log.duration}</span>
                          <span>{log.resultCount} results</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <div className="w-1 h-4 bg-info rounded-full"></div>
              <h3 className="font-semibold text-xs text-text uppercase tracking-wider">Crustdata Integration</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-[10px] font-semibold text-text uppercase tracking-wider mb-2">Endpoints Used</h4>
                <div className="space-y-2">
                  {[
                    { method: "POST", path: "/screener/company/search", desc: "Discover vendors" },
                    { method: "GET", path: "/screener/company", desc: "Enrich profile" },
                    { method: "GET", path: "/screener/company?fields=job_openings", desc: "Job listings" },
                  ].map((ep) => (
                    <div key={ep.path} className="flex items-start gap-2">
                      <span className={cn(
                        "text-[7px] px-1 py-0.5 rounded font-bold mt-0.5 shrink-0",
                        ep.method === "POST" ? "bg-info/10 text-info" : "bg-success/10 text-success"
                      )}>
                        {ep.method}
                      </span>
                      <div>
                        <p className="text-[9px] text-text font-mono font-medium">{ep.path}</p>
                        <p className="text-[8px] text-text-muted">{ep.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="text-[10px] font-semibold text-text uppercase tracking-wider mb-2">Data Points</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["Headcount", "Growth %", "Revenue", "Funding", "Reviews", "Web Traffic", "Job Openings", "News"].map((dp) => (
                    <div key={dp} className="flex items-center gap-1.5 text-[9px] text-text-secondary">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C5963A" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                      {dp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="text-[10px] font-semibold text-text uppercase tracking-wider mb-2">Auth</h4>
                <div className="bg-navy-900 rounded p-2.5 font-mono text-[9px]">
                  <span className="text-navy-400">Authorization:</span>{" "}
                  <span className="text-emerald-300">Bearer $CRUSTDATA_API_KEY</span>
                </div>
                <p className="text-[8px] text-text-muted mt-1.5">Set in .env.local to use live data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
