import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";

export const ok = <T,>(data: T, status = 200) => NextResponse.json({ success: true, data }, { status });
export const fail = (message: string, status = 400, errors?: unknown) =>
  NextResponse.json({ success: false, error: { message, errors } }, { status });

/** Every protected route calls this itself; middleware is not the only gate. */
export async function requireAdmin() {
  const session = await auth();
  return session?.user ?? null;
}

export async function run(fn: () => Promise<NextResponse>) {
  try { return await fn(); }
  catch (e) {
    if (e instanceof ZodError) return fail("Validation failed", 422, e.flatten().fieldErrors);
    if (e instanceof SyntaxError) return fail("Invalid JSON body", 400);
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") return fail("A record with this value already exists", 409);
    console.error(e);
    return fail("Something went wrong", 500);
  }
}
