import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { auth } from "@/lib/auth";

const DELIVERY_FEE = 5.0;

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 900 + 100);
  return `ZX-${stamp}-${rand}`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, address, city, notes, items, paymentMethod } = body;

    if (!fullName || !phone || !address || !city || !items?.length) {
      return NextResponse.json(
        { error: "Missing required checkout fields." },
        { status: 400 }
      );
    }

    // Attach the signed-in user, if any, without requiring login (guest checkout).
    let userId = null;
    try {
      const session = await auth.api.getSession({ headers: request.headers });
      userId = session?.user?.id || null;
    } catch {
      userId = null;
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const total = subtotal + DELIVERY_FEE;
    const orderNumber = generateOrderNumber();
    const method = paymentMethod === "card" ? "card" : "cod";
    const initialStatus = method === "card" ? "awaiting_payment" : "pending";

    const result = await query(
      `INSERT INTO orders
        (order_number, user_id, full_name, phone, email, address, city, notes, payment_method, payment_status, status, subtotal, delivery_fee, total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'unpaid', ?, ?, ?, ?)`,
      [
        orderNumber,
        userId,
        fullName,
        phone,
        email || null,
        address,
        city,
        notes || null,
        method,
        initialStatus,
        subtotal,
        DELIVERY_FEE,
        total,
      ]
    );

    const orderId = result.insertId;

    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, name, price, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.id, item.name, item.price, item.quantity]
      );
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber,
      total,
      paymentMethod: method,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not place order. Please check your database connection." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
    const orders = await query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [session.user.id]
    );
    return NextResponse.json(orders);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not load orders." }, { status: 500 });
  }
}
