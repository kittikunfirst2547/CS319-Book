const priceFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

// timeZone "UTC" because new Date("YYYY-MM-DD") is parsed as UTC midnight
const weekdayFormatter = new Intl.DateTimeFormat("th-TH", {
  weekday: "narrow",
  timeZone: "UTC",
});

// "2026-10-14" → "พ. 14"
export function formatDayPill(isoDate: string): string {
  const date = new Date(isoDate);
  return `${weekdayFormatter.format(date)}. ${date.getUTCDate()}`;
}
