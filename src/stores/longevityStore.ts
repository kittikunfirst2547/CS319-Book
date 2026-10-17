import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AnswerValue, Answers, Domain } from "../types/longevity";

type LongevityState = {
  step: number; // 0..4 = question index, 5 = done
  answers: Answers;
  setAnswer: (domain: Domain, value: AnswerValue) => void;
  setStep: (step: number) => void;
  reset: () => void;
};

// step is persisted too, so leaving the page and coming back resumes the quiz
export const useLongevityStore = create<LongevityState>()(
  persist(
    (set) => ({
      step: 0,
      answers: {},
      setAnswer: (domain, value) =>
        set((state) => ({ answers: { ...state.answers, [domain]: value } })),
      setStep: (step) => set({ step }),
      reset: () => set({ step: 0, answers: {} }),
    }),
    { name: "wellbook-longevity" },
  ),
);
