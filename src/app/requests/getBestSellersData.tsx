import bestSellersData from "@/data/best-sellers.json";
import { Product } from "../products/page";

const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL;

export async function getBestSellerData(): Promise<Product[]> {
  if (isBuildTime) {
    return bestSellersData;
  }

  const res = await fetch(`${BASE_URL}/api/products/best`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch best sellers data");
  }
  return res.json();
}
