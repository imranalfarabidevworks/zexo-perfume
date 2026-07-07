"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import { useSession, signOut } from "@/lib/auth-client";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Collections" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/track", label: "Track Order" },
];

export default function Header() {
  const { count } = useCart();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-5">
        <Link href="/" className="text-center">
          <div className="font-display text-3xl tracking-widest2 text-gold sm:text-4xl">
            ZEXO
          </div>
          <div className="text-[10px] tracking-widest2 text-cream/70 sm:text-xs">
            PERFUME
          </div>
        </Link>

        <div className="flex w-full items-center justify-between">
          <button
            className="text-cream sm:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>

          <nav className="hidden gap-8 text-xs uppercase tracking-widest text-cream/80 sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-cream">
            {session?.user ? (
              <button
                onClick={() => signOut()}
                className="hidden text-xs uppercase tracking-widest text-cream/70 hover:text-gold sm:inline"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden text-xs uppercase tracking-widest text-cream/70 hover:text-gold sm:inline"
              >
                Login
              </Link>
            )}
            <Link href="/cart" className="relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-ink">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {open && (
          <nav className="flex w-full flex-col items-center gap-4 border-t border-gold/20 pt-4 text-sm uppercase tracking-widest text-cream/80 sm:hidden">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            {session?.user ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
