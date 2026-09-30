import { Link } from "react-router-dom";

interface Game {
  name: string;
  path: string;
}

const games: Game[] = [
  {
    name: "クイズ",
    path: "/quiz",
  },
  {
    name: "Hit & Blow",
    path: "/hitBlow",
  },
];

export const SelectGame = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">ゲームを選択</h1>

      <div className="mx-auto max-w-md space-y-4">
        {games.map((game) => (
          <div key={game.name}>
            <Link
              to={game.path}
              className="block rounded-2xl bg-green-500 p-6 text-white shadow-lg hover:bg-green-600"
            >
              <h2 className="text-2xl font-bold">{game.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
