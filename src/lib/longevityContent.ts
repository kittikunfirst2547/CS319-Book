import type { AnswerValue, Domain } from "../types/longevity";

export const ANSWER_OPTIONS: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "แทบไม่เคย" },
  { value: 2, label: "นานๆ ครั้ง" },
  { value: 3, label: "ครึ่งหนึ่งของสัปดาห์" },
  { value: 4, label: "เกือบทุกวัน" },
];

export const DOMAIN_LABELS: Record<Domain, string> = {
  sleep: "นอน",
  exercise: "ออกกำลังกาย",
  diet: "อาหาร",
  stress: "ความเครียด",
  social: "สังคม",
};
