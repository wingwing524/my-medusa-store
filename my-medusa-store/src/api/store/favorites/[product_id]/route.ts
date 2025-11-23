import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import FavoriteService from "../../../../modules/favorite/service"

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
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

  const { product_id } = req.params

  if (!product_id) {
    return res.status(400).json({ message: "product_id is required" })
  }

  const favoriteService: FavoriteService = req.scope.resolve(
    "favoriteModuleService"
  )

  await favoriteService.removeFavorite(customer_id, product_id)

  res.json({ deleted: true })
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
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

  const { product_id } = req.params

  if (!product_id) {
    return res.status(400).json({ message: "product_id is required" })
  }

  const favoriteService: FavoriteService = req.scope.resolve(
    "favoriteModuleService"
  )

  const isFavorite = await favoriteService.isFavorite(customer_id, product_id)

  res.json({ isFavorite })
}

export const AUTHENTICATE = false
