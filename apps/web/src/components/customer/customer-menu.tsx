"use client";

import type { PublicMenuItem, PublicMenuResponse } from "@scan-to-order/shared";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";
import { MenuCard } from "./menu-card";

type CartLine = PublicMenuItem & { quantity: number };

export const CustomerMenu = ({ menu }: { menu: PublicMenuResponse }) => {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);

  const categories = useMemo(() => menu.categories.map((category) => ({
    ...category,
    items: category.items.filter((item) => `${item.name} ${item.nameUrdu ?? ""} ${item.description}`.toLowerCase().includes(query.toLowerCase())),
  })).filter((category) => category.items.length > 0), [menu.categories, query]);

  const addItem = (item: PublicMenuItem) => {
    setCart((current) => {
      const existing = current.find((line) => line.id === item.id);
      if (existing) return current.map((line) => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line);
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const total = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.22),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(251,146,60,0.18),transparent_28%)] px-4 py-5 dark:bg-background">
      <section className="mx-auto max-w-5xl">
        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] p-5 text-white shadow-glow dark:text-foreground">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-teal-100 dark:text-muted">{menu.branch.name} • {menu.table.label}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">{menu.tenant.name}</h1>
            </div>
            <div className="rounded-2xl bg-white/15 p-3"><Sparkles className="h-6 w-6" /></div>
          </div>
          <div className="mt-5 flex items-center rounded-2xl bg-white/15 px-4 py-3 ring-1 ring-white/15">
            <Search className="mr-3 h-5 w-5 text-teal-50" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search biryani, chai, deals..." className="w-full bg-transparent text-sm outline-none placeholder:text-teal-50/80" />
          </div>
        </motion.header>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            {categories.map((category) => (
              <section key={category.id}>
                <div className="mb-3 flex items-baseline justify-between">
                  <h2 className="text-xl font-bold tracking-tight">{category.name}</h2>
                  {category.nameUrdu ? <span className="text-sm text-muted" dir="rtl">{category.nameUrdu}</span> : null}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {category.items.map((item) => <MenuCard key={item.id} item={item} currency={menu.branch.currency} onAdd={addItem} />)}
                </div>
              </section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-5 lg:h-fit">
            <div className="rounded-[2rem] border border-border bg-card p-5 shadow-xl dark:bg-white/[0.05]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Your cart</h2>
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <AnimatePresence initial={false}>
                {cart.length === 0 ? <p className="mt-5 text-sm text-muted">Add items to start an order. Your cart works offline and syncs when internet returns.</p> : null}
                {cart.map((line) => (
                  <motion.div key={line.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="mt-4 flex justify-between gap-3 text-sm">
                    <span>{line.quantity}× {line.name}</span>
                    <strong>{formatMoney(line.price * line.quantity, menu.branch.currency)}</strong>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="mt-6 border-t border-border pt-4">
                <div className="flex justify-between font-bold"><span>Total</span><span>{formatMoney(total, menu.branch.currency)}</span></div>
                <Button className="mt-4 w-full" size="lg" disabled={!cart.length}>Place order</Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};
