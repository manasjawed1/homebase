import TopNav from "@/components/layout/TopNav";
import WhatsAppChat from "@/components/maintenance/WhatsAppChat";
import AIReasoningPanel from "@/components/maintenance/AIReasoningPanel";
import VendorAssignment from "@/components/maintenance/VendorAssignment";
import TicketTracking from "@/components/maintenance/TicketTracking";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-bg">
      <TopNav />
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text">Maintenance Request Flow</h1>
          <p className="text-sm text-text-secondary">From tenant report to resolution - powered by AI</p>
        </div>

        {/* Flow Steps */}
        <div className="space-y-6">
          <WhatsAppChat />
          <AIReasoningPanel />
          <VendorAssignment />
          <TicketTracking />
        </div>
      </main>
    </div>
  );
}
