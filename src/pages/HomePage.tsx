import { useState } from "react";
import { services } from "../data/services";
import { ServiceCard } from "../components/ui/ServiceCard";
import { EmptyState } from "../components/ui/EmptyState";
import type { Category } from "../types/service";
import { CATEGORY_LABELS } from "../lib/categories";

type CategoryFilter = Category | "all";

const CATEGORY_OPTIONS: CategoryFilter[] = [
  "all",
  ...(Object.keys(CATEGORY_LABELS) as Category[]),
];

type PriceRange = "all" | "under500" | "500to1000" | "over1000";
type SortKey = "rating" | "priceAsc" | "priceDesc";

const PRICE_OPTIONS: { value: PriceRange; label: string }[] = [
  { value: "all", label: "ราคา: ทุกช่วง" },
  { value: "under500", label: "ต่ำกว่า ฿500" },
  { value: "500to1000", label: "฿500 – ฿1,000" },
  { value: "over1000", label: "มากกว่า ฿1,000" },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "rating", label: "เรียงตาม: คะแนนสูงสุด" },
  { value: "priceAsc", label: "ราคา: น้อย → มาก" },
  { value: "priceDesc", label: "ราคา: มาก → น้อย" },
];

function matchesPrice(price: number, range: PriceRange): boolean {
  switch (range) {
    case "under500":
      return price < 500;
    case "500to1000":
      return price >= 500 && price <= 1000;
    case "over1000":
      return price > 1000;
    default:
      return true;
  }
}

export function HomePage() {
  // UI state — one piece per control
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sort, setSort] = useState<SortKey>("rating");

  // Derived during render — never stored in state
  const keyword = query.trim().toLowerCase();
  const filtered = services.filter((s) => {
    const nameOk = s.name.toLowerCase().includes(keyword);
    const categoryOk = category === "all" || s.category === category;
    const priceOk = matchesPrice(s.price, priceRange);
    return nameOk && categoryOk && priceOk;
  });
  const sorted = filtered.toSorted((a, b) => {
    if (sort === "priceAsc") return a.price - b.price;
    if (sort === "priceDesc") return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-base-content">
          ค้นหาบริการสุขภาพที่เหมาะกับคุณ
        </h1>
        <p className="mt-1 text-sm text-base-content/60">
          ค้นหา เลือกเวลาว่าง และจองได้ในที่เดียว
        </p>
      </header>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            ค้นหาบริการ
          </label>
          <input
            id="search"
            type="search"
            placeholder="ค้นหาตามชื่อบริการ เช่น ตรวจสุขภาพ ฟิตเนส โยคะ"
            className="input w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <label htmlFor="price" className="sr-only">
          ช่วงราคา
        </label>
        <select
          id="price"
          className="select md:w-48"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value as PriceRange)}
        >
          {PRICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <label htmlFor="sort" className="sr-only">
          เรียงลำดับ
        </label>
        <select
          id="sort"
          className="select md:w-56"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORY_OPTIONS.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={`btn rounded-full ${category === c ? "btn-primary" : "bg-base-100"}`}
          >
            {c === "all" ? "ทั้งหมด" : CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          title="ไม่พบบริการ"
          description="ลองเปลี่ยนคำค้นหา หมวดหมู่ หรือช่วงราคา"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
