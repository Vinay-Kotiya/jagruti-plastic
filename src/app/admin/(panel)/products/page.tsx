import { ProductsTable } from "@/components/admin/products-table";
import { listProducts, listCategories } from "@/services/product.service";

export const metadata = { title: "Products" };

export default async function AdminProducts() {
  const [products, categories] = await Promise.all([listProducts({ activeOnly: false }), listCategories()]);
  return <ProductsTable products={products} categories={categories.map((c) => ({ id: c.id, name: c.name }))} />;
}
