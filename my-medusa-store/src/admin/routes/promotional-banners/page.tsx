"use client"

import { useEffect, useState } from "react"
import { Container, Heading, Button, Table, Badge } from "@medusajs/ui"
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { BellAlert, PencilSquare, Trash, Plus } from "@medusajs/icons"
import { useNavigate } from "react-router-dom"

const PromotionalBannersPage = () => {
  const navigate = useNavigate()
  const [banners, setBanners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const response = await fetch("/admin/promotional-banners", { credentials: "include" })
      const data = await response.json()
      setBanners(data.banners || [])
    } catch (error) {
      console.error("Error fetching banners:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return

    try {
      await fetch(`/admin/promotional-banners/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      fetchBanners()
    } catch (error) {
      console.error("Error deleting banner:", error)
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/admin/promotional-banners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ is_active: !currentStatus }),
      })
      fetchBanners()
    } catch (error) {
      console.error("Error toggling banner:", error)
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <Heading level="h1">Promotional Banners</Heading>
        <Button onClick={() => navigate('new')}>
          <Plus /> Create Banner
        </Button>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Message</Table.HeaderCell>
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>End Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {banners.length === 0 ? (
            <Table.Row>
              <Table.Cell className="text-center text-gray-500">
                No promotional banners found. Create your first banner!
              </Table.Cell>
            </Table.Row>
          ) : (
            banners.map((banner) => (
              <Table.Row key={banner.id}>
                <Table.Cell className="max-w-md truncate">{banner.message}</Table.Cell>
                <Table.Cell>
                  {new Date(banner.start_date).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  {new Date(banner.end_date).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => toggleActive(banner.id, banner.is_active)}
                  >
                    <Badge color={banner.is_active ? "green" : "grey"}>
                      {banner.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => navigate(banner.id)}
                    >
                      <PencilSquare />
                    </Button>
                    <Button
                      size="small"
                      variant="danger"
                      onClick={() => handleDelete(banner.id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Promotional Banners",
  icon: BellAlert,
})

export default PromotionalBannersPage
