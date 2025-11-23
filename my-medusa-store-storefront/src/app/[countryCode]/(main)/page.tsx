import { Metadata } from "next"
import { cookies } from "next/headers"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CategoryGrid from "@modules/home/components/category-grid"
import NewArrivals from "@modules/home/components/new-arrivals"
import PromoBanner from "@modules/home/components/promo-banner"
import StyleInspirations from "@modules/home/components/style-inspirations"
import SpecialCollections from "@modules/home/components/special-collections"
import { listCollections, getCollectionByHandle } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "ESHOP - Premium Bags & Accessories",
  description:
    "Discover our collection of premium bags and accessories. Shop the latest styles and trends.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'

  const region = await getRegion(countryCode)
  
  // Fetch special collections by handle
  const [newArrivals, sale, bestSellers, allCollections] = await Promise.all([
    getCollectionByHandle('new-arrivals').catch(() => undefined),
    getCollectionByHandle('sale').catch(() => undefined),
    getCollectionByHandle('best-sellers').catch(() => undefined),
    listCollections({ fields: "id, handle, title, metadata" }),
  ])

  if (!region) {
    return null
  }

  // Filter out special collections from regular collections
  const regularCollections = allCollections?.collections?.filter(
    (c) => !['new-arrivals', 'sale', 'best-sellers'].includes(c.handle || '')
  ) || []

  return (
    <>
      <Hero />
      <CategoryGrid />
      
      {/* Special Collections: New Arrivals, Sale, Best Sellers */}
      <SpecialCollections 
        collections={{
          newArrivals,
          sale,
          bestSellers,
        }}
        region={region}
      />
      
      <PromoBanner />
      <StyleInspirations />
      
      {/* Other Featured Collections */}
      {regularCollections && regularCollections.length > 0 && (
        <div className="bg-white">
          <div className="content-container">
            <FeaturedProducts 
              collections={regularCollections} 
              region={region}
            />
          </div>
        </div>
      )}
    </>
  )
}
