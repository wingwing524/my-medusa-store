import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import PromotionalBannerService from "../../../modules/promotional-banner/service"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve("promotionalBannerModuleService")
  
  const banner = await promotionalBannerService.getActiveBanner()

  res.json({ banner })
}
