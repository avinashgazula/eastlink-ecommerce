import heroData from "@/data/hero.json";

const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL;

export async function getHeroData() {
  if (isBuildTime) {
    return heroData;
  }

  const res = await fetch(`${BASE_URL}/api/hero`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured collection data");
  }
  return res.json();
}
