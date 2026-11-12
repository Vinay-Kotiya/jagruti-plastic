"use client";
import * as AD from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";

export function ConfirmDialog({ trigger, title, description, confirmLabel = "Delete", onConfirm }: {
  trigger: React.ReactNode; title: string; description: string; confirmLabel?: string; onConfirm: () => void | Promise<void>;
}) {
  return (
    <AD.Root>
      <AD.Trigger asChild>{trigger}</AD.Trigger>
      <AD.Portal>
        <AD.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <AD.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-xl">
          <AD.Title className="font-heading text-lg font-bold text-charcoal">{title}</AD.Title>
          <AD.Description className="mt-2 text-sm text-muted-foreground">{description}</AD.Description>
          <div className="mt-6 flex justify-end gap-3">
            <AD.Cancel asChild><Button variant="outline">Cancel</Button></AD.Cancel>
            <AD.Action asChild><Button variant="destructive" onClick={() => void onConfirm()}>{confirmLabel}</Button></AD.Action>
          </div>
        </AD.Content>
      </AD.Portal>
    </AD.Root>
  );
}
