"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from 'next-intl'

export default function StyleInspirations() {
  const t = useTranslations('homepage')
  
  const styleInspirations = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80',
      title: t('casualChic'),
      tags: ['#DailyLook', '#Minimalist']
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop&q=80',
      title: t('officeStyle'),
      tags: ['#WorkWear', '#Professional']
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop&q=80',
      title: t('weekendVibes'),
      tags: ['#Casual', '#Comfort']
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&q=80',
      title: t('eveningElegance'),
      tags: ['#Elegant', '#NightOut']
    }
  ]
  return (
    <div className="py-12 md:py-16">
      <div className="content-container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('styleInspirations')}</h2>
          <p className="text-gray-600">{t('styleInspirationsSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {styleInspirations.map((style) => (
            <LocalizedClientLink
              key={style.id}
              href="/store"
              className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100"
            >
              <Image
                src={style.image}
                alt={style.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-semibold text-sm md:text-base mb-2">
                  {style.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {style.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <LocalizedClientLink
            href="/store"
            className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors"
          >
            {t('exploreMoreStyles')}
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
