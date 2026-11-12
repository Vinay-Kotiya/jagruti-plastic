import type { Metadata } from "next";
import { Logo } from "@/components/common/logo";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md rounded-md border border-border border-t-4 border-t-brand-red bg-white p-8 shadow-sm">
        <Logo className="mb-6 justify-center" />
        <h1 className="mb-6 text-center text-2xl">Admin Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
}
