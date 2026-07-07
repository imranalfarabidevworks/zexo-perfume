"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";

const DELIVERY_FEE = 5.0;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items,
          paymentMethod,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Something went wrong");

      if (paymentMethod === "card") {
        const sessionRes = await fetch("/api/checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderData.orderId, items }),
        });
        const sessionData = await sessionRes.json();
        if (!sessionRes.ok) throw new Error(sessionData.error || "Could not start card payment");
        clearCart();
        window.location.href = sessionData.url;
        return;
      }

      clearCart();
      router.push(`/checkout/success?order=${orderData.orderNumber}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <section className="px-6 py-28 text-center">
        <p className="font-script text-4xl text-gold">Your Bag is Empty</p>
        <p className="mt-4 text-sm text-cream/60">
          Add a fragrance to your bag before checking out.
        </p>
      </section>
    );
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-14 sm:grid-cols-2">
        {/* Delivery form */}
        <div>
          <p className="font-script text-4xl text-gold">Delivery Details</p>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <input
              required
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="FULL NAME"
              className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <input
              required
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="PHONE NUMBER"
              className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="EMAIL (OPTIONAL)"
              className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <input
              required
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="FULL ADDRESS"
              className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <input
              required
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="CITY"
              className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="ORDER NOTES (OPTIONAL)"
              rows={3}
              className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />

            <div className="mt-4 flex flex-col gap-3">
              <label
                className={`flex cursor-pointer items-start gap-3 border p-4 transition ${
                  paymentMethod === "cod" ? "border-gold" : "border-gold/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1"
                />
                <span>
                  <span className="block text-xs uppercase tracking-widest text-gold">
                    Cash on Delivery
                  </span>
                  <span className="mt-1 block text-xs text-cream/50">
                    Pay in cash when your order arrives at your door.
                  </span>
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-3 border p-4 transition ${
                  paymentMethod === "card" ? "border-gold" : "border-gold/30"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="mt-1"
                />
                <span>
                  <span className="block text-xs uppercase tracking-widest text-gold">
                    Credit / Debit Card
                  </span>
                  <span className="mt-1 block text-xs text-cream/50">
                    Pay securely now via card — you'll be redirected to a
                    secure checkout to complete payment.
                  </span>
                </span>
              </label>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 border border-gold py-4 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : paymentMethod === "card"
                ? "Continue to Card Payment"
                : "Place Order — Cash on Delivery"}
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div>
          <p className="font-script text-4xl text-gold">Order Summary</p>
          <div className="mt-8 divide-y divide-gold/15 border-y border-gold/15">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-4 text-sm">
                <span className="text-cream/80">
                  {item.name} × {item.quantity}
                </span>
                <span className="text-cream/60">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between text-cream/60">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cream/60">
              <span>Delivery Fee</span>
              <span>${DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gold/20 pt-3 text-lg text-gold">
              <span>Total</span>
              <span>${(subtotal + DELIVERY_FEE).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
