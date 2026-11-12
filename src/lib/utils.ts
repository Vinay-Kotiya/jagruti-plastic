import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...i: ClassValue[]) => twMerge(clsx(i));
export const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
export const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s);
export const formatDate = (d: Date | string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
