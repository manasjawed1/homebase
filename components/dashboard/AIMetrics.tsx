"use client";

interface Metric {
  value: string;
  label: string;
  color: string;
}

const metrics: Metric[] = [
  { value: "47h", label: "Time saved this month", color: "text-blue-600" },
  { value: "89%", label: "Auto-resolved tickets", color: "text-green-600" },
  { value: "94%", label: "Renewal completion rate", color: "text-orange-500" },
];

export default function AIMetrics() {
  return (
    <div className="bg-gradient-to-r from-purple-50/80 to-blue-50/80 rounded-2xl border border-purple-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
        <h3 className="font-semibold text-text">AI Efficiency Metrics</h3>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
          AI
        </span>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <p className={`text-4xl font-bold ${metric.color} mb-1`}>{metric.value}</p>
            <p className="text-sm text-text-secondary">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
