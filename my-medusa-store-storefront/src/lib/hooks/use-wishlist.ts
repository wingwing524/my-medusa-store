"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WishlistState {
  items: string[] // Product IDs
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (productId) => {
        set((state) => ({
          items: [...new Set([...state.items, productId])],
        }))
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        }))
      },
      
      isInWishlist: (productId) => {
        return get().items.includes(productId)
      },
      
      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
)
