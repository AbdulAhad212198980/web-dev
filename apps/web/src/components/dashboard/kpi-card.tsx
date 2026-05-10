import type { ReactNode } from "react";

export const KpiCard = ({ label, value, trend, icon }: { label: string; value: string; trend: string; icon: ReactNode }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
    <div className="flex items-center justify-between text-muted">
      <span className="text-sm">{label}</span>
      {icon}
    </div>
    <p className="mt-4 text-3xl font-bold tracking-tight text-white">{value}</p>
    <p className="mt-2 text-sm text-teal-300">{trend}</p>
  </div>
);
