import { useEffect, useState } from "react";
import { GAME_STATUS, type GameStatus } from "./types/gameStatus";
import { StartPage } from "./pages/StartPage";
import { PlayPage } from "./pages/PlayPage";
import { FinishPage } from "./pages/FinishPage";
import { useQuiz } from "./hooks/useQuiz";
import { HistoryComponent } from "./components/HistoryComponet";
import type { History } from "./types/question";
import { Navigate, useParams } from "react-router-dom";
import { questionMap, type Genre } from "./datas";
import { Ranking } from "./components/Ranking";

export const Quiz = () => {
  const { genre } = useParams();

  if (!genre || !(genre in questionMap)) {
    return <Navigate to="/" replace />;
  }

  const [gameStatus, setGameStatus] = useState<GameStatus>(GAME_STATUS.START);
  const [questionNum, setQuestionNum] = useState(5);
  const [histories, setHistories] = useState<History[]>([]);
  const [isShowRanking, setIsShowRanking] = useState(false);

  const {
    userName,
    genreName,
    questions,
    answers,
    currentIndex,
    currentQuestion,
    isFinished,
    currentScoreId,
    answerQuestion,
    resetQuiz,
    nextQuestion,
    changeUserName,
    saveScore,
  } = useQuiz(genre as Genre, questionNum);

  const startQuiz = (): void => {
    setGameStatus(GAME_STATUS.PLAYING);
    resetQuiz();
  };

  const restartQuiz = (): void => {
    setGameStatus(GAME_STATUS.START);
    resetQuiz();
  };

  useEffect(() => {
    if (isFinished) {
      setGameStatus(GAME_STATUS.FINISH);
      setHistories((prev) => [
        ...prev,
        { id: Date.now(), answerDate: new Date(), answers: [...answers] },
      ]);
      saveScore();
    }
  }, [isFinished]);

  return (
    <div className="mt-10 flex min-h-screen flex-col items-center pb-20">
      <h1 className="mb-5 text-3xl font-bold">★{genreName} クイズ★</h1>

      {gameStatus === GAME_STATUS.START && (
        <>
          <StartPage
            startQuiz={startQuiz}
            questionNum={questionNum}
            setQuestionNum={setQuestionNum}
            userName={userName}
            changeUserName={changeUserName}
          />
        </>
      )}

      {gameStatus === GAME_STATUS.PLAYING && (
        <PlayPage
          currentQuestion={currentQuestion}
          currentIndex={currentIndex}
          questionsCount={questions.length}
          answerQuestion={answerQuestion}
          nextQuestion={nextQuestion}
        />
      )}

      {gameStatus === GAME_STATUS.FINISH && (
        <>
          <FinishPage restartQuiz={restartQuiz} answers={answers} />
        </>
      )}

      {(gameStatus === GAME_STATUS.START ||
        gameStatus === GAME_STATUS.FINISH) && (
        <>
          <button
            type="button"
            onClick={() => setIsShowRanking(true)}
            className="mt-4 rounded-md px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
          >
            🏆ランキングを見る
          </button>

          <HistoryComponent histories={histories} />
        </>
      )}

      {isShowRanking && (
        <Ranking
          genre={genre}
          currentScoreId={currentScoreId}
          close={() => setIsShowRanking(false)}
        />
      )}
    </div>
  );
};
