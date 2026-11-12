import type { NextRequest } from "next/server";
import { fail, ok, requireAdmin, run } from "@/lib/api";
import { IMAGE_FOLDER, destroyImages, uploadImage } from "@/services/cloudinary.service";

export const runtime = "nodejs";
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

export const POST = (req: NextRequest) => run(async () => {
  if (!(await requireAdmin())) return fail("Unauthorized", 401);
  const file = (await req.formData()).get("file");
  if (!(file instanceof File)) return fail("No file provided", 400);
  if (!ALLOWED.includes(file.type)) return fail("Only JPG, PNG or WebP images are allowed", 415);
  if (file.size > MAX_BYTES) return fail("Image must be 5 MB or smaller", 413);
  return ok(await uploadImage(Buffer.from(await file.arrayBuffer())), 201);
});

// Removes an image that was uploaded but never saved to a product.
export const DELETE = (req: NextRequest) => run(async () => {
  if (!(await requireAdmin())) return fail("Unauthorized", 401);
  const publicId = req.nextUrl.searchParams.get("publicId") ?? "";
  if (!publicId.startsWith(`${IMAGE_FOLDER}/`)) return fail("Invalid image id", 400);
  await destroyImages([publicId]);
  return ok({ deleted: true });
});
