import { QUESTIONS } from "../data/longevity";
import { findWeakestDomain } from "../lib/longevity";
import { useLongevityStore } from "../stores/longevityStore";
import { ProgressSteps } from "../components/longevity/ProgressSteps";
import { QuestionStep } from "../components/longevity/QuestionStep";
import { ResultPanel } from "../components/longevity/ResultPanel";
import { DoneSummary } from "../components/longevity/DoneSummary";

const DOMAIN_ORDER = QUESTIONS.map((q) => q.domain);

export function LongevityPage() {
  const step = useLongevityStore((state) => state.step);
  const answers = useLongevityStore((state) => state.answers);

  const question = QUESTIONS[step]; // undefined once step === QUESTIONS.length
  // Derived live from answers — updates as soon as you pick an option
  const weakest = findWeakestDomain(answers, DOMAIN_ORDER);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Longevity Check</h1>

      <div className="grid items-start gap-6 lg:grid-cols-5">
        <section className="card rounded-2xl bg-base-100 shadow-sm lg:col-span-3">
          <div className="card-body gap-5">
            <ProgressSteps domains={DOMAIN_ORDER} current={step} />
            {question ? (
              <QuestionStep
                question={question}
                index={step}
                total={QUESTIONS.length}
              />
            ) : (
              <DoneSummary />
            )}
          </div>
        </section>

        <ResultPanel weakest={weakest} isDone={!question} />
      </div>
    </div>
  );
}
