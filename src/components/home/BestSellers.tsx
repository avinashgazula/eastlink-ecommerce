"use client"


import { Product } from "@/app/products/page";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Card } from "../products/Card";

interface BestSellersProps {
  bestSellers: Product[];
}

export function BestSellers({bestSellers} : Readonly<BestSellersProps>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)


  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-4 px-4 md:px-6 lg:px-8">
      <h2 className="text-center text-md font-medium tracking-wider text-muted-foreground mb-4">BEST SELLERS</h2>
      <div className="max-w-9xl mx-auto">

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {bestSellers.map((product) => (
            <div key={product.id} className="flex-none w-[300px] md:w-[350px] snap-start">
              <Card {...product} />
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-end">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-background border border-border hover:bg-muted transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-background border border-border hover:bg-muted transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
      </div>
    </section>
  )
}
