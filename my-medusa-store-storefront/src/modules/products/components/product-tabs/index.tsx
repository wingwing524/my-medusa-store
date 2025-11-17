"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("details")

  const tabs = [
    { id: "details", label: "Product Details" },
    { id: "delivery", label: "Delivery & Returns" },
    { id: "size", label: "Size Guide" },
  ]

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 border-b-2 font-semibold transition-colors ${
                activeTab === tab.id
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "details" && <ProductInfoTab product={product} />}
        {activeTab === "delivery" && <ShippingInfoTab />}
        {activeTab === "size" && <SizeGuideTab />}
      </div>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-gray-900">Material</span>
            <p className="text-gray-600 mt-1">{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Country of origin</span>
            <p className="text-gray-600 mt-1">{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Type</span>
            <p className="text-gray-600 mt-1">{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-gray-900">Weight</span>
            <p className="text-gray-600 mt-1">{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Dimensions</span>
            <p className="text-gray-600 mt-1">
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-sm">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex items-start gap-x-4">
          <div className="flex-shrink-0">
            <FastDelivery />
          </div>
          <div>
            <span className="font-semibold text-gray-900 block mb-2">Fast delivery</span>
            <p className="text-gray-600 leading-relaxed">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4">
          <div className="flex-shrink-0">
            <Refresh />
          </div>
          <div>
            <span className="font-semibold text-gray-900 block mb-2">Simple exchanges</span>
            <p className="text-gray-600 leading-relaxed">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4">
          <div className="flex-shrink-0">
            <Back />
          </div>
          <div>
            <span className="font-semibold text-gray-900 block mb-2">Easy returns</span>
            <p className="text-gray-600 leading-relaxed">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const SizeGuideTab = () => {
  return (
    <div className="text-sm">
      <p className="text-gray-600 mb-6">
        Please refer to our size guide to find your perfect fit. Measurements are in centimeters.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Size</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Length</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Width</th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Height</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-3">Small</td>
              <td className="border border-gray-200 px-4 py-3">20-25 cm</td>
              <td className="border border-gray-200 px-4 py-3">10-12 cm</td>
              <td className="border border-gray-200 px-4 py-3">15-18 cm</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-200 px-4 py-3">Medium</td>
              <td className="border border-gray-200 px-4 py-3">25-30 cm</td>
              <td className="border border-gray-200 px-4 py-3">12-15 cm</td>
              <td className="border border-gray-200 px-4 py-3">18-22 cm</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-3">Large</td>
              <td className="border border-gray-200 px-4 py-3">30-35 cm</td>
              <td className="border border-gray-200 px-4 py-3">15-18 cm</td>
              <td className="border border-gray-200 px-4 py-3">22-26 cm</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTabs
