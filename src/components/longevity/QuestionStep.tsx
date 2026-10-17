import type { Question } from "../../types/longevity";
import { ANSWER_OPTIONS } from "../../data/longevity";
import { useLongevityStore } from "../../stores/longevityStore";

type QuestionStepProps = {
  question: Question;
  index: number;
  total: number;
};

export function QuestionStep({ question, index, total }: QuestionStepProps) {
  const answer = useLongevityStore((state) => state.answers[question.domain]);
  const setAnswer = useLongevityStore((state) => state.setAnswer);
  const setStep = useLongevityStore((state) => state.setStep);
  const isLast = index === total - 1;

  return (
    <>
      <h2 id="question-title" className="text-lg font-semibold">
        ข้อ {index + 1}/{total} · {question.title}: {question.question}
      </h2>

      <div role="group" aria-labelledby="question-title" className="space-y-3">
        {ANSWER_OPTIONS.map((option) => {
          const selected = answer === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setAnswer(question.domain, option.value)}
              className={`btn w-full justify-start rounded-xl font-normal ${selected ? "btn-primary" : "border-base-300 bg-base-100"}`}
            >
              {option.value} · {option.label}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setStep(index - 1)}
          className="btn btn-outline btn-primary rounded-xl"
        >
          ย้อนกลับ
        </button>
        <button
          type="button"
          disabled={answer === undefined}
          onClick={() => setStep(index + 1)}
          className="btn btn-primary rounded-xl"
        >
          {isLast ? "ดูผลลัพธ์" : "ข้อถัดไป"}
        </button>
      </div>
    </>
  );
}
