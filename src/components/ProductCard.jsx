import { useRef, useState } from "react";
import { formatPrice } from "../lib/format";

const badgeStyles = {
  new: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
  sale: "bg-red-600 text-white",
  soldout: "bg-white/90 text-neutral-400 dark:bg-neutral-800/90 dark:text-neutral-500",
};
const badgeLabels = { new: "New", sale: "Sale", soldout: "Sold out" };

export default function ProductCard({ product, onAdd, onQuickView, onHover, theme }) {
  const soldOut = product.badge === "soldout";
  const pressTimer = useRef(null);
  const [isPressing, setIsPressing] = useState(false);

  const startPress = () => {
    setIsPressing(true);
    pressTimer.current = setTimeout(() => {
      onQuickView(product);
      setIsPressing(false);
    }, 500);
  };

  const cancelPress = () => {
    setIsPressing(false);
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  const preventContextMenu = (e) => e.preventDefault();

  return (
    <article
      onMouseEnter={() => onHover(product)}
      onMouseLeave={() => { onHover(null); cancelPress(); }}
      // Mobile touch events for older iPads
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      onTouchCancel={cancelPress}
      onTouchMove={cancelPress} 
      onContextMenu={preventContextMenu}
      // Desktop events
      onMouseDown={startPress}
      onMouseUp={cancelPress}
      // Style prevents iOS from highlighting the image on long press
      style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
      className={`group outline-none select-none transition-transform duration-200 touch-manipulation ${
        isPressing ? "scale-[0.97]" : ""
      }`}
    >
      <div className={`relative aspect-square overflow-hidden rounded-2xl transition-colors ${
        theme === "glass" ? "glass-card" : "bg-neutral-100 dark:bg-neutral-900"
      }`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          draggable={false}
          // pointer-events-none stops the image from stealing the touch event
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] pointer-events-none"
        />

        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ${badgeStyles[product.badge]}`}>
            {badgeLabels[product.badge]}
          </span>
        )}

        {!soldOut && (
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            className="absolute inset-x-3 bottom-3 h-11 rounded-full bg-white/90 dark:bg-neutral-800/90 dark:text-white text-sm font-medium backdrop-blur transition hover:bg-white dark:hover:bg-neutral-700 active:scale-95 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg pointer-events-auto"
          >
            Add to cart
          </button>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2 px-1">
        <h3 className="text-sm font-medium tracking-tight">{product.name}</h3>
        <p className={`text-sm ${soldOut ? "text-neutral-400 dark:text-neutral-600" : "text-neutral-500 dark:text-neutral-400"}`}>
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}