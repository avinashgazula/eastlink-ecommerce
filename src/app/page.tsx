import { BestSellers } from "@/components/home/BestSellers";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { IntroContent } from "@/components/home/IntroContent";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/main/Footer";
import { Header } from "@/components/main/Header";
import { HeroSection } from "@/components/main/Hero";
import { Toaster } from "sonner";
import { getBestSellerData } from "./requests/getBestSellersData";
import { getFeaturedCollectionData } from "./requests/getFeaturedCollectionData";
import { getHeroData } from "./requests/getHeroData";

export default async function Home() {
  const [heroSlides, featuredCollectionInfo, bestSellers] = await Promise.all([
    getHeroData(),
    getFeaturedCollectionData(),
    getBestSellerData()
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
