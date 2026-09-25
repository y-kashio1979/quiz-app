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

  const {
    timeLeft,
    isFinished,
    startTimer,
    stopTimer,
    resetTimer,
  } = useTimer(LIMIT_TIME);

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
    <div className="mx-auto w-full max-w-2xl px-4">
      <div className="rounded-xl border bg-white p-4 shadow sm:p-6 md:p-8">
        <p className="mb-2 text-sm text-gray-500">
          問題 {currentIndex + 1} / {questionsCount}
        </p>

        <p className="mb-6 whitespace-pre-line text-xl font-bold sm:mb-8 sm:text-2xl md:text-3xl">
          {currentQuestion.contents}
        </p>

        <TimerComponent
          title="残り時間"
          limitTime={LIMIT_TIME}
          timeLeft={timeLeft}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className="
                h-20
                rounded-lg
                border
                p-4
                text-center
                text-base
                transition
                hover:border-blue-500
                hover:bg-blue-50
                hover:shadow
                sm:text-lg
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
