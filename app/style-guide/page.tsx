export default function StyleGuidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-2">Style Guide</h1>
      <p className="text-sm text-text-secondary mb-8">Design system and component library</p>

      {/* Colors */}
      <div className="bg-white rounded-2xl border border-border p-6 mb-6">
        <h3 className="font-semibold text-text mb-4">Colors</h3>
        <div className="flex gap-3 flex-wrap">
          {[
            { name: "Primary", bg: "bg-primary", hex: "#6C47FF" },
            { name: "Success", bg: "bg-success", hex: "#22C55E" },
            { name: "Warning", bg: "bg-warning", hex: "#F59E0B" },
            { name: "Danger", bg: "bg-danger", hex: "#EF4444" },
            { name: "Info", bg: "bg-info", hex: "#3B82F6" },
            { name: "Orange", bg: "bg-orange", hex: "#F97316" },
          ].map((color) => (
            <div key={color.name} className="text-center">
              <div className={`w-16 h-16 rounded-xl ${color.bg} mb-2`}></div>
              <p className="text-xs font-medium text-text">{color.name}</p>
              <p className="text-xs text-text-muted">{color.hex}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-text mb-4">Typography</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-text-muted mb-1">Heading 1</p>
            <p className="text-3xl font-bold text-text">Homebase AI Agent</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Heading 2</p>
            <p className="text-2xl font-bold text-text">Maintenance Pipeline</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Body</p>
            <p className="text-sm text-text-secondary">Your AI co-pilot for property management in Dubai/UAE</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Caption</p>
            <p className="text-xs text-text-muted">94% auto-resolved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
