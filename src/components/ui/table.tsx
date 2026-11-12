import { cn } from "@/lib/utils";

export const Table = ({ className, ...p }: React.TableHTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-x-auto"><table className={cn("w-full text-left text-sm", className)} {...p} /></div>
);
export const Th = ({ className, ...p }: React.ThHTMLAttributes<HTMLTableCellElement>) =>
  <th scope="col" className={cn("whitespace-nowrap border-b border-border bg-surface px-4 py-3 text-xs font-semibold uppercase tracking-wide text-charcoal", className)} {...p} />;
export const Td = ({ className, ...p }: React.TdHTMLAttributes<HTMLTableCellElement>) =>
  <td className={cn("border-b border-border px-4 py-3 align-top text-charcoal", className)} {...p} />;
