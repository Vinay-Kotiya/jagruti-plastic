import { z } from "zod";

const optional = z.string().trim().max(200).optional().or(z.literal(""));

/** Shared by the browser form (React Hook Form) and the API route. */
export const enquiryFormSchema = z.object({
  customerName: z.string().trim().min(2, "Please enter your name").max(100),
  companyName: optional,
  phone: z.string().trim().regex(/^\+?[0-9\s-]{8,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address").optional().or(z.literal("")),
  productSlug: z.string().trim().min(1, "Please select a product"),
  quality: optional,
  specification: optional,
  quantityKg: z.string().trim().regex(/^\d{0,7}$/, "Enter quantity in whole KG").optional().or(z.literal("")),
  message: z.string().trim().max(1000, "Message is too long").optional().or(z.literal("")),
  website: z.string().optional(), // honeypot: real users never fill this
});
export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

export const enquirySchema = enquiryFormSchema.transform((d) => ({
  ...d,
  quantityKg: d.quantityKg ? Number(d.quantityKg) : undefined,
}));

export const enquiryStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
});
