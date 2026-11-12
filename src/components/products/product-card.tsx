import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductMedia } from "@/components/products/product-media";
import type { ProductView } from "@/services/product.service";

export function ProductCard({ product }: { product: ProductView }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-border bg-white transition-shadow hover:shadow-lg">
      <div className="overflow-hidden"><div className="transition-transform duration-500 group-hover:scale-[1.03]"><ProductMedia product={product} /></div></div>
      <div className="flex flex-1 flex-col border-t-2 border-brand-gold/70 p-5">
        <h3 className="text-xl">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild size="sm"><Link href={`/products/${product.slug}`}>View Product <ArrowRight className="h-3.5 w-3.5" aria-hidden /></Link></Button>
          <Button asChild size="sm" variant="outline"><Link href={`/contact?product=${product.slug}#quote`}>Enquire Now</Link></Button>
        </div>
      </div>
    </article>
  );
}
