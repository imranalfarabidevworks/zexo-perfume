"use client";

import { useEffect, useState } from "react";
import OrderStatusTracker from "@/components/OrderStatusTracker";

export default function OrderDetailPage({ params }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((d) => (d.error ? setError(d.error) : setData(d)));
  }, [params.id]);

  if (error) {
    return <section className="px-6 py-28 text-center text-cream/60">{error}</section>;
  }
  if (!data) {
    return <section className="px-6 py-28 text-center text-cream/60">Loading...</section>;
  }

  const { order, items } = data;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-xl border border-gold/20 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-cream">{order.order_number}</p>
          <p className="text-xs uppercase tracking-widest text-gold">
            {order.status.replace(/_/g, " ")}
          </p>
        </div>

        <div className="mt-8">
          <OrderStatusTracker status={order.status} />
        </div>

        <div className="mt-8 divide-y divide-gold/10 border-t border-gold/10">
          {items.map((item) => (
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
          <span className="text-gold">${Number(order.total).toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}
