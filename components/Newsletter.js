"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="border-t border-gold/20 bg-ink px-6 py-20 text-center">
      <p className="font-script text-4xl text-gold sm:text-5xl">The Art of Perfume</p>
      <p className="mt-4 text-sm text-cream/70">
        Join our exclusive newsletter for the latest in luxury fragrances.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER YOUR EMAIL"
          className="flex-1 border border-gold/40 bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          className="border border-gold px-6 py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
        >
          Subscribe
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-xs text-gold">Thank you — you're on the list.</p>
      )}
    </section>
  );
}
