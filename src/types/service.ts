export type Category = "checkup" | "fitness" | "yoga" | "nutrition" | "spa";

export type Service = {
  id: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  reviewCount: number;
  provider: string;
  description: string;
  imageUrl: string;
  durationMin: number;
};
