"use client"

import { HttpTypes } from "@medusajs/types"
import { useTranslations } from "next-intl"

export default function StockCounter({
  variant,
  product,
}: {
  variant?: HttpTypes.StoreProductVariant
  product: HttpTypes.StoreProduct
}) {
  const t = useTranslations('common')
  
  // Get inventory quantity
  const inventoryQuantity = variant?.inventory_quantity ?? 0
  
  // For demo purposes, calculate a "sold" count (you can store this in metadata)
  // In production, you'd track actual sales count in the database
  const totalStock = inventoryQuantity + Math.floor(Math.random() * 50) + 10
  const soldCount = totalStock - inventoryQuantity
  
  if (inventoryQuantity <= 0) {
    return (
      <div className="inline-flex items-center px-3 py-1 rounded-md bg-gray-100 border border-gray-200">
        <span className="text-sm font-medium text-gray-600">{t('soldOut')}</span>
      </div>
    )
  }

  // Show urgency if stock is low
  const isLowStock = inventoryQuantity < 10
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`inline-flex items-center px-3 py-1.5 rounded-md border ${
        isLowStock 
          ? 'bg-red-50 border-red-200 text-red-700' 
          : 'bg-gray-50 border-gray-200 text-gray-700'
      }`}>
        <span className="font-medium">
          {t('sold')}: <span className="font-semibold">{soldCount}</span>件
        </span>
        <span className="mx-2 text-gray-300">|</span>
        <span className="font-medium">
          {t('remaining')}: <span className={`font-semibold ${isLowStock ? 'text-red-600' : ''}`}>
            {inventoryQuantity}
          </span>件
        </span>
      </div>
      
      {isLowStock && (
        <span className="text-xs font-medium text-red-600 animate-pulse">
          ⚡ {t('lowStock')}
        </span>
      )}
    </div>
  )
}
