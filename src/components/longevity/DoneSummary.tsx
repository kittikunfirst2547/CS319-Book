import { DOMAIN_LABELS } from "../../lib/longevityContent";
import { useLongevityStore } from "../../stores/longevityStore";
import type { Question } from "../../types/longevity";

type DoneSummaryProps = {
  questions: Question[];
};

export function DoneSummary({ questions }: DoneSummaryProps) {
  const answers = useLongevityStore((state) => state.answers);
  const reset = useLongevityStore((state) => state.reset);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">ทำแบบประเมินครบแล้ว</h2>

      <ul className="space-y-1 text-sm">
        {questions.map((q) => (
          <li key={q.id} className="flex justify-between">
            <span>{DOMAIN_LABELS[q.domain]}</span>
            <span className="font-semibold">{answers[q.domain] ?? "-"} / 4</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={reset}
        className="btn btn-outline btn-primary rounded-xl"
      >
        ทำใหม่
      </button>
    </div>
  );
}
