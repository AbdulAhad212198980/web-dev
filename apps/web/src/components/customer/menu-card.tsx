"use client";

import type { PublicMenuItem } from "@scan-to-order/shared";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";

export const MenuCard = ({ item, currency, onAdd }: { item: PublicMenuItem; currency: string; onAdd: (item: PublicMenuItem) => void }) => (
  <article className="rounded-3xl border border-border bg-card/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl dark:bg-white/[0.04]">
    <div className="flex gap-4">
      <div className="h-24 w-24 shrink-0 rounded-2xl bg-gradient-to-br from-teal-400/30 to-orange-400/20" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold tracking-tight">{item.name}</h3>
            {item.nameUrdu ? <p className="text-sm text-muted" dir="rtl">{item.nameUrdu}</p> : null}
          </div>
          {item.isPopular ? <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Popular</span> : null}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold">{formatMoney(item.price, currency)}</span>
          <Button size="sm" onClick={() => onAdd(item)} aria-label={`Add ${item.name}`}>
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  </article>
);
