import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET(request) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await query("SELECT * FROM orders ORDER BY created_at DESC");
  return NextResponse.json(orders);
}
