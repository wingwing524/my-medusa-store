import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPage } from "@lib/data/pages"
import { cookies } from "next/headers"

type Props = {
  params: Promise<{ slug: string; countryCode: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  const page = await getPage(slug, locale)

  if (!page) {
    return {
      title: "Page Not Found",
    }
  }

  return {
    title: page.meta_title || page.title,
    description: page.meta_description || page.excerpt,
  }
}

export default async function PageTemplate({ params }: Props) {
  const { slug } = await params
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  const page = await getPage(slug, locale)

  if (!page) {
    notFound()
  }

  return (
    <div className="content-container py-12">
      {/* Featured Image */}
      {page.featured_image && (
        <div className="mb-8">
          <img
            src={page.featured_image}
            alt={page.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      {/* Page Content - Rich Text HTML */}
      <div 
        className="prose prose-lg max-w-none prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .prose ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .prose ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        .prose li {
          margin: 0.5rem 0;
        }
        .prose ul ul {
          list-style-type: circle;
        }
        .prose ol ol {
          list-style-type: lower-alpha;
        }
      `}} />

      {/* Metadata Footer */}
      <div className="mt-12 pt-6 border-t text-sm text-ui-fg-subtle">
        Last updated: {new Date(page.updated_at).toLocaleDateString()}
      </div>
    </div>
  )
}
