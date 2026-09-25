import { useState } from "react";
import type { Answer, Question } from "../types/question";
import { questionsData } from "../datas/questions";

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const getQuestions = (questionNum: number = 5): Question[] => {
  return shuffleArray(questionsData)
    .slice(0, questionNum)
    .map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }));
};

interface UseQuizReturn {
  questions: Question[];
  answers: Answer[];
  currentIndex: number;
  currentQuestion: Question;
  isFinished: boolean;
  answerQuestion: (question: Question, answerId: number) => void;
  resetQuiz: () => void;
  nextQuestion: () => void;
}

export const useQuiz = (questionNum: number = 5): UseQuizReturn => {
  const [questions, setQuestions] = useState<Question[]>(getQuestions(questionNum));
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentQuestion: Question = questions[currentIndex];

  const answerQuestion = (question: Question, selectedId: number): void => {
    setAnswers((prev) => [...prev, { question, selectedId }]);
  };

  const resetQuiz = () => {
    setQuestions(getQuestions(questionNum));
    setAnswers([]);
    setCurrentIndex(0);
  };

  const nextQuestion = (): void => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const isFinished =
    questions.length > 0 && answers.length === questions.length;

  return {
    questions,
    answers,
    currentIndex,
    currentQuestion,
    isFinished,
    answerQuestion,
    resetQuiz,
    nextQuestion,
  };
};
