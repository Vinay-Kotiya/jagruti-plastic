import type { SiteInfo } from "@/services/company.service";

/** Renders nothing until the client confirms the MOQ policy and enables it in Admin → Settings. */
export function MoqNote({ moq }: { moq: SiteInfo["moq"] }) {
  if (!moq.public) return null;
  const parts = [moq.nivarKg && `Plastic Nivar: ${moq.nivarKg} KG`, moq.clothKg && `Monofilament Cloth: ${moq.clothKg} KG`, moq.combinedKg && `Combined orders: ${moq.combinedKg} KG`].filter(Boolean);
  if (!parts.length) return null;
  return <p className="rounded-md border border-brand-gold/40 bg-amber-50/50 px-4 py-3 text-sm text-charcoal"><b>Minimum order:</b> {parts.join(" · ")}. Final quantities are confirmed at quotation.</p>;
}
