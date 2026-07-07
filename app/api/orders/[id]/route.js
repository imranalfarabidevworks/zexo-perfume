import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
    const orders = await query(
      "SELECT * FROM orders WHERE id = ? AND user_id = ?",
      [params.id, session.user.id]
    );
    const order = orders[0];
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    const items = await query("SELECT * FROM order_items WHERE order_id = ?", [order.id]);
    return NextResponse.json({ order, items });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not load order." }, { status: 500 });
  }
}
