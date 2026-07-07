"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (!items.length) {
    return (
      <section className="px-6 py-28 text-center">
        <p className="font-script text-4xl text-gold">Your Bag is Empty</p>
        <p className="mt-4 text-sm text-cream/60">
          Discover a fragrance that speaks to you.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block border border-gold px-8 py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
        >
          Shop Now
        </Link>
      </section>
    );
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-center font-script text-4xl text-gold">Your Bag</p>

        <div className="mt-12 divide-y divide-gold/15">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-5 py-6">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-panel">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg tracking-wide text-cream">
                  {item.name}
                </p>
                <p className="text-sm text-gold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center border border-gold/40">
                <button
                  className="px-3 py-1 text-gold hover:bg-gold/10"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm text-cream">
                  {item.quantity}
                </span>
                <button
                  className="px-3 py-1 text-gold hover:bg-gold/10"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <p className="w-20 text-right text-sm text-cream/80">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-cream/40 hover:text-gold"
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-gold/20 pt-6">
          <span className="text-sm uppercase tracking-widest text-cream/60">
            Subtotal
          </span>
          <span className="text-lg text-gold">${subtotal.toFixed(2)}</span>
        </div>

        <Link
          href="/checkout"
          className="mt-8 block w-full border border-gold py-4 text-center text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
        >
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}
