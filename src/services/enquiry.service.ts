import { prisma } from "@/lib/prisma";
import type { EnquiryStatus } from "@prisma/client";
import type { enquirySchema } from "@/lib/validations/enquiry";
import type { z } from "zod";

export async function createEnquiry(d: z.output<typeof enquirySchema>) {
  const product = await prisma.product.findUnique({ where: { slug: d.productSlug }, select: { id: true } });
  const message = [!product && `Product: ${d.productSlug}`, d.message].filter(Boolean).join("\n") || undefined;
  return prisma.enquiry.create({
    data: {
      customerName: d.customerName, companyName: d.companyName || undefined, phone: d.phone,
      email: d.email || undefined, productId: product?.id, quality: d.quality || undefined,
      specification: d.specification || undefined, quantityKg: d.quantityKg, message,
    },
    select: { id: true },
  });
}

export const listEnquiries = () =>
  prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 500, include: { product: { select: { name: true, slug: true } } } });

export const setEnquiryStatus = (id: string, status: EnquiryStatus) => prisma.enquiry.update({ where: { id }, data: { status } });
export const removeEnquiry = (id: string) => prisma.enquiry.delete({ where: { id } });
