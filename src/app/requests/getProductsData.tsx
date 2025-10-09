import productsData from "@/data/products.json";

const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL;

export async function getProductsData() {
  if (isBuildTime) {
    return productsData;
  }

  const res = await fetch(`${BASE_URL}/api/products`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured collection data");
  }

  return res.json();
}
