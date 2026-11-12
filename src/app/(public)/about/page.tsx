import type { Metadata } from "next";
import { PageHero, Section } from "@/components/common/section";
import { ImagePlaceholder } from "@/components/common/image-placeholder";
import { Card } from "@/components/ui/card";
import { productLinks } from "@/config/navigation";
import { getSiteInfo } from "@/services/company.service";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("About Us", "About Jagruti Plastic, a Bhavnagar-based manufacturer of Plastic Nivar, Monofilament Cloth, Monofilament Yarn and Plastic Scrubbers since 1987.", "/about");

export default async function AboutPage() {
  const s = await getSiteInfo();
  const facts = [["Established", String(s.established)], ["Owner", s.owner], ["Location", "Bhavnagar, Gujarat"], ["Business type", "Manufacturer"],
    ["Monthly capacity", `Approx. ${s.capacityKg.toLocaleString("en-IN")} KG`], ["Market reach", "Across India and internationally"]];
  return (
    <>
      <PageHero eyebrow="About Us" title={`Experience in Plastic Manufacturing Since ${s.established}`} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            <p>{s.name} is a manufacturer based in Bhavnagar, Gujarat, owned by {s.owner}. The business was established in {s.established} and produces plastic and monofilament products for wholesale and industrial buyers.</p>
            <p>Our product categories are {productLinks.map((p) => p.label).join(", ")}. With an approximate monthly production capacity of {s.capacityKg.toLocaleString("en-IN")} KG, we supply customers across India and internationally.</p>
            <p>{s.description}</p>
          </div>
          <ImagePlaceholder label="Photograph — owner or factory (to be supplied)" />
        </div>
      </Section>
      <Section tone="muted">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(([k, v]) => <Card key={k} className="p-5"><dt className="text-xs font-bold uppercase tracking-widest text-brand-gold">{k}</dt><dd className="mt-1 font-heading text-lg font-bold text-charcoal">{v}</dd></Card>)}
        </dl>
      </Section>
    </>
  );
}
