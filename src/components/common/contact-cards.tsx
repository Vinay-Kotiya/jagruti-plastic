import { Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { SiteInfo } from "@/services/company.service";

export function LocationCards({ s }: { s: SiteInfo }) {
  const items = [{ title: "Factory", address: s.factoryAddress }, { title: "Godown", address: s.godownAddress }];
  return (
    <div className="space-y-4">
      {items.map((i) => (
        <Card key={i.title} className="p-5">
          <h3 className="flex items-center gap-2 text-lg"><MapPin className="h-5 w-5 text-brand-red" aria-hidden />{i.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{i.address}</p>
          {/* TODO: replace with a verified Google Maps embed URL once the client shares it */}
          <div className="mt-4 flex h-32 items-center justify-center border border-dashed border-brand-gold/60 bg-surface text-xs font-medium text-muted-foreground">Google Maps embed placeholder</div>
        </Card>
      ))}
    </div>
  );
}

export function ContactLines({ s }: { s: SiteInfo }) {
  const a = "flex items-center gap-3 text-charcoal hover:text-brand-red";
  return (
    <div className="space-y-3 text-sm">
      {s.phones.map((p) => <a key={p} href={`tel:+91${p}`} className={a}><Phone className="h-4 w-4 text-brand-red" aria-hidden />{p}</a>)}
      <a href={`mailto:${s.email}`} className={`${a} break-all`}><Mail className="h-4 w-4 shrink-0 text-brand-red" aria-hidden />{s.email}</a>
    </div>
  );
}
