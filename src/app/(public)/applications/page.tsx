import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero, Section } from "@/components/common/section";
import { ImagePlaceholder } from "@/components/common/image-placeholder";
import { Button } from "@/components/ui/button";
import { applicationGroups } from "@/config/catalog";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("Product Applications", "Applications of Jagruti Plastic's Plastic Nivar, Monofilament Cloth and Plastic Scrubbers.", "/applications");

export default function ApplicationsPage() {
  return (
    <>
      <PageHero eyebrow="Applications" title="Product Applications" text="Applications are listed per product. Suitability depends on the product, quality and specification — contact us to confirm for your requirement." />
      {applicationGroups.map((g, idx) => (
        <Section key={g.slug} tone={idx % 2 ? "muted" : "white"}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><h2 className="text-3xl">{g.product}</h2>
            <Button asChild variant="outline" size="sm"><Link href={`/products/${g.slug}`}>View product</Link></Button></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((item) => (
              <div key={item} className="overflow-hidden rounded-md border border-border bg-white">
                <ImagePlaceholder label={`${item} photograph`} className="aspect-[16/9] border-0 border-b" />
                <p className="flex gap-2 p-4 font-medium text-charcoal"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden />{item}</p>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
