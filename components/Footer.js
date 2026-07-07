export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-ink px-6 py-8 text-center">
      <p className="font-display text-xl tracking-widest2 text-gold">ZEXO</p>
      <p className="mt-2 text-[11px] tracking-wide text-cream/40">
        © {new Date().getFullYear()} Zexo Perfume. All rights reserved.
      </p>
    </footer>
  );
}
