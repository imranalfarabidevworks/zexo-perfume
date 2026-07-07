"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function OrdersPage() {
  const { data: session, isPending } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      setLoading(false);
      return;
    }
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [session]);

  if (isPending || loading) {
    return <section className="px-6 py-28 text-center text-cream/60">Loading...</section>;
  }

  if (!session?.user) {
    return (
      <section className="px-6 py-28 text-center">
        <p className="font-script text-4xl text-gold">Sign In to View Orders</p>
        <Link
          href="/login"
          className="mt-8 inline-block border border-gold px-8 py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
        >
          Login
        </Link>
      </section>
    );
  }

  if (!orders.length) {
    return (
      <section className="px-6 py-28 text-center">
        <p className="font-script text-4xl text-gold">No Orders Yet</p>
      </section>
    );
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-center font-script text-4xl text-gold">Your Orders</p>
        <div className="mt-10 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gold/20 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm text-cream">{order.order_number}</span>
                <span className="text-xs uppercase tracking-widest text-gold">
                  {order.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-cream/50">
                {new Date(order.created_at).toLocaleDateString()} — Cash on Delivery
              </p>
              <p className="mt-2 text-sm text-cream/80">
                Total: ${Number(order.total).toFixed(2)}
              </p>
              <Link
                href={`/orders/${order.id}`}
                className="mt-3 inline-block text-xs text-gold underline underline-offset-4"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
