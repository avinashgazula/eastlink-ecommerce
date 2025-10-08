"use client";

import Image from "next/image";
import { toast } from "sonner";

export function IntroContent() {
  return (
    <section className="w-full px-4 pb-4 pt-8 md:px-6 lg:px-8 ">
      <div className="max-w-9xl mx-auto">
        <div className="flex flex-col md:flex-row gap-0 rounded-3xl overflow-hidden bg-muted">
          <div className="flex h-64 bg-muted md:h-auto min-h-[400px] md:flex-1">
            <article className="flex flex-col sm:w-[400px] lg:w-[500px] justify-center items-center rounded-sm m-auto p-4">
              <h2 className="text-xs w-[300px] md:w-[300px] lg:w-[500px] md:text-xs lg:text-sm font-serif text-foreground mb-4">
                OUR MISSION IS TO REDEFINE CONNECTION - NOT JUST THROUGH
                TECHNOLOGY, BUT THROUGH STYLE. <br /> <br />
                EASTLINK&apos;S NEW CLOTHING LINE BLENDS MODERN DESIGN WITH
                EVERYDAY COMFORT, INSPIRED BY THE ENERGY AND INDIVIDUALITY OF A
                CONNECTED WORLD.
                <br /> <br />
                ROOTED IN OUR LEGACY OF INNOVATION, WE CRAFT APPAREL THAT IS
                YOUTHFUL, SLEEK, AND BOLD - FOR THOSE WHO LEAD, MOVE, AND
                EXPRESS THEMSELVES FEARLESSLY IN THE MODERN AGE.
              </h2>

              <button
                type="submit"
                className="btn btn-ghost px-8 py-3 bg-accent text-foreground hover:bg-background/90 rounded-lg font-medium"
                onClick={() => toast.error("Not implemented yet")}
              >
                Learn More
              </button>
            </article>
          </div>

          <div className="relative h-64 md:h-auto min-h-[400px] md:flex-1">
            <Image
              src="/intro-2.webp"
              alt="Fashion lifestyle"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
