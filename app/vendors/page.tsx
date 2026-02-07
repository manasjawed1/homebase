import PageInfoBanner from "@/components/ui/PageInfoBanner";

export default function VendorsPage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 bg-gold rounded-full"></div>
          <h1 className="text-xl font-bold text-text">Vendors</h1>
        </div>
        <p className="text-sm text-text-secondary ml-4">Manage your vendor network</p>
      </div>

      <PageInfoBanner
        title="Vendor Network Management"
        description="Manage maintenance vendors, track performance, and ensure quality service delivery"
        details={[
          "Vendor Directory: Browse all registered vendors organized by specialty (HVAC, Plumbing, Electrical, etc.) with ratings and availability status",
          "Performance Tracking: View vendor metrics including average response time, job completion rate, tenant satisfaction scores, and total jobs completed",
          "Availability Management: See real-time availability status of vendors. Green indicator means available, gray means currently busy",
          "AI Recommendations: System automatically recommends vendors based on location proximity, specialty match, rating, and current availability",
          "Vendor Onboarding: Add new vendors to the network with verification of licenses, insurance, and service areas"
        ]}
      />
      <div className="bg-white rounded-lg border border-border p-12 text-center">
        <div className="w-14 h-14 bg-navy-50 rounded-lg border border-border flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0C2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h3 className="text-base font-semibold text-text mb-1">Vendor Directory</h3>
        <p className="text-sm text-text-secondary">Browse and manage maintenance vendors.</p>
      </div>
    </div>
  );
}
