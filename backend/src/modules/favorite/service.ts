import { MedusaService } from "@medusajs/framework/utils"
import Favorite from "./models/favorite"

class FavoriteService extends MedusaService({ Favorite }) {
  async addFavorite(data: {
    customer_id: string
    product_id: string
    variant_id?: string | null
  }) {
    // Check if already exists
    const existing = await this.listFavorites({
      customer_id: data.customer_id,
      product_id: data.product_id,
    })

    if (existing.length > 0) {
      return existing[0]
    }

    return await this.createFavorites(data)
  }

  async removeFavorite(customer_id: string, product_id: string) {
    const favorites = await this.listFavorites({
      customer_id,
      product_id,
    })

    if (favorites.length > 0) {
      await this.deleteFavorites(favorites[0].id)
    }

    return { deleted: true }
  }

  async listCustomerFavorites(customer_id: string) {
    const [favorites] = await this.listAndCountFavorites(
      { customer_id },
      {
        order: { created_at: "DESC" },
      }
    )

    return favorites
  }

  async isFavorite(customer_id: string, product_id: string) {
    const favorites = await this.listFavorites({
      customer_id,
      product_id,
    })

    return favorites.length > 0
  }

  async getFavoritesCount(customer_id: string) {
    const [, count] = await this.listAndCountFavorites({ customer_id })
    return count
  }
}

export default FavoriteService
