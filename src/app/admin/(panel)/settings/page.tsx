import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteInfo } from "@/services/company.service";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  return <SettingsForm site={await getSiteInfo()} />;
}
