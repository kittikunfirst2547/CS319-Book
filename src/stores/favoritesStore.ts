import { create } from "zustand";
import { persist } from "zustand/middleware";

// Client state: only the ids. The service data itself stays in data/ (later: TanStack Query).
type FavoritesState = {
  ids: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id],
        })),
      remove: (id) =>
        set((state) => ({ ids: state.ids.filter((x) => x !== id) })),
    }),
    { name: "wellbook-favorites" }, // localStorage key
  ),
);

// Selector returns a boolean → the component re-renders only when THIS id flips
export function useIsFavorite(id: string): boolean {
  return useFavoritesStore((state) => state.ids.includes(id));
}
