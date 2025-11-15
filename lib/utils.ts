import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const noLayoutRoutes = [
  "/",
  "/login",
  "/forgot-password",
  "/reset-password",
];


export const isValidNigerianNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, "") // remove non-digits
  return /^(?:\+?234|0)[789][01]\d{8}$/.test(cleaned)
}

export   const formatMoney = (value: string) => {
const numericValue = value.replace(/[^0-9]/g, "");
  if (!numericValue) return "";
    return Number(numericValue).toLocaleString("en-NG");
};
    
export const parseNumber = (value: string) => {
  return Number.parseFloat(value.replace(/,/g, "")) || 0;
}

export const formatAmount = (amount: number | undefined, currency: string = "₦") => {
  if (typeof amount !== "number") return "0";

  const isNegative = amount < 0;

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${currency}${formatted}`;
};