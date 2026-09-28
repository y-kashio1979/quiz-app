import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { questionMap, type Genre } from "../datas";

type Props = {
  genre: string;
  close: () => void;
};

type RankingData = {
  id: string;
  userName: string;
  genre: string;
  correctCount: number;
  totalCount: number;
  correctRate: number;
  createdAt: number;
};

export const Ranking = ({ genre, close }: Props) => {
  const [ranking, setRanking] = useState<RankingData[]>([]);
  const genreName = questionMap[genre as Genre].genreName;

  useEffect(() => {
    const getRanking = async () => {
      try {
        const q = query(
          collection(db, "scores"),
          where("genre", "==", genre),
          orderBy("correctRate", "desc"),
          limit(10),
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RankingData[];
        setRanking(data);
      } catch (error) {
        console.error("ランキング取得失敗", error);
      }
    };
    getRanking();
  }, []);

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
          <h2 className="text-xl font-bold">ランキング（{genreName}）</h2>

          <button
            type="button"
            onClick={close}
            className="rounded-md px-3 py-1 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* スクロール領域 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {ranking.length === 0 ? (
              <p className="text-center text-gray-500">
                ランキングがありません
              </p>
            ) : (
              ranking.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-lg font-bold">{index + 1}位</span>

                    <div>
                      <p className="font-semibold">
                        {item.userName || "名無し"}
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
              ))
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
