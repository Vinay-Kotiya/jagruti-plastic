import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { isObjectId } from "@/lib/utils";
import { getProductById, listCategories } from "@/services/product.service";

export const metadata = { title: "Edit product" };

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([isObjectId(id) ? getProductById(id) : null, listCategories()]);
  if (!product) notFound();
  return <ProductForm product={product} categories={categories.map((c) => ({ id: c.id, name: c.name }))} />;
}
