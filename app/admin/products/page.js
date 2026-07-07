"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    subtitle: "Signature Collection",
    description: "",
    price: "",
    image_url: "",
    accent: "gold",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not add product");
      setForm({
        name: "",
        subtitle: "Signature Collection",
        description: "",
        price: "",
        image_url: "",
        accent: "gold",
      });
      loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
  }

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="font-script text-3xl text-gold">Add New Product</p>
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="PRODUCT NAME"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          />
          <input
            placeholder="SUBTITLE"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          />
          <input
            required
            type="number"
            step="0.01"
            placeholder="PRICE (USD)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          />
          <input
            required
            placeholder="IMAGE URL"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          />
          <textarea
            placeholder="DESCRIPTION"
            value={form.description}
            rows={3}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="sm:col-span-2 border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          />
          {error && <p className="sm:col-span-2 text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="sm:col-span-2 border border-gold py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink disabled:opacity-50"
          >
            {saving ? "Adding..." : "Add Product"}
          </button>
        </form>

        <p className="mt-14 font-script text-3xl text-gold">
          All Products ({products.length})
        </p>
        {loading ? (
          <p className="mt-6 text-sm text-cream/60">Loading...</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="border border-gold/20 p-4">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="h-40 w-full rounded-sm object-cover"
                />
                <p className="mt-3 text-sm text-cream">{p.name}</p>
                <p className="text-xs text-gold">${Number(p.price).toFixed(2)}</p>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="mt-3 border border-red-400/40 px-3 py-1 text-[10px] uppercase tracking-widest text-red-400 hover:bg-red-400 hover:text-ink"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
