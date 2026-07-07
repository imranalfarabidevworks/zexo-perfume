import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ paid: false });
    }

    const orderId = session.client_reference_id;
    await query(
      `UPDATE orders SET payment_status = 'paid', status = 'confirmed' WHERE id = ? AND stripe_session_id = ?`,
      [orderId, sessionId]
    );

    const orders = await query("SELECT * FROM orders WHERE id = ?", [orderId]);
    return NextResponse.json({ paid: true, order: orders[0] || null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not confirm payment." }, { status: 500 });
  }
}
