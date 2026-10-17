import { services } from "../data/services";
import { useFavoritesStore } from "../stores/favoritesStore";
import { EmptyState } from "../components/ui/EmptyState";
import { FavoriteCard } from "../components/service/FavoriteCard";

export function MyPage() {
  const favoriteIds = useFavoritesStore((state) => state.ids);
  // Derived: ids (Zustand) + service list (data) → favorite services
  const favorites = services.filter((s) => favoriteIds.includes(s.id));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">การจองของฉัน</h1>
      {/* tabs การจอง / รายการโปรด come in 1.7 */}

      {favorites.length === 0 ? (
        <EmptyState
          title="ยังไม่มีรายการโปรด"
          description="กด ♡ ที่บริการที่สนใจ เพื่อบันทึกไว้ดูภายหลัง"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((service) => (
            <FavoriteCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
