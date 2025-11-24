import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const pageModuleService = req.scope.resolve("pageModuleService") as any
  const locale = (req.query.locale as string) || 'en'
  
  const [pages] = await pageModuleService.listAndCountPages(
    { slug: req.params.slug, locale, status: "published" },
    { take: 1 }
  )
  
  if (!pages.length) {
    res.status(404).json({ message: "Page not found" })
    return
  }
  
  res.json({ page: pages[0] })
}

export const AUTHENTICATE = false
