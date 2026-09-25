import { Link } from "react-router-dom";
import { questionMap } from "../datas";

export const HomePage = () => {
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">★クイズアプリ★</h1>

      <div className="space-y-4">

        {Object.entries(questionMap).map(([genre, data]) => (
          <Link
            key={genre}
            to={`/quiz/${genre}`}
            className="block rounded-lg bg-green-500 p-4 text-center text-white text-xl"
          >
            {data.genreName}
          </Link>
        ))}
      </div>
    </div>
  );
};
