"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from 'next-intl'

export default function PromoBanner() {
  const t = useTranslations('homepage')
  const tc = useTranslations('common')
  
  return (
    <div className="py-8 md:py-12">
      <div className="content-container">
        <LocalizedClientLink
          href="/store"
          className="group relative block w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg"
        >
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=600&fit=crop&q=80"
            alt="Special Promotion"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {t('seasonSale')}
            </h2>
            <p className="text-lg md:text-xl text-white mb-6 max-w-2xl drop-shadow-md">
              
            </p>
            <span className="px-6 py-3 bg-white text-gray-900 font-semibold rounded group-hover:bg-gray-100 transition-colors">
              {tc('shopNow')}
            </span>
          </div>
        </LocalizedClientLink>
      </div>
    </div>
  )
}
