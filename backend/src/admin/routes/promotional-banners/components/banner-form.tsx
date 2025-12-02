"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function PromotionalBannerForm({
  banner,
  isEdit,
}: {
  banner?: any
  isEdit?: boolean
}) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    message: banner?.message || "",
    message_zh_tw: banner?.message_zh_tw || "",
    start_date: banner?.start_date
      ? new Date(banner.start_date).toISOString().slice(0, 16)
      : "",
    end_date: banner?.end_date
      ? new Date(banner.end_date).toISOString().slice(0, 16)
      : "",
    is_active: banner?.is_active || false,
    background_color: banner?.background_color || "#000000",
    text_color: banner?.text_color || "#FFFFFF",
    link_url: banner?.link_url || "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.message.trim()) {
      setError("Message is required")
      return
    }

    if (!formData.start_date || !formData.end_date) {
      setError("Start date and end date are required")
      return
    }

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      setError("End date must be after start date")
      return
    }

    setLoading(true)

    try {
      const url = isEdit
        ? `/admin/promotional-banners/${banner.id}`
        : "/admin/promotional-banners"

      const method = isEdit ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          link_url: formData.link_url.trim() || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save banner")
      }

      navigate("/promotional-banners")
    } catch (err) {
      setError("Failed to save banner. Please try again.")
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Promotional Banner" : "Create Promotional Banner"}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message (English) *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message_zh_tw"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message (繁體中文)
          </label>
          <textarea
            id="message_zh_tw"
            name="message_zh_tw"
            value={formData.message_zh_tw}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Start Date *
            </label>
            <input
              type="datetime-local"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="end_date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              End Date *
            </label>
            <input
              type="datetime-local"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="background_color"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                id="background_color"
                name="background_color"
                value={formData.background_color}
                onChange={handleChange}
                className="h-10 w-20 border border-gray-300 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={formData.background_color}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    background_color: e.target.value,
                  }))
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="text_color"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Text Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                id="text_color"
                name="text_color"
                value={formData.text_color}
                onChange={handleChange}
                className="h-10 w-20 border border-gray-300 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={formData.text_color}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    text_color: e.target.value,
                  }))
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="link_url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Link URL (Optional)
          </label>
          <input
            type="url"
            id="link_url"
            name="link_url"
            value={formData.link_url}
            onChange={handleChange}
            placeholder="https://example.com/sale"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Make the entire banner clickable (optional)
          </p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="is_active"
            className="ml-2 block text-sm text-gray-900"
          >
            Active (banner will be visible on the storefront)
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : isEdit ? "Update Banner" : "Create Banner"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/promotional-banners")}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
