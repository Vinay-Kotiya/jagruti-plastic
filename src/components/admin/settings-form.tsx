"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/input";
import { api } from "@/lib/client-api";
import type { SiteInfo } from "@/services/company.service";

const kg = z.string().regex(/^\d*$/, "Whole KG only");
const schema = z.object({ whatsappNumber: z.string().regex(/^\d{10,15}$/, "Digits only, with country code (e.g. 919429504603)"),
  moqPublic: z.boolean(), moqNivarKg: kg, moqClothKg: kg, moqCombinedKg: kg, socialLinks: z.string() });
type Values = z.infer<typeof schema>;
const num = (s: string) => (s ? Number(s) : null);

export function SettingsForm({ site }: { site: SiteInfo }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { whatsappNumber: site.whatsappNumber, moqPublic: site.moq.public, moqNivarKg: site.moq.nivarKg?.toString() ?? "",
      moqClothKg: site.moq.clothKg?.toString() ?? "", moqCombinedKg: site.moq.combinedKg?.toString() ?? "",
      socialLinks: site.socialLinks.map((s) => `${s.platform}: ${s.url}`).join("\n") },
  });
  async function onSubmit(v: Values) {
    const socialLinks = v.socialLinks.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => { const i = l.indexOf(":"); return { platform: l.slice(0, i).trim(), url: l.slice(i + 1).trim() }; });
    try {
      await api("/api/settings", { method: "PUT", body: JSON.stringify({ whatsappNumber: v.whatsappNumber, moqPublic: v.moqPublic,
        moqNivarKg: num(v.moqNivarKg), moqClothKg: num(v.moqClothKg), moqCombinedKg: num(v.moqCombinedKg), socialLinks }) });
      toast.success("Settings saved"); router.refresh();
    } catch (e) { toast.error((e as Error).message); }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-3xl space-y-6">
      <h1 className="text-3xl">Settings</h1>
      <Card className="space-y-5 p-6">
        <h2 className="text-lg">WhatsApp</h2>
        <Field label="WhatsApp number" htmlFor="whatsappNumber" error={errors.whatsappNumber?.message}><Input id="whatsappNumber" inputMode="numeric" {...register("whatsappNumber")} /></Field>
      </Card>
      <Card className="space-y-5 p-6">
        <h2 className="text-lg">Minimum order quantity (MOQ)</h2>
        <p className="text-sm text-muted-foreground">Keep this hidden until the final policy is confirmed with the owner. Combined orders: confirm whether the threshold is “greater than” or “at least” the figure entered.</p>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Plastic Nivar (KG)" htmlFor="moqNivarKg" error={errors.moqNivarKg?.message}><Input id="moqNivarKg" inputMode="numeric" {...register("moqNivarKg")} /></Field>
          <Field label="Monofilament Cloth (KG)" htmlFor="moqClothKg" error={errors.moqClothKg?.message}><Input id="moqClothKg" inputMode="numeric" {...register("moqClothKg")} /></Field>
          <Field label="Combined (KG)" htmlFor="moqCombinedKg" error={errors.moqCombinedKg?.message}><Input id="moqCombinedKg" inputMode="numeric" {...register("moqCombinedKg")} /></Field>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-brand-red" {...register("moqPublic")} />Show MOQ publicly on the website</label>
      </Card>
      <Card className="space-y-5 p-6">
        <h2 className="text-lg">Social links</h2>
        <Field label="Links" htmlFor="socialLinks" hint="One per line as Platform: https://…"><Textarea id="socialLinks" {...register("socialLinks")} /></Field>
      </Card>
      <Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save settings"}</Button>
    </form>
  );
}
