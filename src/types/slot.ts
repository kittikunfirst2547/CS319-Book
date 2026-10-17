export type Slot = {
  id: string;
  serviceId: string;
  date: string; // "YYYY-MM-DD", e.g. "2026-10-14"
  times: string[]; // ["09:00", "10:30", "13:00"]
};
