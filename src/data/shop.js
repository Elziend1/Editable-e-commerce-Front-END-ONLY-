export const shop = {
  name: "Aperture",
  tagline: "Tools for focus.",
  currency: "USD",
  locale: "en-US",
  freeShippingThreshold: 150,

  products: [
    { id: "orbit-headphones", name: "Orbit Headphones", price: 349, category: "Audio", badge: "new",
      image: "https://picsum.photos/seed/orbit/900/900",
      description: "Over-ear, adaptive noise cancelling, 40-hour battery." },
    { id: "halo-speaker", name: "Halo Speaker", price: 199, category: "Audio", badge: null,
      image: "https://picsum.photos/seed/halo/900/900",
      description: "360 degree sound in a machined aluminium body." },
    { id: "slate-keyboard", name: "Slate Keyboard", price: 179, category: "Desk", badge: null,
      image: "https://picsum.photos/seed/slate/900/900",
      description: "Low-profile mechanical, backlit, wireless." },
    { id: "glide-mouse", name: "Glide Mouse", price: 99, category: "Desk", badge: "sale",
      image: "https://picsum.photos/seed/glide/900/900",
      description: "Precision tracking with silent clicks." },
    { id: "beam-lamp", name: "Beam Lamp", price: 129, category: "Desk", badge: null,
      image: "https://picsum.photos/seed/beam/900/900",
      description: "Warm, dimmable, and it remembers your setting." },
    { id: "core-charger", name: "Core Charger", price: 59, category: "Power", badge: null,
      image: "https://picsum.photos/seed/core/900/900",
      description: "65W GaN. Two ports. Fits in a pocket." },
    { id: "arc-cable", name: "Arc Cable", price: 29, category: "Power", badge: "soldout",
      image: "https://picsum.photos/seed/arc/900/900",
      description: "Braided USB-C, 2 metres, rated for 240W." },
    { id: "mono-stand", name: "Mono Stand", price: 89, category: "Desk", badge: null,
      image: "https://picsum.photos/seed/mono/900/900",
      description: "Aluminium laptop riser, adjustable height." },
  ],
};

// NEW: Store Location Data
export const storeInfo = {
  address: "102 Greene Street, SoHo, New York, NY 10012",
  phone: "+1 (212) 555-0198",
  email: "hello@aperture.com",
  hours: [
    { day: "Mon - Fri", time: "10:00 AM - 8:00 PM" },
    { day: "Saturday", time: "10:00 AM - 9:00 PM" },
    { day: "Sunday", time: "11:00 AM - 6:00 PM" },
  ],
  mapUrl: "https://maps.google.com/maps?q=102%20Greene%20St,%20New%20York,%20NY%2010012&t=&z=15&ie=UTF8&iwloc=&output=embed"
};