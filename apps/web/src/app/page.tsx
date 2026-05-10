import Link from "next/link";
import { ArrowRight, Bot, Globe2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Zap, title: "QR ordering", text: "Instant mobile menu, cart, order tracking, and table-aware sessions." },
  { icon: Bot, title: "AI operations", text: "Forecast demand, generate menu copy, summarize analytics, and upsell smartly." },
  { icon: ShieldCheck, title: "SaaS controls", text: "Multi-tenant RBAC, audit logs, subscriptions, branches, and franchise support." },
  { icon: Globe2, title: "Pakistan-ready", text: "PKR pricing, Urdu support, JazzCash/Easypaisa-ready payment adapters." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6">
        <nav className="flex items-center justify-between"><strong>ScanOrder AI</strong><Button asChild variant="secondary"><Link href="/dashboard">Dashboard</Link></Button></nav>
        <div className="grid flex-1 place-items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <p className="text-teal-300">Premium QR ordering SaaS</p>
            <h1 className="mt-4 text-6xl font-bold tracking-tight">AI-powered scan-to-order for restaurants, cafes, and cafeterias.</h1>
            <p className="mt-6 text-lg text-white/65">A production-grade portfolio and startup foundation with realtime ordering, PWA performance, multi-tenant architecture, payments, and AI analytics.</p>
            <div className="mt-8 flex gap-3"><Button asChild size="lg"><Link href="/r/demo/table-1">Try QR menu <ArrowRight className="ml-2 h-5 w-5" /></Link></Button><Button asChild size="lg" variant="secondary"><Link href="/dashboard">View dashboard</Link></Button></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => <div key={feature.title} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"><feature.icon className="h-7 w-7 text-teal-300" /><h2 className="mt-5 font-bold">{feature.title}</h2><p className="mt-2 text-sm text-white/60">{feature.text}</p></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
