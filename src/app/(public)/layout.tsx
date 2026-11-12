import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { getSiteInfo } from "@/services/company.service";

export const revalidate = 300;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteInfo();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingActions whatsappNumber={site.whatsappNumber} />
    </>
  );
}
