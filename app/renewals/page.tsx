import RenewalBoard from "@/components/renewals/RenewalBoard";
import RERAAnalysis from "@/components/renewals/RERAAnalysis";

export default function RenewalsPage() {
  return (
    <div>
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
    </div>
  );
}
