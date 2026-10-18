import type { Domain } from "../../types/longevity";
import { DOMAIN_LABELS } from "../../lib/longevityContent";

type ProgressStepsProps = {
  domains: Domain[];
  current: number; // index of the current question
};

export function ProgressSteps({ domains, current }: ProgressStepsProps) {
  return (
    <ol aria-label="ความคืบหน้า" className="flex gap-2">
      {domains.map((domain, i) => (
        <li
          key={domain}
          aria-current={i === current ? "step" : undefined}
          className="flex-1"
        >
          <div
            className={`h-1.5 rounded-full ${i <= current ? "bg-primary" : "bg-base-300"}`}
          />
          <p
            className={`mt-2 text-xs ${i === current ? "font-bold text-primary" : "text-base-content/60"}`}
          >
            {DOMAIN_LABELS[domain]}
          </p>
        </li>
      ))}
    </ol>
  );
}
