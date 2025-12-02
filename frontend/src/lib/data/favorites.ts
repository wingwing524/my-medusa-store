"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export async function getFavorites() {
  const headers = await getAuthHeaders()

  try {
    const response = await sdk.client.fetch<{ favorites: any[] }>(
      "/store/favorites",
      {
        method: "GET",
        headers,
        next: { revalidate: 0 },
      }
    )
    return response.favorites || []
  } catch (error) {
    console.error("Failed to fetch favorites:", error)
    return []
  }
}

export async function addToFavorites(product_id: string, variant_id?: string) {
  const headers = await getAuthHeaders()

  try {
    const response = await sdk.client.fetch<{ favorite: any }>(
      "/store/favorites",
      {
        method: "POST",
        headers,
        body: { product_id, variant_id },
      }
    )
    return response.favorite
  } catch (error) {
    console.error("Failed to add to favorites:", error)
    throw error
  }
}

export async function removeFromFavorites(product_id: string) {
  const headers = await getAuthHeaders()

  try {
    await sdk.client.fetch(`/store/favorites/${product_id}`, {
      method: "DELETE",
      headers,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to remove from favorites:", error)
    throw error
  }
}

export async function checkIsFavorite(product_id: string) {
  const headers = await getAuthHeaders()

  try {
    const response = await sdk.client.fetch<{ isFavorite: boolean }>(
      `/store/favorites/${product_id}`,
      {
        method: "GET",
        headers,
        next: { revalidate: 0 },
      }
    )
    return response.isFavorite
  } catch (error) {
    return false
  }
}
