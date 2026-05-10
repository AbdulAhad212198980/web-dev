import type { CreateOrderInput, UpdateOrderStatusInput } from "@scan-to-order/shared";
import { MenuRepository } from "../menu/menu.repository.js";
import { realtimeGateway } from "../realtime/realtime.gateway.js";
import { OrderRepository } from "./order.repository.js";

const decodeTableSession = (token: string) => {
  const [tenantId, branchId, tableId] = Buffer.from(token, "base64url").toString("utf8").split(".");
  if (!tenantId || !branchId || !tableId) throw Object.assign(new Error("Invalid table session"), { statusCode: 401 });
  return { tenantId, branchId, tableId };
};

export class OrderService {
  constructor(
    private readonly orders = new OrderRepository(),
    private readonly menus = new MenuRepository(),
  ) {}

  async createCustomerOrder(input: CreateOrderInput, idempotencyKey: string | undefined) {
    if (!idempotencyKey) throw Object.assign(new Error("Missing idempotency key"), { statusCode: 400 });

    const context = decodeTableSession(input.tableSessionToken);
    const menuItems = await this.menus.findItemsForOrder(context.tenantId, input.items.map((item) => item.menuItemId));
    const menuMap = new Map(menuItems.map((item) => [item.id, item]));

    const lines = input.items.map((item) => {
      const menuItem = menuMap.get(item.menuItemId);
      if (!menuItem) throw Object.assign(new Error("Menu item unavailable"), { statusCode: 409 });
      return {
        menuItem,
        quantity: item.quantity,
        notes: item.notes,
        lineTotal: menuItem.price * item.quantity,
      };
    });

    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const order = await this.orders.create({
      tenant: { connect: { id: context.tenantId } },
      branch: { connect: { id: context.branchId } },
      table: { connect: { id: context.tableId } },
      code: `PK-${Date.now().toString(36).toUpperCase()}`,
      type: input.orderType,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      subtotal,
      total: subtotal,
      items: {
        create: lines.map((line) => ({
          menuItem: { connect: { id: line.menuItem.id } },
          name: line.menuItem.name,
          unitPrice: line.menuItem.price,
          quantity: line.quantity,
          notes: line.notes,
        })),
      },
    });

    realtimeGateway.emitOrderUpdate(order);
    return order;
  }

  getOrder(code: string) {
    return this.orders.findByCode(code);
  }

  async updateStatus(tenantId: string, orderId: string, input: UpdateOrderStatusInput) {
    const order = await this.orders.updateStatus(tenantId, orderId, input.status);
    realtimeGateway.emitOrderUpdate(order);
    return order;
  }
}
