import { Metadata } from "next"
import FavoritesTemplate from "@modules/account/templates/favorites-template"

export const metadata: Metadata = {
  title: "Favorites",
  description: "View your favorite products",
}

export default function Favorites() {
  return <FavoritesTemplate />
}
