import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { getTranslations } from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations('footer')
  const productCategories = await listCategories()
  const topLevelCategories = productCategories.filter(c => !c.parent_category_id)

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 md:py-16">
          
          {/* Column 1: Contact Us */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-base font-bold text-gray-900">{t('contactUs')}</h3>
            
            {/* Email */}
            <div className="flex flex-col gap-y-1.5">
              <a href="mailto:info@eshop.com" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {t('email')}: info@eshop.com
              </a>
            </div>

            {/* Business Inquiries */}
            <div className="flex flex-col gap-y-1.5">
              <span className="text-base font-bold text-gray-900">{t('businessInquiries')}</span>
              <div className="flex flex-col gap-y-1.5 text-sm text-gray-600">
                <a href="mailto:pr@eshop.com" className="hover:text-gray-900 transition-colors">
                  {t('prSponsorships')}: pr@eshop.com
                </a>
                <a href="mailto:business@eshop.com" className="hover:text-gray-900 transition-colors">
                  {t('businessCooperation')}: business@eshop.com
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex flex-col gap-y-1.5">
              <span className="text-base font-bold text-gray-900">{t('officeHours')}</span>
              <div className="flex flex-col gap-y-1.5 text-sm text-gray-600">
                <p>{t('officeHoursWeekday')}</p>
                <p>{t('officeHoursHoliday')}</p>
              </div>
            </div>

            {/* Office Address */}
            <div className="flex flex-col gap-y-1.5">
              <span className="text-base font-bold text-gray-900">{t('officeAddress')}</span>
              <address className="text-sm text-gray-600 not-italic">
                {t('addressLine1')}<br />
                {t('addressLine2')}
              </address>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-base font-bold text-gray-900">{t('products')}</h3>
            <ul className="flex flex-col gap-y-1.5 text-sm text-gray-600">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="hover:text-gray-900 transition-colors"
                >
                  {t('allProducts')}
                </LocalizedClientLink>
              </li>
              {/* Featured Collections */}
              <li>
                <LocalizedClientLink
                  href="/collections/new-arrivals"
                  className="hover:text-gray-900 transition-colors font-medium text-green-600"
                >
                  {t('newArrivals')}
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/collections/sale"
                  className="hover:text-gray-900 transition-colors font-medium text-red-600"
                >
                  {t('sale')}
                </LocalizedClientLink>
              </li>
              {/* Categories */}
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
            </ul>
          </div>

          {/* Column 3: Need Help */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-base font-bold text-gray-900">{t('needHelp')}</h3>
            <ul className="flex flex-col gap-y-1.5 text-sm text-gray-600">
              <li>
                <LocalizedClientLink
                  href="/about"
                  className="hover:text-gray-900 transition-colors"
                >
                  {t('aboutUs')}
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/purchase-flow"
                  className="hover:text-gray-900 transition-colors"
                >
                  {t('purchaseFlow')}
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/shipping"
                  className="hover:text-gray-900 transition-colors"
                >
                  {t('shippingDetails')}
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/payment"
                  className="hover:text-gray-900 transition-colors"
                >
                  {t('paymentMethods')}
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/notice"
                  className="hover:text-gray-900 transition-colors"
                >
                  {t('notice')}
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/maintenance"
                  className="hover:text-gray-900 transition-colors"
                >
                  {t('maintenance')}
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/returns"
                  className="hover:text-gray-900 transition-colors"
                >
                  {t('returnPolicy')}
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">{t('stayConnected')}</h3>
            <p className="text-sm text-gray-600">
              {t('newsletterDesc')}
            </p>
            <form className="flex flex-col gap-y-3">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="px-4 py-2.5 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gray-900 text-white font-medium text-sm rounded hover:bg-gray-800 transition-colors"
              >
                {t('subscribe')}
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
              © {new Date().getFullYear()} ESHOP. {t('copyright')}
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <LocalizedClientLink
                href="/privacy-policy"
                className="hover:text-gray-900 transition-colors"
              >
                {t('privacy')}
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/terms"
                className="hover:text-gray-900 transition-colors"
              >
                {t('terms')}
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/cookies"
                className="hover:text-gray-900 transition-colors"
              >
                {t('cookies')}
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
