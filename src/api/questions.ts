import type { Question } from "../types/longevity";
import { getDatabase } from "./client";

export async function getQuestions(): Promise<Question[]> {
  return (await getDatabase()).questions;
}
