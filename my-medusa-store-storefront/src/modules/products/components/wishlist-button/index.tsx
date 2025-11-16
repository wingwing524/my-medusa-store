"use client"

import { useWishlist } from "@lib/hooks/use-wishlist"
import { Heart } from "lucide-react"

export default function WishlistButton({ productId }: { productId: string }) {
  const { isInWishlist, addItem, removeItem } = useWishlist()
  const isFavorite = isInWishlist(productId)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isFavorite) {
      removeItem(productId)
    } else {
      addItem(productId)
    }
  }

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full transition-all ${
        isFavorite
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
      aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
      />
    </button>
  )
}
