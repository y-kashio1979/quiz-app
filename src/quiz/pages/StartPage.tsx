import { useNavigate } from "react-router-dom";

type Props = {
  startQuiz: () => void;
  questionNum: number;
  setQuestionNum: (num: number) => void;
  userName: string;
  changeUserName: (userName: string) => void;
};

const questionNums = [5, 10, 15, 20];

export const StartPage = ({
  startQuiz,
  questionNum,
  setQuestionNum,
  userName,
  changeUserName,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="userName" className="mb-2 block text-sm text-gray-500">
          名前
        </label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => changeUserName(e.target.value)}
          placeholder="名前を入力してください"
          maxLength={10}
          className="w-72 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-2 block text-sm text-gray-500">出題数を選択</div>

      <div className="mb-6 flex gap-2">
        {questionNums.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setQuestionNum(num)}
            className={`
              rounded-lg px-4 py-2 font-bold transition
              ${
                questionNum === num
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            {num}問
          </button>
        ))}
      </div>

      <div className="flex w-full max-w-md flex-col gap-3">
        <button
          className="
            w-full
            rounded-xl
            bg-blue-500
            py-4
            text-xl
            font-bold
            text-white
            shadow-md
            transition
            hover:bg-blue-600
            hover:shadow-lg
            active:scale-95
          "
          onClick={startQuiz}
        >
          START
        </button>

        <button
          type="button"
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            py-4
            text-lg
            font-bold
            text-gray-700
            shadow-sm
            transition
            hover:bg-gray-50
          "
          onClick={() => navigate("/")}
        >
          ジャンル選択に戻る
        </button>
      </div>
    </div>
  );
};
