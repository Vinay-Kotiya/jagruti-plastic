import { cn } from "@/lib/utils";

export const Container = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) =>
  <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...p} />;

export function Section({ tone = "white", className, children, id }: { tone?: "white" | "muted"; className?: string; children: React.ReactNode; id?: string }) {
  return <section id={id} className={cn("py-16 md:py-24", tone === "muted" && "bg-surface", className)}><Container>{children}</Container></section>;
}

export function SectionHeading({ eyebrow, title, text, center }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={cn("mb-10 max-w-2xl md:mb-14", center && "mx-auto text-center")}>
      {eyebrow && <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
        <span className="h-px w-8 bg-brand-gold" aria-hidden />{eyebrow}</p>}
      <h2 className="text-3xl leading-tight md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="border-b border-border bg-surface">
      <Container className="py-14 md:py-20">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{text}</p>}
      </Container>
    </div>
  );
}
