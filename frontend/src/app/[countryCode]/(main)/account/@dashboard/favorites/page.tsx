import { getFavorites } from "@lib/data/favorites"
import { retrieveCustomer } from "@lib/data/customer"
import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heart, Package } from "lucide-react"
import { getTranslations } from 'next-intl/server'
import RemoveFromFavorites from "./remove-from-favorites"

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your favorite products",
}

export default async function FavoritesPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  
  const customer = await retrieveCustomer()
  const t = await getTranslations('favorites')

  if (!customer) {
    notFound()
  }

  const favorites = await getFavorites()

  // Get all product IDs
  const productIds = favorites.map((fav: any) => fav.product_id)

  // Fetch full product data
  const products: HttpTypes.StoreProduct[] = productIds.length > 0
    ? await listProducts({
        queryParams: { id: productIds },
        countryCode,
      }).then(({ response }) => response.products)
    : []

  if (favorites.length === 0) {
    return (
      <div className="content-container py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
          
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t('noFavorites')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('noFavoritesDesc')}
            </p>
            <LocalizedClientLink
              href="/store"
              className="inline-block px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium"
            >
              {t('startShopping')}
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="content-container py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-gray-600">
            {favorites.length} {favorites.length === 1 ? t('item') : t('items')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const favorite = favorites.find((f: any) => f.product_id === product.id)
            
            return (
              <div key={product.id} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <LocalizedClientLink href={`/products/${product.handle}`}>
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.title || ""}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                  </div>
                </LocalizedClientLink>

                <div className="p-4">
                  <LocalizedClientLink href={`/products/${product.handle}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-gray-700">
                      {product.title}
                    </h3>
                  </LocalizedClientLink>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {product.variants && product.variants.length > 0 && (
                        <span>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: product.variants[0].calculated_price?.currency_code || "USD",
                          }).format(
                            (product.variants[0].calculated_price?.calculated_amount || 0) / 100
                          )}
                        </span>
                      )}
                    </div>

                    <RemoveFromFavorites productId={product.id!} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
