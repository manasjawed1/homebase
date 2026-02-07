import AIAgentCard from "@/components/dashboard/AIAgentCard";
import StatsCards from "@/components/dashboard/StatsCards";
import MaintenancePipeline from "@/components/dashboard/MaintenancePipeline";
import RenewalPipeline from "@/components/dashboard/RenewalPipeline";
import AIMetrics from "@/components/dashboard/AIMetrics";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
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
