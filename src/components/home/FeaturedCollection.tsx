import Image from "next/image";
import Link from "next/link";

export interface FeaturedCollectionInfo {
  type: string;
  name: string;
  mainImg: string;
  mainImgAlt: string;
  wideImg1: string;
  wideImg1Alt: string
  wideImg2: string;
  wideImg2Alt: string
  sqImg1: string;
  sqImg1Alt: string;
  sqImg2: string;
  sqImg2Alt: string;
}

interface FeaturedCollectionProps {
  featuredCollectionInfo: FeaturedCollectionInfo;
}

export function FeaturedCollection({ featuredCollectionInfo }: Readonly<FeaturedCollectionProps>) {
  return (
    <section className="px-4 md:px-6 lg:px-8 py-16" aria-labelledby="featured-collection">
      <h2
        id="featured-heading"
        className="text-center text-sm font-medium tracking-wider text-muted-foreground mb-8"
      >
        FEATURED collection
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-6 gap-4 max-w-9xl mx-auto md:max-h-[600px]">

        <article className="relative h-[400px] md:h-[400px] md:col-span-2 md:row-span-4 rounded-3xl overflow-hidden group">

          {/*main image with collection information and cta*/}
          <Image
            fill
            src={featuredCollectionInfo.mainImg}
            alt={featuredCollectionInfo.mainImgAlt}
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-12">
            <p className="text-white/80 text-xs tracking-widest mb-2">
              {featuredCollectionInfo.type.toUpperCase()}
            </p>
            <h3 className="text-white text-4xl md:text-5xl font-serif mb-6 max-w-md">
              {featuredCollectionInfo.name}
            </h3>
            <Link
              href="/products"
              className="btn btn-secondary border-0 bg-white text-black hover:bg-white/70"
            >
              SHOP {featuredCollectionInfo.type.toUpperCase()}
            </Link>
          </div>
        </article>

        {/*top right image*/}
        <Link
          href="/product/1"
          className="relative h-[240px] md:h-auto md:col-span-2 md:row-span-3 rounded-3xl overflow-hidden group"
          aria-label= {featuredCollectionInfo.wideImg1Alt}
        >
          <Image
            src={featuredCollectionInfo.wideImg1}
            alt= {featuredCollectionInfo.wideImg1Alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={80}
          />
        </Link>

        {/* first square image on the right */}
        <Link
          href="/product/2"
          className="relative h-[300px] md:h-auto md:col-span-1 md:row-span-3 rounded-3xl overflow-hidden group"
          aria-label={`View ${featuredCollectionInfo.sqImg1Alt}`}
        >
          <Image
            src={featuredCollectionInfo.sqImg1}
            alt={featuredCollectionInfo.sqImg1Alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
            quality={80}
          />
        </Link>

        {/*second sqaure image on the right*/}
        <Link
          href="/product/3"
          className="relative h-[300px] md:h-auto md:col-span-1 md:row-span-3 rounded-3xl overflow-hidden group"
          aria-label={`View ${featuredCollectionInfo.sqImg2Alt}`}
        >
          <Image
            src={featuredCollectionInfo.sqImg2}
            alt={featuredCollectionInfo.sqImg2Alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
            quality={80}
          />
        </Link>

        {/*wide image below the main image*/}
        <Link
          href="/product/4"
          className="relative h-[200px] md:h-auto md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden group"
          aria-label={`View ${featuredCollectionInfo.wideImg2Alt}`}
        >
          <Image
            src={featuredCollectionInfo.wideImg2}
            alt={featuredCollectionInfo.wideImg2Alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={80}
          />
        </Link>
      </div>
    </section>
  );
}
