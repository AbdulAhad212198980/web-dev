import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { aiRouter } from "./modules/ai/ai.controller.js";
import { menuRouter } from "./modules/menu/menu.controller.js";
import { orderRouter } from "./modules/orders/order.controller.js";
import { paymentRouter } from "./modules/payments/payment.controller.js";
import { errorHandler } from "./shared/middleware/error-handler.js";
import { tenantContext } from "./shared/middleware/tenant-context.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
  app.use(compression());
  app.use(express.json({ limit: "1mb" }));
  app.use(pinoHttp({ logger }));
  app.use(rateLimit({ windowMs: 60_000, limit: 240, standardHeaders: true, legacyHeaders: false }));
  app.use(tenantContext);

  app.get("/health", (_req, res) => res.json({ ok: true, service: "scan-to-order-api" }));
  app.use("/v1", menuRouter, orderRouter, aiRouter, paymentRouter);
  app.use(errorHandler);

  return app;
};
