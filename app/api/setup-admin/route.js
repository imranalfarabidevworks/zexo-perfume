import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Admin12345";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!process.env.SETUP_SECRET || secret !== process.env.SETUP_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await auth.api.signUpEmail({
      body: { name: "Admin", email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    });
  } catch {
    // Already exists — that's fine, we just promote it below.
  }

  await query("UPDATE user SET role = 'admin' WHERE email = ?", [ADMIN_EMAIL]);

  return NextResponse.json({
    success: true,
    message: `Admin ready — login with ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`,
  });
}
