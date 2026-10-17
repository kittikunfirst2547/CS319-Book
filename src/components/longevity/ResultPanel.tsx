import { Link } from "react-router";
import type { Domain } from "../../types/longevity";
import { DOMAIN_LABELS, RECOMMENDATIONS } from "../../data/longevity";
import { services } from "../../data/services";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

type ResultPanelProps = {
  weakest: Domain | null;
  isDone: boolean;
};

export function ResultPanel({ weakest, isDone }: ResultPanelProps) {
  const service = weakest
    ? services.find((s) => s.id === RECOMMENDATIONS[weakest])
    : undefined;

  return (
    <aside className="card rounded-2xl bg-base-100 shadow-sm lg:col-span-2">
      <div className="card-body gap-3">
        <h2 className="text-lg font-bold">
          {isDone ? "ผลลัพธ์ของคุณ" : "ตัวอย่างผลลัพธ์"}
        </h2>

        {weakest && service ? (
          <>
            <p className="text-sm text-base-content/60">
              ด้านที่คะแนนต่ำ: {DOMAIN_LABELS[weakest]}
            </p>
            <ImagePlaceholder className="h-32" />
            <p className="font-semibold">{service.name}</p>
            <Link
              to={`/services/${service.id}`}
              className="btn btn-primary rounded-xl"
            >
              จองต่อ
            </Link>
          </>
        ) : (
          <p className="text-sm text-base-content/60">
            ตอบคำถามอย่างน้อย 1 ข้อ เพื่อดูบริการที่แนะนำ
          </p>
        )}
      </div>
    </aside>
  );
}
