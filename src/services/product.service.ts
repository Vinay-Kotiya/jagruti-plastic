import { prisma } from "@/lib/prisma";
import { catalog, categories } from "@/config/catalog";
import type { Prisma } from "@prisma/client";
import type { ProductInput } from "@/lib/validations/product";
import { destroyImages } from "@/services/cloudinary.service";

export type ProductView = {
  id: string; slug: string; name: string; shortDescription: string; description: string;
  categorySlug: string; categoryName: string; categoryId?: string;
  images: { publicId?: string; url: string; alt?: string | null }[];
  qualities: string[]; sizes: string[]; colours: string[];
  specifications: { label: string; value: string }[]; applications: string[];
  featured: boolean; isActive: boolean; seoTitle?: string | null; seoDescription?: string | null;
};

type Row = Prisma.ProductGetPayload<{ include: { category: true } }>;
const toView = (p: Row): ProductView => ({
  id: p.id, slug: p.slug, name: p.name, shortDescription: p.shortDescription, description: p.description,
  categorySlug: p.category.slug, categoryName: p.category.name, categoryId: p.categoryId,
  images: [...p.images].sort((a, b) => a.sortOrder - b.sortOrder),
  qualities: p.qualities, sizes: p.sizes, colours: p.colours, specifications: p.specifications,
  applications: p.applications, featured: p.featured, isActive: p.isActive,
  seoTitle: p.seoTitle, seoDescription: p.seoDescription,
});

const fallbackProducts = (): ProductView[] =>
  catalog.map((c) => ({
    ...c, id: c.slug, categoryName: categories.find((x) => x.slug === c.categorySlug)?.name ?? "",
    images: [], isActive: true,
  }));

/** Public read: DB first; if unreachable or empty, serve the built-in catalogue so the site never renders blank. */
export async function listProducts(opts: { activeOnly?: boolean } = {}): Promise<ProductView[]> {
  const activeOnly = opts.activeOnly ?? true;
  try {
    const rows = await prisma.product.findMany({
      where: activeOnly ? { isActive: true } : {}, include: { category: true }, orderBy: { createdAt: "asc" },
    });
    if (rows.length) return rows.map(toView);
  } catch (e) { console.error("listProducts: using fallback", e); }
  return activeOnly ? fallbackProducts() : [];
}

export async function getProductBySlug(slug: string): Promise<ProductView | null> {
  try {
    const row = await prisma.product.findUnique({ where: { slug }, include: { category: true } });
    if (row) return row.isActive ? toView(row) : null;
  } catch (e) { console.error("getProductBySlug: using fallback", e); }
  return fallbackProducts().find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string) {
  const row = await prisma.product.findUnique({ where: { id }, include: { category: true } });
  return row ? toView(row) : null;
}

export const listCategories = () => prisma.productCategory.findMany({ orderBy: { sortOrder: "asc" } });

export const createProduct = (d: ProductInput) => prisma.product.create({ data: d });

export async function updateProduct(id: string, d: Partial<ProductInput>) {
  const existing = await prisma.product.findUnique({ where: { id }, select: { images: true } });
  if (!existing) return null;
  const { images, specifications, ...rest } = d;
  const updated = await prisma.product.update({
    where: { id },
    data: { ...rest, ...(images && { images: { set: images } }), ...(specifications && { specifications: { set: specifications } }) },
  });
  if (images) {
    const keep = new Set(images.map((i) => i.publicId));
    await destroyImages(existing.images.map((i) => i.publicId).filter((p) => !keep.has(p)));
  }
  return updated;
}

export async function deleteProduct(id: string) {
  const existing = await prisma.product.findUnique({ where: { id }, select: { images: true } });
  if (!existing) return false;
  await prisma.product.delete({ where: { id } }); // enquiries keep their data: relation is SetNull
  await destroyImages(existing.images.map((i) => i.publicId));
  return true;
}
