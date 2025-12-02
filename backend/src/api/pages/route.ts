import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const pageModuleService = req.scope.resolve("pageModuleService") as any
  const [pages] = await pageModuleService.listAndCountPages({ status: "published" }, {
    order: { created_at: "DESC" }
  })
  res.json({ pages })
}

export const AUTHENTICATE = false
