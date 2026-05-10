import { Queue } from "bullmq";
import { Router } from "express";
import { z } from "zod";
import { redis } from "../../config/redis.js";
import { validateBody } from "../../shared/middleware/validate.js";

const router = Router();
const aiQueue = new Queue("ai-jobs", { connection: redis });

const menuDescriptionSchema = z.object({ name: z.string().min(2), ingredients: z.array(z.string()).default([]), tone: z.enum(["premium", "friendly", "urdu"]).default("friendly") });
const forecastSchema = z.object({ branchId: z.string(), horizonDays: z.number().int().min(1).max(90).default(14) });

router.post("/tenants/:tenantId/ai/menu-description", validateBody(menuDescriptionSchema), async (req, res) => {
  const job = await aiQueue.add("menu-description", { tenantId: req.params.tenantId, ...req.body });
  res.status(202).json({ jobId: job.id, status: "queued" });
});

router.post("/tenants/:tenantId/ai/forecast", validateBody(forecastSchema), async (req, res) => {
  const job = await aiQueue.add("demand-forecast", { tenantId: req.params.tenantId, ...req.body });
  res.status(202).json({ jobId: job.id, status: "queued" });
});

export { router as aiRouter };
