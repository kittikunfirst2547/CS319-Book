import type { Booking } from "../src/types/booking";
import type { Question } from "../src/types/longevity";
import type { Review } from "../src/types/review";
import type { Service } from "../src/types/service";
import type { Slot } from "../src/types/slot";
import { ApiError, apiRequest } from "../src/api/client";
import { getServices, getService } from "../src/api/services";
import { getReviews } from "../src/api/reviews";
import { getSlots } from "../src/api/slots";
import {
  cancelBooking,
  createBooking,
  getBookings,
  type NewBooking,
} from "../src/api/bookings";
import { getQuestions } from "../src/api/questions";

type Equal<Left, Right> =
  (<T>() => T extends Left ? 1 : 2) extends
  (<T>() => T extends Right ? 1 : 2)
    ? true
    : false;
type Assert<T extends true> = T;

type Contracts = [
  Assert<Equal<ReturnType<typeof getServices>, Promise<Service[]>>>,
  Assert<Equal<ReturnType<typeof getService>, Promise<Service>>>,
  Assert<Equal<ReturnType<typeof getReviews>, Promise<Review[]>>>,
  Assert<Equal<ReturnType<typeof getSlots>, Promise<Slot[]>>>,
  Assert<Equal<ReturnType<typeof getBookings>, Promise<Booking[]>>>,
  Assert<Equal<ReturnType<typeof createBooking>, Promise<Booking>>>,
  Assert<Equal<ReturnType<typeof cancelBooking>, Promise<Booking>>>,
  Assert<Equal<ReturnType<typeof getQuestions>, Promise<Question[]>>>,
];

const newBooking: NewBooking = {
  serviceId: "1",
  date: "2026-10-22",
  time: "13:00",
  status: "confirmed",
  createdAt: "2026-10-18T12:00:00.000Z",
};

const error = new ApiError("Not found", 404);
const contracts: Contracts = [true, true, true, true, true, true, true, true];

void apiRequest;
void newBooking;
void error.status;
void contracts;
