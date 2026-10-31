import { useEffect, useState } from "react";
import { formatPrice } from "../lib/format";

export default function QuickViewModal({ product, onClose, onAdd }) {
  const [show, setShow] = useState(false);
  const [qty, setQty] = useState(1); // NEW: Track quantity

  useEffect(() => {
    if (product) {
      setQty(1); // Reset to 1 every time a new product is opened
      const timer = setTimeout(() => setShow(true), 10);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      document.body.style.overflow = "unset";
    }
  }, [product]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* UPDATED: Added max-h-[85vh] and made it a flex column on mobile */}
      <div
        className={`relative flex flex-col sm:flex-row w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ease-out max-h-[85vh] ${
          show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-neutral-500 backdrop-blur hover:bg-neutral-100 hover:text-neutral-900 transition active:scale-90"
        >
          ✕
        </button>

        {/* Image area */}
        <div className="w-full bg-neutral-100 sm:w-1/2 h-64 sm:h-auto shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details area */}
        <div className="flex flex-col w-full sm:w-1/2 min-h-0">
          
          {/* NEW: Scrollable text area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 pb-4">
            {product.badge && (
              <span className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                {product.badge === "soldout" ? "Sold out" : product.badge === "sale" ? "On sale" : "New release"}
              </span>
            )}
            <h2 className="text-3xl font-semibold tracking-tight">{product.name}</h2>
            <p className="mt-2 text-lg text-neutral-500">{formatPrice(product.price)}</p>
            <p className="mt-6 text-sm leading-relaxed text-neutral-600">
              {product.description}
            </p>
            {/* Added an extra paragraph just to test scrolling if you want to paste more text */}
          </div>

          {/* Sticky footer area */}
          <div className="border-t border-neutral-100 p-6 sm:px-10 sm:pb-10 sm:pt-6 bg-white shrink-0">
            
            {/* NEW: Quantity Selector */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-neutral-900">Quantity</span>
              <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-1 py-1">
                <button 
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-white text-neutral-500 hover:text-neutral-900 transition"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                <button 
                  onClick={() => setQty(q => q + 1)}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-white text-neutral-500 hover:text-neutral-900 transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onAdd(product, qty); // NEW: Pass quantity to cart
                onClose();
              }}
              disabled={product.badge === "soldout"}
              className={`w-full rounded-full py-3.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
                product.badge === "soldout"
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg hover:shadow-xl"
              }`}
            >
              {product.badge === "soldout" ? "Out of stock" : `Add ${qty} to cart`}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}