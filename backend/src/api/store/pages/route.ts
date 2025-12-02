import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import PageModuleService from "../../../modules/page/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const pageModuleService: PageModuleService = req.scope.resolve("pageModuleService")
  const [pages] = await pageModuleService.listAndCountPages({ status: "published" }, {
    order: { created_at: "DESC" }
  })
  res.json({ pages })
}

export const AUTHENTICATE = false
