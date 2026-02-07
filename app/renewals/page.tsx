import TopNav from "@/components/layout/TopNav";
import RenewalBoard from "@/components/renewals/RenewalBoard";
import RERAAnalysis from "@/components/renewals/RERAAnalysis";

export default function RenewalsPage() {
  return (
    <div className="min-h-screen bg-bg">
      <TopNav />
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text">Lease Renewal Management</h1>
          <p className="text-sm text-text-secondary">RERA-compliant renewal process with AI assistance</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <RenewalBoard />
          <RERAAnalysis />
        </div>
      </main>
    </div>
  );
}
