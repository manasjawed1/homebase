import PageInfoBanner from "@/components/ui/PageInfoBanner";

export default function PropertiesPage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 bg-gold rounded-full"></div>
          <h1 className="text-xl font-bold text-text">Properties</h1>
        </div>
        <p className="text-sm text-text-secondary ml-4">Manage your property portfolio</p>
      </div>

      <PageInfoBanner
        title="Property Portfolio Management"
        description="Centralized view of all properties, units, tenants, and lease information"
        details={[
          "Property Directory: View all properties in your portfolio with details including location, unit count, occupancy rates, and current rent levels",
          "Unit Management: Track individual units with tenant information, lease expiration dates, and maintenance history",
          "Tenant Directory: Access tenant profiles including contact information, payment history, preferred language, and communication preferences",
          "Lease Documents: Store and manage Ejari certificates, lease agreements, and renewal documentation for each property",
          "Financial Overview: View rent collection status, outstanding payments, and property-level financial summaries"
        ]}
      />
      <div className="bg-white rounded-lg border border-border p-12 text-center">
        <div className="w-14 h-14 bg-navy-50 rounded-lg border border-border flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0C2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <h3 className="text-base font-semibold text-text mb-1">Property Management</h3>
        <p className="text-sm text-text-secondary">View and manage all properties across your portfolio.</p>
      </div>
    </div>
  );
}
