export type Domain = "sleep" | "exercise" | "diet" | "stress" | "social";

export type AnswerValue = 1 | 2 | 3 | 4;

export type Question = {
  id: string;
  domain: Domain;
  title: string; // "ด้านการนอน"
  question: string;
  recommendationServiceId: string;
};

// Not every domain is answered yet → Partial
export type Answers = Partial<Record<Domain, AnswerValue>>;
