import { Link, useParams } from "react-router";
import { services } from "../data/services";
import { reviews } from "../data/reviews";
import { slots } from "../data/slots";
import { CATEGORY_LABELS } from "../lib/categories";
import { ImagePlaceholder } from "../components/ui/ImagePlaceholder";
import { Rating } from "../components/ui/Rating";
import { ReviewCard } from "../components/ui/ReviewCard";
import { EmptyState } from "../components/ui/EmptyState";
import { BookingCard } from "../components/service/BookingCard";

export function ServiceDetailPage() {
  // URL params are always strings (or undefined) — our ids are strings too
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  if (!service) {
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

  const categoryLabel = CATEGORY_LABELS[service.category];
  const serviceReviews = reviews.filter((r) => r.serviceId === service.id);
  const serviceSlots = slots.filter((s) => s.serviceId === service.id);

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
          <ImagePlaceholder className="h-64 md:h-80" />

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
        <BookingCard key={service.id} service={service} slots={serviceSlots} />
      </div>
    </div>
  );
}
