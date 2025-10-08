import { BestSellers } from "@/components/home/BestSellers";
import { FeaturedCollection, FeaturedCollectionInfo } from "@/components/home/FeaturedCollection";
import { IntroContent } from "@/components/home/IntroContent";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/main/Footer";
import { Header } from "@/components/main/Header";
import { HeroSection, HeroSlide } from "@/components/main/Hero";
import { Toaster } from "sonner";
import { Product } from "./products/page";

async function getHeroData(): Promise<HeroSlide[]> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hero`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch hero data");
  }
  return res.json();
}

async function getFeaturedCollectionData(): Promise<FeaturedCollectionInfo> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/featured`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch featured collection data");
  }
  return res.json();
}

async function getBestSellerDatas(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/best`, {
      cache: "force-cache"
    });
    if (!res.ok) {
    throw new Error("Failed to fetch best sellers data");
  }
  return res.json();
}

export default async function Home() {
  const [heroSlides, featuredCollectionInfo, bestSellers] = await Promise.all([
    getHeroData(),
    getFeaturedCollectionData(),
    getBestSellerDatas()
  ]);

  return (
    <main>
      <Header />
      <section className="-mt-4">
        <HeroSection slides={heroSlides} />
        <IntroContent />
        <FeaturedCollection featuredCollectionInfo={featuredCollectionInfo} />
        <BestSellers bestSellers={bestSellers} />
        <Newsletter />
      </section>
      <Toaster />
      <Footer />
    </main>
  );
}
