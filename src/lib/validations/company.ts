import { z } from "zod";

export const companySchema = z.object({
  name: z.string().trim().min(2).max(120),
  ownerName: z.string().trim().min(2).max(120),
  establishedYear: z.number().int().min(1900).max(2100),
  gstNumber: z.string().trim().max(20).optional(),
  factoryAddress: z.string().trim().min(5).max(400),
  godownAddress: z.string().trim().min(5).max(400),
  phones: z.array(z.string().trim().regex(/^\+?[0-9\s-]{8,15}$/)).min(1).max(5),
  email: z.string().trim().email(),
  productionCapacityKg: z.number().int().positive().max(100_000_000),
  description: z.string().trim().min(10).max(2000),
});
export const settingsSchema = z.object({
  whatsappNumber: z.string().regex(/^\d{10,15}$/, "Digits only, with country code"),
  moqPublic: z.boolean(),
  moqNivarKg: z.number().int().positive().nullable(),
  moqClothKg: z.number().int().positive().nullable(),
  moqCombinedKg: z.number().int().positive().nullable(),
  socialLinks: z.array(z.object({ platform: z.string().trim().min(1).max(40), url: z.string().url() })).max(10),
});
