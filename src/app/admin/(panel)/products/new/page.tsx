import { ProductForm } from "@/components/admin/product-form";
import { listCategories } from "@/services/product.service";

export const metadata = { title: "New product" };

export default async function NewProduct() {
  const categories = await listCategories();
  return <ProductForm categories={categories.map((c) => ({ id: c.id, name: c.name }))} />;
}
