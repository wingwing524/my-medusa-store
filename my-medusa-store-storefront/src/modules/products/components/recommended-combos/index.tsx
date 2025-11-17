import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type RecommendedCombosProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RecommendedCombos({
  product,
  countryCode,
}: RecommendedCombosProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Fetch related products for combos
  const queryParams: HttpTypes.StoreProductListParams = {
    limit: 6,
  }
  
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  queryParams.is_giftcard = false

  const relatedProducts = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!relatedProducts.length) {
    return null
  }

  // Create combos (group products in sets of 2)
  const combos = []
  for (let i = 0; i < Math.min(relatedProducts.length, 4); i += 2) {
    if (relatedProducts[i]) {
      combos.push({
        main: product,
        items: relatedProducts.slice(i, i + 2).filter(Boolean)
      })
    }
  }

  if (combos.length === 0) {
    return null
  }

  return (
    <div className="content-container">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">推薦搭配</h2>
        <p className="text-gray-600">Recommended Combinations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {combos.slice(0, 2).map((combo, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-6 bg-white">
            {/* Main product image */}
            <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-lg bg-gray-100">
              {combo.main.thumbnail && (
                <Image
                  src={combo.main.thumbnail}
                  alt={combo.main.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Combo items */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {combo.items.map((item) => (
                <div key={item.id} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {item.thumbnail && (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <LocalizedClientLink
              href={`/products/${combo.main.handle}`}
              className="block w-full py-3 bg-gray-900 text-white text-center font-semibold rounded hover:bg-gray-800 transition-colors"
            >
              Shop the Look
            </LocalizedClientLink>
          </div>
        ))}
      </div>
    </div>
  )
}
