import type { PublicMenuResponse } from "@scan-to-order/shared";
import { redis } from "../../config/redis.js";
import { TenantRepository } from "../tenancy/tenant.repository.js";
import { MenuRepository } from "./menu.repository.js";

export class MenuService {
  constructor(
    private readonly tenants = new TenantRepository(),
    private readonly menus = new MenuRepository(),
  ) {}

  async getPublicMenu(tenantSlug: string, tableCode: string): Promise<PublicMenuResponse> {
    const cacheKey = `public-menu:${tenantSlug}:${tableCode}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached) as PublicMenuResponse;

    const tenant = await this.tenants.findPublicTableContext(tenantSlug, tableCode);
    const branch = tenant?.branches[0];
    const table = branch?.tables[0];

    if (!tenant || !branch || !table) {
      throw Object.assign(new Error("QR context not found"), { statusCode: 404 });
    }

    const categories = await this.menus.getPublicMenu(tenant.id);
    const response: PublicMenuResponse = {
      tenant: { id: tenant.id, name: tenant.name, slug: tenant.slug, brandColor: tenant.brandColor },
      branch: { id: branch.id, name: branch.name, currency: branch.currency },
      table: { id: table.id, code: table.code, label: table.label },
      tableSessionToken: Buffer.from(`${tenant.id}.${branch.id}.${table.id}.${Date.now()}`).toString("base64url"),
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
        nameUrdu: category.nameUrdu ?? undefined,
        items: category.items.map((item) => ({
          id: item.id,
          name: item.name,
          nameUrdu: item.nameUrdu ?? undefined,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl ?? undefined,
          isPopular: item.isPopular,
          preparationMinutes: item.preparationMinutes,
        })),
      })),
    };

    await redis.set(cacheKey, JSON.stringify(response), "EX", 60);
    return response;
  }
}
