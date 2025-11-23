import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import PageModuleService from "../../../../modules/page/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const pageModuleService: PageModuleService = req.scope.resolve("pageModuleService")
  
  const [pages] = await pageModuleService.listAndCountPages(
    { slug: req.params.slug, status: "published" },
    { take: 1 }
  )
  
  if (!pages.length) {
    res.status(404).json({ message: "Page not found" })
    return
  }
  
  res.json({ page: pages[0] })
}

export const AUTHENTICATE = false
