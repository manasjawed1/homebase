import TopNav from "@/components/layout/TopNav";

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-bg">
      <TopNav />
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-text mb-2">Properties</h1>
        <p className="text-sm text-text-secondary mb-8">Manage your property portfolio</p>
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">Property Management</h3>
          <p className="text-sm text-text-secondary">View and manage all properties across your portfolio.</p>
        </div>
      </main>
    </div>
  );
}
