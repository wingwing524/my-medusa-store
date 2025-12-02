"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from 'next-intl'
import { getTranslatedName, getTranslatedDescription } from "@lib/util/translations"
import { useMemo } from 'react'

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  locale: string
}

const ProductInfo = ({ product, locale }: ProductInfoProps) => {
  const t = useTranslations('product')
  
  const translatedTitle = useMemo(() => getTranslatedName(product, locale), [product, locale])
  const translatedDescription = useMemo(() => getTranslatedDescription(product, locale), [product, locale])
  const translatedCollectionTitle = useMemo(
    () => product.collection ? getTranslatedName(product.collection, locale) : null,
    [product.collection, locale]
  )
  
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-sm text-gray-600 hover:text-gray-900 uppercase tracking-wide"
          >
            {translatedCollectionTitle}
          </LocalizedClientLink>
        )}
        <h1
          className="text-3xl md:text-4xl font-bold text-gray-900"
          data-testid="product-title"
        >
          {translatedTitle}
        </h1>

        <p
          className="text-gray-600 leading-relaxed whitespace-pre-line"
          data-testid="product-description"
        >
          {translatedDescription}
        </p>
      </div>
    </div>
  )
}

export default ProductInfo
