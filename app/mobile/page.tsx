import PageInfoBanner from "@/components/ui/PageInfoBanner";

export default function MobilePage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 bg-gold rounded-full"></div>
          <h1 className="text-xl font-bold text-text">Mobile</h1>
        </div>
        <p className="text-sm text-text-secondary ml-4">Mobile app companion</p>
      </div>

      <PageInfoBanner
        title="Mobile Applications"
        description="Native mobile apps for tenants and vendors to interact with the Homebase system"
        details={[
          "Tenant Mobile App: Allows tenants to submit maintenance requests via WhatsApp, view ticket status, receive updates, and communicate with property management in their preferred language",
          "Vendor Mobile App: Enables vendors to receive job assignments, update ticket status, navigate to properties, and communicate with tenants and property managers",
          "Real-time Notifications: Push notifications for ticket updates, vendor assignments, renewal reminders, and important announcements",
          "Offline Support: Apps work offline and sync when connection is restored, ensuring continuous access to critical information",
          "Bilingual Interface: Both apps support English and Arabic with automatic language detection based on user preferences"
        ]}
      />
      <div className="bg-white rounded-lg border border-border p-12 text-center">
        <div className="w-14 h-14 bg-navy-50 rounded-lg border border-border flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0C2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
            <path d="M12 18h.01"/>
          </svg>
        </div>
        <h3 className="text-base font-semibold text-text mb-1">Mobile Experience</h3>
        <p className="text-sm text-text-secondary">Tenant and vendor mobile app previews.</p>
      </div>
    </div>
  );
}
