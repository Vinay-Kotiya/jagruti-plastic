import Image from "next/image";
import { ImagePlaceholder } from "@/components/common/image-placeholder";
import { cn } from "@/lib/utils";
import type { ProductView } from "@/services/product.service";

export function ProductMedia({
  product,
  className,
  priority,
}: {
  product: Pick<ProductView, "name" | "images">;
  className?: string;
  priority?: boolean;
}) {
  console.log("Product in Product Media:", product);
  const img = product.images[0];
  if (!img)
    return (
      <ImagePlaceholder
        label={`${product.name} photograph`}
        className={className}
      />
    );
  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden bg-surface",
        className,
      )}
    >
      <Image
        src={img.url}
        alt={img.alt || product.name}
        fill
        priority={priority}
        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
