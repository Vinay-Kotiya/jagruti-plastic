import Link from "next/link";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Container } from "@/components/common/section";
import { mainNav, productLinks } from "@/config/navigation";
import { getSiteInfo } from "@/services/company.service";
import { enquiryMessage, waLink } from "@/lib/whatsapp";

export async function Footer() {
  const s = await getSiteInfo();
  const h =
    "mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold";
  const a = "text-sm text-muted-foreground hover:text-brand-red";
  return (
    <footer className="border-t-4 border-brand-red bg-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {s.name} is a Bhavnagar-based manufacturer of plastic and
            monofilament products. Established {s.established}.
          </p>
        </div>
        <div>
          <h2 className={h}>Products</h2>
          <ul className="space-y-2">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link className={a} href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className={`${h} mt-6`}>Company</h2>
          <ul className="space-y-2">
            {mainNav
              .filter((n) => !n.children && n.href !== "/")
              .map((l) => (
                <li key={l.href}>
                  <Link className={a} href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="space-y-4 text-sm text-muted-foreground">
          <h2 className={h}>Visit Us</h2>
          <p className="flex gap-2">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
              aria-hidden
            />
            <span>
              <b className="text-charcoal">Factory:</b> {s.factoryAddress}
            </span>
          </p>
          <p className="flex gap-2">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
              aria-hidden
            />
            <span>
              <b className="text-charcoal">Godown:</b> {s.godownAddress}
            </span>
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <h2 className={h}>Contact</h2>
          {s.phones.map((p) => (
            <a
              key={p}
              href={`tel:+91${p}`}
              className={`flex items-center gap-2 ${a}`}
            >
              <Phone className="h-4 w-4 text-brand-red" aria-hidden />
              {p}
            </a>
          ))}
          <a
            href={`mailto:${s.email}`}
            className={`flex items-center gap-2 break-all ${a}`}
          >
            <Mail className="h-4 w-4 shrink-0 text-brand-red" aria-hidden />
            {s.email}
          </a>
          <a
            href={waLink(s.whatsappNumber, enquiryMessage({}))}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 ${a}`}
          >
            <MessageCircle className="h-4 w-4 text-brand-red" aria-hidden />
            WhatsApp enquiry
          </a>
        </div>
      </Container>
      <div className="border-t border-border">
        {/* <Container className="flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {s.name}. All rights reserved.</p>
          <p className="flex gap-4"><Link href="/privacy" className="hover:text-brand-red">Privacy Policy</Link><Link href="/terms" className="hover:text-brand-red">Terms</Link></p>
        </Container> */}
        <Container className="flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {s.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-brand-red">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-brand-red">
              Terms
            </Link>

            <span className="hidden h-3 w-px bg-border sm:block" />

            <p>
              Designed & Developed by{" "}
              <a
                href="https://vkcreativeweb.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-charcoal transition-colors hover:text-brand-red"
              >
                VK Creative Labs
              </a>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
