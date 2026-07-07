"use client";

import { useState } from "react";
import OrderStatusTracker from "@/components/OrderStatusTracker";

export default function TrackOrderPage() {
  const [form, setForm] = useState({ orderNumber: "", phone: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const params = new URLSearchParams(form);
      const res = await fetch(`/api/orders/track?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order not found.");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-xl">
        <p className="text-center font-script text-4xl text-gold">Track Your Order</p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
          <input
            required
            value={form.orderNumber}
            onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
            placeholder="ORDER NUMBER (e.g. ZX-XXXXX-XXX)"
            className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          />
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="PHONE NUMBER USED AT CHECKOUT"
            className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="border border-gold py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink disabled:opacity-50"
          >
            {loading ? "Searching..." : "Track Order"}
          </button>
        </form>

        {result && (
          <div className="mt-12 border border-gold/20 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-cream">{result.order.order_number}</p>
              <p className="text-xs uppercase tracking-widest text-gold">
                {result.order.status.replace(/_/g, " ")}
              </p>
            </div>

            <div className="mt-8">
              <OrderStatusTracker status={result.order.status} />
            </div>

            <div className="mt-8 divide-y divide-gold/10 border-t border-gold/10">
              {result.items.map((item) => (
                <div key={item.id} className="flex justify-between py-3 text-sm">
                  <span className="text-cream/80">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-cream/60">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t border-gold/20 pt-4 text-sm">
              <span className="text-cream/60">Total</span>
              <span className="text-gold">${Number(result.order.total).toFixed(2)}</span>
            </div>

            <p className="mt-6 text-xs text-cream/50">
              Delivering to: {result.order.address}, {result.order.city}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
