/**
 * Static fallback / seed values. At runtime the public site reads the
 * CompanyInformation + SiteSettings documents from MongoDB; this file seeds
 * them and keeps the site usable if the DB is unreachable.
 */
export const company = {
  name: "JAGRUTI PLASTIC",
  owner: "Mukesh Badheka",
  established: 1987,
  businessType: "Manufacturer",
  gstNumber: "24AMJPB7221P1ZY",
  monthlyCapacityKg: 10_000,
  positioning:
    "Plastic Nivar, Monofilament Cloth, Monofilament Yarn, and Plastic Scrubber Manufacturer.",
  tagline: "Quality Plastic Manufacturing. Trusted Since 1987.",
  supportingMessage:
    "Manufacturing plastic products with a focus on practical quality, product variety, and dependable business relationships since 1987.",
  phones: ["9429504603", "8160821498"],
  email: "jagrutiplasticbvn@gmail.com",
  whatsappNumber: "919429504603",
  factoryAddress:
    "Babubhai Benco, 0, Amar Society, Gadhechi Road, Kumbharwada, Bhavnagar, Gujarat – 364005, India.",
  godownAddress:
    "A-615, Old LIG, Near Second Bus Stop, Anand Nagar, Bhavnagar, Gujarat – 364005, India.",
} as const;

/**
 * MOQ is intentionally NOT public. Client figures (120 KG Nivar, 60 KG Cloth,
 * combined "greater than 180 KG") are ambiguous: 120 + 60 = 180 exactly.
 * Flip `public` to true only after the client confirms the policy.
 */
export const moq = {
  public: false,
  nivarKg: 120,
  clothKg: 60,
  combinedKg: 180,
  combinedRule: "unconfirmed" as "unconfirmed" | "greater-than" | "at-least",
};

/** Specs withheld from public display until verified by the client. */
export const unverifiedSpecs = {
  monofilamentYarnThickness: "20 mm (unconfirmed)",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
