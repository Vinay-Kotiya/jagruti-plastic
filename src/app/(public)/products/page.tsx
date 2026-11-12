import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/common/section";
import { ProductCard } from "@/components/products/product-card";
import { Badge } from "@/components/ui/card";
import { listProducts } from "@/services/product.service";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("Product Catalogue", "Plastic Nivar, Monofilament Cloth, Monofilament Yarn and Plastic Scrubbers manufactured by Jagruti Plastic, Bhavnagar.", "/products");
export const revalidate = 300;

export default async function ProductsPage() {
  const products = await listProducts();
  return (
    <>
      <PageHero eyebrow="Products" title="Product Catalogue" text="Manufactured by Jagruti Plastic in Bhavnagar, Gujarat." />
      <Section>
        <nav aria-label="Product categories" className="mb-10 flex flex-wrap gap-2">
          {products.map((p) => <Link key={p.id} href={`/products/${p.slug}`}><Badge className="px-3 py-1.5 text-sm hover:bg-brand-red hover:text-white">{p.name}</Badge></Link>)}
        </nav>
        {products.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          : <p className="text-muted-foreground">No products are listed right now. Please contact us for availability.</p>}
      </Section>
    </>
  );
}
