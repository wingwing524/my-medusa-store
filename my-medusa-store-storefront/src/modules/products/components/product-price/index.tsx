import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
  showBadge = false,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  showBadge?: boolean
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  const hasDiscount = selectedPrice.price_type === "sale"
  const discountPercentage = selectedPrice.percentage_diff

  return (
    <div className="flex flex-col text-ui-fg-base">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Current Price */}
        <span
          className={clx("text-xl-semi font-semibold", {
            "text-red-600": hasDiscount,
            "text-gray-900": !hasDiscount,
          })}
        >
          {!variant && "From "}
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>

        {/* Discount Badge - Mizzue Style */}
        {hasDiscount && showBadge && discountPercentage && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-100 text-red-800 border border-red-200">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Original Price - Mizzue Style with strikethrough */}
      {hasDiscount && (
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-500">Original:</span>
          <span
            className="line-through text-sm text-gray-400"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
          {!showBadge && discountPercentage && (
            <span className="text-xs font-semibold text-red-600">
              (-{discountPercentage}%)
            </span>
          )}
        </div>
      )}
    </div>
  )
}
