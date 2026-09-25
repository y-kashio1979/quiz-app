import type { Answer } from "../types/question";

type Props = {
  no: number;
  answers: Answer[];
  closeDetail: () => void;
};

export const AnswerDetail = ({ no, answers, closeDetail }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={closeDetail}
    >
      <div
        className="flex h-[90vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold">回答詳細（{no}回目）</h2>

          <button
            type="button"
            onClick={closeDetail}
            className="rounded-md px-3 py-1 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* スクロール領域 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {answers.map((answer, index) => {
              const correctOption = answer.question.options.find(
                (option) => option.id === answer.question.answerId,
              );

              const selectedOption = answer.question.options.find(
                (option) => option.id === answer.selectedId,
              );

              const isCorrect = answer.question.answerId === answer.selectedId;

              return (
                <div
                  key={answer.question.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-3 font-medium">
                    Q{index + 1}. {answer.question.contents}
                  </div>

                  <div className="mb-3 flex flex-wrap gap-2">
                    {answer.question.options.map((option) => (
                      <span
                        key={option.id}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                      >
                        {option.text}
                      </span>
                    ))}
                  </div>

                  <div className="mb-2 text-green-600">
                    正解: {correctOption?.text}
                  </div>

                  <div
                    className={
                      isCorrect
                        ? "font-medium text-green-600"
                        : "font-medium text-red-600"
                    }
                  >
                    回答: {selectedOption?.text || "時間切れ"}
                    <span className="ml-3 text-lg">
                      {isCorrect ? "○" : "×"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* フッター */}
        <div className="border-t p-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeDetail}
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
