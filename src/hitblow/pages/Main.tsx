import { useEffect, useRef, useState } from "react";
import { useHitBlow } from "../hooks/useHitBlow";
import { SuccessModal } from "../components/SuccessModal";

export const Main = () => {
  const numCount = 3;
  const { inputs, answers, isClear, inputNumber, init, setAnswer } =
    useHitBlow(numCount);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isShowSuccess, setIsShowSuccess] = useState(false);

  useEffect(() => {
    init();
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (isClear) {
      setIsShowSuccess(true);
    }
  }, [isClear]);

  const resetGame = () => {
    setIsShowSuccess(false);
    init();
    inputRefs.current[0]?.focus();
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const num = e.target.value.replace(/\D/g, "").slice(-1);
    inputNumber(index, e.target.value);

    if (num && index < inputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-md">
        <div className="mb-6 rounded-2xl bg-indigo-600 p-6 text-center text-white shadow-lg">
          <h1 className="text-3xl font-bold">Hit & Blow</h1>
          <p className="mt-2 text-indigo-200">3桁の数字を当てよう</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="mb-4 flex justify-center gap-2">
            {inputs.map((value, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                inputMode="numeric"
                type="text"
                maxLength={1}
                value={value}
                className="h-16 w-16 rounded-xl border-2 border-gray-300 text-center text-3xl font-bold focus:border-indigo-500 focus:outline-none"
                onChange={(e) => handleInput(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <button
            disabled={isClear}
            onClick={() => {
              setAnswer();
              inputRefs.current[0]?.focus();
            }}
            className={`mb-3 w-full rounded-xl py-3 font-bold text-white transition ${
              isClear
                ? "cursor-not-allowed bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            回答
          </button>

          <button
            onClick={resetGame}
            className="w-full rounded-xl border border-gray-300 py-3 font-bold text-gray-700 transition hover:bg-gray-100"
          >
            リトライ
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-4 shadow">
          <h2 className="mb-3 font-bold">履歴</h2>

          <div className="max-h-64 overflow-y-auto">
            {[...answers].reverse().map((answer) => (
              <div
                key={answer.no}
                className="mb-2 flex items-center justify-between rounded-lg bg-slate-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-600">
                    {answer.no}
                  </span>

                  <span className="font-mono text-lg tracking-widest">
                    {answer.inputNumber}
                  </span>
                </div>

                <div className="flex gap-2">
                  <span className="rounded bg-red-100 px-2 py-1 text-red-600">
                    {answer.hit}H
                  </span>

                  <span className="rounded bg-blue-100 px-2 py-1 text-blue-600">
                    {answer.blow}B
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={isShowSuccess}
        answerCount={answers.length}
        onClose={() => setIsShowSuccess(false)}
        onRetry={resetGame}
      />
    </div>
  );
};
