import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface NewArrivalsProps {
  region: HttpTypes.StoreRegion
}

export default async function NewArrivals({ region }: NewArrivalsProps) {
  try {
    const {
      response: { products },
    } = await listProducts({
      regionId: region.id,
      queryParams: {
        limit: 8,
        order: "-created_at",
        fields: "*variants.calculated_price",
      },
    })

    if (!products || products.length === 0) {
      return null
    }

    return (
      <div className="py-12 md:py-16 bg-gray-50">
        <div className="content-container">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
            <LocalizedClientLink
              href="/store"
              className="text-sm font-medium hover:underline"
            >
              View All
            </LocalizedClientLink>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductPreview
                key={product.id}
                product={product}
                region={region}
                isFeatured
              />
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return null
  }
}
