"use client";

interface Metric {
  value: string;
  label: string;
}

const metrics: Metric[] = [
  { value: "47h", label: "Time Saved This Month" },
  { value: "89%", label: "Auto-Resolved Tickets" },
  { value: "94%", label: "Renewal Completion Rate" },
];

export default function AIMetrics() {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <div className="w-1 h-5 bg-gold rounded-full"></div>
        <h3 className="font-semibold text-sm text-text">AI Efficiency Report</h3>
        <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-gold/10 text-gold-dark border border-gold/20 uppercase tracking-wider">
          Automated
        </span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-6 text-center">
            <p className="text-3xl font-bold text-primary mb-1">{metric.value}</p>
            <p className="text-[11px] text-text-muted uppercase tracking-wider font-medium">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
