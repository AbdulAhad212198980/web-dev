import type { OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma.js";

export class OrderRepository {
  create(data: Prisma.OrderCreateInput) {
    return prisma.order.create({ data, include: { items: true, table: true } });
  }

  findByCode(code: string) {
    return prisma.order.findUnique({ where: { code }, include: { items: { include: { modifiers: true } }, payment: true } });
  }

  async updateStatus(tenantId: string, orderId: string, status: OrderStatus) {
    await prisma.order.updateMany({ where: { id: orderId, tenantId }, data: { status } });
    const order = await prisma.order.findFirstOrThrow({ where: { id: orderId, tenantId }, include: { items: true } });
    return order;
  }
}
