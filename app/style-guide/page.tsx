import PageInfoBanner from "@/components/ui/PageInfoBanner";

export default function StyleGuidePage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 bg-gold rounded-full"></div>
          <h1 className="text-xl font-bold text-text">Style Guide</h1>
        </div>
        <p className="text-sm text-text-secondary ml-4">Design system and component library</p>
      </div>

      <PageInfoBanner
        title="Design System & Style Guide"
        description="Complete design system documentation including colors, typography, components, and usage guidelines"
        details={[
          "Color Palette: Government-inspired navy blue primary color (#0C2340) with gold accents (#C5963A) for official, authoritative appearance",
          "Typography: Inter font family with clear hierarchy. Uppercase tracking-wider for labels and official documentation style",
          "Component Library: Reusable UI components including cards, badges, tooltips, and form elements following consistent design patterns",
          "Status Indicators: Color-coded status badges (green for success, orange for warning, red for danger, blue for info) with clear visual hierarchy",
          "Spacing & Layout: Consistent spacing scale and grid system ensuring visual harmony across all pages and components"
        ]}
      />

      <div className="bg-white rounded-lg border border-border p-6 mb-5">
        <h3 className="text-xs font-semibold text-text uppercase tracking-wider mb-4">Color Palette</h3>
        <div className="flex gap-4 flex-wrap">
          {[
            { name: "Primary Navy", bg: "bg-primary", hex: "#0C2340" },
            { name: "Gold", bg: "bg-gold", hex: "#C5963A" },
            { name: "Success", bg: "bg-success", hex: "#15803D" },
            { name: "Warning", bg: "bg-warning", hex: "#B45309" },
            { name: "Danger", bg: "bg-danger", hex: "#B91C1C" },
            { name: "Info", bg: "bg-info", hex: "#1D4ED8" },
          ].map((color) => (
            <div key={color.name} className="text-center">
              <div className={`w-16 h-16 rounded-lg ${color.bg} mb-2 border border-border`}></div>
              <p className="text-xs font-semibold text-text">{color.name}</p>
              <p className="text-[10px] text-text-muted font-mono">{color.hex}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border p-6 mb-5">
        <h3 className="text-xs font-semibold text-text uppercase tracking-wider mb-4">Navy Scale</h3>
        <div className="flex gap-2">
          {["bg-navy-50", "bg-navy-100", "bg-navy-200", "bg-navy-300", "bg-navy-400", "bg-navy-500", "bg-navy-600", "bg-navy-700", "bg-navy-800", "bg-navy-900"].map((bg, i) => (
            <div key={bg} className="flex-1 text-center">
              <div className={`h-12 rounded ${bg} border border-border mb-1`}></div>
              <p className="text-[9px] text-text-muted">{(i + 1) * 100 - 50}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border p-6">
        <h3 className="text-xs font-semibold text-text uppercase tracking-wider mb-4">Typography</h3>
        <div className="space-y-4">
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Page Heading</p>
            <p className="text-xl font-bold text-text">Property Management Authority</p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Section Heading</p>
            <p className="text-sm font-semibold text-text">Maintenance Pipeline Dashboard</p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Body Text</p>
            <p className="text-sm text-text-secondary">AI-powered property management intelligence for Dubai/UAE operations</p>
          </div>
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Label / Caption</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">System Status Indicator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
