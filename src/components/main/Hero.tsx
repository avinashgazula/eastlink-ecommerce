"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface HeroSlide {
  image: string;
  badge: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta?: string;
}

interface HeroSectionProps {
  slides: HeroSlide[];
}

export function HeroSection({ slides }: Readonly<HeroSectionProps>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slideId = entry.target.id;
          const slideIndex = parseInt(slideId.replace("slide", ""));
          setCurrentSlide(slideIndex);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    slides.forEach((_, index) => {
      const element = document.getElementById(`slide${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [slides]);

  const goToSlide = (index: number) => {
    const slideElement = document.getElementById(`slide${index}`);
    if (slideElement) {
      slideElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  };

  return (
    <section
      className={`relative w-full transition-all duration-500 ${
        isScrolled ? "pt-24 px-4 md:px-6 lg:px-8" : "pt-0"
      }`}
      aria-label="Hero carousel"
      style={{ minHeight: '70vh' }}
    >
      <div className="relative w-full">
        {/* Carousel with CTA*/}
        <section
          className={`carousel w-full h-[70vh] md:h-[80vh] lg:h-[90vh] ${
            isScrolled ? "max-w-9xl mx-auto rounded-b-3xl" : ""
          } transition-all duration-500 overflow-hidden`}
          aria-label="Hero Carousel"
          aria-roledescription="carousel"
        >
          {slides.map((slide, index) => (
            <section
              key={` ${slide.title} - ${index}`}
              id={`slide${index}`}
              className="carousel-item relative w-full h-full"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                quality={85}
                className="object-cover"
                onLoad={() => {
                  if (index === 0) setImagesLoaded(true);
                }}
              />

              {index === 0 && !imagesLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" aria-hidden="true" />

              <div className="absolute inset-0 flex items-center justify-start px-12 md:px-16 lg:px-20">
                <div className="max-w-2xl space-y-6 md:space-y-8">
                  <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-white/80">
                    {slide.badge}
                  </p>

                  <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-[1.05] tracking-tight text-white">
                    {slide.title}
                  </h1>

                  <p className="text-md md:text-lg lg:text-xl font-light leading-relaxed text-white/90 max-w-xl">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Link
                      href="/products"
                      className="btn btn-primary btn-lg border-none rounded-2xl px-10 py-6 bg-white hover:bg-white/90 text-black text-base font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      {slide.primaryCta}
                    </Link>
                    {slide.secondaryCta && (
                      <button
                        onClick={() => {
                          toast.error("This page is under construction.");
                        }}
                        className="btn btn-lg btn-outline rounded-full px-10 py-6 text-base font-medium tracking-wide bg-transparent border-2 border-white/40 hover:border-white/60 hover:bg-white/10 text-white transition-all duration-300"
                      >
                        {slide.secondaryCta}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </section>

        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute flex justify-between items-center h-full left-5 right-5">
            <button
              onClick={prevSlide}
              className="btn btn-circle border-2 border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:border-white/50 text-white pointer-events-auto"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="btn btn-circle border-2 border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:border-white/50 text-white pointer-events-auto"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
