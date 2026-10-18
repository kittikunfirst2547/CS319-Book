export const queryKeys = {
  services: {
    all: ["services"] as const,
    detail: (id: string) => ["services", id] as const,
  },
  reviews: {
    byService: (serviceId: string) => ["reviews", "service", serviceId] as const,
  },
  slots: {
    byService: (serviceId: string) => ["slots", "service", serviceId] as const,
  },
  bookings: {
    all: ["bookings"] as const,
  },
  questions: {
    all: ["questions"] as const,
  },
};
