interface Props {
  isOpen: boolean;
  answerCount: number;
  onClose: () => void;
  onRetry: () => void;
}

export const SuccessModal = ({
  isOpen,
  answerCount,
  onClose,
  onRetry,
}: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mb-4 text-5xl">🎉</div>

        <h2 className="mb-2 text-2xl font-bold">クリア！</h2>

        <p className="mb-6 text-gray-600">{answerCount}回で正解しました</p>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border py-2">
            閉じる
          </button>

          <button
            onClick={onRetry}
            className="flex-1 rounded-xl bg-indigo-600 py-2 text-white"
          >
            もう一回
          </button>
        </div>
      </div>
    </div>
  );
};
