"use client"

import { Product } from "@/app/products/page"
import { getProductsData } from "@/app/requests/getProductsData"
import { Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function ItemSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function searchProducts() {
      try {
      const products = await getProductsData()
      if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const filtered = products
        .filter(
          (product: Product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
        )
        .slice(0, 3)
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
    } catch (error) {
      console.error("Failed to load products:", error);
    }
    }
    searchProducts()

  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setSearchQuery("")
        setSearchResults([])
      }
    }
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchOpen])

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchQuery("")
      setSearchResults([])
    }
  }

  return (
    <div ref={searchRef} className="relative">
      {isSearchOpen ? (
        <div className="flex items-center gap-0 md:gap-2">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-48 md:w-64 h-9 px-1 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleSearchToggle}
            className="btn btn-ghost hover:bg-muted transition-all duration-200"
          >
            <X className="h-[18px] w-[18px]" />
            <span className="sr-only">Close search</span>
          </button>
        </div>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="header-btn btn-xs "
        >
          <Search className=" h-[18px] w-[18px]" />
          <span className="sr-only">Search</span>
        </button>
      )}

      {isSearchOpen && searchResults.length > 0 && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-lg overflow-hidden">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery("")
                setSearchResults([])
              }}
              className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.description}</p>
                <p className="text-sm font-medium mt-1">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isSearchOpen && searchQuery.trim() && searchResults.length === 0 && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-lg p-4">
          <p className="text-sm text-muted-foreground text-center">No products found</p>
        </div>
      )}
    </div>
  )
}
