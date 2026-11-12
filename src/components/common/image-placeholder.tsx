import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Clearly labelled stand-in until real company/product photographs are uploaded. */
export function ImagePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div role="img" aria-label={`${label} (photo placeholder)`}
      className={cn("flex aspect-[4/3] flex-col items-center justify-center gap-2 border border-dashed border-brand-gold/60 bg-surface px-4 text-center", className)}>
      <ImageIcon className="h-6 w-6 text-brand-gold" aria-hidden />
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Photo placeholder</span>
    </div>
  );
}
