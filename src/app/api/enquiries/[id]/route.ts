import type { NextRequest } from "next/server";
import { fail, ok, requireAdmin, run } from "@/lib/api";
import { isObjectId } from "@/lib/utils";
import { enquiryStatusSchema } from "@/lib/validations/enquiry";
import { removeEnquiry, setEnquiryStatus } from "@/services/enquiry.service";

type Ctx = { params: Promise<{ id: string }> };

export const PATCH = (req: NextRequest, { params }: Ctx) => run(async () => {
  if (!(await requireAdmin())) return fail("Unauthorized", 401);
  const { id } = await params;
  if (!isObjectId(id)) return fail("Not found", 404);
  const { status } = enquiryStatusSchema.parse(await req.json());
  return ok(await setEnquiryStatus(id, status));
});

export const DELETE = (_: NextRequest, { params }: Ctx) => run(async () => {
  if (!(await requireAdmin())) return fail("Unauthorized", 401);
  const { id } = await params;
  if (!isObjectId(id)) return fail("Not found", 404);
  await removeEnquiry(id);
  return ok({ deleted: true });
});
