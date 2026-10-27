# Zyra - Accessories Store (Next.js + Tailwind CSS)

Premium accessories storefront built from the mockup. Content is driven by JSON, animations are smooth, and the mobile version has its own app-style navigation.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Needs Node.js 18.17+ and internet the first time (npm packages, Google Fonts).

Production: `npm run build` then `npm start`.

## Pages

| URL | Description |
| --- | --- |
| `/` | Home: hero, categories, Trendy banner, Best Sellers, Exclusive Offer, features |
| `/shop` | All products, category chips, search, sort (`/shop?category=bags`) |
| `/product/[slug]` | Product page: color, quantity, add to cart, buy now, details |
| `/cart` | Cart with quantity, free-shipping progress, promo code |
| `/checkout` | 3 steps: Shipping, Payment, Confirmation (Order Placed) |
| `/order` | Your Order: items, Track Order, Need Help, Return Policy, rate your order |
| `/track` | Order tracking timeline and map |
| `/wishlist` | Saved products |
| `/about`, `/contact`, `/privacy`, `/terms` | Info pages |

Working features: cart, wishlist, promo code (`ZYRA30` = 30% off), search overlay, card/PayPal/Apple Pay/Cash on Delivery payment step with validation, order history (last order), tracking, ratings, newsletter and contact forms.

Everything is saved in the browser (localStorage), so it survives a refresh.

## Mobile

Phones get a floating bottom tab bar (Home, Shop, Wishlist, Cart, Orders), a slide-in menu, horizontal swipe carousels for categories and best sellers, a sticky Add to Cart bar on product pages, and 16px inputs so iOS never zooms.

## Editing content (no code)

| What | File |
| --- | --- |
| Name, contact, social links, menu, shipping fee, free-shipping amount, promo codes | `src/data/site.json` |
| Products, prices, colors, ratings, categories | `src/data/products.json` |
| Home page text and banners | `src/data/home.json` |
| Checkout form fields, payment methods, order placed text | `src/data/checkout.json` |
| Tracking stages and timing | `src/data/tracking.json` |
| About, legal, order page help rows | `about.json`, `legal.json`, `order.json` |

### Add a product

Add an object in `src/data/products.json` and put the photo in `public/images/`:

```json
{
  "id": "pearl-necklace",
  "slug": "pearl-necklace",
  "name": "Pearl Necklace",
  "price": 44.99,
  "category": "jewelry",
  "image": "/images/product-pearl.jpg",
  "rating": 4.8,
  "reviews": 31,
  "bestSeller": true,
  "colors": [{ "name": "Pearl", "hex": "#F3E6CF" }],
  "defaultColor": "Pearl",
  "description": "Short description.",
  "details": ["Detail one", "Detail two"]
}
```

`"bestSeller": true` shows it on the home page.

### Colors and fonts

- Palette: `tailwind.config.js` (`gold`, `cream`, `espresso`, `night`, `olive`)
- Fonts: `src/app/layout.jsx` (DM Serif Display for headings, DM Sans for text)

### Animations

`<Reveal variant="up" delay={100}>` wraps any block. Variants: `up`, `down`, `left`, `right`, `zoom`, `fade`. All motion turns off for visitors who prefer reduced motion.

### Preview tracking quickly

In `src/data/tracking.json` set `"timeScale": 60` to make 1 real minute equal 1 hour of delivery progress.

## Folder structure

```
src/
  app/            Routes, layout, global CSS, API routes
  components/
    ui/           Button, Container, Icon, Reveal, Stars, Logo, PageHeader...
    layout/       Header, Footer, MobileTabBar, SearchOverlay
    sections/     Home sections (Hero, CategoryRow, PromoBanner, BestSellers...)
    shop/         ProductCard, ShopBrowser, ProductDetail, WishlistButton
    cart/         CartView, OrderSummary, PromoCodeForm, Toast
    checkout/     CheckoutFlow, StepIndicator, OrderPlaced
    order/        OrderView, TrackView, RateModal
  context/        StoreContext (cart, wishlist, promo, last order)
  data/           All content as JSON
  lib/            products, pricing, formatting helpers
public/images/    Photos and logo
```

## Notes

- All photos were cut from the mockup, so they are low resolution. Replace files in `public/images/` using the same names for sharp originals. Product images are one photo per product, so choosing a color changes the label only.
- Hats has no product yet (the mockup shows only a category photo), so it shows a "coming soon" state. Add a product with `"category": "hats"` to fill it.
- Card details are validated in the browser and never stored or sent. The payment step is a demo and takes no real payment.
- Orders, contact messages and newsletter sign-ups are logged in the terminal by `src/app/api/*`. Connect email, a database or your store backend there.
- Contact details, phone, email and legal text are placeholders. Replace before launch.
