import { useState, useEffect } from "react";
import { formatPrice } from "../lib/format";

export default function CheckoutModal({ isOpen, onClose, cart, onClearCart }) {
  const [step, setStep] = useState("form"); // "form" | "processing" | "success"
  const [show, setShow] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Animation trigger
  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden";
    } else {
      setShow(false);
      document.body.style.overflow = "unset";
      // Reset step when closed
      setTimeout(() => setStep("form"), 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setStep("processing");
    
    // Fake network request delay
    setTimeout(() => {
      setStep("success");
      onClearCart(); // Empty the cart
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`} 
      />

      {/* Main Container */}
      <div className={`relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:h-auto sm:max-h-[90vh] sm:rounded-3xl overflow-hidden ${show ? "translate-y-0" : "translate-y-full sm:translate-y-8"}`}>
        
        {/* --- SUCCESS STATE --- */}
        {step === "success" ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600 mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">Order Confirmed</h2>
            <p className="mt-2 text-neutral-500 mb-8">Thank you for your purchase. A receipt has been sent to your email.</p>
            <button 
              onClick={onClose}
              className="w-full rounded-full bg-neutral-900 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-95"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* --- FORM STATE --- */
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <h2 className="text-lg font-semibold tracking-tight">Checkout</h2>
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-neutral-100 text-neutral-500 transition">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="checkout-form" onSubmit={handlePay} className="space-y-6">
                
                {/* Contact */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-900 mb-3">Contact</h3>
                  <input type="email" placeholder="Email" required className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition" />
                </div>

                {/* Shipping */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-900 mb-3">Shipping</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Full Name" required className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition" />
                    <input type="text" placeholder="Address" required className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition" />
                  </div>
                </div>

                {/* Payment (Mock) */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-900 mb-3">Payment</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Card Number" required defaultValue="4242 4242 4242 4242" className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition" />
                    <div className="flex gap-3">
                      <input type="text" placeholder="MM/YY" required defaultValue="12/28" className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition" />
                      <input type="text" placeholder="CVC" required defaultValue="123" className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition" />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-100 p-6 bg-neutral-50">
              <div className="flex justify-between text-sm font-medium mb-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <button 
                type="submit" 
                form="checkout-form"
                disabled={step === "processing"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
              >
                {step === "processing" ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}