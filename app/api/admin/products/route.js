import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET(request) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = await query("SELECT * FROM products ORDER BY created_at DESC");
  return NextResponse.json(products);
}

export async function POST(request) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, subtitle, description, price, image_url, accent } = await request.json();
    if (!name || !price || !image_url) {
      return NextResponse.json(
        { error: "Name, price and image are required." },
        { status: 400 }
      );
    }
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    await query(
      `INSERT INTO products (slug, name, subtitle, description, price, image_url, accent)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        name.toUpperCase(),
        subtitle || "Signature Collection",
        description || "",
        price,
        image_url,
        accent || "gold",
      ]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not add product (name might already exist)." },
      { status: 500 }
    );
  }
}
