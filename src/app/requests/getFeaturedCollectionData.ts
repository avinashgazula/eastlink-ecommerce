
import { FeaturedCollectionInfo } from "@/components/home/FeaturedCollection";
import featuredData from "@/data/featured-collection.json";

const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL


export async function getFeaturedCollectionData(): Promise<FeaturedCollectionInfo> {

    if (isBuildTime) {
    return featuredData;
  }

  const res = await fetch(`${BASE_URL}/api/featured`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch featured collection data");
  }
  return res.json();
}
