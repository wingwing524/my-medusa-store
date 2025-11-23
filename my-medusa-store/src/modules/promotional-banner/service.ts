import { MedusaService } from "@medusajs/framework/utils"
import PromotionalBanner from "./models/promotional-banner"

class PromotionalBannerService extends MedusaService({
  PromotionalBanner,
}) {
  async getActiveBanner() {
    const now = new Date()
    
    const banners = await this.listPromotionalBanners({
      is_active: true,
      start_date: { $lte: now },
      end_date: { $gte: now },
    }, {
      take: 1,
      order: { created_at: "DESC" },
    })

    return banners[0] || null
  }

  async createBanner(data: {
    message: string
    message_zh_tw?: string
    start_date: Date
    end_date: Date
    is_active?: boolean
    background_color?: string
    text_color?: string
    link_url?: string
  }) {
    return await this.createPromotionalBanners(data)
  }

  async updateBanner(id: string, data: Partial<{
    message: string
    message_zh_tw: string
    start_date: Date
    end_date: Date
    is_active: boolean
    background_color: string
    text_color: string
    link_url: string
  }>) {
    return await this.updatePromotionalBanners({ id, ...data })
  }

  async deleteBanner(id: string) {
    return await this.softDeletePromotionalBanners(id)
  }

  async listBanners(filters = {}, config = {}) {
    return await this.listPromotionalBanners(filters, config)
  }

  async retrieveBanner(id: string) {
    return await this.retrievePromotionalBanner(id)
  }
}

export default PromotionalBannerService
