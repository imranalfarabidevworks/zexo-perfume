"use client";

const STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export default function OrderStatusTracker({ status }) {
  if (status === "cancelled") {
    return (
      <div className="border border-red-400/40 p-4 text-center text-sm text-red-400">
        This order was cancelled.
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="flex items-center justify-between">
      {STEPS.map((step, i) => (
        <div key={step.key} className="flex flex-1 flex-col items-center text-center">
          <div className="flex w-full items-center">
            <div
              className={`h-px flex-1 ${
                i === 0 ? "opacity-0" : i <= activeIndex ? "bg-gold" : "bg-gold/20"
              }`}
            />
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${
                i <= activeIndex
                  ? "border-gold bg-gold text-ink"
                  : "border-gold/30 text-cream/40"
              }`}
            >
              {i + 1}
            </div>
            <div
              className={`h-px flex-1 ${
                i === STEPS.length - 1
                  ? "opacity-0"
                  : i < activeIndex
                  ? "bg-gold"
                  : "bg-gold/20"
              }`}
            />
          </div>
          <p
            className={`mt-2 text-[10px] uppercase tracking-widest ${
              i <= activeIndex ? "text-gold" : "text-cream/40"
            }`}
          >
            {step.label}
          </p>
        </div>
      ))}
    </div>
  );
}
