import { useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import type { Question } from "../types/question";
import { TimerComponent } from "../components/TimerComponent";

type Props = {
  currentQuestion: Question;
  currentIndex: number;
  questionsCount: number;
  answerQuestion: (question: Question, selectedId: number) => void;
  nextQuestion: () => void;
};

export const PlayPage = ({
  currentQuestion,
  currentIndex,
  questionsCount,
  answerQuestion,
  nextQuestion,
}: Props) => {
  const LIMIT_TIME = 10;
  const { timeLeft, isFinished, startTimer, stopTimer, resetTimer } =
    useTimer(LIMIT_TIME);

  useEffect(() => {
    resetTimer();
    startTimer();
  }, [currentQuestion]);

  useEffect(() => {
    if (!isFinished) return;

    const timeoutId = setTimeout(() => {
      selectOption(0);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isFinished]);

  const selectOption = (selectedId: number): void => {
    stopTimer();
    answerQuestion(currentQuestion, selectedId);
    nextQuestion();
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-xl border bg-white p-8 shadow">
        <p className="mb-2 text-sm text-gray-500">
          問題 {currentIndex + 1} / {questionsCount}
        </p>

        <p className="mb-8 whitespace-pre-line text-2xl font-bold">
          {currentQuestion.contents}
        </p>

        <TimerComponent title={"残り時間"} limitTime={LIMIT_TIME} timeLeft={timeLeft} />

        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className="
                rounded-lg
                border
                p-4
                text-center
                text-lg
                transition
                hover:bg-blue-50
                hover:border-blue-500
                hover:shadow
                "
              onClick={() => selectOption(option.id)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
