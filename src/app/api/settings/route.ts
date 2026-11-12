import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { fail, ok, requireAdmin, run } from "@/lib/api";
import { settingsSchema } from "@/lib/validations/company";
import { saveSettings } from "@/services/company.service";

export const PUT = (req: NextRequest) => run(async () => {
  if (!(await requireAdmin())) return fail("Unauthorized", 401);
  const saved = await saveSettings(settingsSchema.parse(await req.json()));
  revalidatePath("/", "layout");
  return ok(saved);
});
