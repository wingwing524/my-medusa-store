"use client"

import { X } from "lucide-react"
import { useState } from "react"
import CountdownTimer from "./countdown-timer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type PromotionalBannerClientProps = {
  bannerId: string
  message: string
  endDate: string
  backgroundColor: string
  textColor: string
  linkUrl?: string | null
  locale: string
}

export default function PromotionalBannerClient({
  bannerId,
  message,
  endDate,
  backgroundColor,
  textColor,
  linkUrl,
  locale,
}: PromotionalBannerClientProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    // Store dismissal in sessionStorage (cleared on browser close/refresh)
    sessionStorage.setItem(`dismissed_banner_${bannerId}`, 'true')
  }

  if (!isVisible) {
    return null
  }

  const content = (
    <div
      className="w-full py-3 px-4 sticky top-0 z-30"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="content-container flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-4 flex-wrap">
          <span className="font-medium text-center">{message}</span>
          <CountdownTimer endDate={endDate} locale={locale} />
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  if (linkUrl) {
    return (
      <LocalizedClientLink href={linkUrl} className="block hover:opacity-95 transition-opacity">
        {content}
      </LocalizedClientLink>
    )
  }

  return content
}
