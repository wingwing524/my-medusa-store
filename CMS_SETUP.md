# CMS Module Setup Guide

## ✅ Files Created

Backend Module (Medusa):
- ✅ `src/modules/page/models/page.ts` - Page data model
- ✅ `src/modules/page/service.ts` - Page service
- ✅ `src/modules/page/index.ts` - Module exports
- ✅ `src/api/admin/pages/route.ts` - Admin API (list/create)
- ✅ `src/api/admin/pages/[id]/route.ts` - Admin API (get/update/delete)
- ✅ `src/api/store/pages/route.ts` - Store API (list published)
- ✅ `src/api/store/pages/[slug]/route.ts` - Store API (get by slug)

Admin UI:
- ✅ `src/admin/components/rich-text-editor.tsx` - Rich text editor component
- ✅ `src/admin/routes/pages/config.tsx` - Route config
- ✅ `src/admin/routes/pages/page.tsx` - Pages list view
- ✅ `src/admin/routes/pages/[id]/page.tsx` - Page editor

Storefront:
- ✅ `src/lib/data/pages.ts` - Data fetching functions
- ✅ `src/app/[countryCode]/(main)/[slug]/page.tsx` - Dynamic page template

Configuration:
- ✅ Updated `medusa-config.ts` - Registered page module

## 📦 Next Steps

### 1. Install TipTap Rich Text Editor Dependencies

Run in your backend directory:

```powershell
cd c:\Users\sim\Desktop\github\eshop\my-medusa-store
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-text-align @tiptap/extension-color @tiptap/extension-text-style
```

### 2. Run Database Migration

```powershell
cd c:\Users\sim\Desktop\github\eshop\my-medusa-store
npx medusa db:migrate
```

### 3. Restart Backend Server

Stop your current backend and restart it using `start.bat`.

## 🎯 How to Use

### Creating Pages in Admin

1. Go to http://localhost:9000/app
2. Look for "Pages" in the sidebar (new menu item)
3. Click "Create Page"
4. Fill in:
   - **Title**: e.g., "Returns Policy"
   - **Slug**: e.g., "returns" (or click "Generate from Title")
   - **Content**: Use the rich text editor with formatting, images, links
   - **Status**: Set to "Published" when ready
5. Click "Save Page"

### Accessing Pages on Storefront

Pages will be available at:
- `http://localhost:8000/hk/returns`
- `http://localhost:8000/hk/privacy`
- `http://localhost:8000/hk/terms`
- etc.

## 🎨 Rich Text Editor Features

- **Text Formatting**: Bold, Italic, Strikethrough
- **Headings**: H1, H2, H3
- **Lists**: Bulleted and numbered lists
- **Alignment**: Left, center, right
- **Images**: Insert images via URL
- **Links**: Add hyperlinks
- **More**: Color, text styles via TipTap extensions

## 🔧 API Endpoints

### Admin (Protected)
- `GET /admin/pages` - List all pages
- `POST /admin/pages` - Create page
- `GET /admin/pages/:id` - Get page
- `POST /admin/pages/:id` - Update page
- `DELETE /admin/pages/:id` - Delete page

### Store (Public)
- `GET /store/pages` - List published pages
- `GET /store/pages/:slug` - Get page by slug

## 💡 Example: Creating a Returns Page

1. In admin, create new page:
   - Title: "Returns & Exchanges"
   - Slug: "returns"
   - Content: (Use rich text editor to format)
   - Status: Published

2. Access at: `http://localhost:8000/hk/returns`

## 🚨 Troubleshooting

If you get errors:
1. Make sure dependencies are installed
2. Run migrations: `npx medusa db:migrate`
3. Restart the backend server
4. Check logs for specific errors

## ✨ What You Get

✅ Full CMS functionality for managing pages
✅ Rich text editor with WYSIWYG capabilities
✅ SEO-friendly (meta title, description)
✅ Draft/Published status
✅ Multilingual support ready (can add translations)
✅ Clean admin UI integrated with Medusa
✅ Dynamic storefront pages
