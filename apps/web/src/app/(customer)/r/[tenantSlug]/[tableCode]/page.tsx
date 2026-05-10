import { CustomerMenu } from "@/components/customer/customer-menu";
import { api } from "@/lib/api";

export default async function QRMenuPage({ params }: { params: Promise<{ tenantSlug: string; tableCode: string }> }) {
  const { tenantSlug, tableCode } = await params;
  const menu = await api.getPublicMenu(tenantSlug, tableCode);
  return <CustomerMenu menu={menu} />;
}
