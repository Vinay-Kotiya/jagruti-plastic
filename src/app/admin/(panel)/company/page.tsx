import { CompanyForm } from "@/components/admin/company-form";
import { getSiteInfo } from "@/services/company.service";

export const metadata = { title: "Company Information" };

export default async function CompanyPage() {
  return <CompanyForm site={await getSiteInfo()} />;
}
