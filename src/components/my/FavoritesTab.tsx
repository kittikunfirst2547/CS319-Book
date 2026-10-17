import { services } from "../../data/services";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { EmptyState } from "../ui/EmptyState";
import { FavoriteCard } from "../service/FavoriteCard";

export function FavoritesTab() {
  const favoriteIds = useFavoritesStore((state) => state.ids);
  // Derived: ids (Zustand) + service list (data) → favorite services
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
