import type { Question } from "../types/longevity";
import { apiRequest } from "./client";

export async function getQuestions(): Promise<Question[]> {
  return apiRequest<Question[]>("/questions");
}
