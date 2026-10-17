import type { Service } from "../../types/service";
import { CATEGORY_LABELS } from "../../lib/categories";
import { formatPrice } from "../../lib/format";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Rating } from "./Rating";
import { HeartButton } from "./HeartButton";
import { Link } from "react-router";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="card rounded-2xl bg-base-100 shadow-sm">
      <div className="card-body gap-2 p-4">
        <ImagePlaceholder className="mb-2 h-40" />
        <p className="text-xs text-base-content/60">
          {CATEGORY_LABELS[service.category]}
        </p>
        <h2 className="card-title text-base">{service.name}</h2>
        <div className="flex items-center justify-between">
          <Rating value={service.rating} />
          <span className="text-lg font-bold text-primary">
            {formatPrice(service.price)}
          </span>
        </div>
        <div className="card-actions mt-2 items-center">
          <Link
            to={`/services/${service.id}`}
            className="btn btn-outline btn-primary flex-1 rounded-xl"
          >
            ดูรายละเอียด
          </Link>
          <HeartButton serviceId={service.id} />
        </div>
      </div>
    </article>
  );
}
