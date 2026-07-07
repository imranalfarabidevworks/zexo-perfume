import ProductCard from "@/components/ProductCard";
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

export const metadata = { title: "Shop — Zexo Perfume" };

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-script text-4xl text-gold sm:text-5xl">Our Collections</p>
        <p className="mt-3 text-xs tracking-widest text-cream/60">
          Every Scent, Curated For You
        </p>

        <div className="mt-14 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
