import { Skeleton } from "@/components/ui/card";

export default function Loading() {
  return <div className="space-y-4"><Skeleton className="h-8 w-56" /><Skeleton className="h-32 w-full" /><Skeleton className="h-64 w-full" /></div>;
}
