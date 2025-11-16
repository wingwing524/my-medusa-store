import { Suspense } from "react"
import { Heart, Search } from "lucide-react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LanguageSwitcher from "../../../../components/LanguageSwitcher"
import { cookies } from "next/headers"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const cookieStore = await cookies()
  const currentLocale = cookieStore.get('locale')?.value || 'en'

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center text-xs py-2 px-4">
        Free shipping on orders over $100 | 訂單滿$100免運費
      </div>

      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase font-bold tracking-tight"
              data-testid="nav-store-link"
            >
              ESHOP
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-4 h-full flex-1 basis-0 justify-end">
            {/* Desktop Navigation Links */}
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base text-xs font-medium uppercase"
                href="/collections/new-arrivals"
              >
                {currentLocale === 'zh-HK' ? '今期新品' : 'NEW ARRIVALS'}
              </LocalizedClientLink>
              <LocalizedClientLink
                className="hover:text-ui-fg-base text-xs font-medium uppercase"
                href="/collections/bags"
              >
                {currentLocale === 'zh-HK' ? '包包' : 'BAGS'}
              </LocalizedClientLink>
              <LocalizedClientLink
                className="hover:text-ui-fg-base text-xs font-medium uppercase"
                href="/collections/accessories"
              >
                {currentLocale === 'zh-HK' ? '首飾' : 'ACCESSORIES'}
              </LocalizedClientLink>
              <LocalizedClientLink
                className="hover:text-ui-fg-base text-xs font-medium uppercase text-red-600"
                href="/collections/sale"
              >
                {currentLocale === 'zh-HK' ? '優惠' : 'SALE'}
              </LocalizedClientLink>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={currentLocale} />

            {/* Search Icon */}
            <button className="hover:text-ui-fg-base" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>

            {/* Favorites/Wishlist Link */}
            <LocalizedClientLink
              className="hover:text-ui-fg-base hidden small:block"
              href="/account/favorites"
              data-testid="nav-favorites-link"
              aria-label="Favorites"
            >
              <Heart className="h-5 w-5" />
            </LocalizedClientLink>

            {/* Account Link */}
            <LocalizedClientLink
              className="hover:text-ui-fg-base hidden small:block text-xs"
              href="/account"
              data-testid="nav-account-link"
            >
              {currentLocale === 'zh-HK' ? '帳戶' : 'Account'}
            </LocalizedClientLink>

            {/* Cart Button */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
