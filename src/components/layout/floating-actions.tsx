"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { enquiryMessage, waLink } from "@/lib/whatsapp";
import { FaWhatsapp } from "react-icons/fa";

export function FloatingActions({
  whatsappNumber,
}: {
  whatsappNumber: string;
}) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-3">
      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-charcoal shadow-md hover:text-brand-red"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <a
        href={waLink(whatsappNumber, enquiryMessage({}))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:brightness-95"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
}
