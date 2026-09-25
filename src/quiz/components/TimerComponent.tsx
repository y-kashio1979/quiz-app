type Props = {
  title?: string;
  limitTime: number;
  timeLeft: number;
};

export const TimerComponent = ({ title, limitTime, timeLeft }: Props) => {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">{title || "制限時間"}</span>

        <span
          className={`font-bold ${
            timeLeft <= 2 ? "text-red-500" : "text-blue-600"
          }`}
        >
          {timeLeft}秒
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full transition-all duration-1000 ${
            timeLeft <= 2 ? "bg-red-500" : "bg-blue-500"
          }`}
          style={{
            width: `${(timeLeft / limitTime) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};
