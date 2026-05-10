import type { ErrorRequestHandler } from "express";
import { logger } from "../../config/logger.js";

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  logger.error({ error, requestId: req.tenantContext?.requestId }, "Unhandled API error");
  res.status(500).json({ error: "INTERNAL_SERVER_ERROR", requestId: req.tenantContext?.requestId });
};
