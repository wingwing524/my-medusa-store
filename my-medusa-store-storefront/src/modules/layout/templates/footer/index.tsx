import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Facebook, Instagram, Youtube } from "lucide-react"

export default async function Footer() {
  const productCategories = await listCategories()
  const topLevelCategories = productCategories.filter(c => !c.parent_category_id)

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 md:py-16">
          
          {/* Column 1: Shop */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Shop</h3>
            <ul className="flex flex-col gap-y-2 text-sm text-gray-600">
              {topLevelCategories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <LocalizedClientLink
                    href={`/categories/${category.handle}`}
                    className="hover:text-gray-900 transition-colors"
                  >
                    {category.name}
                  </LocalizedClientLink>
                </li>
              ))}
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="hover:text-gray-900 transition-colors"
                >
                  All Products
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Customer Care</h3>
            <ul className="flex flex-col gap-y-2 text-sm text-gray-600">
              <li>
                <LocalizedClientLink
                  href="/contact"
                  className="hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/shipping"
                  className="hover:text-gray-900 transition-colors"
                >
                  Shipping & Delivery
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/returns"
                  className="hover:text-gray-900 transition-colors"
                >
                  Returns & Exchanges
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/faq"
                  className="hover:text-gray-900 transition-colors"
                >
                  FAQ
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/size-guide"
                  className="hover:text-gray-900 transition-colors"
                >
                  Size Guide
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/track-order"
                  className="hover:text-gray-900 transition-colors"
                >
                  Track Your Order
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">About Us</h3>
            <ul className="flex flex-col gap-y-2 text-sm text-gray-600">
              <li>
                <LocalizedClientLink
                  href="/about"
                  className="hover:text-gray-900 transition-colors"
                >
                  Our Story
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/stores"
                  className="hover:text-gray-900 transition-colors"
                >
                  Store Locator
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/careers"
                  className="hover:text-gray-900 transition-colors"
                >
                  Careers
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/sustainability"
                  className="hover:text-gray-900 transition-colors"
                >
                  Sustainability
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/press"
                  className="hover:text-gray-900 transition-colors"
                >
                  Press
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Stay Connected</h3>
            <p className="text-sm text-gray-600">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="flex flex-col gap-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gray-900 text-white font-medium text-sm rounded hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="content-container">
          <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
            {/* Copyright */}
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} ESHOP. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <LocalizedClientLink
                href="/privacy-policy"
                className="hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/terms"
                className="hover:text-gray-900 transition-colors"
              >
                Terms & Conditions
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/cookies"
                className="hover:text-gray-900 transition-colors"
              >
                Cookie Policy
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
