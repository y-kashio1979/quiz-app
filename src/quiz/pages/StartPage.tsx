type Props = {
  startQuiz: () => void;
  questionNum: number;
  setQuestionNum: (num: number) => void;
};

const questionNums = [5, 10, 15, 20];

export const StartPage = ({
  startQuiz,
  questionNum,
  setQuestionNum,
}: Props) => {
  return (
    <div>
      <div className="mb-2 text-center text-sm text-gray-500">出題数を選択</div>
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
      <div className="w-full max-w-md">
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
      </div>
    </div>
  );
};
