"use client";

import { useEffect, useState } from "react";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((orders) => {
        if (!Array.isArray(orders)) return;
        setStats({
          totalOrders: orders.length,
          totalRevenue: orders.reduce((sum, o) => sum + Number(o.total), 0),
          pending: orders.filter((o) => o.status === "pending").length,
          delivered: orders.filter((o) => o.status === "delivered").length,
        });
      });
  }, []);

  const cards = [
    { label: "Total Orders", value: stats?.totalOrders ?? "..." },
    { label: "Total Revenue", value: stats ? `$${stats.totalRevenue.toFixed(2)}` : "..." },
    { label: "Pending", value: stats?.pending ?? "..." },
    { label: "Delivered", value: stats?.delivered ?? "..." },
  ];

  return (
    <section className="px-6 py-12">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="border border-gold/20 p-6 text-center">
            <p className="text-2xl text-gold">{card.value}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-cream/60">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
