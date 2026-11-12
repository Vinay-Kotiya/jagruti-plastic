import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">404</p>
      <h1 className="text-4xl">Page not found</h1>
      <p className="text-muted-foreground">The page you are looking for does not exist or has moved.</p>
      <Button asChild><Link href="/">Back to home</Link></Button>
    </div>
  );
}
