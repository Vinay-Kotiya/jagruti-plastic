import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { company, moq } from "@/config/company";
import type { z } from "zod";
import type { companySchema, settingsSchema } from "@/lib/validations/company";

export type SiteInfo = {
  name: string; owner: string; established: number; gstNumber: string; description: string;
  phones: string[]; email: string; whatsappNumber: string;
  factoryAddress: string; godownAddress: string; capacityKg: number;
  moq: { public: boolean; nivarKg: number | null; clothKg: number | null; combinedKg: number | null };
  socialLinks: { platform: string; url: string }[];
};

const fallback: SiteInfo = {
  name: company.name, owner: company.owner, established: company.established, gstNumber: company.gstNumber,
  description: company.supportingMessage, phones: [...company.phones], email: company.email,
  whatsappNumber: company.whatsappNumber, factoryAddress: company.factoryAddress, godownAddress: company.godownAddress,
  capacityKg: company.monthlyCapacityKg,
  moq: { public: moq.public, nivarKg: moq.nivarKg, clothKg: moq.clothKg, combinedKg: moq.combinedKg },
  socialLinks: [],
};

export const getSiteInfo = cache(async (): Promise<SiteInfo> => {
  try {
    const [c, s] = await Promise.all([
      prisma.companyInformation.findUnique({ where: { key: "primary" } }),
      prisma.siteSettings.findUnique({ where: { key: "primary" } }),
    ]);
    return {
      name: c?.name ?? fallback.name, owner: c?.ownerName ?? fallback.owner,
      established: c?.establishedYear ?? fallback.established, gstNumber: c?.gstNumber ?? fallback.gstNumber,
      description: c?.description ?? fallback.description, phones: c?.phones?.length ? c.phones : fallback.phones,
      email: c?.email ?? fallback.email, whatsappNumber: s?.whatsappNumber ?? fallback.whatsappNumber,
      factoryAddress: c?.factoryAddress ?? fallback.factoryAddress, godownAddress: c?.godownAddress ?? fallback.godownAddress,
      capacityKg: c?.productionCapacityKg ?? fallback.capacityKg,
      moq: s ? { public: s.moqPublic, nivarKg: s.moqNivarKg, clothKg: s.moqClothKg, combinedKg: s.moqCombinedKg } : fallback.moq,
      socialLinks: s?.socialLinks ?? [],
    };
  } catch (e) {
    console.error("getSiteInfo: using fallback", e);
    return fallback;
  }
});

export const saveCompany = (d: z.infer<typeof companySchema>) =>
  prisma.companyInformation.upsert({ where: { key: "primary" }, create: { key: "primary", ...d }, update: d });

export const saveSettings = (d: z.infer<typeof settingsSchema>) =>
  prisma.siteSettings.upsert({
    where: { key: "primary" },
    create: { key: "primary", ...d },
    update: { ...d, socialLinks: { set: d.socialLinks } },
  });
