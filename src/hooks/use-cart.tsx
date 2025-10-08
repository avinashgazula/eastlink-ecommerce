"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { toast } from "sonner"

export interface CartItem {
  id: string
  name: string
  collection: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function getCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return []

  try {
    const savedCart = window.localStorage.getItem("eastlink-cart")
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error("Error reading cart from localStorage:", error)
    return []
  }
}

function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem("eastlink-cart", JSON.stringify(items))
  } catch (error) {
    console.error("Error saving cart to localStorage:", error)
  }
}

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isMounted, setIsMounted] = useState(false)


  // to avoid hydration error mismatch
  useEffect(() => {
    setIsMounted(true)
    setItems(getCartFromStorage())
  }, [])

  useEffect(() => {
    if (isMounted) {
      saveCartToStorage(items)
    }
  }, [items, isMounted])



  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === item.id)
      if (existingItem) {
        return currentItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...currentItems, { ...item, quantity: 1 }]
    })
    toast.success(`${item.name} from ${item.collection} added to Cart.`)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id))
      return
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = useMemo(() =>
    items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const totalPrice = useMemo(() =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice]
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
