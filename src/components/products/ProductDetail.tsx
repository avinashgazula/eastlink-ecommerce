"use client"

import { useCart } from "@/hooks/use-cart"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Product {
  id: string
  name: string
  collection: string
  price: number
  image: string
  isNew?: boolean
  description?: string
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: Readonly<ProductDetailProps>) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")
  const { addItem } = useCart()

  const tabs = [
    { id: "details", label: "Details" },
    { id: "faq", label: "FAQ" },
    { id: "reviews", label: "Reviews" },
  ]

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      collection: product.collection,
    })
  }

  return (
    <div className="min-h-screen bg-muted pb-24 md:pb-8">
      <div className="container px-4 py-8 my-20 md:px-8 lg:px-12 md:py-12 max-w-9xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">

          <div className="relative w-full aspect-square md:aspect-[0.95] rounded-2xl overflow-hidden bg-background">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {product.isNew && (
              <span className="badge absolute top-5 right-5 bg-accent/95 text-accent-foreground border-0 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm">
                New
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-3">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground tracking-wide mb-4">
                {product.collection}
              </p>
              <p className="text-3xl font-semibold">${product.price.toFixed(2)}</p>
            </div>

            <div className="border-b border-border mb-6">
              <div className="flex gap-6 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 text-sm font-medium tracking-wide transition-colors relative whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 mb-6 md:mb-0">
              {activeTab === "details" && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description || "Premium quality product crafted with attention to detail."}
                  </p>
                  <div className="space-y-3 pt-4">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Material</span>
                      <span className="text-sm font-medium">Premium Cotton Blend</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Care</span>
                      <span className="text-sm font-medium">Machine Wash Cold</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Origin</span>
                      <span className="text-sm font-medium">Made in Nova Scotia</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "faq" && (
                <div className="space-y-4 animate-fade-in">
                  <details className="collapse collapse-plus border-b border-border">
                    <summary className="collapse-title font-semibold text-sm">
                      What material is the {product.name} made of?
                    </summary>
                    <div className="collapse-content text-sm text-muted-foreground">
                      <p>This {product.name} is made with premium materials including high-quality cotton and synthetic blends for durability and comfort.</p>
                    </div>
                  </details>
                  <details className="collapse collapse-plus border-b border-border">
                    <summary className="collapse-title font-semibold text-sm">
                      How do I clean the {product.name}?
                    </summary>
                    <div className="collapse-content text-sm text-muted-foreground">
                      <p>Hand wash cold or machine wash on delicate cycle. Do not bleach. Lay flat to dry.</p>
                    </div>
                  </details>
                  <details className="collapse collapse-plus border-b border-border">
                    <summary className="collapse-title font-semibold text-sm">
                      What&apos;s the sizing guide for {product.name}?
                    </summary>
                    <div className="collapse-content text-sm text-muted-foreground">
                      <p>We follow the standard Canadian sizing guide. For best fit, please refer to our size chart or contact customer service.</p>
                    </div>
                  </details>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-background rounded-2xl p-6">
                    <p className="text-muted-foreground text-sm">
                      Customer reviews coming soon. Be the first to review this product!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:flex flex-col sm:flex-row gap-4 mt-6">
              <div className="flex items-center gap-4 bg-background rounded-xl px-6 py-3 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium min-w-[2ch] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn flex-1 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl h-auto py-3 text-base font-medium tracking-wide"
              >
                ${product.price.toFixed(2)} — Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-medium min-w-[2ch] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn flex-1 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl h-auto py-3 text-base font-medium"
          >
            Add · ${product.price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  )
}
