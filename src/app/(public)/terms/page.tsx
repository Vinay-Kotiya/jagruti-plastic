import type { Metadata } from "next";
import { PageHero, Section } from "@/components/common/section";

export const metadata: Metadata = { title: "Terms & Conditions", robots: { index: false } };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <Section><p className="max-w-2xl rounded-md border border-brand-gold/40 bg-amber-50/50 p-5 text-charcoal"><b>Placeholder content.</b> The Terms & Conditions for Jagruti Plastic has not been approved yet. Replace this page with the approved text before launch.</p></Section>
    </>
  );
}
