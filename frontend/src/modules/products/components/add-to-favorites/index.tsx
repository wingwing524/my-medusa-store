"use client"

import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { addToFavorites, removeFromFavorites, checkIsFavorite } from "@lib/data/favorites"

type AddToFavoritesProps = {
  productId: string
  variantId?: string
  customer?: any
}

export default function AddToFavorites({ productId, variantId, customer }: AddToFavoritesProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkFavorite = async () => {
      if (customer) {
        // For logged-in users, check from backend
        const favorite = await checkIsFavorite(productId)
        setIsFavorite(favorite)
      } else {
        // For guests, check from localStorage
        const localFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
        setIsFavorite(localFavorites.includes(productId))
      }
    }

    checkFavorite()
  }, [productId, customer])

  const toggleFavorite = async () => {
    setLoading(true)

    try {
      if (customer) {
        // For logged-in users, use backend
        if (isFavorite) {
          await removeFromFavorites(productId)
          setIsFavorite(false)
        } else {
          await addToFavorites(productId, variantId)
          setIsFavorite(true)
        }
      } else {
        // For guests, use localStorage
        const localFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
        
        if (isFavorite) {
          const updated = localFavorites.filter((id: string) => id !== productId)
          localStorage.setItem("favorites", JSON.stringify(updated))
          setIsFavorite(false)
        } else {
          localFavorites.push(productId)
          localStorage.setItem("favorites", JSON.stringify(localFavorites))
          setIsFavorite(true)
        }
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`p-2 rounded-full border transition-all ${
        isFavorite
          ? "bg-red-50 border-red-500 text-red-500"
          : "bg-white border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
    </button>
  )
}
