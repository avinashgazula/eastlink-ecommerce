"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Cart } from "./Cart";
import { ItemSearch } from "./ItemSearch";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


  //use to open & CLosing the hamburger menu for small screens
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-4 left-1 right-1 z-50 mx-4 md:mx-6 lg:mx-8">
      <div
        className="max-w-9xl mx-auto flex h-12 items-center justify-between
                   px-6 md:px-8 lg:px-10 bg-background/95 backdrop-blur-xl
                   border border-border/50 rounded-2xl shadow-sm relative"
      >

        <div className="flex items-center gap-1">
          {/*hamburger menu for Mobile - hidden for md+*/}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-sm btn-ghost gap-2 transition-all duration-200 -ml-2 md:hidden"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="text-sm font-medium tracking-wide">
              {isMenuOpen ? "Close" : "Menu"}
            </span>
          </button>

          {/*nav buttons for md+ screens - hidden for sm*/}
          <nav className="hidden md:flex items-center gap-1 -ml-2">
            <Link href="/" className="header-btn">
              Home
            </Link>
            <Link href="/products" scroll={false} className="header-btn">
              Products
            </Link>
          </nav>
        </div>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70 hover:scale-110 px-1"
        >
          <Image
            src="/eastlink.svg"
            width={100}
            height={50}
            alt="Eastlink logo"
            priority
          />
        </Link>


        <div className="flex items-center gap-1 max-sm:gap-0 -mr-2">
          <ItemSearch />
          <Cart />
        </div>

       {/*menu dropdown for mobile - hidden for md+*/}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 mt-2 w-full rounded-2xl border border-border
                       bg-background/95 backdrop-blur-xl shadow-lg md:hidden z-50 animate-fade-in"
          >
            <nav className="flex flex-col divide-y divide-border">
              <Link
                href="/"
                className="px-6 py-3 hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                scroll={false}
                className="px-6 py-3 hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
