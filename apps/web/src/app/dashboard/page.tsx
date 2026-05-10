import { Activity, ChefHat, Clock, DollarSign, QrCode, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/kpi-card";

const orders = [
  { id: "PK-A91", table: "Table 12", status: "Preparing", total: "Rs 2,450", eta: "11 min" },
  { id: "PK-A92", table: "Counter", status: "Ready", total: "Rs 890", eta: "Now" },
  { id: "PK-A93", table: "Table 4", status: "Accepted", total: "Rs 1,760", eta: "18 min" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.28),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.24),transparent_30%)]" />
      <section className="relative mx-auto max-w-7xl px-5 py-6">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3 font-bold"><QrCode className="h-6 w-6 text-teal-300" /> ScanOrder AI</div>
          <div className="hidden gap-6 text-sm text-white/70 md:flex"><span>Orders</span><span>Menu</span><span>Inventory</span><span>Analytics</span></div>
          <Button variant="secondary">Generate QR</Button>
        </nav>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-sm text-teal-200"><Sparkles className="mr-2 h-4 w-4" /> AI peak-hour prediction: 7:30–9:15 PM</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-bold tracking-tight">Realtime restaurant command center built for Pakistan.</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/65">Manage QR orders, kitchen throughput, inventory, wallet payments, branch analytics, and AI recommendations from one premium SaaS dashboard.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-glow backdrop-blur-xl">
            <h2 className="font-semibold">Live kitchen display</h2>
            <div className="mt-4 space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-2xl bg-black/25 p-4 ring-1 ring-white/10">
                  <div><p className="font-semibold">{order.id} • {order.table}</p><p className="text-sm text-white/55">{order.status} • ETA {order.eta}</p></div>
                  <strong>{order.total}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Today's revenue" value="Rs 184k" trend="+18% vs last Sunday" icon={<DollarSign className="h-5 w-5" />} />
          <KpiCard label="Active orders" value="42" trend="9 waiting for kitchen" icon={<Activity className="h-5 w-5" />} />
          <KpiCard label="Avg prep time" value="13m" trend="2m faster than peak" icon={<Clock className="h-5 w-5" />} />
          <KpiCard label="Top item" value="Zinger" trend="AI suggests bundle upsell" icon={<ChefHat className="h-5 w-5" />} />
        </div>
      </section>
    </main>
  );
}
