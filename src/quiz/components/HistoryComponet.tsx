import type { History } from "../types/question";
import { HistoryItem } from "./HistoryItem";

type Props = {
  histories?: History[];
};

export const HistoryComponent = ({ histories }: Props) => {
  return (
    <>
      {histories && histories.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
            回答履歴
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {histories.map((history, index) => (
              <HistoryItem key={history.id} no={index + 1} history={history} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
