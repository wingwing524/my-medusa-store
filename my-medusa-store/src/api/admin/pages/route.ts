import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import PageModuleService from "../../../modules/page/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const pageModuleService: PageModuleService = req.scope.resolve("pageModuleService")
  
  const filters: any = {}
  if (req.query.status) {
    filters.status = req.query.status
  }
  
  const [pages, count] = await pageModuleService.listAndCountPages(filters, {
    skip: req.query.offset ? parseInt(req.query.offset as string) : 0,
    take: req.query.limit ? parseInt(req.query.limit as string) : 20,
    order: { created_at: "DESC" }
  })
  
  res.json({ pages, count, offset: req.query.offset || 0, limit: req.query.limit || 20 })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const pageModuleService: PageModuleService = req.scope.resolve("pageModuleService")
  const page = await pageModuleService.createPages(req.body)
  res.json({ page })
}
