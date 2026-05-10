import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { env } from "../../config/env.js";

export class RealtimeGateway {
  private io?: Server;

  attach(server: HttpServer) {
    this.io = new Server(server, {
      cors: { origin: env.WEB_ORIGIN, credentials: true },
      transports: ["websocket", "polling"],
    });

    this.io.on("connection", (socket) => {
      socket.on("tenant:join", ({ tenantId, branchId }: { tenantId: string; branchId?: string }) => {
        socket.join(branchId ? `tenant:${tenantId}:branch:${branchId}:orders` : `tenant:${tenantId}`);
      });

      socket.on("order:join", ({ orderId }: { orderId: string }) => {
        socket.join(`order:${orderId}`);
      });
    });
  }

  emitOrderUpdate(order: { id: string; tenantId: string; branchId: string; status: string }) {
    this.io?.to(`tenant:${order.tenantId}:branch:${order.branchId}:orders`).emit("order.updated", order);
    this.io?.to(`order:${order.id}`).emit("order.updated", order);
  }
}

export const realtimeGateway = new RealtimeGateway();
