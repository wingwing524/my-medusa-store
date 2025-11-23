"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from 'next-intl'

export default function CategoryGrid() {
  const t = useTranslations('categories')
  
  const placeholderCategories = [
    { id: '1', name: t('handbags'), image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&q=80' },
    { id: '2', name: t('wallets'), image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=800&fit=crop&q=80' },
    { id: '3', name: t('shoes'), image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80' },
    { id: '4', name: t('accessories'), image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop&q=80' },
    { id: '5', name: t('backpacks'), image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80' },
    { id: '6', name: t('clutches'), image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop&q=80' }
  ]
  return (
    <div className="py-12 md:py-16">
      <div className="content-container">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {placeholderCategories.map((category) => (
            <LocalizedClientLink
              key={category.id}
              href="/store"
              className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-sm md:text-base">
                  {category.name}
                </h3>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </div>
  )
}