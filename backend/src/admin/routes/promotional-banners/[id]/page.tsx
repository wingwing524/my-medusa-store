"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PromotionalBannerForm from "../components/banner-form"

export default function EditPromotionalBannerPage() {
  const { id } = useParams()
  const [banner, setBanner] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id && id !== "new") {
      fetch(`/admin/promotional-banners/${id}`, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          setBanner(data.banner)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Failed to load banner:", err)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (id !== "new" && !banner) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-600">Banner not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <PromotionalBannerForm banner={banner} isEdit={id !== "new"} />
    </div>
  )
}
