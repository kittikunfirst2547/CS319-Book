import { services } from "../data/services";
import { ServiceCard } from "../components/ui/ServiceCard";

export function HomePage() {
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
