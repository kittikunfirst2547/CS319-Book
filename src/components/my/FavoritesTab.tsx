import { useFavoritesStore } from "../../stores/favoritesStore";
import { useServices } from "../../hooks/useServices";
import { EmptyState } from "../ui/EmptyState";
import { FavoriteCard } from "../service/FavoriteCard";
import { QueryError } from "../ui/QueryError";
import { ServiceGridSkeleton } from "../ui/ServiceGridSkeleton";

export function FavoritesTab() {
  const favoriteIds = useFavoritesStore((state) => state.ids);
  const servicesQuery = useServices();

  if (servicesQuery.isPending) return <ServiceGridSkeleton />;

  if (servicesQuery.isError) {
    return (
      <QueryError
        message="ไม่สามารถโหลดรายการบริการที่บันทึกไว้ได้"
        onRetry={() => void servicesQuery.refetch()}
      />
    );
  }

  // Derived: ids (Zustand) + server services → favorite services
  const services = servicesQuery.data;
  const favorites = services.filter((s) => favoriteIds.includes(s.id));

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="ยังไม่มีรายการโปรด"
        description="กด ♡ ที่บริการที่สนใจ เพื่อบันทึกไว้ดูภายหลัง"
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((service) => (
        <FavoriteCard key={service.id} service={service} />
      ))}
    </div>
  );
}
