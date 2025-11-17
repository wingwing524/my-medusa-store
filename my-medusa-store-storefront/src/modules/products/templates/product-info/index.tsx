import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-sm text-gray-600 hover:text-gray-900 uppercase tracking-wide"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <h1
          className="text-3xl md:text-4xl font-bold text-gray-900"
          data-testid="product-title"
        >
          {product.title}
        </h1>

        <p
          className="text-gray-600 leading-relaxed whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </p>
      </div>
    </div>
  )
}

export default ProductInfo
