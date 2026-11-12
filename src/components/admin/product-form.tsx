"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowDown, ArrowUp, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/input";
import { api } from "@/lib/client-api";
import { slugify } from "@/lib/utils";
import type { ProductView } from "@/services/product.service";

// Form uses plain strings (one item per line); converted to arrays on submit.
const schema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and hyphens only"),
  categoryId: z.string().min(1, "Select a category"),
  shortDescription: z.string().trim().min(5, "Add a short description").max(300),
  description: z.string().trim().min(10, "Add a full description"),
  qualities: z.string(), sizes: z.string(), colours: z.string(), applications: z.string(), specifications: z.string(),
  seoTitle: z.string().max(70).optional(), seoDescription: z.string().max(160).optional(),
  featured: z.boolean(), isActive: z.boolean(),
});
type Values = z.infer<typeof schema>;
type Img = { publicId: string; url: string; alt?: string };
const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

export function ProductForm({ product, categories }: { product?: ProductView; categories: { id: string; name: string }[] }) {
  const router = useRouter();
  const [images, setImages] = useState<Img[]>((product?.images ?? []).filter((i): i is Img => !!i.publicId).map((i) => ({ publicId: i.publicId!, url: i.url, alt: i.alt ?? undefined })));
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting, dirtyFields } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name ?? "", slug: product?.slug ?? "", categoryId: product?.categoryId ?? "", shortDescription: product?.shortDescription ?? "",
      description: product?.description ?? "", qualities: product?.qualities.join("\n") ?? "", sizes: product?.sizes.join("\n") ?? "",
      colours: product?.colours.join("\n") ?? "", applications: product?.applications.join("\n") ?? "",
      specifications: product?.specifications.map((s) => `${s.label}: ${s.value}`).join("\n") ?? "",
      seoTitle: product?.seoTitle ?? "", seoDescription: product?.seoDescription ?? "", featured: product?.featured ?? false, isActive: product?.isActive ?? true,
    },
  });
  const isNivar = categories.find((c) => c.id === watch("categoryId"))?.name === "Plastic Nivar";

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData(); fd.append("file", file);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message ?? "Upload failed");
        setImages((cur) => [...cur, json.data]);
      } catch (e) { toast.error(`${file.name}: ${(e as Error).message}`); }
    }
    setUploading(false);
  }
  async function removeImage(img: Img) {
    setImages((cur) => cur.filter((i) => i.publicId !== img.publicId));
    // Images already saved on the product are deleted from Cloudinary when the form is saved.
    if (!product?.images.some((i) => i.publicId === img.publicId)) await fetch(`/api/upload?publicId=${encodeURIComponent(img.publicId)}`, { method: "DELETE" });
  }
  const move = (i: number, d: -1 | 1) => setImages((cur) => { const n = [...cur]; [n[i], n[i + d]] = [n[i + d], n[i]]; return n; });

  async function onSubmit(v: Values) {
    const specifications = lines(v.specifications).map((l) => { const [label, ...rest] = l.split(":"); return { label: label.trim(), value: rest.join(":").trim() }; }).filter((s) => s.label && s.value);
    const body = {
      name: v.name, slug: v.slug, categoryId: v.categoryId, shortDescription: v.shortDescription, description: v.description,
      qualities: lines(v.qualities), sizes: lines(v.sizes), colours: lines(v.colours), applications: lines(v.applications), specifications,
      images: images.map((img, sortOrder) => ({ ...img, sortOrder })), featured: v.featured, isActive: v.isActive,
      seoTitle: v.seoTitle || undefined, seoDescription: v.seoDescription || undefined,
    };
    try {
      await api(product ? `/api/products/${product.id}` : "/api/products", { method: product ? "PATCH" : "POST", body: JSON.stringify(body) });
      toast.success(product ? "Product updated" : "Product created");
      router.push("/admin/products"); router.refresh();
    } catch (e) { toast.error((e as Error).message); }
  }

  const nameReg = register("name");
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-3xl space-y-6">
      <h1 className="text-3xl">{product ? "Edit product" : "New product"}</h1>
      <Card className="space-y-5 p-6">
        <Field label="Product name *" htmlFor="name" error={errors.name?.message}>
          <Input id="name" {...nameReg} onChange={(e) => { nameReg.onChange(e); if (!product && !dirtyFields.slug) setValue("slug", slugify(e.target.value)); }} /></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Slug *" htmlFor="slug" error={errors.slug?.message}><Input id="slug" {...register("slug")} /></Field>
          <Field label="Category *" htmlFor="categoryId" error={errors.categoryId?.message}>
            <NativeSelect id="categoryId" {...register("categoryId")}><option value="">Select category</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</NativeSelect></Field>
        </div>
        <Field label="Short description *" htmlFor="shortDescription" error={errors.shortDescription?.message}><Textarea id="shortDescription" className="min-h-16" {...register("shortDescription")} /></Field>
        <Field label="Full description *" htmlFor="description" error={errors.description?.message}><Textarea id="description" className="min-h-32" {...register("description")} /></Field>
      </Card>
      <Card className="space-y-5 p-6">
        <h2 className="text-lg">Variations & specifications</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={isNivar ? "Qualities (Recycled / Semi-Virgin / Virgin)" : "Available qualities"} htmlFor="qualities" hint="One per line"><Textarea id="qualities" {...register("qualities")} /></Field>
          <Field label={isNivar ? "Available widths" : "Available sizes"} htmlFor="sizes" hint="One per line"><Textarea id="sizes" {...register("sizes")} /></Field>
          <Field label="Available colours" htmlFor="colours" hint="One per line"><Textarea id="colours" {...register("colours")} /></Field>
          <Field label="Applications" htmlFor="applications" hint="One per line"><Textarea id="applications" {...register("applications")} /></Field>
        </div>
        <Field label="Specifications" htmlFor="specifications" hint="One per line as Label: Value (e.g. Weight range: 80 GSM to 120 GSM). Only add confirmed specifications."><Textarea id="specifications" {...register("specifications")} /></Field>
      </Card>
      <Card className="space-y-4 p-6">
        <h2 className="text-lg">Images</h2>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-brand-gold/70 bg-surface p-6 text-sm font-medium text-charcoal hover:bg-amber-50/50">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}{uploading ? "Uploading…" : "Upload JPG, PNG or WebP (max 5 MB each)"}
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" disabled={uploading} onChange={(e) => { void upload(e.target.files); e.target.value = ""; }} />
        </label>
        {images.length > 0 && <ul className="grid gap-3 sm:grid-cols-3">{images.map((img, i) => (
          <li key={img.publicId} className="rounded-md border border-border p-2">
            <Image src={img.url} alt={img.alt ?? ""} width={240} height={180} className="aspect-[4/3] w-full rounded object-cover" />
            <div className="mt-2 flex items-center justify-between text-xs">
              <span>{i === 0 ? "Main image" : `Image ${i + 1}`}</span>
              <span className="flex">
                <Button type="button" size="icon" variant="ghost" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move earlier"><ArrowUp className="h-4 w-4" /></Button>
                <Button type="button" size="icon" variant="ghost" disabled={i === images.length - 1} onClick={() => move(i, 1)} aria-label="Move later"><ArrowDown className="h-4 w-4" /></Button>
                <Button type="button" size="icon" variant="ghost" onClick={() => void removeImage(img)} aria-label="Remove image"><Trash2 className="h-4 w-4 text-red-700" /></Button>
              </span>
            </div>
          </li>))}</ul>}
      </Card>
      <Card className="space-y-5 p-6">
        <h2 className="text-lg">SEO & visibility</h2>
        <Field label="SEO title" htmlFor="seoTitle" error={errors.seoTitle?.message}><Input id="seoTitle" {...register("seoTitle")} /></Field>
        <Field label="SEO description" htmlFor="seoDescription" error={errors.seoDescription?.message}><Textarea id="seoDescription" className="min-h-16" {...register("seoDescription")} /></Field>
        <div className="flex flex-wrap gap-6 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-brand-red" {...register("isActive")} />Active (visible on website)</label>
          <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-brand-red" {...register("featured")} />Featured product</label>
        </div>
      </Card>
      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={isSubmitting || uploading}>{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : product ? "Save changes" : "Create product"}</Button>
        <Button type="button" size="lg" variant="outline" onClick={() => router.push("/admin/products")}>Cancel</Button>
      </div>
    </form>
  );
}
