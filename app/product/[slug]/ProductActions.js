"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function ProductActions({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center border border-gold/40">
        <button
          className="px-4 py-2 text-gold hover:bg-gold/10"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span className="w-10 text-center text-cream">{qty}</span>
        <button
          className="px-4 py-2 text-gold hover:bg-gold/10"
          onClick={() => setQty((q) => q + 1)}
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="border border-gold px-8 py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
      <Link
        href="/cart"
        className="text-xs uppercase tracking-widest text-cream/60 underline underline-offset-4 hover:text-gold"
      >
        View Cart
      </Link>
    </div>
  );
}
