import PageInfoBanner from "@/components/ui/PageInfoBanner";

export default function SystemPage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 bg-gold rounded-full"></div>
          <h1 className="text-xl font-bold text-text">System</h1>
        </div>
        <p className="text-sm text-text-secondary ml-4">System configuration and settings</p>
      </div>

      <PageInfoBanner
        title="System Configuration & Settings"
        description="Configure AI agent behavior, integrations, and system preferences"
        details={[
          "AI Agent Settings: Configure AI behavior including response time targets, auto-resolution thresholds, and vendor matching criteria",
          "RERA Integration: Connect to Dubai Land Department APIs for real-time rental index data and compliance verification",
          "WhatsApp Integration: Configure WhatsApp Business API credentials for tenant communication and vendor notifications",
          "SLA Configuration: Set service level agreement targets for different maintenance types (urgent: 4h, standard: 24h, routine: 48h)",
          "Notification Preferences: Configure email, SMS, and push notification settings for different event types and user roles",
          "User Management: Manage user accounts, roles, and permissions for property managers, administrators, and support staff"
        ]}
      />
      <div className="bg-white rounded-lg border border-border p-12 text-center">
        <div className="w-14 h-14 bg-navy-50 rounded-lg border border-border flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0C2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <h3 className="text-base font-semibold text-text mb-1">System Settings</h3>
        <p className="text-sm text-text-secondary">Configure AI agent, integrations, and preferences.</p>
      </div>
    </div>
  );
}
