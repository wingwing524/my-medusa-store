"use client"

import { useWishlist } from "@lib/hooks/use-wishlist"
import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import ProductPreview from "@modules/products/components/product-preview"
import { Heart } from "lucide-react"
import { useTranslations } from "next-intl"

export default function FavoritesTemplate() {
  const { items, removeItem } = useWishlist()
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations('account')

  useEffect(() => {
    const fetchProducts = async () => {
      if (items.length === 0) {
        setProducts([])
        setLoading(false)
        return
      }

      try {
        // Fetch all favorited products
        const promises = items.map(async (productId) => {
          const result = await listProducts({
            queryParams: { id: [productId] },
          })
          return result.response.products[0]
        })

        const fetchedProducts = await Promise.all(promises)
        setProducts(fetchedProducts.filter(Boolean))
      } catch (error) {
        console.error("Error fetching favorite products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [items])

  if (loading) {
    return (
      <div className="flex flex-col gap-y-8 py-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl-semi">{t('favorites')}</h1>
            <p className="text-base-regular text-ui-fg-subtle mt-2">
              {t('viewFavorites')}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-y-8 py-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl-semi">{t('favorites')}</h1>
            <p className="text-base-regular text-ui-fg-subtle mt-2">
              {t('viewFavorites')}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-ui-fg-base mb-2">
            {t('noFavorites')}
          </h2>
          <p className="text-base-regular text-ui-fg-subtle max-w-md">
            {t('startBrowsing')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-8 py-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl-semi">{t('favorites')}</h1>
          <p className="text-base-regular text-ui-fg-subtle mt-2">
            {t('viewFavorites')} ({items.length})
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 gap-x-6 gap-y-8">
        {products.map((product) => (
          <div key={product.id}>
            <ProductPreview 
              product={product} 
              region={undefined}
              isFeatured={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
