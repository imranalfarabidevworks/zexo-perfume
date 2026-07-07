import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { query } from "@/lib/db";

const DELIVERY_FEE = 5.0;

export async function POST(request) {
  try {
    const { orderId, items } = await request.json();
    if (!orderId || !items?.length) {
      return NextResponse.json({ error: "Missing orderId or items." }, { status: 400 });
    }

    const orders = await query("SELECT * FROM orders WHERE id = ?", [orderId]);
    const order = orders[0];
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const stripe = getStripe();
    const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Fee" },
        unit_amount: Math.round(DELIVERY_FEE * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      client_reference_id: String(orderId),
      customer_email: order.email || undefined,
      success_url: `${baseUrl}/checkout/success?order=${order.order_number}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?canceled=1`,
    });

    await query("UPDATE orders SET stripe_session_id = ? WHERE id = ?", [session.id, orderId]);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Could not start card payment." },
      { status: 500 }
    );
  }
}
