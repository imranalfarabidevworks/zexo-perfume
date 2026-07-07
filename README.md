# Zexo Perfume — Luxury Fragrance Store

A pixel-matched clone of the Zexo Perfume landing page, built as a full
storefront with Next.js 14 (App Router), MySQL, better-auth authentication,
and Cash on Delivery checkout.

## Stack

- **Next.js 14** (App Router, JavaScript)
- **Tailwind CSS** — dark/gold luxury theme matching the reference design, with a full-bleed hero photo
- **MySQL** (via `mysql2`) — 50 seeded products, orders, order items
- **better-auth** — email/password authentication, stored in the same MySQL database
- **Cash on Delivery** and **Card payment (Stripe Checkout)** at checkout

## 1. Install dependencies

```bash
npm install
```

## 2. Set up MySQL

Create a database and load the schema (creates all tables — including the
`role` column used for admin access — and seeds 50 products):

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS zexo_perfume"
mysql -u root -p zexo_perfume < schema.sql
```

If you already ran an older version of `schema.sql` before the admin
dashboard was added, just run this once to add the missing column:

```bash
mysql -u root -p zexo_perfume -e "ALTER TABLE user ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'user';"
```

## 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your MySQL credentials and a random
secret for better-auth:

```bash
cp .env.example .env
```

```
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=zexo_perfume

BETTER_AUTH_SECRET=replace_with_a_long_random_string
BETTER_AUTH_URL=http://localhost:3000

STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx

SETUP_SECRET=make_up_any_random_string_here
```

Get Stripe test keys free at https://dashboard.stripe.com/test/apikeys — card
payment won't work until these are set, but Cash on Delivery works without them.

`SETUP_SECRET` is only used once, to create the admin account — see the
**Admin dashboard** section below.

Generate a secret quickly with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4. Run the app

```bash
npm run dev
```

Visit http://localhost:3000

## Project structure

```
app/
  page.js                 Home page (hero, signature scents, luxury section, newsletter)
  shop/page.js            Full product grid (50 products)
  product/[slug]/page.js  Product detail + add to cart
  cart/page.js            Shopping bag
  checkout/page.js        Delivery details + Cash on Delivery / Card payment
  checkout/success/       Order confirmation (COD + Stripe)
  login/ register/        better-auth email & password screens
  orders/page.js          Order history (signed-in users)
  orders/[id]/page.js     Single order detail + status tracker
  track/page.js           Guest order tracking (order number + phone)
  admin/
    layout.js             Role guard + admin nav tabs
    page.js               Overview (orders, revenue, pending, delivered)
    orders/page.js         Manage orders (change status, delete)
    products/page.js       Add / delete products
  api/
    auth/[...all]/        better-auth handler (signup, login, session, signout)
    products/              Product list + single product endpoints
    orders/                Create order (COD/card) + fetch order history
    orders/[id]/           Single order detail (signed-in owner only)
    orders/track/          Guest tracking lookup (order number + phone)
    checkout-session/      Stripe Checkout session create + confirm
    admin/orders/          Admin: list/update/delete orders
    admin/products/        Admin: list/create/delete products
    setup-admin/           One-time admin account creation
components/
  Header.js, Footer.js, ProductCard.js, Newsletter.js, CartContext.js
  OrderStatusTracker.js   Visual step tracker used on /orders/[id] and /track
lib/
  db.js                   MySQL connection pool (raw queries for shop data)
  auth.js                 better-auth server config (MySQL-backed, includes role field)
  auth-client.js          better-auth React client (useSession, signIn, signOut)
  admin-guard.js          Server-side helper: verifies role === 'admin'
data/products.js          Fallback product data (used if DB isn't reachable yet)
schema.sql                Full MySQL schema + seed data (includes role column)
scripts/seed.js           Re-seed products table any time: `npm run seed`
```

## How checkout works

**Cash on Delivery**
1. Customer adds products to their cart (stored in `localStorage` via `CartContext`).
2. At `/checkout`, they enter name, phone, address and city and pick "Cash on Delivery".
3. `POST /api/orders` saves the order immediately with `payment_method = 'cod'`, `status = 'pending'`.
4. Customer is redirected to `/checkout/success` with their order number.

**Card Payment (Stripe Checkout)**
1. Customer picks "Credit / Debit Card" at checkout.
2. `POST /api/orders` first saves the order as `status = 'awaiting_payment'`.
3. `POST /api/checkout-session` creates a Stripe Checkout Session for the cart total and redirects the customer to Stripe's hosted payment page.
4. On success, Stripe redirects back to `/checkout/success?session_id=...`, which calls `/api/checkout-session/confirm` to verify the payment and mark the order `paid` / `confirmed`.
5. For production, also add a Stripe webhook (`checkout.session.completed`) as a safety net in case the customer closes the tab before returning — the current flow relies on the success-page confirmation, which covers the normal case.

To enable card payments, add your Stripe keys to `.env`:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Get test keys from https://dashboard.stripe.com/test/apikeys — no real card
details ever touch this app's own server, Stripe hosts the payment form.

## Order tracking

- **Signed-in customers**: `/orders` lists every order they've placed, and
  "View Details" on each one opens `/orders/[id]` with a visual status
  tracker (Order Placed → Confirmed → Out for Delivery → Delivered).
- **Guests** (or anyone without an account): `/track` lets them look up an
  order by **order number + phone number** — no login needed. This calls
  `GET /api/orders/track`.
- Both views use the same `<OrderStatusTracker />` component
  (`components/OrderStatusTracker.js`).

## Admin dashboard

`/admin` is a role-protected area only the admin account can open. Regular
customers who sign up through `/register` always get `role = 'user'` and see
an "Access Denied" screen if they try to visit it.

**One-time setup — create the admin account:**

1. Run the `role` column migration (see step 2 below if you haven't already).
2. Add a `SETUP_SECRET` to `.env` (any random string you make up).
3. Restart the server, then visit once in your browser:
   ```
   http://localhost:3000/api/setup-admin?secret=YOUR_SETUP_SECRET
   ```
   This creates (or promotes) the account:
   ```
   email:    admin@gmail.com
   password: Admin12345
   ```
4. Log in at `/login` with those credentials, then visit `/admin`.
5. Optional: delete `app/api/setup-admin/route.js` afterwards so the route
   no longer exists in production.

**What the dashboard can do:**
- **Overview** (`/admin`) — total orders, total revenue, pending count, delivered count.
- **Orders** (`/admin/orders`) — see every order with customer details, change
  status via dropdown (`pending → confirmed → out_for_delivery → delivered`,
  or `cancelled`), or delete an order entirely.
- **Products** (`/admin/products`) — add a brand-new product (name, price,
  image URL, description) which instantly appears on `/shop`, or delete an
  existing one.

All `/api/admin/*` routes check the signed-in user's `role` server-side
(`lib/admin-guard.js`) — customers can never reach these endpoints even by
guessing the URL.

⚠️ Don't add `/admin` to the public header nav — it's meant to be visited
directly by URL by you, the store owner, only.

## Product catalog

`schema.sql` and `data/products.js` ship with **50 ready-made perfume
products** (varied names, notes, and prices) so `/shop` has a full "See All
Perfumes" catalog out of the box, not just the 3 shown in the hero section.
Swap in your real products/prices/photos whenever you're ready, or add new
ones anytime from `/admin/products`.

## Notes

- Product images are loaded from Unsplash (royalty-free) so the design
  renders immediately without needing your own product photography — swap the
  `image_url` values in `schema.sql` / `data/products.js` for your real product
  shots whenever you're ready.
- If MySQL isn't configured yet, the storefront still renders using the
  fallback data in `data/products.js`, but checkout, auth, tracking and admin
  features all require the database to be connected.
- Fully responsive: the layout collapses to a single column with a hamburger
  nav on mobile, matching the reference design's proportions on desktop.
