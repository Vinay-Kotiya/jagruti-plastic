import Image from "next/image";
import Link from "next/link";

export function Logo({ withText = true, className }: { withText?: boolean; className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className ?? ""}`} aria-label="Jagruti Plastic home">
      <Image src="/images/logo.jpg" alt="Jagruti Plastic logo" width={1100} height={1390} priority className="h-11 w-auto" />
      {withText && (
        <span className="leading-tight">
          <span className="block font-heading text-base font-extrabold tracking-wide text-charcoal">JAGRUTI PLASTIC</span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Est. 1987</span>
        </span>
      )}
    </Link>
  );
}
