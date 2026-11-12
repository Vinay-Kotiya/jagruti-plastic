"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/input";
import {
  enquiryFormSchema,
  type EnquiryFormValues,
} from "@/lib/validations/enquiry";
import { enquiryMessage, waLink } from "@/lib/whatsapp";
import { FaWhatsapp } from "react-icons/fa";

export type EnquiryProductOption = {
  slug: string;
  name: string;
  qualities: string[];
  sizes: string[];
};

export function EnquiryForm({
  products,
  defaultSlug,
  whatsappNumber,
}: {
  products: EnquiryProductOption[];
  defaultSlug?: string;
  whatsappNumber: string;
}) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      customerName: "",
      companyName: "",
      phone: "",
      email: "",
      productSlug: defaultSlug ?? "",
      quality: "",
      specification: "",
      quantityKg: "",
      message: "",
      website: "",
    },
  });
  const v = watch();
  const selected = products.find((p) => p.slug === v.productSlug);

  async function onSubmit(values: EnquiryFormValues) {
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok)
        throw new Error(json?.error?.message ?? "Could not send your enquiry");
      setDone(true);
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : "Could not send your enquiry. Please call or WhatsApp us.",
      );
    }
  }

  if (done) {
    return (
      <div
        role="status"
        className="rounded-md border border-border bg-white p-8 text-center"
      >
        <CheckCircle2
          className="mx-auto h-12 w-12 text-green-600"
          aria-hidden
        />
        <h3 className="mt-4 text-2xl">Enquiry received</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you. Our team will contact you on the phone number you provided.
          For urgent requirements, please call us directly.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            reset();
            setDone(false);
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const wa = waLink(
    whatsappNumber,
    enquiryMessage({
      product: selected?.name,
      quality: v.quality,
      spec: v.specification,
      qty: v.quantityKg,
      name: v.customerName,
    }),
  );
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-md border border-border bg-white p-6 md:p-8"
      aria-label="Quotation enquiry"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name *"
          htmlFor="customerName"
          error={errors.customerName?.message}
        >
          <Input
            id="customerName"
            autoComplete="name"
            aria-invalid={!!errors.customerName}
            {...register("customerName")}
          />
        </Field>
        <Field
          label="Company (optional)"
          htmlFor="companyName"
          error={errors.companyName?.message}
        >
          <Input
            id="companyName"
            autoComplete="organization"
            {...register("companyName")}
          />
        </Field>
        <Field
          label="Phone number *"
          htmlFor="phone"
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
        <Field
          label="Email (optional)"
          htmlFor="email"
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field
          label="Product *"
          htmlFor="productSlug"
          error={errors.productSlug?.message}
        >
          <NativeSelect
            id="productSlug"
            aria-invalid={!!errors.productSlug}
            {...register("productSlug")}
          >
            <option value="">Select a product</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field
          label="Quality"
          htmlFor="quality"
          error={errors.quality?.message}
        >
          <NativeSelect
            id="quality"
            disabled={!selected?.qualities.length}
            {...register("quality")}
          >
            <option value="">
              {selected?.qualities.length ? "Select quality" : "Not applicable"}
            </option>
            {selected?.qualities.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </NativeSelect>
        </Field>
        <Field
          label="Size / specification"
          htmlFor="specification"
          error={errors.specification?.message}
        >
          <Input
            id="specification"
            list="size-options"
            placeholder="e.g. 1 inch, 100 GSM"
            {...register("specification")}
          />
          <datalist id="size-options">
            {selected?.sizes.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </Field>
        <Field
          label="Required quantity (KG)"
          htmlFor="quantityKg"
          error={errors.quantityKg?.message}
        >
          <Input
            id="quantityKg"
            inputMode="numeric"
            aria-invalid={!!errors.quantityKg}
            {...register("quantityKg")}
          />
        </Field>
      </div>
      <Field label="Message" htmlFor="message" error={errors.message?.message}>
        <Textarea id="message" {...register("message")} />
      </Field>
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="sm:flex-1"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Request a Quotation"
          )}
        </Button>
        <Button asChild type="button" size="lg" variant="outline">
          <a href={wa} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="h-4 w-4" aria-hidden />
            Send on WhatsApp
          </a>
        </Button>
      </div>
    </form>
  );
}
