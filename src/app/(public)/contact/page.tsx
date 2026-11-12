import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/common/section";
import { ContactLines, LocationCards } from "@/components/common/contact-cards";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { MoqNote } from "@/components/products/moq-note";
import { getSiteInfo } from "@/services/company.service";
import { listProducts } from "@/services/product.service";
import { enquiryMessage, waLink } from "@/lib/whatsapp";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("Contact Us", "Contact Jagruti Plastic, Bhavnagar for quotations on Plastic Nivar, Monofilament Cloth, Monofilament Yarn and Plastic Scrubbers.", "/contact");

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const [{ product }, site, products] = await Promise.all([searchParams, getSiteInfo(), listProducts()]);
  return (
    <>
      <PageHero eyebrow="Contact" title="Contact Jagruti Plastic" text="Call, WhatsApp, email or send an enquiry — our business team will respond." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <div><h2 className="mb-4 text-xl">Phone & Email</h2><ContactLines s={site} />
              <a href={waLink(site.whatsappNumber, enquiryMessage({}))} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-3 text-sm text-charcoal hover:text-brand-red"><MessageCircle className="h-4 w-4 text-brand-red" aria-hidden />WhatsApp</a></div>
            <LocationCards s={site} />
          </div>
          <div id="quote" className="scroll-mt-24 lg:col-span-3">
            <SectionHeading eyebrow="Quotation" title="Request a Quotation" />
            <div className="-mt-6 mb-6"><MoqNote moq={site.moq} /></div>
            <EnquiryForm whatsappNumber={site.whatsappNumber} defaultSlug={products.some((p) => p.slug === product) ? product : undefined}
              products={products.map((p) => ({ slug: p.slug, name: p.name, qualities: p.qualities, sizes: p.sizes }))} />
          </div>
        </div>
      </Section>
    </>
  );
}
