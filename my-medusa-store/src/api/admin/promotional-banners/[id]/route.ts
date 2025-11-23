import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import PromotionalBannerService from "../../../../modules/promotional-banner/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve(
    "promotionalBannerModuleService"
  )

  const banner = await promotionalBannerService.retrievePromotionalBanner(
    req.params.id
  )

  res.json({ banner })
}

export const PATCH = async (req: MedusaRequest, res: MedusaResponse) => {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve(
    "promotionalBannerModuleService"
  )

  const banner = await promotionalBannerService.updatePromotionalBanners({
    id: req.params.id,
    ...req.body,
  })

  res.json({ banner })
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const promotionalBannerService: PromotionalBannerService = req.scope.resolve(
    "promotionalBannerModuleService"
  )

  await promotionalBannerService.deletePromotionalBanners(req.params.id)

  res.json({ deleted: true })
}
