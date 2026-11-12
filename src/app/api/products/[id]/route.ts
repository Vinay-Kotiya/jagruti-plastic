import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { fail, ok, requireAdmin, run } from "@/lib/api";
import { isObjectId } from "@/lib/utils";
import { productUpdateSchema } from "@/lib/validations/product";
import { deleteProduct, getProductById, updateProduct } from "@/services/product.service";

type Ctx = { params: Promise<{ id: string }> };

export const GET = (_: NextRequest, { params }: Ctx) => run(async () => {
  if (!(await requireAdmin())) return fail("Unauthorized", 401);
  const { id } = await params;
  const p = isObjectId(id) ? await getProductById(id) : null;
  return p ? ok(p) : fail("Not found", 404);
});

export const PATCH = (req: NextRequest, { params }: Ctx) => run(async () => {
  if (!(await requireAdmin())) return fail("Unauthorized", 401);
  const { id } = await params;
  if (!isObjectId(id)) return fail("Not found", 404);
  const p = await updateProduct(id, productUpdateSchema.parse(await req.json()));
  if (!p) return fail("Not found", 404);
  revalidatePath("/", "layout");
  return ok(p);
});

export const DELETE = (_: NextRequest, { params }: Ctx) => run(async () => {
  if (!(await requireAdmin())) return fail("Unauthorized", 401);
  const { id } = await params;
  if (!isObjectId(id) || !(await deleteProduct(id))) return fail("Not found", 404);
  revalidatePath("/", "layout");
  return ok({ deleted: true });
});
