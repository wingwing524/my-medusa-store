"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { useTranslations } from 'next-intl'

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const t = useTranslations('store')
  
  const sortOptions = [
    {
      value: "created_at" as SortOptions,
      label: t('latestArrivals'),
    },
    {
      value: "price_asc" as SortOptions,
      label: t('priceLowToHigh'),
    },
    {
      value: "price_desc" as SortOptions,
      label: t('priceHighToLow'),
    },
  ]
  
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title={t('sortBy')}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
