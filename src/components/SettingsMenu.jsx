import { useState, useEffect, useRef } from "react";

export default function SettingsMenu({ theme, setTheme, animateTail, setAnimateTail }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Strict Apple Device Check
  const isAppleDevice = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // Safe check for CSS Glass support (iOS 9 will return false)
  const supportsGlass = typeof window !== 'undefined' && window.CSS && window.CSS.supports && (window.CSS.supports('backdrop-filter', 'blur(1px)') || window.CSS.supports('-webkit-backdrop-filter', 'blur(1px)'));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // Added for older iPads
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Only include Glass if on Apple AND the browser supports the CSS
  const themes = [
    { id: "light", label: "Light" },
    { id: "dark", label: "Dark" },
    { id: "system", label: "System" },
    ...(isAppleDevice && supportsGlass ? [{ id: "glass", label: "Glass (Apple)" }] : []), 
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="grid h-11 w-11 place-items-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-neutral-600 dark:text-neutral-300"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 w-56 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-2 shadow-xl z-50">
          <div className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Theme
          </div>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                theme === t.id
                  ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              }`}
            >
              {t.label}
              {theme === t.id && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}

          <div className="my-2 border-t border-neutral-100 dark:border-neutral-800" />

          <button
            onClick={() => setAnimateTail(!animateTail)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition"
          >
            Wagging Tail
            <div className={`relative h-5 w-9 rounded-full transition-colors ${animateTail ? "bg-green-500" : "bg-neutral-300 dark:bg-neutral-600"}`}>
              <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${animateTail ? "translate-x-[18px]" : "translate-x-0.5"}`} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}