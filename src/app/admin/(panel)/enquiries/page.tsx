import { EnquiriesTable, type EnquiryRow } from "@/components/admin/enquiries-table";
import { listEnquiries } from "@/services/enquiry.service";

export const metadata = { title: "Enquiries" };

export default async function AdminEnquiries() {
  const rows = await listEnquiries();
  const data: EnquiryRow[] = rows.map((e) => ({ ...e, createdAt: e.createdAt.toISOString(), product: e.product }));
  return <EnquiriesTable enquiries={data} />;
}
