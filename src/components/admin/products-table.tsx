"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input, NativeSelect } from "@/components/ui/input";
import { Table, Td, Th } from "@/components/ui/table";
import { api } from "@/lib/client-api";
import type { ProductView } from "@/services/product.service";

export function ProductsTable({ products, categories }: { products: ProductView[]; categories: { id: string; name: string }[] }) {
  const router = useRouter();
  const [q, setQ] = useState(""); const [cat, setCat] = useState(""); const [status, setStatus] = useState("");
  const rows = useMemo(() => products.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase()) && (!cat || p.categoryId === cat) && (!status || (status === "active") === p.isActive)), [products, q, cat, status]);

  async function toggle(p: ProductView) {
    try { await api(`/api/products/${p.id}`, { method: "PATCH", body: JSON.stringify({ isActive: !p.isActive }) }); toast.success(p.isActive ? "Product deactivated" : "Product activated"); router.refresh(); }
    catch (e) { toast.error((e as Error).message); }
  }
  async function remove(p: ProductView) {
    try { await api(`/api/products/${p.id}`, { method: "DELETE" }); toast.success("Product deleted"); router.refresh(); }
    catch (e) { toast.error((e as Error).message); }
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl">Products</h1>
        <Button asChild><Link href="/admin/products/new"><Plus className="h-4 w-4" />New product</Link></Button>
      </div>
      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input aria-label="Search products" placeholder="Search products" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <NativeSelect aria-label="Filter by category" value={cat} onChange={(e) => setCat(e.target.value)}><option value="">All categories</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</NativeSelect>
          <NativeSelect aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></NativeSelect>
        </div>
      </Card>
      <Card>
        {rows.length === 0 ? <p className="p-8 text-center text-sm text-muted-foreground">{products.length ? "No products match your filters." : "No products yet. Run the seed script or create one."}</p> : (
          <Table>
            <thead><tr><Th>Name</Th><Th>Category</Th><Th>Status</Th><Th>Featured</Th><Th className="text-right">Actions</Th></tr></thead>
            <tbody>{rows.map((p) => (
              <tr key={p.id}>
                <Td className="font-semibold">{p.name}<div className="text-xs font-normal text-muted-foreground">/{p.slug}</div></Td>
                <Td>{p.categoryName}</Td>
                <Td><button onClick={() => toggle(p)} aria-label={`Toggle ${p.name} status`}><Badge tone={p.isActive ? "green" : "neutral"}>{p.isActive ? "Active" : "Inactive"}</Badge></button></Td>
                <Td>{p.featured ? <Badge tone="gold">Featured</Badge> : "—"}</Td>
                <Td><div className="flex justify-end gap-1">
                  <Button asChild size="icon" variant="ghost"><Link href={`/admin/products/${p.id}/edit`} aria-label={`Edit ${p.name}`}><Pencil className="h-4 w-4" /></Link></Button>
                  <ConfirmDialog trigger={<Button size="icon" variant="ghost" aria-label={`Delete ${p.name}`}><Trash2 className="h-4 w-4 text-red-700" /></Button>}
                    title={`Delete ${p.name}?`} description="This permanently removes the product and its images. Existing enquiries are kept." onConfirm={() => remove(p)} />
                </div></Td>
              </tr>))}</tbody>
          </Table>)}
      </Card>
    </div>
  );
}
