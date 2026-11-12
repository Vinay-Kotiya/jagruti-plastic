/**
 * Single source for seed data AND the public-site fallback when the database
 * is unreachable or empty. Only client-supplied facts are used here.
 * Yarn thickness is deliberately omitted until the client confirms it.
 */
export type CatalogProduct = {
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  qualities: string[];
  sizes: string[];
  colours: string[];
  specifications: { label: string; value: string }[];
  applications: string[];
  featured: boolean;
};

export const categories = [
  { name: "Plastic Nivar", slug: "plastic-nivar", sortOrder: 1 },
  { name: "Monofilament Cloth", slug: "monofilament-cloth", sortOrder: 2 },
  { name: "Monofilament Yarn", slug: "monofilament-yarn", sortOrder: 3 },
  { name: "Plastic Scrubber", slug: "plastic-scrubber", sortOrder: 4 },
];

export const catalog: CatalogProduct[] = [
  {
    slug: "plastic-nivar",
    name: "Plastic Nivar",
    categorySlug: "plastic-nivar",
    featured: true,
    shortDescription:
      "Plastic woven webbing in recycled, semi-virgin and virgin qualities, in six widths.",
    description:
      "Plastic Nivar is manufactured by Jagruti Plastic in three quality options — recycled (RP), semi-virgin and virgin — so buyers can match the material to their budget and requirement. It is commonly used for weaving charpai / khatla and furniture, and for packaging, agriculture and industrial uses.",
    qualities: ["Recycled (RP)", "Semi-Virgin", "Virgin"],
    sizes: [
      "0.5 inch",
      "0.75 inch",
      "1 inch",
      "1.5 inch",
      "1.75 inch",
      "2 inch",
    ],
    colours: [],
    specifications: [
      { label: "Product type", value: "Plastic woven webbing (Nivar)" },
    ],
    applications: [
      "Charpai / Khatla",
      "Furniture",
      "Packaging",
      "Agriculture",
      "Industrial uses",
    ],
  },
  {
    slug: "monofilament-cloth",
    name: "Monofilament Cloth",
    categorySlug: "monofilament-cloth",
    featured: true,
    shortDescription:
      "Monofilament cloth in recycled and semi-virgin qualities, from 80 to 120 GSM.",
    description:
      "Jagruti Plastic manufactures monofilament cloth in recycled (RP) and semi-virgin qualities across a weight range of 80 GSM to 120 GSM, for agricultural, industrial and packaging requirements.",
    qualities: ["Recycled (RP)", "Semi-Virgin"],
    sizes: [],
    colours: [],
    specifications: [{ label: "Weight range", value: "80 GSM to 120 GSM" }],
    applications: [
      "Agriculture",
      "Industrial Filtration",
      "Packaging",
      "Food Processing",
      "Aquaculture",
      "General Industrial Use",
    ],
  },
  {
    slug: "monofilament-yarn",
    name: "Monofilament Yarn",
    categorySlug: "monofilament-yarn",
    featured: true,
    shortDescription:
      "Monofilament yarn, also known as Monofilament Corn / Sutarcorn.",
    description:
      "Monofilament yarn (also known as Monofilament Corn / Sutarcorn) is manufactured by Jagruti Plastic. Contact our team with your requirement for available specifications.",
    qualities: [],
    sizes: [],
    colours: ["Plain water colour"],
    specifications: [
      { label: "Also known as", value: "Monofilament Corn / Sutarcorn" },
    ],
    applications: [],
  },
  {
    slug: "plastic-scrubber",
    name: "Plastic Scrubber",
    categorySlug: "plastic-scrubber",
    featured: true,
    shortDescription:
      "Nylon-fibre scrubbers for household, hospitality, automobile and commercial cleaning.",
    description:
      "Jagruti Plastic plastic scrubbers are made from nylon fibres, offering good abrasion resistance, flexibility and durability for heavy-duty cleaning.",
    qualities: [],
    sizes: [],
    colours: [],
    specifications: [
      { label: "Material", value: "Nylon fibres" },
      {
        label: "Features",
        value:
          "Good abrasion resistance, flexible, durable, suitable for heavy-duty cleaning",
      },
    ],
    applications: [
      "Household",
      "Hotels and Restaurants",
      "Hospitality",
      "Automobile",
      "Commercial Cleaning",
    ],
  },
];

export const nivarQualities = [
  {
    name: "Recycled Nivar",
    raw: "Recycled plastic granules obtained from plastic waste",
    position: "Economical option",
    strength:
      "Quality and strength can vary depending on the recycled material",
    suitable: "When price is a major consideration",
  },
  {
    name: "Semi-Virgin Nivar",
    raw: "A combination of virgin and recycled plastic granules",
    position: "Balanced price and quality",
    strength: "Better strength and appearance than many recycled varieties",
    suitable:
      "Customers seeking a balance between affordability and performance",
  },
  {
    name: "Virgin Nivar",
    raw: "100% fresh virgin plastic raw material",
    position: "Premium applications",
    strength:
      "Generally better strength and flexibility, with consistent quality and colour",
    suitable: "Premium applications",
  },
];

export const applicationGroups = [
  {
    product: "Plastic Nivar",
    link: "/images/Products/plastic-nivar-applications.png",
    alt: "plastic-nivar-applications image",
    slug: "plastic-nivar",
    items: [
      "Charpai / Khatla",
      "Furniture",
      "Agriculture",
      "Packaging",
      "Industrial applications",
    ],
  },
  {
    product: "Monofilament Cloth",
    link: "/images/Products/monofilament-mesh-applications.png",
    alt: "monofilament-mesh-applications image",
    slug: "monofilament-cloth",
    items: [
      "Agriculture",
      "Filtration",
      "Food Processing",
      "Aquaculture",
      "Packaging",
    ],
  },
  {
    product: "Plastic Scrubber",
    link: "/images/Products/scrubbers-for-every-clean.png",
    alt: "scrubbers-for-every-clean image",
    slug: "plastic-scrubber",
    items: [
      "Household cleaning",
      "Hospitality",
      "Automobile",
      "Commercial cleaning",
    ],
  },
];
