import ChatAndBrain from "@/components/maintenance/ChatAndBrain";
import VendorAssignment from "@/components/maintenance/VendorAssignment";
import TicketTracking from "@/components/maintenance/TicketTracking";
import PageInfoBanner from "@/components/ui/PageInfoBanner";

export default function MaintenancePage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 bg-gold rounded-full"></div>
          <h1 className="text-xl font-bold text-text">Maintenance Request Flow</h1>
        </div>
        <p className="text-sm text-text-secondary ml-4">From tenant report to resolution &mdash; powered by AI operations agent</p>
      </div>

      <PageInfoBanner
        title="Maintenance Request Processing"
        description="Complete workflow from tenant complaint to vendor dispatch and resolution tracking"
        details={[
          "Step 1: Tenants submit requests via WhatsApp in English or Arabic. The AI agent understands both languages and processes requests instantly",
          "Step 2: AI analyzes the request, checks tenant history, searches available vendors by location and specialty, and selects the best match",
          "Step 3: Vendor assignment dashboard shows available technicians with ratings, response times, and availability status. AI recommends the optimal vendor",
          "Step 4: Ticket tracking provides real-time status updates from 'Reported' through 'Resolved', with SLA monitoring to ensure timely completion"
        ]}
      />

      <div className="space-y-5">
        <ChatAndBrain />
        <VendorAssignment />
        <TicketTracking />
      </div>
    </div>
  );
}
