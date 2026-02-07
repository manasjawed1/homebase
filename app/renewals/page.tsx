import RenewalBoard from "@/components/renewals/RenewalBoard";
import RERAAnalysis from "@/components/renewals/RERAAnalysis";
import PageInfoBanner from "@/components/ui/PageInfoBanner";

export default function RenewalsPage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 bg-gold rounded-full"></div>
          <h1 className="text-xl font-bold text-text">Lease Renewal Management</h1>
        </div>
        <p className="text-sm text-text-secondary ml-4">RERA-compliant renewal process with AI assistance</p>
      </div>

      <PageInfoBanner
        title="Lease Renewal & RERA Compliance"
        description="Automated lease renewal workflow ensuring compliance with Dubai Land Department regulations"
        details={[
          "Renewal Pipeline: Kanban board organizes renewals by urgency (90+ days, 60-90 days, 30-60 days, <30 days). Red highlight indicates urgent renewals requiring immediate attention",
          "RERA Rental Index Analysis: AI automatically pulls current rental index data for each property location and type. Calculates maximum allowed rent increase per RERA guidelines",
          "90-Day Notice Rule: System tracks expiration dates and ensures renewal offers are sent at least 90 days before lease expiration, as required by Dubai law",
          "Bilingual Communication: Renewal offers and notices are automatically generated in both English and Arabic, with AI handling tenant questions in their preferred language",
          "Compliance Verification: Every rent increase is verified against RERA Rental Index before sending to tenant, ensuring all renewals are legally compliant"
        ]}
      />

      <div className="space-y-5">
        <RenewalBoard />
        <RERAAnalysis />
      </div>
    </div>
  );
}
