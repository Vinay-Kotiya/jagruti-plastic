"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input, NativeSelect } from "@/components/ui/input";
import { Table, Td, Th } from "@/components/ui/table";
import { api } from "@/lib/client-api";
import { formatDate } from "@/lib/utils";

const STATUSES = ["NEW", "CONTACTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;
export type EnquiryRow = {
  id: string; customerName: string; companyName: string | null; phone: string; email: string | null; quality: string | null;
  specification: string | null; quantityKg: number | null; message: string | null; status: (typeof STATUSES)[number];
  createdAt: string; product: { name: string; slug: string } | null;
};
const PAGE = 10;

export function EnquiriesTable({ enquiries }: { enquiries: EnquiryRow[] }) {
  const router = useRouter();
  const [q, setQ] = useState(""); const [status, setStatus] = useState(""); const [product, setProduct] = useState("");
  const [page, setPage] = useState(0); const [open, setOpen] = useState<string | null>(null);
  const productNames = useMemo(() => [...new Set(enquiries.map((e) => e.product?.name).filter(Boolean))] as string[], [enquiries]);
  const rows = useMemo(() => enquiries.filter((e) => {
    const hay = `${e.customerName} ${e.companyName ?? ""} ${e.phone} ${e.email ?? ""}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (!status || e.status === status) && (!product || e.product?.name === product);
  }), [enquiries, q, status, product]);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const view = rows.slice(page * PAGE, page * PAGE + PAGE);

  async function setStatusFor(id: string, s: string) {
    try { await api(`/api/enquiries/${id}`, { method: "PATCH", body: JSON.stringify({ status: s }) }); toast.success("Status updated"); router.refresh(); }
    catch (e) { toast.error((e as Error).message); }
  }
  async function remove(id: string) {
    try { await api(`/api/enquiries/${id}`, { method: "DELETE" }); toast.success("Enquiry deleted"); router.refresh(); }
    catch (e) { toast.error((e as Error).message); }
  }
  const reset = <T,>(fn: (v: T) => void) => (v: T) => { fn(v); setPage(0); };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl">Enquiries</h1>
      <Card className="p-4"><div className="grid gap-3 sm:grid-cols-3">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input aria-label="Search enquiries" placeholder="Name, company, phone, email" className="pl-9" value={q} onChange={(e) => reset(setQ)(e.target.value)} /></div>
        <NativeSelect aria-label="Filter by status" value={status} onChange={(e) => reset(setStatus)(e.target.value)}><option value="">All statuses</option>{STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}</NativeSelect>
        <NativeSelect aria-label="Filter by product" value={product} onChange={(e) => reset(setProduct)(e.target.value)}><option value="">All products</option>{productNames.map((n) => <option key={n}>{n}</option>)}</NativeSelect>
      </div></Card>
      <Card>
        {view.length === 0 ? <p className="p-8 text-center text-sm text-muted-foreground">{enquiries.length ? "No enquiries match your filters." : "No enquiries yet."}</p> : (
          <Table>
            <thead><tr><Th>Customer</Th><Th>Phone</Th><Th>Product</Th><Th>Qty</Th><Th>Date</Th><Th>Status</Th><Th className="text-right">Actions</Th></tr></thead>
            <tbody>{view.map((e) => (<>
              <tr key={e.id}>
                <Td className="font-semibold">{e.customerName}<div className="text-xs font-normal text-muted-foreground">{e.companyName}</div></Td>
                <Td><a href={`tel:${e.phone}`} className="hover:text-brand-red">{e.phone}</a></Td>
                <Td>{e.product?.name ?? "—"}</Td><Td>{e.quantityKg ? `${e.quantityKg} KG` : "—"}</Td><Td className="whitespace-nowrap">{formatDate(e.createdAt)}</Td>
                <Td><NativeSelect aria-label={`Status for ${e.customerName}`} className="h-8 w-36 text-xs" value={e.status} onChange={(ev) => void setStatusFor(e.id, ev.target.value)}>{STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}</NativeSelect></Td>
                <Td><div className="flex justify-end gap-1">
                  <Button size="icon" variant="ghost" aria-label="View details" aria-expanded={open === e.id} onClick={() => setOpen(open === e.id ? null : e.id)}><ChevronDown className={`h-4 w-4 transition ${open === e.id ? "rotate-180" : ""}`} /></Button>
                  <ConfirmDialog trigger={<Button size="icon" variant="ghost" aria-label="Delete enquiry"><Trash2 className="h-4 w-4 text-red-700" /></Button>} title="Delete this enquiry?" description={`The enquiry from ${e.customerName} will be permanently removed.`} onConfirm={() => remove(e.id)} />
                </div></Td>
              </tr>
              {open === e.id && <tr key={`${e.id}-d`}><Td colSpan={7} className="bg-surface"><dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                {([["Email", e.email], ["Quality", e.quality], ["Size / spec", e.specification], ["Received", new Date(e.createdAt).toLocaleString("en-IN")]] as const).map(([k, v]) => <div key={k}><dt className="text-xs font-bold uppercase tracking-wide text-brand-gold">{k}</dt><dd className="break-all">{v || "—"}</dd></div>)}
                <div className="sm:col-span-2 lg:col-span-4"><dt className="text-xs font-bold uppercase tracking-wide text-brand-gold">Message</dt><dd className="whitespace-pre-wrap">{e.message || "—"}</dd></div>
              </dl></Td></tr>}
            </>))}</tbody>
          </Table>)}
        <div className="flex items-center justify-between border-t border-border p-3 text-sm">
          <span className="text-muted-foreground">{rows.length} enquir{rows.length === 1 ? "y" : "ies"}</span>
          <div className="flex items-center gap-2"><Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
            <span>{page + 1} / {pages}</span><Button size="sm" variant="outline" disabled={page + 1 >= pages} onClick={() => setPage(page + 1)}>Next</Button></div>
        </div>
      </Card>
    </div>
  );
}
