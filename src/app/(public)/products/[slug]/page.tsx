import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import {
  Container,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/common/section";
import { ImagePlaceholder } from "@/components/common/image-placeholder";
import { ProductCard } from "@/components/products/product-card";
import { ProductMedia } from "@/components/products/product-media";
import { QualityTable } from "@/components/products/quality-comparison";
import { MoqNote } from "@/components/products/moq-note";
import { Button } from "@/components/ui/button";
import { Table, Td } from "@/components/ui/table";
import { getSiteInfo } from "@/services/company.service";
import { getProductBySlug, listProducts } from "@/services/product.service";
import { enquiryMessage, waLink } from "@/lib/whatsapp";
import { pageMeta } from "@/lib/seo";
import { FaWhatsapp } from "react-icons/fa";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProductBySlug((await params).slug);
  if (!p) return {};
  return pageMeta(
    p.seoTitle || p.name,
    p.seoDescription || p.shortDescription,
    `/products/${p.slug}`,
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, site, all] = await Promise.all([
    getProductBySlug(slug),
    getSiteInfo(),
    listProducts(),
  ]);
  if (!product) notFound();

  const rows: [string, string][] = [
    ...(product.qualities.length
      ? [
          ["Available qualities", product.qualities.join(", ")] as [
            string,
            string,
          ],
        ]
      : []),
    ...(product.sizes.length
      ? [
          ["Available sizes / widths", product.sizes.join(", ")] as [
            string,
            string,
          ],
        ]
      : []),
    ...(product.colours.length
      ? [["Colour", product.colours.join(", ")] as [string, string]]
      : []),
    ...product.specifications.map((s): [string, string] => [s.label, s.value]),
  ];
  const wa = waLink(
    site.whatsappNumber,
    enquiryMessage({ product: product.name }),
  );
  const related = all.filter((p) => p.slug !== product.slug).slice(0, 3);
  const gallery = product.images.slice(1, 4);

  return (
    <>
      <PageHero
        eyebrow={`Products / ${product.categoryName}`}
        title={product.name}
        text={product.shortDescription}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <ProductMedia
              product={product}
              priority
              className="aspect-[4/3] w-full"
            />
            <div className="grid grid-cols-3 gap-3">
              {gallery.length
                ? gallery.map((g, i) => (
                    <ProductMedia
                      key={g.url}
                      product={{ name: product.name, images: [g] }}
                      className={i < 0 ? "" : "aspect-square"}
                    />
                  ))
                : [1, 2, 3].map((n) => (
                    <ImagePlaceholder
                      key={n}
                      label={`Gallery ${n}`}
                      className="aspect-square px-1 text-xs"
                    />
                  ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl">About this product</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div className="mt-6 space-y-3">
              <MoqNote moq={site.moq} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/contact?product=${product.slug}#quote`}>
                  Request a Quotation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  WhatsApp Enquiry
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>
      {rows.length > 0 && (
        <Section tone="muted">
          <SectionHeading
            eyebrow="Specifications"
            title="Available Specifications"
          />
          <div className="rounded-md border border-border bg-white">
            <Table>
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k}>
                    <Td className="w-1/3 font-semibold">{k}</Td>
                    <Td className="text-muted-foreground">{v}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Other specifications may be available on request.
          </p>
        </Section>
      )}
      {product.slug === "plastic-nivar" && (
        <Section>
          <SectionHeading
            eyebrow="Quality Comparison"
            title="Recycled vs Semi-Virgin vs Virgin Nivar"
          />
          <QualityTable />
        </Section>
      )}
      {product.applications.length > 0 && (
        <Section tone={product.slug === "plastic-nivar" ? "muted" : "white"}>
          <SectionHeading eyebrow="Applications" title="Applications" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.applications.map((a) => (
              <li
                key={a}
                className="flex gap-3 rounded-md border border-border bg-white p-4"
              >
                <Check
                  className="h-5 w-5 shrink-0 text-brand-red"
                  aria-hidden
                />
                {a}
              </li>
            ))}
          </ul>
        </Section>
      )}
      {related.length > 0 && (
        <Section
          tone={
            product.applications.length && product.slug !== "plastic-nivar"
              ? "muted"
              : "white"
          }
        >
          <SectionHeading
            eyebrow="Related Products"
            title="You May Also Need"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}
      <Container />
    </>
  );
}
