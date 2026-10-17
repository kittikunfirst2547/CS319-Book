import type { Answers, Domain } from "../types/longevity";

/**
 * Pure function: same input → same output, no side effects (easy to unit-test).
 * Lowest score wins. Tie → the domain that comes first in `order` (strict `<`).
 * Returns null when nothing is answered yet.
 */
export function findWeakestDomain(answers: Answers, order: Domain[]): Domain | null {
  let weakest: Domain | null = null;
  let lowest = Infinity;

  for (const domain of order) {
    const score = answers[domain];
    if (score !== undefined && score < lowest) {
      weakest = domain;
      lowest = score;
    }
  }

  return weakest;
}
