import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { products as fallbackProducts } from "@/data/products";

export async function GET() {
  try {
    const rows = await query(
      "SELECT * FROM products WHERE in_stock = 1 ORDER BY id ASC"
    );
    if (!rows.length) throw new Error("empty");
    return NextResponse.json(rows);
  } catch (err) {
    // DB not configured yet — fall back to static data so the
    // storefront still renders during setup.
    return NextResponse.json(fallbackProducts);
  }
}
