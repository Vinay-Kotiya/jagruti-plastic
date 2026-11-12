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

const phone = /^\+?[0-9\s-]{8,15}$/;
const schema = z.object({
  name: z.string().trim().min(2), ownerName: z.string().trim().min(2),
  establishedYear: z.string().regex(/^\d{4}$/, "Enter a 4-digit year"), gstNumber: z.string().max(20).optional(),
  factoryAddress: z.string().trim().min(5), godownAddress: z.string().trim().min(5),
  phone1: z.string().regex(phone, "Invalid phone"), phone2: z.string().regex(phone, "Invalid phone").or(z.literal("")),
  email: z.string().email("Invalid email"), productionCapacityKg: z.string().regex(/^\d+$/, "Whole KG"), description: z.string().trim().min(10),
});
type Values = z.infer<typeof schema>;

export function CompanyForm({ site }: { site: SiteInfo }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: site.name, ownerName: site.owner, establishedYear: String(site.established), gstNumber: site.gstNumber, factoryAddress: site.factoryAddress,
      godownAddress: site.godownAddress, phone1: site.phones[0] ?? "", phone2: site.phones[1] ?? "", email: site.email,
      productionCapacityKg: String(site.capacityKg), description: site.description },
  });
  async function onSubmit(v: Values) {
    try {
      await api("/api/company", { method: "PUT", body: JSON.stringify({
        name: v.name, ownerName: v.ownerName, establishedYear: Number(v.establishedYear), gstNumber: v.gstNumber || undefined,
        factoryAddress: v.factoryAddress, godownAddress: v.godownAddress, phones: [v.phone1, v.phone2].filter(Boolean), email: v.email,
        productionCapacityKg: Number(v.productionCapacityKg), description: v.description }) });
      toast.success("Company information saved"); router.refresh();
    } catch (e) { toast.error((e as Error).message); }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-3xl space-y-6">
      <h1 className="text-3xl">Company Information</h1>
      <Card className="space-y-5 p-6">
        <h2 className="text-lg">Profile</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Company name" htmlFor="name" error={errors.name?.message}><Input id="name" {...register("name")} /></Field>
          <Field label="Owner" htmlFor="ownerName" error={errors.ownerName?.message}><Input id="ownerName" {...register("ownerName")} /></Field>
          <Field label="Established year" htmlFor="establishedYear" error={errors.establishedYear?.message}><Input id="establishedYear" inputMode="numeric" {...register("establishedYear")} /></Field>
          <Field label="GST number" htmlFor="gstNumber" error={errors.gstNumber?.message}><Input id="gstNumber" {...register("gstNumber")} /></Field>
          <Field label="Monthly production capacity (KG)" htmlFor="productionCapacityKg" error={errors.productionCapacityKg?.message}><Input id="productionCapacityKg" inputMode="numeric" {...register("productionCapacityKg")} /></Field>
        </div>
        <Field label="Business description" htmlFor="description" error={errors.description?.message}><Textarea id="description" {...register("description")} /></Field>
      </Card>
      <Card className="space-y-5 p-6">
        <h2 className="text-lg">Contact & addresses</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone 1" htmlFor="phone1" error={errors.phone1?.message}><Input id="phone1" {...register("phone1")} /></Field>
          <Field label="Phone 2 (optional)" htmlFor="phone2" error={errors.phone2?.message}><Input id="phone2" {...register("phone2")} /></Field>
          <Field label="Email" htmlFor="email" error={errors.email?.message} className="sm:col-span-2"><Input id="email" type="email" {...register("email")} /></Field>
        </div>
        <Field label="Factory address" htmlFor="factoryAddress" error={errors.factoryAddress?.message}><Textarea id="factoryAddress" className="min-h-16" {...register("factoryAddress")} /></Field>
        <Field label="Godown address" htmlFor="godownAddress" error={errors.godownAddress?.message}><Textarea id="godownAddress" className="min-h-16" {...register("godownAddress")} /></Field>
      </Card>
      <Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save changes"}</Button>
    </form>
  );
}
