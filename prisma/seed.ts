import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { catalog, categories } from "../src/config/catalog";
import { company, moq } from "../src/config/company";

const prisma = new PrismaClient();

async function main() {
  const cat: Record<string, string> = {};
  for (const c of categories) cat[c.slug] = (await prisma.productCategory.upsert({ where: { slug: c.slug }, create: c, update: { name: c.name, sortOrder: c.sortOrder } })).id;

  for (const p of catalog) {
    const { categorySlug, ...rest } = p;
    // update: {} keeps admin edits (and uploaded images) intact on re-seed
    await prisma.product.upsert({ where: { slug: p.slug }, create: { ...rest, categoryId: cat[categorySlug], images: [] }, update: {} });
  }

  await prisma.companyInformation.upsert({
    where: { key: "primary" }, update: {},
    create: { key: "primary", name: company.name, ownerName: company.owner, establishedYear: company.established, gstNumber: company.gstNumber,
      factoryAddress: company.factoryAddress, godownAddress: company.godownAddress, phones: [...company.phones], email: company.email,
      productionCapacityKg: company.monthlyCapacityKg, description: company.supportingMessage },
  });
  await prisma.siteSettings.upsert({
    where: { key: "primary" }, update: {},
    create: { key: "primary", whatsappNumber: company.whatsappNumber, moqPublic: false, moqNivarKg: moq.nivarKg, moqClothKg: moq.clothKg, moqCombinedKg: moq.combinedKg, socialLinks: [] },
  });

  const email = process.env.SEED_ADMIN_EMAIL?.toLowerCase(), password = process.env.SEED_ADMIN_PASSWORD;
  if (email && password) {
    if (password.length < 10) throw new Error("SEED_ADMIN_PASSWORD must be at least 10 characters");
    await prisma.admin.upsert({ where: { email }, update: {}, create: { name: "Administrator", email, passwordHash: await bcrypt.hash(password, 12) } });
    console.log(`Admin ready: ${email}`);
  } else console.warn("SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — no admin created.");
  console.log("Seed complete.");
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
