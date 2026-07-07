import { auth } from "@/lib/auth";

export async function requireAdmin(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user || session.user.role !== "admin") {
    return null;
  }
  return session;
}
