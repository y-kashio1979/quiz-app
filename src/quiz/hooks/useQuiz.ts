import { useEffect, useState } from "react";
import type { Answer, Question } from "../types/question";
import { questionMap, type Genre } from "../datas";

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const getQuestions = (genre: Genre, questionNum: number = 5): Question[] => {
  const questions = questionMap[genre];
  return shuffleArray(questions.questions)
    .slice(0, questionNum)
    .map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }));
};

interface UseQuizReturn {
  genreName: string;
  questions: Question[];
  answers: Answer[];
  currentIndex: number;
  currentQuestion: Question;
  isFinished: boolean;
  answerQuestion: (question: Question, answerId: number) => void;
  resetQuiz: () => void;
  nextQuestion: () => void;
}

export const useQuiz = (
  genre: Genre,
  questionNum: number = 5,
): UseQuizReturn => {
  const [questions, setQuestions] = useState<Question[]>(() =>
    getQuestions(genre, questionNum),
  );
  const genreName = questionMap[genre].genreName;
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentQuestion: Question = questions[currentIndex];

  useEffect(() => {
    setQuestions(getQuestions(genre, questionNum));
    setAnswers([]);
    setCurrentIndex(0);
  }, [genre, questionNum]);

  const answerQuestion = (question: Question, selectedId: number): void => {
    setAnswers((prev) => [...prev, { question, selectedId }]);
  };

  const resetQuiz = () => {
    setQuestions(getQuestions(genre, questionNum));
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
    genreName,
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
