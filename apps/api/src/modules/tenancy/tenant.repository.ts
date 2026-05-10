import { prisma } from "../../config/prisma.js";

export class TenantRepository {
  findPublicTableContext(tenantSlug: string, tableCode: string) {
    return prisma.tenant.findUnique({
      where: { slug: tenantSlug },
      include: {
        branches: {
          include: { tables: { where: { code: tableCode, isActive: true }, take: 1 } },
          take: 1,
        },
      },
    });
  }
}
