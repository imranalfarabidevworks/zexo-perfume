"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function AdminLayout({ children }) {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();

  if (isPending) {
    return <div className="px-6 py-28 text-center text-cream/60">Loading...</div>;
  }

  if (!session?.user) {
    return (
      <div className="px-6 py-28 text-center">
        <p className="font-script text-4xl text-gold">Admin Login Required</p>
        <Link
          href="/login"
          className="mt-8 inline-block border border-gold px-8 py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div className="px-6 py-28 text-center">
        <p className="font-script text-4xl text-gold">Access Denied</p>
        <p className="mt-4 text-sm text-cream/60">
          This area is for administrators only.
        </p>
      </div>
    );
  }

  const tabs = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/products", label: "Products" },
  ];

  return (
    <div>
      <div className="border-b border-gold/20 px-6 py-6">
        <p className="text-center font-script text-3xl text-gold">Admin Dashboard</p>
        <div className="mt-6 flex justify-center gap-8 text-xs uppercase tracking-widest">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={pathname === tab.href ? "text-gold" : "text-cream/60 hover:text-gold"}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
