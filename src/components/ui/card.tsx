import { cn } from "@/lib/utils";

export const Card = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) =>
  <div className={cn("rounded-md border border-border bg-white", className)} {...p} />;

export function Badge({ className, tone = "neutral", ...p }: React.HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "red" | "gold" | "green" | "blue" }) {
  const tones = { neutral: "bg-surface text-charcoal", red: "bg-red-50 text-brand-red", gold: "bg-amber-50 text-[#8a6330]", green: "bg-green-50 text-green-800", blue: "bg-blue-50 text-blue-800" };
  return <span className={cn("inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold", tones[tone], className)} {...p} />;
}

export const Skeleton = ({ className }: { className?: string }) => <div className={cn("animate-pulse rounded bg-surface", className)} />;
