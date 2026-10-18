import { Link } from "react-router";
import type { Domain } from "../../types/longevity";
import type { Service } from "../../types/service";
import { DOMAIN_LABELS } from "../../lib/longevityContent";
import { ServiceImage } from "../ui/ServiceImage";

type ResultPanelProps = {
  weakest: Domain | null;
  isDone: boolean;
  service: Service | undefined;
};

export function ResultPanel({ weakest, isDone, service }: ResultPanelProps) {
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
            <ServiceImage
              src={service.imageUrl}
              alt={service.name}
              className="h-32"
            />
            <p className="font-semibold">{service.name}</p>
            <Link
              to={`/services/${service.id}`}
              className="btn btn-primary rounded-xl"
            >
              จองต่อ
            </Link>
          </>
        ) : weakest ? (
          <p className="text-sm text-base-content/60">
            ยังไม่พบบริการที่ตรงกับผลลัพธ์นี้
          </p>
        ) : (
          <p className="text-sm text-base-content/60">
            ตอบคำถามอย่างน้อย 1 ข้อ เพื่อดูบริการที่แนะนำ
          </p>
        )}
      </div>
    </aside>
  );
}
