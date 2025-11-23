import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import YouMayLike from "@modules/products/components/you-may-like"
import RecommendedCombos from "@modules/products/components/recommended-combos"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
  locale: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
  locale,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      {/* Main Product Section */}
      <div className="content-container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div>
            <ImageGallery images={images} />
          </div>

          {/* Right: Product Info & Actions */}
          <div className="flex flex-col gap-6">
            <ProductInfo product={product} locale={locale} />
            
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="border-t border-gray-200">
        <div className="content-container py-12">
          <ProductTabs product={product} />
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="bg-gray-50 py-12 md:py-16">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <YouMayLike product={product} countryCode={countryCode} />
        </Suspense>
      </div>

      {/* Recommended Combos Section */}
      <div className="py-12 md:py-16">
        <Suspense fallback={<div className="content-container">Loading...</div>}>
          <RecommendedCombos product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
