import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../api/questions";
import { queryKeys } from "./queryKeys";

export function useQuestions() {
  return useQuery({
    queryKey: queryKeys.questions.all,
    queryFn: getQuestions,
  });
}
