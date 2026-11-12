import type { MetadataRoute } from "next";
import { listProducts } from "@/services/product.service";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const pages = ["", "/about", "/products", "/manufacturing", "/applications", "/contact"].map((p) => ({ url: `${base}${p}` }));
  const products = (await listProducts()).map((p) => ({ url: `${base}/products/${p.slug}` }));
  return [...pages, ...products];
}
