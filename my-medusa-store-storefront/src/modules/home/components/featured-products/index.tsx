import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

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

  return (
    <div className="content-container">
      {collections.slice(0, 3).map((collection) => (
        <ProductRail key={collection.id} collection={collection} region={region} />
      ))}
    </div>
  )
}
