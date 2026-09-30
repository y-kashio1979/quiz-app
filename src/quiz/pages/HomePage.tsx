import { Link } from "react-router-dom";
import { questionMap } from "../datas";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-md">
        <div className="mb-8 rounded-2xl bg-green-500 p-6 text-center text-white shadow-lg">
          <h1 className="text-3xl font-bold">★クイズアプリ★</h1>
          <p className="mt-2 text-green-100">ジャンルを選択してください</p>
        </div>

        <div className="space-y-4">
          {Object.entries(questionMap).map(([genre, data]) => (
            <Link
              key={genre}
              to={`/quiz/${genre}`}
              className="block rounded-xl bg-white p-5 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-xl font-bold text-gray-800">
                {data.genreName}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
