"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";

const schema = z.object({ email: z.string().email("Enter a valid email"), password: z.string().min(1, "Enter your password") });
type Values = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(v: Values) {
    setError("");
    const res = await signIn("credentials", { ...v, redirect: false });
    if (res?.error) return setError("Invalid email or password");
    router.push("/admin/dashboard");
    router.refresh();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Field label="Email" htmlFor="email" error={errors.email?.message}><Input id="email" type="email" autoComplete="username" {...register("email")} /></Field>
      <Field label="Password" htmlFor="password" error={errors.password?.message}>
        <div className="relative">
          <Input id="password" type={show ? "text" : "password"} autoComplete="current-password" className="pr-10" {...register("password")} />
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </Field>
      {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}</Button>
    </form>
  );
}
