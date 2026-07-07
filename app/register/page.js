"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) {
      setError(error.message || "Could not create your account.");
      return;
    }
    router.push("/");
  }

  return (
    <section className="flex flex-col items-center px-6 py-28">
      <p className="font-script text-4xl text-gold">Create Your Account</p>
      <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-sm flex-col gap-4">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="FULL NAME"
          className="border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
        />
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
          minLength={8}
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
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
      <p className="mt-6 text-xs text-cream/60">
        Already have an account?{" "}
        <Link href="/login" className="text-gold underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </section>
  );
}
