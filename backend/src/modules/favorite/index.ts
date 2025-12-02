import { Module } from "@medusajs/framework/utils"
import FavoriteService from "./service"

export const FAVORITE_MODULE = "favoriteModuleService"

export default Module(FAVORITE_MODULE, {
  service: FavoriteService,
})
