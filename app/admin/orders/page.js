"use client";

import { useEffect, useState } from "react";

const STATUS_OPTIONS = ["pending", "confirmed", "out_for_delivery", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function deleteOrder(id) {
    if (!confirm("Delete this order permanently?")) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
    await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
  }

  if (loading) return <p className="px-6 py-12 text-center text-cream/60">Loading...</p>;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <p className="text-sm text-cream/60">{orders.length} total orders</p>
          <button
            onClick={loadOrders}
            className="border border-gold/40 px-4 py-2 text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-ink"
          >
            Refresh
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gold/20 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-cream">{order.order_number}</p>
                  <p className="mt-1 text-xs text-cream/50">
                    {order.full_name} — {order.phone}
                  </p>
                  <p className="text-xs text-cream/50">
                    {order.address}, {order.city}
                  </p>
                  <p className="mt-1 text-xs text-cream/50">
                    {order.payment_method?.toUpperCase()} — ${Number(order.total).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border border-gold/40 bg-ink px-3 py-2 text-xs uppercase tracking-widest text-gold focus:border-gold focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="border border-red-400/40 px-3 py-2 text-xs uppercase tracking-widest text-red-400 hover:bg-red-400 hover:text-ink"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!orders.length && (
            <p className="text-center text-sm text-cream/50">No orders yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
