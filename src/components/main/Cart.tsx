"use client"

import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

function EmptyCartState() {
  return (
    <div className="p-8 text-center text-muted-foreground">
      <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" aria-hidden="true" />
      <p>Your cart is empty</p>
    </div>
  )
}

function LoadingCartState() {
  return (
    <div className="p-8 text-center text-muted-foreground">
      <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" aria-hidden="true" />
      <p>Loading cart...</p>
    </div>
  )
}

interface CartItemsListProps {
  items: ReturnType<typeof useCart>['items']
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  onClose: () => void
}

function CartItemsList({ items, updateQuantity, removeItem, onClose }: Readonly<CartItemsListProps>) {
  return (
    <div className="p-4 space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 group">
          <Link
            href={`/product/${item.id}`}
            onClick={onClose}
            className="flex-shrink-0"
            aria-label={`View ${item.name}`}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={50}
              height={50}
              className="object-cover rounded-lg"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link href={`/product/${item.id}`} onClick={onClose}>
              <h4 className="font-medium text-sm truncate hover:text-primary transition-colors">
                {item.name}
              </h4>
            </Link>
            <p className="text-xs text-muted-foreground mb-2">{item.collection}</p>
            <div className="flex items-center justify-between">
              <section className="flex items-center gap-2" aria-label="controls toi change quantity">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <Minus className="h-3 w-3" aria-hidden="true" />
                </button>
                <span className="text-sm font-medium w-8 text-center" aria-live="polite">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <Plus className="h-3 w-3" aria-hidden="true" />
                </button>
              </section>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors opacity-0 group-hover:opacity-100"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // check mount statsus because a hydration mismatchg occurs
  useEffect(() => {
    setIsMounted(true)
  }, [])


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleClose = () => setIsOpen(false)


  let cartContent: React.ReactNode
  if (!isMounted) {
    cartContent = <LoadingCartState />
  } else if (items.length === 0) {
    cartContent = <EmptyCartState />
  } else {
    cartContent = (
      <CartItemsList
        items={items}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        onClose={handleClose}
      />
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="btn btn-sm btn-ghost gap-2 hover:bg-muted transition-all duration-200 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isMounted ? `Shopping cart with ${totalItems} items` : "Shopping cart"}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="cart-dropdown"
      >
        <ShoppingCart className="h-[18px] w-[18px]" aria-hidden="true" />
        <span className="text-sm font-medium tracking-wide hidden sm:inline">Cart</span>
        {isMounted && totalItems > 0 && (
          <span
            className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center"
            aria-label={`${totalItems} items in cart`}
          >
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <section
          id="cart-dropdown"
          className="fixed sm:absolute left-4 sm:left-auto right-4 sm:right-0 top-[4.5rem] sm:top-full mt-0 sm:mt-2 w-auto sm:w-96 max-w-md bg-background border border-border rounded-2xl shadow-lg overflow-hidden z-[100] max-sm:translate-y-[-20px]"
          aria-label="Shopping cart"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-lg">Shopping Cart</h3>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {cartContent}
          </div>

          {isMounted && items.length > 0 && (
            <div className="border-t border-border p-4 space-y-3">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span aria-live="polite">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="btn btn-lg w-full" aria-label="Proceed to checkout">
                Checkout
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
