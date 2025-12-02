import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import { cookies } from "next/headers"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  if (!collections || collections.length === 0) {
    return null
  }

  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'

  return (
    <div className="content-container">
      {collections.slice(0, 3).map((collection) => (
        <ProductRail 
          key={collection.id} 
          collection={collection} 
          region={region}
          locale={locale}
        />
      ))}
    </div>
  )
}
