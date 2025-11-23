import { Module } from "@medusajs/framework/utils"
import PromotionalBannerService from "./service"

export const PROMOTIONAL_BANNER_MODULE = "promotionalBannerModuleService"

export default Module(PROMOTIONAL_BANNER_MODULE, {
  service: PromotionalBannerService,
})

