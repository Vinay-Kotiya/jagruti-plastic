import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | Admin" }, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login"); // second gate; middleware is the first
  return (
    <div className="min-h-screen bg-surface md:flex">
      <AdminSidebar email={session.user.email} />
      <div className="min-w-0 flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}
