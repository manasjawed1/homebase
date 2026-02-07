import TopNav from "@/components/layout/TopNav";

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-bg">
      <TopNav />
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-text mb-2">Vendors</h1>
        <p className="text-sm text-text-secondary mb-8">Manage your vendor network</p>
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">Vendor Directory</h3>
          <p className="text-sm text-text-secondary">Browse and manage maintenance vendors.</p>
        </div>
      </main>
    </div>
  );
}
