import { useState, useEffect } from "react";
import { shop } from "./data/shop";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import QuickViewModal from "./components/QuickViewModal";
import CheckoutModal from "./components/CheckoutModal";
import AnimatedLogo from "./components/AnimatedLogo";
import SettingsMenu from "./components/SettingsMenu";
import AuthModal from "./components/AuthModal";
import StoreLocation from "./components/StoreLocation"; // NEW: Imported StoreLocation

export default function App() {
  // User State (saved to localStorage)
  const [user, setUser] = useState(() => localStorage.getItem("aperture-user") || null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("aperture-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBumping, setIsBumping] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [animateTail, setAnimateTail] = useState(() => localStorage.getItem("aperture-tail") !== "false");

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("aperture-theme") || "system";
    const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (savedTheme === "glass" && !isApple) return "system";
    return savedTheme;
  });

  // Handle Login
  const handleLogin = (email) => {
    setUser(email);
    localStorage.setItem("aperture-user", email);
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("aperture-user");
  };

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("aperture-theme", theme);
    
    if (theme === "dark" || (theme === "glass" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else if (theme === "light" || (theme === "glass" && !window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.remove("dark");
    } else if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("aperture-tail", animateTail);
  }, [animateTail]);

  useEffect(() => {
    localStorage.setItem("aperture-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT") return;
      if (e.code === "Space" && !quickViewProduct && hoveredProduct) {
        e.preventDefault();
        setQuickViewProduct(hoveredProduct);
      }
      if (e.code === "Space" && quickViewProduct) {
        e.preventDefault();
        setQuickViewProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hoveredProduct, quickViewProduct]);

  const categories = ["All", ...new Set(shop.products.map((p) => p.category))];
  const filteredProducts = shop.products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevCart, { ...product, qty }];
    });
    setIsBumping(true);
    setTimeout(() => setIsBumping(false), 300);
  };

  const updateQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item)).filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    setTimeout(() => setIsCheckoutOpen(true), 300);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className={`min-h-screen antialiased flex flex-col transition-colors duration-300 ${
      theme === "glass" ? "bg-glass" : "bg-white dark:bg-neutral-950"
    } text-neutral-900 dark:text-neutral-100`}>
      
      <header className={`sticky top-0 z-30 border-b border-neutral-200/70 dark:border-neutral-800/70 transition-colors duration-300 ${
        theme === "glass" ? "glass-card" : "bg-white/80 dark:bg-neutral-950/80 backdrop-blur"
      }`}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          
          <AnimatedLogo animate={animateTail} />
          
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* User Auth / Profile Button */}
            {user ? (
              <div className="flex items-center gap-2 mr-1">
                <span className="hidden sm:block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {user.split('@')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-red-500 hover:text-red-600 transition px-2 py-1"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="grid h-11 px-3 place-items-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-medium transition"
              >
                Sign In
              </button>
            )}

            <SettingsMenu 
              theme={theme} 
              setTheme={setTheme} 
              animateTail={animateTail} 
              setAnimateTail={setAnimateTail} 
            />

            <button
              onClick={() => setIsCartOpen(true)}
              className={`grid h-11 px-4 place-items-center rounded-full transition-all duration-300 ${
                isBumping 
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 scale-105 shadow-md" 
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white scale-100"
              }`}
            >
              <span className="text-sm font-medium">
                Cart {totalItems > 0 && `(${totalItems})`}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="sr-only" aria-live="polite">
        {totalItems} items in cart. {isBumping ? "Item added." : ""}
      </div>

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
        <h1 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
          {shop.tagline}
        </h1>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                    : "bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-neutral-100 dark:bg-neutral-900 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onAdd={addToCart} 
              onQuickView={setQuickViewProduct} 
              onHover={setHoveredProduct} 
              theme={theme} 
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      {/* NEW: Store Location Map */}
      <StoreLocation theme={theme} />

      <footer className={`border-t border-neutral-200 dark:border-neutral-800 py-10 mt-10 transition-colors duration-300 ${
        theme === "glass" ? "glass-card" : "bg-neutral-50 dark:bg-neutral-900/50"
      }`}>
        <div className="mx-auto max-w-6xl px-4 flex flex-col items-center justify-between gap-4 sm:flex-row text-sm text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} {shop.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition">Support</a>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin} 
        theme={theme}
      />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onCheckout={handleCheckout} updateQty={updateQty} removeItem={removeItem} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAdd={addToCart} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} cart={cart} onClearCart={clearCart} />
    </div>
  );
}