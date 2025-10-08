"use client";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string;
  name: string;
  collection: string;
  price: number;
  image: string;
  isNew?: boolean;
}

export function Card({
  id,
  name,
  collection,
  price,
  image,
  isNew = false,
}: Readonly<CardProps>) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, collection, price, image });
  };

  return (
    <Link
      href={`/product/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-black/5"
      prefetch
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {isNew && (
          <span className="badge absolute top-5 right-5 bg-accent/95 text-accent-foreground border-0 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm">
            New
          </span>
        )}
      </div>
      <div className="p-6 md:p-7">
        <h3 className="font-serif font-medium text-md md:text-lg  text-balance mb-2 tracking-tight group-hover:text-foreground/80 transition-colors">
          {name}
        </h3>

        <div className="">
          <p className="border-1 px-1 rounded-sm border-black w-fit text-sm text-muted-background mb-4 tracking-wide">
            {collection}
          </p>
        </div>

        <p className="text-lg font-medium tracking-wide">${price.toFixed(2)}</p>

        <button
          onClick={handleAddToCart}
          className="btn w-full focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 focus-visible:text-black"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
