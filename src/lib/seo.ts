import type { Metadata } from "next";

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | Jagruti Plastic`, description, url: path, siteName: "Jagruti Plastic", type: "website", locale: "en_IN" },
  };
}
