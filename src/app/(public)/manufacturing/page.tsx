import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, SectionHeading } from "@/components/common/section";
import { ImagePlaceholder } from "@/components/common/image-placeholder";
import { QualityCards } from "@/components/products/quality-comparison";
import { Button } from "@/components/ui/button";
import { productLinks } from "@/config/navigation";
import { getSiteInfo } from "@/services/company.service";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("Manufacturing Capabilities", "Jagruti Plastic manufacturing capacity: approximately 10,000 KG per month from Bhavnagar, Gujarat.", "/manufacturing");

export default async function ManufacturingPage() {
  const s = await getSiteInfo();
  return (
    <>
      <PageHero eyebrow="Manufacturing" title="Manufacturing Capacity for Business Requirements" text="An established manufacturing operation in Bhavnagar, Gujarat." />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Production Capacity" title={`Approximately ${s.capacityKg.toLocaleString("en-IN")} KG Per Month`} />
            <p className="-mt-6 leading-relaxed text-muted-foreground">Jagruti Plastic serves business requirements with a diverse product range. Our product categories include {productLinks.map((p) => p.label).join(", ")}.</p>
          </div>
          <ImagePlaceholder label="Factory photograph (to be supplied)" />
        </div>
      </Section>
      <Section tone="muted"><SectionHeading eyebrow="Quality Options" title="Plastic Nivar Quality Options" /><QualityCards /></Section>
      <Section>
        <SectionHeading eyebrow="Gallery" title="Factory & Machinery" text="Photographs will be added here once supplied." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Factory exterior", "Production area", "Machinery", "Finished product storage"].map((l) => <ImagePlaceholder key={l} label={l} />)}
        </div>
        <Button asChild size="lg" className="mt-10"><Link href="/contact#quote">Manufacturing Enquiry</Link></Button>
      </Section>
    </>
  );
}
