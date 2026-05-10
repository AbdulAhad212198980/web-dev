import type { ReactNode } from "react";
import "@/app/globals.css";
import { ServiceWorkerRegister } from "./service-worker-register";

export const metadata = {
  title: "ScanOrder AI",
  description: "AI-powered scan-to-order SaaS for Pakistan restaurants and cafeterias.",
  manifest: "/manifest.webmanifest",
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased"><ServiceWorkerRegister />{children}</body>
    </html>
  );
}
