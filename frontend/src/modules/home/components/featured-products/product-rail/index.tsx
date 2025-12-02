import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function ProductRail({
  collection,
  region,
  locale = "en",
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
  locale?: string
}) {
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

  return (
    <div className="py-12 md:py-16">
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold">
          {(collection.metadata?.['name_' + locale] as string) || collection.title}
        </h2>
        <LocalizedClientLink
          href={`/collections/${collection.handle}`}
          className="text-sm font-medium hover:underline"
        >
          {locale === 'zh-TW' ? '查看全部' : 'View All'}
        </LocalizedClientLink>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {pricedProducts.map((product) => (
          <ProductPreview
            key={product.id}
            product={product}
            isFeatured
            region={region}
          />
        ))}
      </div>
    </div>
  )
}
