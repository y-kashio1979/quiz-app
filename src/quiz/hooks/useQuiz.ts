import { useEffect, useState } from "react";
import type { Answer, Question } from "../types/question";
import { questionMap, type Genre } from "../datas";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export const SCORES_TABLE = "scores";

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
  userName: string;
  genreName: string;
  questions: Question[];
  answers: Answer[];
  currentIndex: number;
  currentQuestion: Question;
  isFinished: boolean;
  totalCount: number;
  correctCount: number;
  correctRate: number;
  answerQuestion: (question: Question, answerId: number) => void;
  resetQuiz: () => void;
  nextQuestion: () => void;
  changeUserName: (userName: string) => void;
  saveScore: () => void;
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
  const [userName, setUserName] = useState("");

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

  const changeUserName = (userName: string): void => {
    setUserName(userName);
  };

  const isFinished =
    questions.length > 0 && answers.length === questions.length;

  const totalCount = answers.length;

  const correctCount = answers.reduce(
    (sum, answer) =>
      answer.question.answerId === answer.selectedId ? sum + 1 : sum,
    0,
  );

  const correctRate =
    totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);

  const saveScore = async () => {
    try {
      const docRef = await addDoc(collection(db, SCORES_TABLE), {
        userName: userName,
        genre: genre,
        correctCount: correctCount,
        correctRate: correctRate,
        totalCount: totalCount,
        createdAt: Date.now(),
      });

      console.log("保存成功", docRef.id);
    } catch (error) {
      console.error("保存失敗", error);
    }
  };

  return {
    userName,
    genreName,
    questions,
    answers,
    currentIndex,
    currentQuestion,
    isFinished,
    totalCount,
    correctCount,
    correctRate,
    answerQuestion,
    resetQuiz,
    nextQuestion,
    changeUserName,
    saveScore,
  };
};
