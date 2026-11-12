import Link from "next/link";
import { CalendarDays, Check, Factory, Globe, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/common/section";
import { ImagePlaceholder } from "@/components/common/image-placeholder";
import { Reveal } from "@/components/common/reveal";
import { LocationCards, ContactLines } from "@/components/common/contact-cards";
import { ProductCard } from "@/components/products/product-card";
import { QualityCards } from "@/components/products/quality-comparison";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { applicationGroups } from "@/config/catalog";
import { getSiteInfo } from "@/services/company.service";
import { listProducts } from "@/services/product.service";
import { enquiryMessage, waLink } from "@/lib/whatsapp";
import Image from "next/image";

export default async function HomePage() {
  const [site, products] = await Promise.all([getSiteInfo(), listProducts()]);
  const highlights = [
    {
      icon: CalendarDays,
      title: `Established in ${site.established}`,
      text: "Manufacturing experience",
    },
    {
      icon: Scale,
      title: `${(site.capacityKg / 1000).toLocaleString("en-IN")} Tons Approx.`,
      text: "Monthly production capacity",
    },
    { icon: Factory, title: "Manufacturer", text: "Bhavnagar, Gujarat" },
    { icon: Globe, title: "India & International", text: "Supply" },
  ];
  const why = [
    `Manufacturing experience since ${site.established}`,
    "Multiple product quality options",
    "Diverse plastic product range",
    `Approximate ${(site.capacityKg / 1000).toLocaleString("en-IN")}-ton monthly production capacity`,
    "Supply across India and internationally",
    "Flexible combined product ordering, subject to final MOQ confirmation",
  ];
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-white">
        <Container className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              <span className="h-px w-10 bg-brand-gold" aria-hidden />
              Established {site.established}
            </p>
            <h1 className="text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
              Reliable Plastic Manufacturing.{" "}
              <span className="text-brand-red">Built on Experience.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Jagruti Plastic manufactures Plastic Nivar, Monofilament Cloth,
              Monofilament Yarn, and Plastic Scrubbers for industrial and
              commercial requirements.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products">Explore Our Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact#quote">Get a Quote</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -left-3 -top-3 h-24 w-24 border-l-4 border-t-4 border-brand-red"
              aria-hidden
            />
            <div
              className="absolute -bottom-3 -right-3 h-24 w-24 border-b-4 border-r-4 border-brand-gold"
              aria-hidden
            />
            {/* <Image
              src={"/images/Products/hero-product-image.png"}
              alt="Hero photograph — Plastic Nivar rolls and monofilament products"
              className="aspect-[5/4] w-full"
            /> */}
            <Image
              src="/images/Products/hero-product-image.png"
              alt="Plastic Nivar rolls and monofilament products manufactured by Jagruti Plastic"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-[5/4] h-auto w-full rounded-xl object-contain"
            />
          </div>
        </Container>
      </section>

      {/* 2. CREDIBILITY */}
      <section className="border-y border-border bg-surface">
        <Container className="grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon
                className="mt-1 h-6 w-6 shrink-0 text-brand-red"
                aria-hidden
              />
              <div>
                <p className="font-heading font-bold text-charcoal">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* 3. ABOUT */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            {/* <ImagePlaceholder
              label="Factory photograph — Jagruti Plastic, Bhavnagar"
              className="aspect-[4/3]"
            /> */}
            <Image
              src="/images/Products/factory-image.webp"
              alt="Factory photograph — Jagruti Plastic, Bhavnagar"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-[5/4] h-auto w-full rounded-xl object-contain"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="About Jagruti Plastic"
              title={`Manufacturing Experience Since ${site.established}`}
            />
            <p className="-mt-6 leading-relaxed text-muted-foreground">
              Jagruti Plastic is a Bhavnagar-based manufacturer of plastic and
              monofilament products. Our focus is practical quality, a varied
              product range, and dependable business relationships with
              wholesale and industrial buyers.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/about">About Us</Link>
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* 4. PRODUCTS */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Our Products"
          title="Products Manufactured by Jagruti Plastic"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. NIVAR QUALITY */}
      <Section>
        <SectionHeading
          eyebrow="Plastic Nivar"
          title="Choose the Right Nivar Quality for Your Requirements"
        />
        <QualityCards />
        <p className="mt-6 text-sm text-muted-foreground">
          Quality descriptions are general guidance. Please contact us to
          discuss your specific requirement.
        </p>
      </Section>

      {/* 6. APPLICATIONS */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Applications"
          title="Where Our Products Are Used"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {applicationGroups.map((g) => (
            <div
              key={g.slug}
              className="overflow-hidden rounded-md border border-border bg-white"
            >
              {/* <Image
                src={g.link}
                alt={g.alt}
                width={1200}
                height={675}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="aspect-[16/9] h-auto w-full border-0 border-b object-cover"
              /> */}
              <Image
                src={g.link}
                alt={g.alt}
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-contain"
              />

              <div className="p-5">
                <h3 className="text-lg">{g.product}</h3>

                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {g.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold"
                        aria-hidden
                      />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            // <div
            //   key={g.slug}
            //   className="overflow-hidden rounded-md border border-border bg-white"
            // >
            //   <Image
            //     src={`${g.link}`}
            //     alt={`${g.alt}`}
            //     priority
            //     className="aspect-[16/9]  border-0 border-b h-auto w-full rounded-xl object-contain"
            //   />

            //   <div className="p-5">
            //     <h3 className="text-lg">{g.product}</h3>
            //     <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            //       {g.items.map((i) => (
            //         <li key={i} className="flex gap-2">
            //           <Check
            //             className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold"
            //             aria-hidden
            //           />
            //           {i}
            //         </li>
            //       ))}
            //     </ul>
            //   </div>
            // </div>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link href="/applications">All applications</Link>
        </Button>
      </Section>

      {/* 7. MANUFACTURING */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Manufacturing"
              title="Manufacturing Capacity for Business Requirements"
            />
            <p className="-mt-6 font-heading text-3xl font-extrabold text-brand-red">
              Approximately {site.capacityKg.toLocaleString("en-IN")} KG
            </p>
            <p className="text-sm font-semibold uppercase tracking-wider text-charcoal">
              Monthly Production Capacity
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Jagruti Plastic serves business requirements with a diverse
              product range and an established manufacturing operation in
              Bhavnagar, Gujarat.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/manufacturing">Manufacturing</Link>
            </Button>
          </div>
          <ImagePlaceholder label="Factory photograph — production floor" />
        </div>
      </Section>

      {/* 8. WHY */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Why Jagruti Plastic"
          title="What You Can Count On"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w) => (
            <li
              key={w}
              className="flex gap-3 rounded-md border border-border bg-white p-5 text-charcoal"
            >
              <Check
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                aria-hidden
              />
              {w}
            </li>
          ))}
        </ul>
      </Section>

      {/* 9. CTA */}
      <section className="bg-charcoal py-16 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl text-white">
              Looking for Reliable Plastic Product Supply?
            </h2>
            <p className="mt-3 text-white/75">
              Share your product requirements with Jagruti Plastic and connect
              directly with our business team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact#quote">Request a Quotation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white hover:text-charcoal"
            >
              <a
                href={waLink(site.whatsappNumber, enquiryMessage({}))}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact on WhatsApp
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* 10. CONTACT */}
      <Section id="contact">
        <SectionHeading eyebrow="Contact" title="Get in Touch" />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <ContactLines s={site} />
            <LocationCards s={site} />
          </div>
          <EnquiryForm
            whatsappNumber={site.whatsappNumber}
            products={products.map((p) => ({
              slug: p.slug,
              name: p.name,
              qualities: p.qualities,
              sizes: p.sizes,
            }))}
          />
        </div>
      </Section>
    </>
  );
}
