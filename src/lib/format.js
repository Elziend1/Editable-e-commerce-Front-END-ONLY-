import { shop } from "../data/shop";

const formatter = new Intl.NumberFormat(shop.locale, {
  style: "currency",
  currency: shop.currency,
  maximumFractionDigits: 0,
});

export const formatPrice = (amount) => formatter.format(amount);