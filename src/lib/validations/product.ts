import { z } from "zod";

const list = z.array(z.string().trim().min(1).max(100)).max(30);

export const productSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens"),
  categoryId: z.string().regex(/^[a-f\d]{24}$/i, "Select a category"),
  shortDescription: z.string().trim().min(5).max(300),
  description: z.string().trim().min(10).max(5000),
  qualities: list, sizes: list, colours: list, applications: list,
  specifications: z.array(z.object({ label: z.string().trim().min(1).max(80), value: z.string().trim().min(1).max(300) })).max(30),
  images: z.array(z.object({
    publicId: z.string().startsWith("jagruti-plastic/"),
    url: z.string().url().startsWith("https://res.cloudinary.com/"),
    alt: z.string().max(200).optional(),
    sortOrder: z.number().int().default(0),
  })).max(10),
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  seoTitle: z.string().trim().max(70).optional(),
  seoDescription: z.string().trim().max(160).optional(),
});
export type ProductInput = z.infer<typeof productSchema>;
export const productUpdateSchema = productSchema.partial();
