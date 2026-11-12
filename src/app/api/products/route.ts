import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { fail, ok, requireAdmin, run } from "@/lib/api";
import { productSchema } from "@/lib/validations/product";
import { createProduct, listProducts } from "@/services/product.service";

export const GET = (req: NextRequest) => run(async () => {
  const all = req.nextUrl.searchParams.get("all") === "1" && !!(await requireAdmin());
  return ok(await listProducts({ activeOnly: !all }));
});

export const POST = (req: NextRequest) => run(async () => {
  if (!(await requireAdmin())) return fail("Unauthorized", 401);
  const product = await createProduct(productSchema.parse(await req.json()));
  revalidatePath("/", "layout");
  return ok(product, 201);
});
