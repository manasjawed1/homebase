import AIAgentCard from "@/components/dashboard/AIAgentCard";
import StatsCards from "@/components/dashboard/StatsCards";
import MaintenancePipeline from "@/components/dashboard/MaintenancePipeline";
import RenewalPipeline from "@/components/dashboard/RenewalPipeline";
import AIMetrics from "@/components/dashboard/AIMetrics";
import PageInfoBanner from "@/components/ui/PageInfoBanner";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageInfoBanner
        title="Operations Dashboard"
        description="Real-time overview of property management operations, AI agent activity, and system metrics"
        details={[
          "The AI Operations Agent automatically processes maintenance requests, analyzes RERA compliance, and coordinates vendor assignments",
          "Active Tickets shows all open maintenance requests with their current status and SLA tracking",
          "Pending Renewals displays leases approaching expiration, sorted by urgency (90+ days, 60-90 days, 30-60 days, <30 days)",
          "Agent Actions tracks all automated tasks performed by the AI agent, with auto-resolution rates",
          "Response Time measures average time from tenant request to first action, helping ensure SLA compliance"
        ]}
      />
      {/* AI Agent Status */}
      <AIAgentCard />

      {/* Stats Cards */}
      <StatsCards />

      {/* Pipelines Row */}
      <div className="grid grid-cols-2 gap-6">
        <MaintenancePipeline />
        <RenewalPipeline />
      </div>

      {/* AI Metrics */}
      <AIMetrics />
    </div>
  );
}
