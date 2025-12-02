import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Button } from '@medusajs/ui'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b bg-ui-bg-subtle">
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-ui-bg-base' : ''}
        >
          Bold
        </Button>
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-ui-bg-base' : ''}
        >
          Italic
        </Button>
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'bg-ui-bg-base' : ''}
        >
          Strike
        </Button>
        <div className="w-px bg-ui-border-base"></div>
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-ui-bg-base' : ''}
        >
          H1
        </Button>
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-ui-bg-base' : ''}
        >
          H2
        </Button>
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-ui-bg-base' : ''}
        >
          H3
        </Button>
        <div className="w-px bg-ui-border-base"></div>
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-ui-bg-base' : ''}
        >
          • List
        </Button>
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-ui-bg-base' : ''}
        >
          1. List
        </Button>
        <div className="w-px bg-ui-border-base"></div>
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          Left
        </Button>
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          Center
        </Button>
        <Button
          size="small"
          variant="secondary"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          Right
        </Button>
        <div className="w-px bg-ui-border-base"></div>
        <Button
          size="small"
          variant="secondary"
          onClick={addImage}
        >
          🖼 Image
        </Button>
        <Button
          size="small"
          variant="secondary"
          onClick={() => {
            const url = window.prompt('Enter link URL:')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
        >
          🔗 Link
        </Button>
      </div>

      {/* Editor */}
      <EditorContent 
        editor={editor} 
        className="tiptap-editor prose prose-slate max-w-none p-4 min-h-[300px] focus:outline-none"
      />
      <style dangerouslySetInnerHTML={{__html: `
        .tiptap-editor .ProseMirror {
          outline: none;
        }
        .tiptap-editor .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .tiptap-editor .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .tiptap-editor .ProseMirror li {
          margin: 0.25rem 0;
        }
        .tiptap-editor .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        .tiptap-editor .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.75rem 0;
        }
        .tiptap-editor .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        .tiptap-editor .ProseMirror p {
          margin: 0.5rem 0;
        }
        .tiptap-editor .ProseMirror strong {
          font-weight: bold;
        }
        .tiptap-editor .ProseMirror em {
          font-style: italic;
        }
        .tiptap-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
        }
      `}} />
    </div>
  )
}
