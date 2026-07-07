"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col items-center text-center">
      <Link href={`/product/${product.slug}`} className="block overflow-hidden">
        <div className="relative h-64 w-48 overflow-hidden rounded-sm bg-panel sm:h-72 sm:w-56">
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <h3 className="mt-5 font-display text-xl tracking-wide text-cream">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-gold">${Number(product.price).toFixed(2)}</p>
      <button
        onClick={() => addItem(product)}
        className="mt-4 border border-gold px-6 py-2 text-[11px] uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
      >
        Shop Now
      </button>
    </div>
  );
}
