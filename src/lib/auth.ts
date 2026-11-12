import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import authConfig from "@/lib/auth.config";

const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const admin = await prisma.admin.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
        if (!admin) return null;
        const valid = await bcrypt.compare(parsed.data.password, admin.passwordHash);
        return valid ? { id: admin.id, name: admin.name, email: admin.email, role: admin.role } : null;
      },
    }),
  ],
});
