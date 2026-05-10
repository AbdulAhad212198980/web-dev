import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatMoney = (amount: number, currency = "PKR") =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount / 100);
