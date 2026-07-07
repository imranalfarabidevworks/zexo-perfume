import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";

export const metadata = {
  title: "Zexo Perfume — Experience the Essence of Luxury",
  description:
    "Exquisite fragrances for the modern connoisseur. Shop the Zexo signature perfume collection with cash on delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ink text-cream">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
