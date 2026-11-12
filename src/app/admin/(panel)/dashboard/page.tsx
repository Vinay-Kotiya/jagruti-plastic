import Link from "next/link";
import { Badge, Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Overview" };

export default async function DashboardPage() {
  const [products, active, enquiries, fresh, recent, categories] = await Promise.all([
    prisma.product.count(), prisma.product.count({ where: { isActive: true } }), prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { product: { select: { name: true } } } }),
    prisma.productCategory.findMany({ include: { _count: { select: { products: true } } }, orderBy: { sortOrder: "asc" } }),
  ]);
  const stats = [["Total products", products], ["Active products", active], ["Total enquiries", enquiries], ["New enquiries", fresh]];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([k, v]) => <Card key={k} className="p-5"><p className="text-xs font-bold uppercase tracking-widest text-brand-gold">{k}</p><p className="mt-2 font-heading text-4xl font-extrabold text-charcoal">{v}</p></Card>)}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between"><h2 className="text-lg">Recent enquiries</h2><Link href="/admin/enquiries" className="text-sm font-medium text-brand-red">View all</Link></div>
          {recent.length === 0 ? <p className="text-sm text-muted-foreground">No enquiries yet.</p> : (
            <ul className="divide-y divide-border">{recent.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <span><b className="text-charcoal">{e.customerName}</b> <span className="text-muted-foreground">· {e.product?.name ?? "—"}{e.quantityKg ? ` · ${e.quantityKg} KG` : ""}</span></span>
                <span className="flex items-center gap-3"><Badge tone={e.status === "NEW" ? "red" : "neutral"}>{e.status}</Badge><span className="text-xs text-muted-foreground">{formatDate(e.createdAt)}</span></span>
              </li>))}</ul>)}
        </Card>
        <Card className="p-5"><h2 className="mb-4 text-lg">Products by category</h2>
          <ul className="space-y-2 text-sm">{categories.map((c) => <li key={c.id} className="flex justify-between"><span>{c.name}</span><b>{c._count.products}</b></li>)}</ul></Card>
      </div>
    </div>
  );
}
