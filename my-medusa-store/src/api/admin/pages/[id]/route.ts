import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import PageModuleService from "../../../../modules/page/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const pageModuleService: PageModuleService = req.scope.resolve("pageModuleService")
  const page = await pageModuleService.retrievePage(req.params.id)
  res.json({ page })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const pageModuleService: PageModuleService = req.scope.resolve("pageModuleService")
  const page = await pageModuleService.updatePages({ id: req.params.id, ...req.body })
  res.json({ page })
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const pageModuleService: PageModuleService = req.scope.resolve("pageModuleService")
  await pageModuleService.deletePages(req.params.id)
  res.json({ id: req.params.id, object: "page", deleted: true })
}
