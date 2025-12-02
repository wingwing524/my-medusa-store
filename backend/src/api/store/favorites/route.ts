import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import FavoriteService from "../../../modules/favorite/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  // Extract token from authorization header
  const authHeader = req.headers.authorization as string
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token" })
  }
  
  const token = authHeader.replace("Bearer ", "")
  
  // Decode JWT token (it's already validated by the frontend being able to access /store/customers/me)
  let customer_id: string
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    customer_id = payload.actor_id
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" })
  }

  if (!customer_id) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const favoriteService: FavoriteService = req.scope.resolve(
    "favoriteModuleService"
  )

  const favorites = await favoriteService.listCustomerFavorites(customer_id)

  res.json({ favorites })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  // Extract token from authorization header
  const authHeader = req.headers.authorization as string
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - No token" })
  }
  
  const token = authHeader.replace("Bearer ", "")
  
  // Decode JWT token
  let customer_id: string
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    customer_id = payload.actor_id
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" })
  }

  if (!customer_id) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const { product_id, variant_id } = req.body as { product_id: string; variant_id?: string }

  if (!product_id) {
    return res.status(400).json({ message: "product_id is required" })
  }

  const favoriteService: FavoriteService = req.scope.resolve(
    "favoriteModuleService"
  )

  const favorite = await favoriteService.addFavorite({
    customer_id,
    product_id,
    variant_id: variant_id || null,
  })

  res.json({ favorite })
}

export const AUTHENTICATE = false
