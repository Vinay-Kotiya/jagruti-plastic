"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Building2, LayoutDashboard, LogOut, MessageSquare, Package, Settings } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/company", label: "Company Information", icon: Building2 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ email }: { email?: string | null }) {
  const path = usePathname();
  return (
    <aside className="border-b border-border bg-white md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between p-4 md:block"><Logo /></div>
      <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible md:pb-0">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} aria-current={path.startsWith(href) ? "page" : undefined}
            className={cn("flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-charcoal hover:bg-surface", path.startsWith(href) && "bg-red-50 text-brand-red")}>
            <Icon className="h-4 w-4" aria-hidden />{label}
          </Link>
        ))}
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="flex cursor-pointer items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-charcoal hover:bg-surface">
          <LogOut className="h-4 w-4" aria-hidden />Logout
        </button>
      </nav>
      {email && <p className="hidden truncate px-6 pt-6 text-xs text-muted-foreground md:block">{email}</p>}
    </aside>
  );
}
