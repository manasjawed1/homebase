import AddVendorForm from "@/components/vendors/AddVendorForm";
import VendorList from "@/components/vendors/VendorList";

export default function VendorsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-2">Vendors</h1>
      <p className="text-sm text-text-secondary mb-8">Manage your vendor network</p>
      <AddVendorForm />
      <VendorList />
    </div>
  );
}
