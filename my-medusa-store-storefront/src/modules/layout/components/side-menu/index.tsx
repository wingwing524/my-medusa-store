"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { useToggleState } from "@medusajs/ui"
import { Fragment, useState } from "react"
import { ChevronDown, ChevronRight, LogIn, Heart, Bell, HelpCircle } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"

interface SideMenuProps {
  regions: HttpTypes.StoreRegion[] | null
  categories?: HttpTypes.StoreProductCategory[]
}

const SideMenu = ({ regions, categories = [] }: SideMenuProps) => {
  const toggleState = useToggleState()
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const topLevelCategories = categories.filter(
    (cat) => !cat.parent_category_id
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const getCategoryChildren = (parentId: string) => {
    return categories.filter((cat) => cat.parent_category_id === parentId)
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  Menu
                </Popover.Button>
              </div>

              {/* Backdrop */}
              <Transition
                show={open}
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="fixed inset-0 z-40 bg-black/50"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              </Transition>

              {/* White Sidebar Panel */}
              <Transition
                show={open}
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <PopoverPanel className="fixed left-0 top-0 z-50 h-full w-80 bg-white shadow-2xl transform transition-transform">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                      <button
                        onClick={close}
                        data-testid="close-menu-button"
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <XMark className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                      {/* Categories */}
                      <div className="p-4">
                        <ul className="space-y-1">
                          {topLevelCategories.map((category) => {
                            const children = getCategoryChildren(category.id)
                            const hasChildren = children.length > 0
                            const isExpanded = expandedCategories.includes(
                              category.id
                            )

                            return (
                              <li key={category.id}>
                                <div className="flex items-center">
                                  {hasChildren ? (
                                    <button
                                      onClick={() => toggleCategory(category.id)}
                                      className="flex-1 flex items-center justify-between py-2 px-3 text-gray-900 hover:bg-gray-100 rounded transition-colors text-left"
                                    >
                                      <span className="font-medium">
                                        {category.name}
                                      </span>
                                      {isExpanded ? (
                                        <ChevronDown className="w-4 h-4" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4" />
                                      )}
                                    </button>
                                  ) : (
                                    <LocalizedClientLink
                                      href={`/categories/${category.handle}`}
                                      className="flex-1 py-2 px-3 text-gray-900 hover:bg-gray-100 rounded transition-colors font-medium"
                                      onClick={close}
                                    >
                                      {category.name}
                                    </LocalizedClientLink>
                                  )}
                                </div>

                                {/* Child Categories */}
                                {hasChildren && isExpanded && (
                                  <ul className="ml-4 mt-1 space-y-1">
                                    {children.map((child) => (
                                      <li key={child.id}>
                                        <LocalizedClientLink
                                          href={`/categories/${child.handle}`}
                                          className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded transition-colors text-sm"
                                          onClick={close}
                                        >
                                          {child.name}
                                        </LocalizedClientLink>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      </div>

                      {/* Country Select */}
                      <div className="px-4 py-4 border-t border-gray-200">
                        <div className="flex flex-col gap-y-3">
                          <span className="text-sm font-medium text-gray-900">
                            Shipping to:
                          </span>
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-gray-200 p-4">
                      {/* Sign In Button */}
                      <LocalizedClientLink
                        href="/account"
                        onClick={close}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-900 text-white hover:bg-gray-800 rounded-md transition-colors mb-4"
                      >
                        <LogIn className="w-4 h-4" />
                        <span className="font-medium">Sign In / Join Us</span>
                      </LocalizedClientLink>

                      {/* Action Grid */}
                      <div className="grid grid-cols-3 gap-2">
                        <LocalizedClientLink
                          href="/account/favorites"
                          onClick={close}
                          className="flex flex-col items-center justify-center gap-2 py-3 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Heart className="w-5 h-5 text-gray-700" />
                          <span className="text-xs text-gray-700">Favorites</span>
                        </LocalizedClientLink>

                        <LocalizedClientLink
                          href="/account/alerts"
                          onClick={close}
                          className="flex flex-col items-center justify-center gap-2 py-3 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Bell className="w-5 h-5 text-gray-700" />
                          <span className="text-xs text-gray-700">Alerts</span>
                        </LocalizedClientLink>

                        <LocalizedClientLink
                          href="/faq"
                          onClick={close}
                          className="flex flex-col items-center justify-center gap-2 py-3 hover:bg-gray-100 rounded transition-colors"
                        >
                          <HelpCircle className="w-5 h-5 text-gray-700" />
                          <span className="text-xs text-gray-700">FAQ</span>
                        </LocalizedClientLink>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
