# Multi-Language Product & Collection Setup Guide

## Overview
Your storefront now supports multi-language product and collection names using Medusa's metadata field. Translations are stored as metadata and automatically displayed based on the user's selected language.

## How It Works

### Translation Logic
- English (`en`): Uses the default `name` and `description` fields
- Traditional Chinese (`zh-TW`): Uses metadata fields `name_zh-TW` and `description_zh-TW`
- If translation is missing, falls back to English

### Metadata Field Format
```json
{
  "name_zh-TW": "手提包",
  "description_zh-TW": "優質真皮手提包系列"
}
```

## Adding Translations in Admin Panel

### For Products

1. **Go to Products** in Medusa Admin
2. **Click on a product** to edit
3. **Scroll to "Metadata" section** (usually at bottom)
4. **Click "Add Metadata"**
5. **Add these fields:**
   - **Key:** `name_zh-TW`
   - **Value:** `手提包` (Chinese name)
   
   Click "Add Metadata" again:
   - **Key:** `description_zh-TW`
   - **Value:** `優質真皮手提包系列` (Chinese description)

6. **Save the product**

### For Collections

1. **Go to Collections** in Medusa Admin
2. **Click on a collection** to edit
3. **Find "Metadata" section**
4. **Add metadata fields:**
   - **Key:** `name_zh-TW`
   - **Value:** `手提包系列` (Chinese collection name)

5. **Save the collection**

### For Categories

1. **Go to Categories** in Medusa Admin
2. **Click on a category** to edit
3. **Find "Metadata" section**
4. **Add metadata:**
   - **Key:** `name_zh-TW`
   - **Value:** `配件` (Chinese category name)

4. **Save the category**

## Example: Complete Product Translation

**English (Default Fields):**
- Name: `Leather Handbag`
- Description: `Premium genuine leather handbag with gold hardware`

**Metadata (for Chinese):**
```json
{
  "name_zh-TW": "真皮手提包",
  "description_zh-TW": "優質真皮手提包配金色五金配件"
}
```

**Result:**
- When user selects English → Shows "Leather Handbag"
- When user selects 繁體中文 → Shows "真皮手提包"

## What's Been Updated

### Storefront Components:
✅ Side menu categories (mobile & desktop)
✅ Product listing pages
✅ Product detail pages (title, description, collection name)
✅ Product preview cards
✅ Footer product links

### Translation Helper:
- Location: `src/lib/util/translations.ts`
- Functions: `getTranslatedName()`, `getTranslatedDescription()`

## Quick Reference

### Metadata Keys to Use:
| Field | Metadata Key | Example Value |
|-------|-------------|---------------|
| Product Name | `name_zh-TW` | `真皮手提包` |
| Product Description | `description_zh-TW` | `優質真皮手提包` |
| Collection Name | `name_zh-TW` | `手提包系列` |
| Category Name | `name_zh-TW` | `配件` |

## Notes

- Metadata is stored as JSON in Medusa database
- No database migration needed
- Works with existing Medusa structure
- Can add more languages by adding more metadata keys (e.g., `name_ja` for Japanese)
- If metadata is empty, falls back to default English name

## Bulk Import (Optional)

If you have many products, you can use Medusa's import/export:
1. Export products to CSV
2. Add metadata columns: `metadata.name_zh-TW`, `metadata.description_zh-TW`
3. Fill in translations
4. Import back to Medusa

---

**Start adding translations to see them appear when users switch to 繁體中文!**
