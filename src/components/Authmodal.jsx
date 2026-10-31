import { useState, useEffect } from "react";

export default function AuthModal({ isOpen, onClose, onLogin, theme }) {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden";
    } else {
      setShow(false);
      document.body.style.overflow = "unset";
      // Reset form when closed
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setIsLogin(true);
        setIsLoading(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Fake network delay for realism
    setTimeout(() => {
      onLogin(email); // Pass the email back to App.jsx
      setIsLoading(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-neutral-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 ease-out ${
          theme === "glass" ? "glass-card" : "bg-white dark:bg-neutral-950"
        } ${show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur hover:bg-neutral-200 dark:hover:bg-neutral-700 transition active:scale-90"
        >
          ✕
        </button>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              {isLogin ? "Enter your details to access your account." : "Join us to track orders and save your cart."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="sr-only">Email</label>
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-4 py-3.5 text-sm focus:border-neutral-900 dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition"
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-4 py-3.5 text-sm focus:border-neutral-900 dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-3.5 text-sm font-medium transition hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-neutral-900 dark:text-white hover:underline underline-offset-4"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}