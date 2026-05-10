import { z } from "zod";

export const orderTypeSchema = z.enum(["DINE_IN", "TAKEAWAY", "DELIVERY"]);
export const orderStatusSchema = z.enum([
  "PLACED",
  "ACCEPTED",
  "PREPARING",
  "READY",
  "SERVED",
  "COMPLETED",
  "CANCELLED",
]);

export const moneySchema = z.object({
  amount: z.number().int().nonnegative(),
  currency: z.string().length(3).default("PKR"),
});

export const cartModifierSchema = z.object({
  optionId: z.string().cuid().or(z.string().uuid()).or(z.string().min(1)),
  quantity: z.number().int().min(1).default(1),
});

export const cartItemSchema = z.object({
  menuItemId: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
  notes: z.string().max(240).optional(),
  modifiers: z.array(cartModifierSchema).default([]),
});

export const createOrderSchema = z.object({
  tableSessionToken: z.string().min(12),
  orderType: orderTypeSchema.default("DINE_IN"),
  customerName: z.string().min(1).max(80).optional(),
  customerPhone: z.string().min(7).max(20).optional(),
  couponCode: z.string().max(40).optional(),
  items: z.array(cartItemSchema).min(1).max(60),
  locale: z.enum(["en", "ur"]).default("en"),
});

export const updateOrderStatusSchema = z.object({
  status: orderStatusSchema,
  reason: z.string().max(240).optional(),
});

export const menuItemSchema = z.object({
  name: z.string().min(2).max(120),
  nameUrdu: z.string().max(120).optional(),
  description: z.string().max(500).optional(),
  categoryId: z.string().min(1),
  price: z.number().int().nonnegative(),
  imageUrl: z.string().url().optional(),
  isAvailable: z.boolean().default(true),
  preparationMinutes: z.number().int().min(1).max(180).default(15),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type MenuItemInput = z.infer<typeof menuItemSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export type PublicMenuItem = {
  id: string;
  name: string;
  nameUrdu?: string;
  description: string;
  price: number;
  imageUrl?: string;
  isPopular?: boolean;
  preparationMinutes: number;
};

export type PublicMenuCategory = {
  id: string;
  name: string;
  nameUrdu?: string;
  items: PublicMenuItem[];
};

export type PublicMenuResponse = {
  tenant: { id: string; name: string; slug: string; brandColor: string };
  branch: { id: string; name: string; currency: string };
  table: { id: string; code: string; label: string };
  tableSessionToken: string;
  categories: PublicMenuCategory[];
};
