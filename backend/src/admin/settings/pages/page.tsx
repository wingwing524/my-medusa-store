import { useEffect, useState } from "react"
import { Container, Heading, Button, Table, Badge } from "@medusajs/ui"
import { useNavigate } from "react-router-dom"
import { PencilSquare, Trash, Plus } from "@medusajs/icons"

export default function PagesListPage() {
  const navigate = useNavigate()
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch('/admin/pages', {
        credentials: 'include',
      })
      const data = await response.json()
      setPages(data.pages || [])
    } catch (error) {
      console.error('Failed to fetch pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return
    
    try {
      await fetch(`/admin/pages/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      fetchPages()
    } catch (error) {
      console.error('Failed to delete page:', error)
    }
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <Heading level="h1">Content Pages</Heading>
        <Button onClick={() => navigate('pages/new')}>
          <Plus /> Create Page
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Slug</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Updated</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pages.map((page) => (
              <Table.Row key={page.id}>
                <Table.Cell>{page.title}</Table.Cell>
                <Table.Cell>/{page.slug}</Table.Cell>
                <Table.Cell>
                  <Badge color={page.status === 'published' ? 'green' : 'grey'}>
                    {page.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {new Date(page.updated_at).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => navigate(`pages/${page.id}`)}
                    >
                      <PencilSquare />
                    </Button>
                    <Button
                      size="small"
                      variant="danger"
                      onClick={() => deletePage(page.id)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}
