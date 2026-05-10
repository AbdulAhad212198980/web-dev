import { prisma } from "../../config/prisma.js";

export class MenuRepository {
  async getPublicMenu(tenantId: string) {
    return prisma.menuCategory.findMany({
      where: { tenantId, isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        items: {
          where: { isAvailable: true },
          orderBy: [{ isPopular: "desc" }, { name: "asc" }],
        },
      },
    });
  }

  async findItemsForOrder(tenantId: string, itemIds: string[]) {
    return prisma.menuItem.findMany({
      where: { tenantId, id: { in: itemIds }, isAvailable: true },
      include: { modifierGroups: { include: { options: true } } },
    });
  }
}
