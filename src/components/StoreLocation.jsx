import { storeInfo } from "../data/shop";

export default function StoreLocation({ theme }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Store Info */}
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Visit Us</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-md leading-relaxed">
            Experience our products in person. Our flagship store is designed for you to test, feel, and fall in love with the hardware.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">Location</h3>
              <p className="text-neutral-600 dark:text-neutral-300">{storeInfo.address}</p>
              <a href={`tel:${storeInfo.phone}`} className="text-neutral-600 dark:text-neutral-300 hover:underline underline-offset-4 mt-1 block">
                {storeInfo.phone}
              </a>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">Store Hours</h3>
              <ul className="space-y-2 text-sm">
                {storeInfo.hours.map((h) => (
                  <li key={h.day} className="flex justify-between max-w-xs text-neutral-600 dark:text-neutral-300">
                    <span>{h.day}</span>
                    <span className="font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className={`relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl ${
          theme === "glass" ? "glass-card" : "border border-neutral-200 dark:border-neutral-800"
        }`}>
          <iframe
            title="Store Location"
            src={storeInfo.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            // This CSS filter magically turns the standard Google Map into a dark map!
            className="dark:invert dark:hue-rotate-180 transition-all duration-300 opacity-90 hover:opacity-100"
          />
        </div>

      </div>
    </section>
  );
}