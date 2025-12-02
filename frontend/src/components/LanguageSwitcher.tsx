"use client"

import { useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (locale: string) => {
    startTransition(() => {
      Cookies.set('locale', locale, { expires: 365 })
      // Force a hard navigation to trigger proper re-render with new locale
      window.location.href = pathname
    })
  }

  return (
    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-0.5 rounded transition-colors ${
          currentLocale === 'en'
            ? 'bg-gray-900 text-white font-medium'
            : 'text-ui-fg-subtle hover:text-ui-fg-base'
        }`}
        disabled={isPending}
      >
        EN
      </button>
      <span className="text-ui-border-base">|</span>
      <button
        onClick={() => switchLocale('zh-TW')}
        className={`px-2 py-0.5 rounded transition-colors ${
          currentLocale === 'zh-TW'
            ? 'bg-gray-900 text-white font-medium'
            : 'text-ui-fg-subtle hover:text-ui-fg-base'
        }`}
        disabled={isPending}
      >
        繁中
      </button>
    </div>
  )
}
