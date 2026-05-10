import { Router } from "express";
import { MenuService } from "./menu.service.js";

const router = Router();
const service = new MenuService();

router.get("/public/:tenantSlug/:tableCode/menu", async (req, res, next) => {
  try {
    const menu = await service.getPublicMenu(req.params.tenantSlug, req.params.tableCode);
    res.json(menu);
  } catch (error) {
    next(error);
  }
});

export { router as menuRouter };
