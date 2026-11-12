import type { NextAuthConfig } from "next-auth";

// Edge-safe half of the config (used by middleware). No DB or bcrypt here.
export default {
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      const loggedIn = !!auth?.user;
      if (path === "/admin/login") return loggedIn ? Response.redirect(new URL("/admin/dashboard", request.nextUrl)) : true;
      if (path.startsWith("/admin")) return loggedIn;
      return true;
    },
    jwt({ token, user }) {
      if (user) { token.id = user.id; token.role = user.role; }
      return token;
    },
    session({ session, token }) {
      session.user.id = (token.id as string) ?? "";
      session.user.role = (token.role as string) ?? "ADMIN";
      return session;
    },
  },
} satisfies NextAuthConfig;
