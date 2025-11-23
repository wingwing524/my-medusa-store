const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

export async function getPage(slug: string, locale: string = 'en') {
  try {
    const response = await fetch(`${BACKEND_URL}/pages/${slug}?locale=${locale}`, {
      next: {
        tags: [`page:${slug}:${locale}`],
        revalidate: 3600,
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.page
  } catch (error) {
    console.error('Failed to fetch page:', error)
    return null
  }
}

export async function getAllPages() {
  try {
    const response = await fetch(`${BACKEND_URL}/pages`, {
      next: {
        tags: ['pages'],
        revalidate: 3600,
      },
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.pages || []
  } catch (error) {
    console.error('Failed to fetch pages:', error)
    return []
  }
}
