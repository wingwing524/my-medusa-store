"use client"

import { X } from "lucide-react"
import { removeFromFavorites } from "@lib/data/favorites"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RemoveFromFavorites({ productId }: { productId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRemove = async () => {
    setLoading(true)
    try {
      await removeFromFavorites(productId)
      router.refresh()
    } catch (error) {
      console.error("Failed to remove favorite:", error)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      className="p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
      aria-label="Remove from favorites"
    >
      <X className="w-5 h-5" />
    </button>
  )
}
