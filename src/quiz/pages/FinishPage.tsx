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
    <div className="w-full max-w-md">
      <div className="mb-6 rounded-2xl bg-white p-8 text-center shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">🎉 結果発表</h2>

        <p className="mb-2 text-gray-500">あなたのスコア</p>

        <p className="mb-4 text-5xl font-bold text-blue-600">
          {correctCount}
          <span className="text-2xl text-gray-500"> / {totalCount}</span>
        </p>

        <p className="mb-2 text-lg text-gray-700">
          {totalCount}問中{correctCount}問正解
        </p>

        <p className="text-xl font-semibold text-green-600">
          正答率 {correctRate}%
        </p>
      </div>

      <button
        className="
          w-full
          rounded-2xl
          bg-blue-500
          py-4
          text-xl
          font-bold
          text-white
          shadow-md
          transition-all
          hover:bg-blue-600
          hover:shadow-lg
          active:scale-95
        "
        onClick={restartQuiz}
      >
        もう一度はじめる
      </button>
    </div>
  );
};
