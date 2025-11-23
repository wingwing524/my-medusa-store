import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import PromotionalBannerService from "../../../../../modules/promotional-banner/service"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve("promotional_bannerService")
  const { id } = req.params
  
  const banner = await promotionalBannerService.retrieveBanner(id)

  res.json({ banner })
}

export async function PATCH(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve("promotional_bannerService")
  const { id } = req.params
  
  const banner = await promotionalBannerService.updateBanner(id, req.body)

  res.json({ banner })
}

export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve("promotional_bannerService")
  const { id } = req.params
  
  await promotionalBannerService.deleteBanner(id)

  res.json({ deleted: true })
}
