import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Heading, Button, Input, Label, Select, Textarea } from "@medusajs/ui"
import { RichTextEditor } from "../../../components/rich-text-editor"
import { ArrowLeft } from "@medusajs/icons"

export default function PageEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    locale: 'en',
    content: '',
    excerpt: '',
    meta_title: '',
    meta_description: '',
    featured_image: '',
    status: 'draft',
  })
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      fetchPage()
    }
  }, [id])

  const fetchPage = async () => {
    try {
      const response = await fetch(`/admin/pages/${id}`, {
        credentials: 'include',
      })
      const data = await response.json()
      setFormData(data.page)
    } catch (error) {
      console.error('Failed to fetch page:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = isNew ? '/admin/pages' : `/admin/pages/${id}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        navigate('/pages')
      }
    } catch (error) {
      console.error('Failed to save page:', error)
    } finally {
      setSaving(false)
    }
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData({ ...formData, slug })
  }

  if (loading) return <p>Loading...</p>

  return (
    <Container>
      <div className="mb-6">
        <Button variant="secondary" onClick={() => navigate('/pages')}>
          <ArrowLeft /> Back to Pages
        </Button>
      </div>

      <Heading level="h1" className="mb-6">
        {isNew ? 'Create Page' : 'Edit Page'}
      </Heading>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <Label>Title *</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Returns Policy"
          />
        </div>

        {/* Slug */}
        <div>
          <Label>Slug *</Label>
          <div className="flex gap-2">
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g., returns"
            />
            <Button variant="secondary" onClick={generateSlug}>
              Generate from Title
            </Button>
          </div>
          <p className="text-xs text-ui-fg-subtle mt-1">
            URL: /hk/{formData.slug || 'your-slug'}
          </p>
        </div>

        {/* Locale */}
        <div>
          <Label>Language *</Label>
          <Select
            value={formData.locale}
            onValueChange={(value) => setFormData({ ...formData, locale: value })}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="en">English</Select.Item>
              <Select.Item value="zh-TW">繁體中文</Select.Item>
            </Select.Content>
          </Select>
          <p className="text-xs text-ui-fg-subtle mt-1">
            Select the language for this page content
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <Label>Excerpt (Short Description)</Label>
          <Textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Brief description for previews..."
            rows={2}
          />
        </div>

        {/* Rich Text Content */}
        <div>
          <Label>Content *</Label>
          <RichTextEditor
            content={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
          />
        </div>

        {/* Featured Image */}
        <div>
          <Label>Featured Image URL</Label>
          <Input
            value={formData.featured_image}
            onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* SEO Meta */}
        <div className="border-t pt-6">
          <Heading level="h2" className="mb-4">SEO Settings</Heading>
          
          <div className="space-y-4">
            <div>
              <Label>Meta Title</Label>
              <Input
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="Leave empty to use page title"
              />
            </div>
            
            <div>
              <Label>Meta Description</Label>
              <Textarea
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="Description for search engines..."
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <Label>Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="draft">Draft</Select.Item>
              <Select.Item value="published">Published</Select.Item>
            </Select.Content>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-2 border-t pt-6">
          <Button onClick={handleSave} disabled={saving || !formData.title || !formData.slug}>
            {saving ? 'Saving...' : 'Save Page'}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/pages')}>
            Cancel
          </Button>
        </div>
      </div>
    </Container>
  )
}
