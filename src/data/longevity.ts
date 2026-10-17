import type { AnswerValue, Domain, Question } from "../types/longevity";

// Order here = order of the quiz AND the tie-break order
export const QUESTIONS: Question[] = [
  {
    id: "1",
    domain: "sleep",
    title: "ด้านการนอน",
    question: "คุณนอนหลับพอและเป็นเวลาแค่ไหน",
  },
  {
    id: "2",
    domain: "exercise",
    title: "ด้านการออกกำลังกาย",
    question: "คุณออกกำลังกายอย่างน้อย 30 นาทีบ่อยแค่ไหน",
  },
  {
    id: "3",
    domain: "diet",
    title: "ด้านอาหาร",
    question: "คุณกินผัก ผลไม้ และอาหารที่มีประโยชน์บ่อยแค่ไหน",
  },
  {
    id: "4",
    domain: "stress",
    title: "ด้านความเครียด",
    question: "คุณรู้สึกผ่อนคลายและจัดการความเครียดได้บ่อยแค่ไหน",
  },
  {
    id: "5",
    domain: "social",
    title: "ด้านสังคม",
    question: "คุณได้พบปะพูดคุยกับเพื่อนหรือครอบครัวบ่อยแค่ไหน",
  },
];

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

// Weakest domain → recommended service id
export const RECOMMENDATIONS: Record<Domain, string> = {
  sleep: "5", // สปาผ่อนคลายทั้งตัว
  exercise: "3", // เทรนเนอร์ส่วนตัว 1 ชม.
  diet: "4", // ปรึกษานักโภชนาการ
  stress: "2", // คลาสโยคะเช้า
  social: "6", // คลาสฟิตเนสกลุ่ม
};
