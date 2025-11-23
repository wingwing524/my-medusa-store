import { Suspense } from "react"
import { Bell, Heart, ShoppingBag, User } from "lucide-react"

import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { retrieveCustomer } from "@lib/data/customer"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LanguageSwitcher from "../../../../components/LanguageSwitcher"
import { cookies } from "next/headers"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const categories = await listCategories()
  const customer = await retrieveCustomer()
  const cookieStore = await cookies()
  const currentLocale = cookieStore.get('locale')?.value || 'en'

  return (
    <div className="sticky top-0 inset-x-0 z-40 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container flex items-center justify-between w-full h-full px-4 xl:px-8">
          
          {/* DESKTOP LAYOUT (≥ 1280px) */}
          <div className="hidden xl:flex items-center justify-between w-full h-full">
            {/* Left: Menu Button */}
            <div className="flex items-center">
              <SideMenu regions={regions} categories={categories} customer={customer} currentLocale={currentLocale} />
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <LocalizedClientLink
                href="/"
                className="text-2xl font-bold tracking-tight hover:text-ui-fg-base transition-colors"
                data-testid="nav-store-link"
              >
                ESHOP
              </LocalizedClientLink>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-4">
              {/* Alert Bell */}
              <button 
                className="p-2 hover:text-ui-fg-base transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>

              {/* Favorites */}
              <LocalizedClientLink
                href="/account/favorites"
                className="p-2 hover:text-ui-fg-base transition-colors"
                aria-label="Favorites"
              >
                <Heart className="h-5 w-5" />
              </LocalizedClientLink>

              {/* Cart */}
              <Suspense
                fallback={
                  <LocalizedClientLink
                    href="/cart"
                    className="p-2 hover:text-ui-fg-base transition-colors"
                    aria-label="Cart"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>

              {/* Account */}
              <LocalizedClientLink
                href="/account"
                className="p-2 hover:text-ui-fg-base transition-colors"
                aria-label="Account"
                data-testid="nav-account-link"
              >
                <User className="h-5 w-5" />
              </LocalizedClientLink>

              {/* Language Switcher */}
              <LanguageSwitcher currentLocale={currentLocale} />
            </div>
          </div>

          {/* MOBILE/TABLET LAYOUT (< 1280px) */}
          <div className="flex xl:hidden items-center justify-between w-full h-full">
            {/* Left: Logo */}
            <LocalizedClientLink
              href="/"
              className="text-xl font-bold tracking-tight hover:text-ui-fg-base transition-colors"
              data-testid="nav-store-link-mobile"
            >
              ESHOP
            </LocalizedClientLink>

            {/* Right: Icons */}
            <div className="flex items-center gap-3">
              {/* Alert Bell */}
              <button 
                className="p-2 hover:text-ui-fg-base transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>

              {/* Favorites */}
              <LocalizedClientLink
                href="/account/favorites"
                className="p-2 hover:text-ui-fg-base transition-colors"
                aria-label="Favorites"
              >
                <Heart className="h-5 w-5" />
              </LocalizedClientLink>

              {/* Cart */}
              <Suspense
                fallback={
                  <LocalizedClientLink
                    href="/cart"
                    className="p-2 hover:text-ui-fg-base transition-colors"
                    aria-label="Cart"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>

              {/* Account */}
              <LocalizedClientLink
                href="/account"
                className="p-2 hover:text-ui-fg-base transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </LocalizedClientLink>

              {/* Menu Button */}
              <div className="h-full">
                <SideMenu regions={regions} categories={categories} customer={customer} currentLocale={currentLocale} />
              </div>
            </div>
          </div>

        </nav>
      </header>
    </div>
  )
}
