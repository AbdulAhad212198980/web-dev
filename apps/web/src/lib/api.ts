import type { CreateOrderInput, PublicMenuResponse } from "@scan-to-order/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const api = {
  async getPublicMenu(tenantSlug: string, tableCode: string): Promise<PublicMenuResponse> {
    const response = await fetch(`${API_URL}/v1/public/${tenantSlug}/${tableCode}/menu`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error("Unable to load menu");
    return response.json();
  },

  async createOrder(tenantSlug: string, tableCode: string, input: CreateOrderInput) {
    const response = await fetch(`${API_URL}/v1/public/${tenantSlug}/${tableCode}/orders`, {
      method: "POST",
      headers: { "content-type": "application/json", "idempotency-key": crypto.randomUUID() },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error("Unable to place order");
    return response.json();
  },
};
