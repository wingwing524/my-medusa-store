import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getTranslatedName } from "@lib/util/translations"
import { cookies } from "next/headers"

type SpecialCollectionsProps = {
  collections: {
    newArrivals?: HttpTypes.StoreCollection
    sale?: HttpTypes.StoreCollection
    bestSellers?: HttpTypes.StoreCollection
  }
  region: HttpTypes.StoreRegion
}

export default async function SpecialCollections({
  collections,
  region,
}: SpecialCollectionsProps) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'

  const { newArrivals, sale, bestSellers } = collections

  // Render function for each collection section
  const renderCollectionSection = async (
    collection: HttpTypes.StoreCollection | undefined,
    accentColor: string,
    icon?: string
  ) => {
    if (!collection) return null

    const {
      response: { products: pricedProducts },
    } = await listProducts({
      regionId: region.id,
      queryParams: {
        collection_id: collection.id,
        limit: 8,
        fields: "*variants.calculated_price",
      },
    })

    if (!pricedProducts || pricedProducts.length === 0) {
      return null
    }

    const collectionName = (collection.metadata?.['name_' + locale] as string) || collection.title || ''
    const isSale = collection.handle === 'sale'

    return (
      <div className={`py-12 md:py-16 ${isSale ? 'bg-red-50' : ''}`}>
        <div className="content-container">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold flex items-center gap-2 ${isSale ? 'text-red-600' : ''}`}>
              {icon && <span className="text-3xl">{icon}</span>}
              {collectionName}
            </h2>
            <LocalizedClientLink
              href={`/collections/${collection.handle}`}
              className={`text-sm font-medium hover:underline ${isSale ? 'text-red-600' : ''}`}
            >
              {locale === 'zh-TW' ? '查看全部' : 'View All'}
            </LocalizedClientLink>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {pricedProducts.slice(0, 8).map((product) => (
              <ProductPreview
                key={product.id}
                product={product}
                isFeatured
                region={region}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* New Arrivals */}
      {await renderCollectionSection(newArrivals, 'green', '✨')}

      {/* Sale */}
      {await renderCollectionSection(sale, 'red', '🔥')}

      {/* Best Sellers */}
      {await renderCollectionSection(bestSellers, 'yellow', '⭐')}
    </>
  )
}
