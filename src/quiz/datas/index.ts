import { englishQuestions } from "./englishQuestions";
import { triviaQuestions } from "./triviaQuestions";

export const questionMap = {
  english: {
    genreName: "英語",
    questions: englishQuestions,
  },
  trivia: {
    genreName: "雑学",
    questions: triviaQuestions,
  },
} as const;

export type Genre = keyof typeof questionMap;