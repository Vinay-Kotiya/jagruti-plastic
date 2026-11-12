import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default:
      "Jagruti Plastic | Plastic Nivar & Monofilament Manufacturer, Bhavnagar",
    template: "%s | Jagruti Plastic",
  },
  description:
    "Jagruti Plastic, Bhavnagar — manufacturer of Plastic Nivar, Monofilament Cloth, Monofilament Yarn and Plastic Scrubbers since 1987.",
  openGraph: {
    siteName: "Jagruti Plastic",
    type: "website",
    locale: "en_IN",
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/images/favicon.svg",
        type: "images/svg+xml",
      },
    ],
  },

  // icons: {
  //   icon: "/image/favicon.svg",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
