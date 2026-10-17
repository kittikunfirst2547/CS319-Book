import { useRef, useState } from "react";
import type { Service } from "../../types/service";
import type { Slot } from "../../types/slot";
import { formatDayPill, formatPrice } from "../../lib/format";
import { Chip } from "../ui/Chip";
import { useFavoritesStore, useIsFavorite } from "../../stores/favoritesStore";

type BookingCardProps = {
  service: Service;
  slots: Slot[];
};

export function BookingCard({ service, slots }: BookingCardProps) {
  // UI state — store the date string, not the whole slot object
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Client state (shared, persisted)
  const isFavorite = useIsFavorite(service.id);
  const toggleFavorite = useFavoritesStore((state) => state.toggle);

  // Derived
  const times = slots.find((s) => s.date === selectedDate)?.times ?? [];
  const canConfirm = selectedDate !== null && selectedTime !== null;

  function handleSelectDate(date: string) {
    setSelectedDate(date);
    setSelectedTime(null); // the old time may not exist on the new day
  }

  return (
    <aside className="card rounded-2xl bg-base-100 shadow-sm lg:sticky lg:top-6">
      <div className="card-body gap-4">
        <div>
          <p className="text-3xl font-bold text-primary">
            {formatPrice(service.price)}
          </p>
          <p className="mt-1 text-sm text-base-content/60">
            ผู้ให้บริการ: {service.provider}
          </p>
        </div>

        {slots.length === 0 ? (
          <p className="text-sm text-base-content/60">
            ยังไม่มีรอบว่างสำหรับบริการนี้
          </p>
        ) : (
          <>
            <fieldset>
              <legend className="mb-2 font-semibold">เลือกวัน</legend>
              <div className="flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <Chip
                    key={slot.id}
                    selected={selectedDate === slot.date}
                    onClick={() => handleSelectDate(slot.date)}
                  >
                    {formatDayPill(slot.date)}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 font-semibold">เลือกเวลา</legend>
              {selectedDate === null ? (
                <p className="text-sm text-base-content/60">กรุณาเลือกวันก่อน</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {times.map((time) => (
                    <Chip
                      key={time}
                      selected={selectedTime === time}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Chip>
                  ))}
                </div>
              )}
            </fieldset>
          </>
        )}

        <button
          type="button"
          className="btn btn-primary rounded-xl"
          disabled={!canConfirm}
          onClick={() => dialogRef.current?.showModal()}
        >
          ยืนยันการจอง
        </button>
        <button
          type="button"
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(service.id)}
          className="btn btn-outline btn-primary rounded-xl"
        >
          <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>{" "}
          {isFavorite ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
        </button>
      </div>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">จองสำเร็จ (จำลอง)</h3>
          <p className="py-2 text-sm text-base-content/70">
            {service.name} · {selectedDate && formatDayPill(selectedDate)} ·{" "}
            {selectedTime} น.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary rounded-xl">ตกลง</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>ปิด</button>
        </form>
      </dialog>
    </aside>
  );
}
