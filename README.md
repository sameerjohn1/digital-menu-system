# Animated Digital Menu

Frontend-only, multi-platform QR menu built with the Next.js App Router and static export. Each platform has its own JSON config, branding, menu, WhatsApp number, and exactly one QR code that opens its menu directly.

## Routes

- `/menu/demo-cafe` - The Artisan Roast Café & Bakery
- `/menu/royal-bbq` - Royal BBQ House
- `/menu/firestone-pizza` - Firestone Pizza House
- `/qr-codes` - QR gallery for viewing, testing, and downloading one QR per platform

## Add another platform

1. Create `data/clients/<slug>.json`. The `slug` field must match the filename.
2. Include `name`, `tagline`, `description`, `whatsappNumber`, `currency`, `logo`, `coverImage`, `theme`, `openingHours`, `address`, `googleMapsUrl`, `socialLinks`, `promoBanner`, `tables`, `categories`, and `items`.
3. Use remote image URLs, or add local images under `public/images/` and reference them as `/images/...`.
4. Run QR generation and rebuild.

No registry or route code needs editing. `generateStaticParams()` discovers every valid JSON file in `data/clients/` at build time, and the QR generator creates one QR for each discovered platform automatically.

## Generate QR codes

```bash
npm run generate-qr
```

To use a different production domain:

```bash
npm run generate-qr -- --url https://menus.example.com
# or
MENU_BASE_URL=https://menus.example.com npm run generate-qr
```

The default production domain is in `config/site.json`. `NEXT_PUBLIC_MENU_BASE_URL` can override the destination shown in the QR gallery when building.

Generated assets are written to `public/qr-codes/<slug>/`:

- `<slug>.svg` / `<slug>.png` -> `/menu/<slug>`
- `manifest.json` lists every platform and its QR destination

Every platform gets exactly one QR card with the platform name and menu path. All QR codes use the configured production base URL, not localhost.

## Table parameter

Table-specific QR codes are not generated. If a URL is opened manually with `?table=N`, the table number is still stored in the cart and included in the WhatsApp order message.

## Development and verification

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```
