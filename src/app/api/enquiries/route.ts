import type { NextRequest } from "next/server";
import { fail, ok, requireAdmin, run } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";
import { enquirySchema } from "@/lib/validations/enquiry";
import { createEnquiry, listEnquiries } from "@/services/enquiry.service";

// Public: create an enquiry (validated, honeypot + rate limited)
export const POST = (req: NextRequest) => run(async () => {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`enquiry:${ip}`, 5, 10 * 60_000)) return fail("Too many enquiries. Please try later or call us directly.", 429);
  const data = enquirySchema.parse(await req.json());
  if (data.website) return ok({ received: true }, 201); // bot: pretend success, store nothing
  await createEnquiry(data);
  return ok({ received: true }, 201);
});

// Admin: list
export const GET = () => run(async () => {
  if (!(await requireAdmin())) return fail("Unauthorized", 401);
  return ok(await listEnquiries());
});
