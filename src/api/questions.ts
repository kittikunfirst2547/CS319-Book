import type { Question } from "../types/longevity";
import { apiRequest } from "./client";

export function getQuestions(): Promise<Question[]> {
  return apiRequest<Question[]>("/questions");
}
