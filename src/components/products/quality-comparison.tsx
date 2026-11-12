import { Check } from "lucide-react";
import { Table, Td, Th } from "@/components/ui/table";
import { nivarQualities } from "@/config/catalog";

export function QualityCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {nivarQualities.map((q, i) => (
        <div key={q.name} className="rounded-md border border-border bg-white p-6">
          <div className={`mb-4 h-1 w-12 ${i === 0 ? "bg-brand-gold" : i === 1 ? "bg-brand-gold" : "bg-brand-red"}`} aria-hidden />
          <h3 className="text-xl">{q.name}</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {[q.raw, q.position, q.strength, `Suitable for: ${q.suitable.charAt(0).toLowerCase()}${q.suitable.slice(1)}`].map((t) => (
              <li key={t} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden />{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function QualityTable() {
  const rows: [string, (q: (typeof nivarQualities)[number]) => string][] = [
    ["Raw material", (q) => q.raw], ["Positioning", (q) => q.position], ["Strength & appearance", (q) => q.strength], ["Suitable for", (q) => q.suitable],
  ];
  return (
    <div className="rounded-md border border-border">
      <Table>
        <thead><tr><Th>Feature</Th>{nivarQualities.map((q) => <Th key={q.name}>{q.name}</Th>)}</tr></thead>
        <tbody>{rows.map(([label, get]) => (
          <tr key={label}><Td className="font-semibold">{label}</Td>{nivarQualities.map((q) => <Td key={q.name} className="min-w-48 text-muted-foreground">{get(q)}</Td>)}</tr>
        ))}</tbody>
      </Table>
    </div>
  );
}
