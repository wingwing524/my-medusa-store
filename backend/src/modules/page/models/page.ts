import { model } from "@medusajs/framework/utils"

const Page = model.define("page", {
  id: model.id().primaryKey(),
  title: model.text(),
  slug: model.text(),
  locale: model.enum(["en", "zh-TW"]).default("en"),
  content: model.text(), // Rich text HTML content
  excerpt: model.text().nullable(), // Short description
  meta_title: model.text().nullable(),
  meta_description: model.text().nullable(),
  featured_image: model.text().nullable(), // Featured image URL
  status: model.enum(["draft", "published"]).default("draft"),
})
.indexes([
  {
    on: ["slug", "locale"],
    unique: true,
  },
])

export default Page
