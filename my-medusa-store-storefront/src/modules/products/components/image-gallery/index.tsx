"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnail sidebar */}
      <div className="flex flex-col gap-2 w-20 md:w-24">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === index
                ? 'border-gray-900'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            {image.url && (
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            )}
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
          {images[selectedImage]?.url && (
            <Image
              src={images[selectedImage].url}
              alt={`Product image ${selectedImage + 1}`}
              fill
              priority={selectedImage === 0}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 60vw"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageGallery
