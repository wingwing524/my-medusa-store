import { model } from "@medusajs/framework/utils"

const PromotionalBanner = model.define("promotional_banner", {
  id: model.id().primaryKey(),
  message: model.text(),
  message_zh_tw: model.text().nullable(),
  start_date: model.dateTime(),
  end_date: model.dateTime(),
  is_active: model.boolean().default(false),
  background_color: model.text().default("#000000"),
  text_color: model.text().default("#FFFFFF"),
  link_url: model.text().nullable(),
})

export default PromotionalBanner
