import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CategoryGrid from "@modules/home/components/category-grid"
import NewArrivals from "@modules/home/components/new-arrivals"
import PromoBanner from "@modules/home/components/promo-banner"
import StyleInspirations from "@modules/home/components/style-inspirations"
import { listCollections } from "@lib/data/collections"
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

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!region) {
    return null
  }

  return (
    <>
      <Hero />
      <CategoryGrid />
      <NewArrivals region={region} />
      <PromoBanner />
      <StyleInspirations />
      {collections && collections.length > 0 && (
        <div className="bg-white">
          <div className="content-container">
            <FeaturedProducts collections={collections} region={region} />
          </div>
        </div>
      )}
    </>
  )
}
