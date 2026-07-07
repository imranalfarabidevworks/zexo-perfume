"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState(sessionId ? "confirming" : "cod");

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/checkout-session/confirm?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => setStatus(data.paid ? "paid" : "failed"))
      .catch(() => setStatus("failed"));
  }, [sessionId]);

  return (
    <>
      {status === "confirming" && (
        <>
          <p className="font-script text-5xl text-gold">Confirming Payment...</p>
          <p className="mt-6 text-sm text-cream/60">
            Please wait while we verify your card payment.
          </p>
        </>
      )}

      {(status === "paid" || status === "cod") && (
        <>
          <p className="font-script text-5xl text-gold">Thank You</p>
          <p className="mt-6 text-sm text-cream/70">
            Your order has been placed successfully.
          </p>
          {orderNumber && (
            <p className="mt-3 text-xs uppercase tracking-widest text-cream/50">
              Order Number: <span className="text-gold">{orderNumber}</span>
            </p>
          )}
          <p className="mx-auto mt-6 max-w-sm text-sm text-cream/60">
            {status === "paid"
              ? "Your payment was successful. We'll notify you once your order ships."
              : "Pay in cash when it arrives — our courier will contact you before delivery."}
          </p>
        </>
      )}

      {status === "failed" && (
        <>
          <p className="font-script text-5xl text-gold">Payment Not Confirmed</p>
          <p className="mx-auto mt-6 max-w-sm text-sm text-cream/60">
            We couldn't confirm your card payment. If you were charged,
            please contact support with your order number.
          </p>
        </>
      )}
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <section className="px-6 py-32 text-center">
      <Suspense
        fallback={<p className="font-script text-5xl text-gold">Loading...</p>}
      >
        <SuccessContent />
      </Suspense>

      <Link
        href="/shop"
        className="mt-10 inline-block border border-gold px-8 py-3 text-xs uppercase tracking-widest text-gold transition hover:bg-gold hover:text-ink"
      >
        Continue Shopping
      </Link>
    </section>
  );
}
