"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { ChevronDown } from "lucide-react"

import { StateType } from "@lib/hooks/use-toggle-state"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  toggleState: StateType
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = ({ toggleState, regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<CountryOption | null>(null)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  const { state, close } = toggleState

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      setCurrent(option || null)
    }
  }, [options, countryCode])

  const handleChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath)
  }

  return (
    <div className="w-full">
      <Listbox
        onChange={handleChange}
        value={current ?? undefined}
      >
        {({ open }) => (
          <>
            <ListboxButton className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-300 rounded text-sm text-gray-900 hover:border-gray-400 transition-colors">
              {current ? (
                <span className="flex items-center gap-2">
                  {/* @ts-ignore */}
                  <ReactCountryFlag
                    svg
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    countryCode={current.country ?? ""}
                  />
                  <span className="font-medium">{current.label}</span>
                </span>
              ) : (
                <span className="text-gray-500">Select region</span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute left-4 right-4 mt-2 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded shadow-lg z-10">
                {options?.map((o, index) => (
                  <ListboxOption
                    key={index}
                    value={o}
                    className={({ active, selected }) =>
                      `px-4 py-3 cursor-pointer flex items-center gap-3 ${
                        active ? 'bg-gray-100' : ''
                      } ${selected ? 'bg-gray-50 font-medium' : ''}`
                    }
                  >
                    {/* @ts-ignore */}
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                      countryCode={o?.country ?? ""}
                    />
                    <span className="text-sm text-gray-900">{o?.label}</span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default CountrySelect
