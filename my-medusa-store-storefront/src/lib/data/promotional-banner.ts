"use server"

import { sdk } from "@lib/config"

export async function getActiveBanner() {
  try {
    const response = await sdk.client.fetch<{ banner: any }>(
      "/store/promotional-banner",
      {
        method: "GET",
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )
    return response.banner
  } catch (error) {
    console.error("Error fetching promotional banner:", error)
    return null
  }
}
