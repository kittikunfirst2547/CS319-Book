import { useFavoritesStore, useIsFavorite } from "../../stores/favoritesStore";

type HeartButtonProps = {
  serviceId: string;
};

export function HeartButton({ serviceId }: HeartButtonProps) {
  const isFavorite = useIsFavorite(serviceId);
  const toggle = useFavoritesStore((state) => state.toggle);

  return (
    <button
      type="button"
      aria-label="รายการโปรด"
      aria-pressed={isFavorite}
      onClick={() => toggle(serviceId)}
      className={`btn btn-circle border ${isFavorite ? "border-primary bg-primary/10 text-primary" : "btn-ghost border-base-300"}`}
    >
      <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
    </button>
  );
}
