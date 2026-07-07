"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn.email({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) {
      setError(error.message || "Invalid email or password.");
      return;
    }
    router.push("/");
  }

  return (
    <section className="flex flex-col items-center px-6 py-28">
      <p className="font-script text-4xl text-gold">Welcome Back</p>
      <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-sm flex-col gap-4">
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="EMAIL"
          className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
        />
        <input
          required
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="PASSWORD"
          className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 border border-gold py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="mt-6 text-xs text-cream/60">
        Don't have an account?{" "}
        <Link href="/register" className="text-gold underline underline-offset-4">
          Create one
        </Link>
      </p>
    </section>
  );
}
