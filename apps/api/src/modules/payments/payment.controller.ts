import { Router } from "express";
import { z } from "zod";
import { validateBody } from "../../shared/middleware/validate.js";

const router = Router();
const intentSchema = z.object({ orderId: z.string(), provider: z.enum(["STRIPE", "JAZZCASH", "EASYPAISA", "CASH"]), amount: z.number().int().positive() });

router.post("/tenants/:tenantId/payments/intents", validateBody(intentSchema), async (req, res) => {
  res.status(201).json({
    provider: req.body.provider,
    clientSecret: req.body.provider === "STRIPE" ? "stripe_client_secret_placeholder" : undefined,
    redirectUrl: ["JAZZCASH", "EASYPAISA"].includes(req.body.provider) ? "/payments/mobile-wallet/redirect" : undefined,
    status: "PENDING",
  });
});

export { router as paymentRouter };
