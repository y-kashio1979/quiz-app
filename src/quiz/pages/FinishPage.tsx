import type { Answer } from "../types/question";

type Props = {
  restartQuiz: () => void;
  answers: Answer[];
};

export const FinishPage = ({ restartQuiz, answers }: Props) => {
  const totalCount = answers.length;

  const correctCount = answers.reduce(
    (sum, answer) =>
      answer.question.answerId === answer.selectedId ? sum + 1 : sum,
    0,
  );

  const correctRate =
    totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);

  return (
    <div className="w-full max-w-md px-4">
      <div className="mb-6 rounded-2xl bg-white p-6 text-center shadow-lg sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 sm:text-3xl">
          🎉 結果発表
        </h2>

        <p className="mb-2 text-sm text-gray-500 sm:text-base">
          あなたのスコア
        </p>

        <p className="mb-4 whitespace-nowrap text-4xl font-bold text-blue-600 sm:text-5xl">
          {correctCount}
          <span className="text-xl text-gray-500 sm:text-2xl">
            {" "}
            / {totalCount}
          </span>
        </p>

        <p className="mb-2 text-base text-gray-700 sm:text-lg">
          {totalCount}問中{correctCount}問正解
        </p>

        <p className="text-lg font-semibold text-green-600 sm:text-xl">
          正答率 {correctRate}%
        </p>
      </div>

      <button
        className="
          w-full
          rounded-2xl
          bg-blue-500
          py-3
          text-lg
          font-bold
          text-white
          shadow-md
          transition-all
          hover:bg-blue-600
          hover:shadow-lg
          active:scale-95
          sm:py-4
          sm:text-xl
        "
        onClick={restartQuiz}
      >
        もう一度はじめる
      </button>
    </div>
  );
};
