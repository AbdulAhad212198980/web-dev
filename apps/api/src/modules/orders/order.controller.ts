import { createOrderSchema, updateOrderStatusSchema } from "@scan-to-order/shared";
import { Router } from "express";
import { validateBody } from "../../shared/middleware/validate.js";
import { OrderService } from "./order.service.js";

const router = Router();
const service = new OrderService();

router.post("/public/:tenantSlug/:tableCode/orders", validateBody(createOrderSchema), async (req, res, next) => {
  try {
    const order = await service.createCustomerOrder(req.body, req.header("idempotency-key"));
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.get("/public/orders/:orderCode", async (req, res, next) => {
  try {
    const order = await service.getOrder(req.params.orderCode);
    if (!order) return res.status(404).json({ error: "ORDER_NOT_FOUND" });
    return res.json(order);
  } catch (error) {
    return next(error);
  }
});

router.patch(
  "/tenants/:tenantId/orders/:orderId/status",
  validateBody(updateOrderStatusSchema),
  async (req, res, next) => {
    try {
      const order = await service.updateStatus(req.params.tenantId, req.params.orderId, req.body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
);

export { router as orderRouter };
