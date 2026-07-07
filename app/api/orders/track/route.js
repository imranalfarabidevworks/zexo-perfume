import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber")?.trim();
  const phone = searchParams.get("phone")?.trim();

  if (!orderNumber || !phone) {
    return NextResponse.json(
      { error: "Order number and phone are required." },
      { status: 400 }
    );
  }

  try {
    const orders = await query(
      "SELECT * FROM orders WHERE order_number = ? AND phone = ?",
      [orderNumber, phone]
    );
    const order = orders[0];
    if (!order) {
      return NextResponse.json(
        { error: "No order found with that number and phone." },
        { status: 404 }
      );
    }
    const items = await query("SELECT * FROM order_items WHERE order_id = ?", [order.id]);
    return NextResponse.json({ order, items });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not look up this order." }, { status: 500 });
  }
}
