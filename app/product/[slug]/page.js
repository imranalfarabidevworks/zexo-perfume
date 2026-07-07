import { notFound } from "next/navigation";
import { products as fallbackProducts } from "@/data/products";
import ProductActions from "./ProductActions";

async function getProduct(slug) {
  try {
    const base = process.env.BETTER_AUTH_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/products/${slug}`, { cache: "no-store" });
    if (!res.ok) throw new Error("not found");
    return await res.json();
  } catch {
    return fallbackProducts.find((p) => p.slug === slug) || null;
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-14 sm:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-sm bg-panel sm:h-[28rem]">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-gold/70">
            {product.subtitle || "Signature Collection"}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-wide text-cream">
            {product.name}
          </h1>
          <p className="mt-2 text-xl text-gold">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70">
            {product.description}
          </p>
          <ProductActions product={product} />
        </div>
      </div>
    </section>
  );
}
