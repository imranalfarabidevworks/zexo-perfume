import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";

const VALID_STATUSES = ["pending", "confirmed", "out_for_delivery", "delivered", "cancelled"];

export async function PATCH(request, { params }) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { status } = await request.json();
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    await query("UPDATE orders SET status = ? WHERE id = ?", [status, params.id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not update order." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await query("DELETE FROM orders WHERE id = ?", [params.id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not delete order." }, { status: 500 });
  }
}
