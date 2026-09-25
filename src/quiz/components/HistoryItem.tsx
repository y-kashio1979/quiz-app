import { useState } from "react";
import type { History } from "../types/question";
import { AnswerDetail } from "./AnswerDetail";

type Props = {
  no: number;
  history: History;
};

export const HistoryItem = ({ no, history }: Props) => {
  const [isShowDetail, setIsShowDetail] = useState(false);

  const openDetail = (): void => {
    setIsShowDetail(true);
  };

  const closeDetail = (): void => {
    setIsShowDetail(false);
  };

  const answers = history.answers;
  const totalCount = answers.length;
  const correctCount = answers.reduce(
    (sum, answer) =>
      answer.question.answerId === answer.selectedId ? sum + 1 : sum,
    0,
  );

  const answerDate = new Date(history.answerDate).toLocaleString("ja-JP");

  const correctRate =
    totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-slate-800">{no}回目</div>

            <div className="text-xs text-slate-500">{answerDate}</div>
          </div>

          <div className="text-right">
            <div className="text-sm text-slate-800">
              正答率：{correctRate}%
            </div>

            <div className="text-sm text-slate-500">
              {correctCount} / {totalCount}
            </div>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${correctRate}%` }}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={openDetail}
            className="rounded-md px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
          >
            詳細を見る
          </button>
        </div>
      </div>

      {isShowDetail && (
        <AnswerDetail no={no} answers={answers} closeDetail={closeDetail} />
      )}
    </>
  );
};
