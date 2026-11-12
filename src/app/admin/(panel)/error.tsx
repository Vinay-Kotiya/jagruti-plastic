"use client";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-md border border-border bg-white p-8 text-center">
      <h2 className="text-xl">Could not load this page</h2>
      <p className="mt-2 text-sm text-muted-foreground">Check that DATABASE_URL is set, MongoDB Atlas allows your IP, and you have run <code>npm run db:push</code>.</p>
      <Button className="mt-4" onClick={reset}>Try again</Button>
    </div>
  );
}
