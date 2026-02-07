export default function MobilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-2">Mobile</h1>
      <p className="text-sm text-text-secondary mb-8">Mobile app companion</p>
      <div className="bg-white rounded-2xl border border-border p-12 text-center">
        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
            <path d="M12 18h.01"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-text mb-2">Mobile Experience</h3>
        <p className="text-sm text-text-secondary">Tenant and vendor mobile app previews.</p>
      </div>
    </div>
  );
}
