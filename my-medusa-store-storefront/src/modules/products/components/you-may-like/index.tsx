import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "../product-preview"

type YouMayLikeProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function YouMayLike({
  product,
  countryCode,
}: YouMayLikeProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: HttpTypes.StoreProductListParams = {
    limit: 8,
  }
  
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags && product.tags.length > 0) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <div className="content-container">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">猜你喜歡</h2>
        <p className="text-gray-600">You May Also Like</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductPreview key={product.id} region={region} product={product} isFeatured />
        ))}
      </div>
    </div>
  )
}
