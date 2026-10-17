export type BookingStatus = "confirmed" | "cancelled";

export type Booking = {
  id: string;
  userId: string;
  serviceId: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "10:30"
  status: BookingStatus;
  createdAt: string; // ISO datetime
};
