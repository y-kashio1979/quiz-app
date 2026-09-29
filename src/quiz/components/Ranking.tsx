import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { questionMap, type Genre } from "../datas";
import type { RankingData } from "../types/question";
import { SCORES_TABLE } from "../hooks/useQuiz";
import type { User } from "firebase/auth";

type Props = {
  genre: string;
  currentScoreId: string;
  user?: User | null;
  close: () => void;
};

export const Ranking = ({ genre, currentScoreId, user, close }: Props) => {
  const [rankingDatas, setRankingDatas] = useState<RankingData[]>([]);
  const genreName = questionMap[genre as Genre].genreName;

  useEffect(() => {
    const getRanking = async () => {
      const queryConstraints: QueryConstraint[] = [
        where("genre", "==", genre),
        orderBy("correctRate", "desc"),
        orderBy("createdAt", "desc"),
      ];

      if (user) {
        queryConstraints.push(where("userId", "==", user.uid));
      } else {
        queryConstraints.push(limit(10));
      }

      const q = query(collection(db, SCORES_TABLE), ...queryConstraints);

      try {
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RankingData[];
        setRankingDatas(data);
      } catch (error) {
        console.error("ランキング取得失敗", error);
      }
    };
    getRanking();
  }, []);

  const playCount = rankingDatas.length;

  const bestRate =
    rankingDatas.length > 0
      ? Math.max(...rankingDatas.map((x) => x.correctRate))
      : 0;

  const averageRate =
    rankingDatas.length > 0
      ? Math.round(
          rankingDatas.reduce((sum, x) => sum + x.correctRate, 0) /
            rankingDatas.length,
        )
      : 0;

  const totalCorrectCount = rankingDatas.reduce(
    (sum, x) => sum + x.correctCount,
    0,
  );

  const totalQuestionCount = rankingDatas.reduce(
    (sum, x) => sum + x.totalCount,
    0,
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={close}
    >
      <div
        className="flex h-[90vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold">
            🏆{user ? "個人成績" : "ランキング"}（{genreName}）
          </h2>

          <button
            type="button"
            onClick={close}
            className="rounded-md px-3 py-1 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        {user && (
          <div className="grid grid-cols-2 gap-3 border-b bg-gray-50 p-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-3 text-center shadow-sm">
              <p className="text-xs text-gray-500">プレイ回数</p>
              <p className="text-xl font-bold text-blue-600">{playCount}</p>
            </div>
             
            <div className="rounded-lg bg-white p-3 text-center shadow-sm">
              <p className="text-xs text-gray-500">最高正答率</p>
              <p className="text-xl font-bold text-yellow-600">{bestRate}%</p>
            </div>
             
            <div className="rounded-lg bg-white p-3 text-center shadow-sm">
              <p className="text-xs text-gray-500">平均正答率</p>
              <p className="text-xl font-bold text-green-600">{averageRate}%</p>
            </div>
             
            <div className="rounded-lg bg-white p-3 text-center shadow-sm">
              <p className="text-xs text-gray-500">総正解数</p>
              <p className="text-xl font-bold text-purple-600">
                {totalCorrectCount}/{totalQuestionCount}
              </p>
            </div>
          </div>
        )}

        {/* スクロール領域 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {rankingDatas.length === 0 ? (
              <p className="text-center text-gray-500">
                ランキングがありません
              </p>
            ) : (
              (() => {
                let currentRank = 1;

                return rankingDatas.slice(0, 10).map((item, index) => {
                  if (
                    index > 0 &&
                    item.correctRate !== rankingDatas[index - 1].correctRate
                  ) {
                    currentRank = index + 1;
                  }

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between rounded-lg border p-4 transition ${
                        currentRank === 1
                          ? "bg-yellow-200"
                          : currentRank === 2
                            ? "bg-yellow-100"
                            : currentRank === 3
                              ? "bg-yellow-50"
                              : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 text-lg font-bold">
                          {currentRank}位
                        </span>

                        <div>
                          <p className="font-semibold">
                            {item.userName || "名無し"}

                            {currentScoreId === item.id && (
                              <span className="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold tracking-wide text-white">
                                NEW
                              </span>
                            )}
                          </p>

                          <p className="text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleString("ja-JP")}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          正答率：
                          <span className="text-lg font-bold text-blue-600">
                            {item.correctRate}％
                          </span>
                        </p>

                        <p className="text-sm text-gray-500">
                          {item.correctCount}/{item.totalCount}問正解
                        </p>
                      </div>
                    </div>
                  );
                });
              })()
            )}
          </div>
        </div>

        {/* フッター */}
        <div className="border-t p-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
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
