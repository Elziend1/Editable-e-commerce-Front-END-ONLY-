import { formatPrice } from "../lib/format";

export default function CartDrawer({ isOpen, onClose, cart, onCheckout, updateQty, removeItem }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <h2 className="text-lg font-semibold tracking-tight">Your Cart</h2>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-neutral-100 transition"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="text-3xl mb-4">🛒</span>
              <p className="text-neutral-500 text-sm">Your cart is empty.</p>
              <button onClick={onClose} className="mt-4 text-sm font-medium underline underline-offset-4 hover:text-neutral-600">
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover bg-neutral-100 shrink-0"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-neutral-500 mt-0.5">{formatPrice(item.price)}</p>
                      </div>
                      
                      {/* NEW: Quantity Selector in Drawer */}
                      <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-1 py-1">
                        <button onClick={() => updateQty(item.id, -1)} className="grid h-6 w-6 place-items-center rounded-full hover:bg-white text-neutral-500 transition">−</button>
                        <span className="w-6 text-center text-xs font-medium">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="grid h-6 w-6 place-items-center rounded-full hover:bg-white text-neutral-500 transition">+</button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-medium">{formatPrice(item.price * item.qty)}</p>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-neutral-400 hover:text-red-500 transition underline underline-offset-2">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-neutral-100 p-6 bg-neutral-50">
            <div className="flex justify-between text-base font-medium mb-4">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full rounded-full bg-neutral-900 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.98]"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}