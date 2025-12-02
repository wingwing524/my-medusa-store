import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import PromotionalBannerService from "../../../modules/promotional-banner/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve(
    "promotionalBannerModuleService"
  )

  const [banners] = await promotionalBannerService.listAndCountPromotionalBanners(
    {},
    {
      order: { created_at: "DESC" },
    }
  )

  res.json({ banners })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve(
    "promotionalBannerModuleService"
  )

  const banner = await promotionalBannerService.createPromotionalBanners(req.body as any)

  res.json({ banner })
}
