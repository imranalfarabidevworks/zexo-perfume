import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { products as fallbackProducts } from "@/data/products";

export async function GET(request, { params }) {
  const { slug } = params;
  try {
    const rows = await query("SELECT * FROM products WHERE slug = ?", [slug]);
    if (!rows.length) throw new Error("not found in db");
    return NextResponse.json(rows[0]);
  } catch (err) {
    const fallback = fallbackProducts.find((p) => p.slug === slug);
    if (!fallback) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(fallback);
  }
}
