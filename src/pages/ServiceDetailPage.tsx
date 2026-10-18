import { Link, useParams } from "react-router";
import { CATEGORY_LABELS } from "../lib/categories";
import { ServiceImage } from "../components/ui/ServiceImage";
import { Rating } from "../components/ui/Rating";
import { ReviewCard } from "../components/ui/ReviewCard";
import { EmptyState } from "../components/ui/EmptyState";
import { BookingCard } from "../components/service/BookingCard";
import { QueryError } from "../components/ui/QueryError";
import { ServiceGridSkeleton } from "../components/ui/ServiceGridSkeleton";
import { ApiError } from "../api/client";
import { useService } from "../hooks/useService";
import { useReviews } from "../hooks/useReviews";
import { useSlots } from "../hooks/useSlots";
import { useBookings, useCreateBooking } from "../hooks/useBookings";
import type { NewBooking } from "../api/bookings";

export function ServiceDetailPage() {
  const { id } = useParams();
  const serviceQuery = useService(id);
  const reviewsQuery = useReviews(id);
  const slotsQuery = useSlots(id);
  const bookingsQuery = useBookings();
  const createBooking = useCreateBooking();

  const isPending =
    serviceQuery.isPending ||
    reviewsQuery.isPending ||
    slotsQuery.isPending ||
    bookingsQuery.isPending;
  const isNotFound =
    serviceQuery.error instanceof ApiError && serviceQuery.error.status === 404;
  const hasError =
    serviceQuery.isError ||
    reviewsQuery.isError ||
    slotsQuery.isError ||
    bookingsQuery.isError;

  if (isPending) return <ServiceGridSkeleton />;

  if (isNotFound || !id) {
    return (
      <div className="space-y-4">
        <EmptyState
          title="ไม่พบบริการนี้"
          description="ลิงก์อาจไม่ถูกต้อง หรือบริการถูกนำออกไปแล้ว"
        />
        <div className="text-center">
          <Link to="/" className="btn btn-primary rounded-xl">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <QueryError
        message="ไม่สามารถโหลดรายละเอียดบริการได้ กรุณาตรวจสอบ Backend Server"
        onRetry={() => {
          void Promise.all([
            serviceQuery.refetch(),
            reviewsQuery.refetch(),
            slotsQuery.refetch(),
            bookingsQuery.refetch(),
          ]);
        }}
      />
    );
  }

  const service = serviceQuery.data;
  if (!service) return null;

  const categoryLabel = CATEGORY_LABELS[service.category];
  const serviceReviews = reviewsQuery.data ?? [];
  const serviceSlots = slotsQuery.data ?? [];
  const bookings = bookingsQuery.data ?? [];

  async function handleConfirm(input: NewBooking) {
    await createBooking.mutateAsync(input);
  }

  return (
    <div className="space-y-6">
      <nav aria-label="breadcrumb" className="breadcrumbs text-sm text-base-content/70">
        <ul>
          <li>
            <Link to="/">หน้าหลัก</Link>
          </li>
          <li>{categoryLabel}</li>
          <li aria-current="page">{service.name}</li>
        </ul>
      </nav>

      {/* items-start: lets the booking card be sticky inside the grid */}
      <div className="grid items-start gap-6 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <ServiceImage
            src={service.imageUrl}
            alt={service.name}
            loading="eager"
            className="h-64 md:h-80"
          />

          <div>
            <p className="text-sm text-base-content/60">{categoryLabel}</p>
            <h1 className="text-3xl font-bold">{service.name}</h1>
            <Rating value={service.rating} count={service.reviewCount} />
          </div>

          <p className="text-base-content/80">{service.description}</p>

          <h2 className="pt-2 text-xl font-bold">รีวิว</h2>
          {serviceReviews.length === 0 ? (
            <p className="text-sm text-base-content/60">ยังไม่มีรีวิว</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {serviceReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </section>

        {/* key: switching to another service remounts the card → selection resets */}
        <BookingCard
          key={service.id}
          service={service}
          slots={serviceSlots}
          bookings={bookings}
          onConfirm={handleConfirm}
          isConfirming={createBooking.isPending}
          confirmError={
            createBooking.isError
              ? "จองไม่สำเร็จ กรุณาลองอีกครั้ง"
              : null
          }
        />
      </div>
    </div>
  );
}
