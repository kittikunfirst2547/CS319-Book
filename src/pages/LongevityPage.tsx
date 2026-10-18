import { useEffect } from "react";
import { findWeakestDomain } from "../lib/longevity";
import { useLongevityStore } from "../stores/longevityStore";
import { ProgressSteps } from "../components/longevity/ProgressSteps";
import { QuestionStep } from "../components/longevity/QuestionStep";
import { ResultPanel } from "../components/longevity/ResultPanel";
import { DoneSummary } from "../components/longevity/DoneSummary";
import { QueryError } from "../components/ui/QueryError";
import { ServiceGridSkeleton } from "../components/ui/ServiceGridSkeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { useQuestions } from "../hooks/useQuestions";
import { useServices } from "../hooks/useServices";

export function LongevityPage() {
  const step = useLongevityStore((state) => state.step);
  const answers = useLongevityStore((state) => state.answers);
  const setStep = useLongevityStore((state) => state.setStep);
  const questionsQuery = useQuestions();
  const servicesQuery = useServices();

  const questions = questionsQuery.data ?? [];
  const safeStep = step < 0 || step > questions.length ? 0 : step;

  useEffect(() => {
    if (questionsQuery.isSuccess && safeStep !== step) setStep(safeStep);
  }, [questionsQuery.isSuccess, safeStep, setStep, step]);

  if (questionsQuery.isPending || servicesQuery.isPending) {
    return <ServiceGridSkeleton />;
  }

  if (questionsQuery.isError || servicesQuery.isError) {
    return (
      <QueryError
        message="ไม่สามารถโหลดแบบประเมิน Longevity ได้"
        onRetry={() => {
          void Promise.all([questionsQuery.refetch(), servicesQuery.refetch()]);
        }}
      />
    );
  }

  if (questions.length === 0) {
    return (
      <EmptyState
        title="ยังไม่มีคำถามในแบบประเมิน"
        description="กรุณาเพิ่มข้อมูลคำถามในเซิร์ฟเวอร์แล้วลองใหม่"
      />
    );
  }

  if (servicesQuery.data.length === 0) {
    return (
      <EmptyState
        title="ยังไม่มีบริการสำหรับคำแนะนำ"
        description="กรุณาเพิ่มข้อมูลบริการในเซิร์ฟเวอร์แล้วลองใหม่"
      />
    );
  }

  const domainOrder = questions.map((question) => question.domain);
  const question = questions[safeStep];
  const weakest = findWeakestDomain(answers, domainOrder);
  const recommendationId = questions.find(
    (item) => item.domain === weakest,
  )?.recommendationServiceId;
  const recommendedService = servicesQuery.data.find(
    (service) => service.id === recommendationId,
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Longevity Check</h1>

      <div className="grid items-start gap-6 lg:grid-cols-5">
        <section className="card rounded-2xl bg-base-100 shadow-sm lg:col-span-3">
          <div className="card-body gap-5">
            <ProgressSteps domains={domainOrder} current={safeStep} />
            {question ? (
              <QuestionStep
                question={question}
                index={safeStep}
                total={questions.length}
              />
            ) : (
              <DoneSummary questions={questions} />
            )}
          </div>
        </section>

        <ResultPanel
          weakest={weakest}
          isDone={!question}
          service={recommendedService}
        />
      </div>
    </div>
  );
}
