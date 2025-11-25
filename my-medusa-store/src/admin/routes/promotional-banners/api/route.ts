import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import PromotionalBannerService from "../../../../modules/promotional-banner/service"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve("promotional_bannerService")
  
  const banners = await promotionalBannerService.listBanners()

  res.json({ banners })
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve("promotional_bannerService")
  
  const banner = await promotionalBannerService.createBanner(req.body as any)

  res.json({ banner })
}
