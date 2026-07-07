import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { products as fallbackProducts } from "@/data/products";

async function getProducts() {
  try {
    const base = process.env.BETTER_AUTH_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("bad response");
    return await res.json();
  } catch {
    return fallbackProducts;
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col items-center overflow-hidden px-6 py-32 text-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1598634222670-87c5f558119c?q=80&w=2000&auto=format&fit=crop"
            alt="A luxury perfume bottle in dramatic dark lighting"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(201,162,75,0.20), transparent 60%)",
            }}
          />
        </div>
        <p className="font-script relative text-4xl text-gold sm:text-6xl">
          Experience the Essence of Luxury
        </p>
        <p className="relative mt-6 text-xs tracking-widest2 text-cream/70 sm:text-sm">
          EXQUISITE FRAGRANCES FOR THE MODERN CONNOISSEUR
        </p>
        <Link
          href="/shop"
          className="relative mt-10 border border-gold px-8 py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
        >
          Discover Now
        </Link>
      </section>

      {/* Signature Scents */}
      <section className="border-t border-gold/20 px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-script text-4xl text-gold sm:text-5xl">
            Our Signature Scents
          </p>
          <p className="mt-3 text-xs tracking-widest text-cream/60">
            Indulge in Sophistication
          </p>

          <div className="mt-14 grid grid-cols-1 gap-14 sm:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <Link
            href="/shop"
            className="mt-16 inline-block border border-gold px-10 py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
          >
            See All Perfumes
          </Link>
        </div>
      </section>

      {/* Luxury & Sensation */}
      <section className="border-t border-gold/20 px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 sm:grid-cols-2">
          <div>
            <p className="font-script text-4xl text-gold sm:text-5xl">
              Luxury &amp; Sensation
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
              Crafted with the finest ingredients for an unforgettable
              experience.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block border border-gold px-6 py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
            >
              Learn More
            </Link>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-sm bg-panel sm:h-80">
            <img
              src="https://images.unsplash.com/photo-1744369382893-9c5c1b1dd4b7?q=80&w=1200&auto=format&fit=crop"
              alt="A perfume bottle displayed with fine jewelry"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
