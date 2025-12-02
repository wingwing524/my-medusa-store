"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from 'next-intl'

const Hero = () => {
  const t = useTranslations('homepage')
  const tc = useTranslations('common')
  const [currentSlide, setCurrentSlide] = useState(0)

  const placeholderSlides = [
    {
      id: '1',
      title: t('heroWelcome'),
      subtitle: t('heroWelcomeDesc'),
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1920&h=1080&fit=crop&q=80',
      link: '/store'
    },
    {
      id: '2',
      title: t('heroNewArrivals'),
      subtitle: t('heroNewArrivalsDesc'),
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920&h=1080&fit=crop&q=80',
      link: '/store'
    },
    {
      id: '3',
      title: t('heroSpecialOffers'),
      subtitle: t('heroSpecialOffersDesc'),
      image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1920&h=1080&fit=crop&q=80',
      link: '/store'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % placeholderSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % placeholderSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + placeholderSlides.length) % placeholderSlides.length)
  }

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-gray-100">
      {placeholderSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-md">
              {slide.subtitle}
            </p>
            <LocalizedClientLink
              href={slide.link}
              className="px-8 py-3 bg-white text-gray-900 font-semibold rounded hover:bg-gray-100 transition-colors"
            >
              {tc('shopNow')}
            </LocalizedClientLink>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {placeholderSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
