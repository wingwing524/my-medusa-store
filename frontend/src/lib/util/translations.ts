/**
 * Get translated field from metadata or fallback to default value
 * 
 * @param metadata - Object metadata from Medusa (product, collection, etc.)
 * @param field - Field name to translate (e.g., 'name', 'description')
 * @param locale - Current locale (e.g., 'zh-TW', 'en')
 * @param defaultValue - Fallback value if translation not found
 * @returns Translated value or default
 */
export function getTranslation(
  metadata: Record<string, any> | null | undefined,
  field: string,
  locale: string,
  defaultValue: string
): string {
  if (!metadata || locale === 'en') {
    return defaultValue
  }

  const translationKey = `${field}_${locale}`
  const translation = metadata[translationKey]

  return translation || defaultValue
}

/**
 * Get translated name from metadata
 */
export function getTranslatedName(
  item: { name: string; metadata?: Record<string, any> | null },
  locale: string
): string {
  return getTranslation(item.metadata, 'name', locale, item.name)
}

/**
 * Get translated description from metadata
 */
export function getTranslatedDescription(
  item: { description?: string | null; metadata?: Record<string, any> | null },
  locale: string
): string {
  return getTranslation(item.metadata, 'description', locale, item.description || '')
}
