import { Link } from "react-router";
import type { Service } from "../../types/service";
import { CATEGORY_LABELS } from "../../lib/categories";
import { formatPrice } from "../../lib/format";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

type FavoriteCardProps = {
  service: Service;
};

export function FavoriteCard({ service }: FavoriteCardProps) {
  const remove = useFavoritesStore((state) => state.remove);

  return (
    <article className="card rounded-2xl bg-base-100 shadow-sm">
      <div className="card-body gap-2 p-4">
        <ImagePlaceholder className="mb-2 h-40" />
        <p className="text-xs text-base-content/60">
          {CATEGORY_LABELS[service.category]}
        </p>
        <h2 className="card-title text-base">{service.name}</h2>
        <p className="text-lg font-bold text-primary">
          {formatPrice(service.price)}
        </p>
        <div className="card-actions mt-2">
          <Link
            to={`/services/${service.id}`}
            className="btn btn-outline btn-primary flex-1 rounded-xl"
          >
            ดูรายละเอียด
          </Link>
          <button
            type="button"
            onClick={() => remove(service.id)}
            className="btn btn-outline btn-error rounded-xl"
          >
            ลบออก
          </button>
        </div>
      </div>
    </article>
  );
}
