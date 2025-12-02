import { getActiveBanner } from "@lib/data/promotional-banner"
import { cookies } from "next/headers"
import PromotionalBannerClient from "./client"

export default async function PromotionalBanner() {
  const banner = await getActiveBanner()

  if (!banner) {
    return null
  }

  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'

  const message = locale === 'zh-TW' && banner.message_zh_tw 
    ? banner.message_zh_tw 
    : banner.message

  return (
    <PromotionalBannerClient
      bannerId={banner.id}
      message={message}
      endDate={banner.end_date}
      backgroundColor={banner.background_color}
      textColor={banner.text_color}
      linkUrl={banner.link_url}
      locale={locale}
    />
  )
}
