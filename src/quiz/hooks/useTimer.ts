import { useEffect, useRef, useState } from "react";

interface UseTimerReturn {
  timeLeft: number;
  isFinished: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export const useTimer = (seconds: number = 5): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isStarted, setIstarted] = useState(false);

  const intervalRef = useRef<number | undefined>(undefined);
  const isFinished = timeLeft === 0;

  useEffect(() => {
    if (!isStarted) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isStarted]);

  useEffect(() => {
    if (isFinished) {
      stopTimer();
    }
  }, [isFinished]);

  const startTimer = (): void => {
    if (isStarted) return;
    setIstarted(true);
  };

  const stopTimer = (): void => {
    setIstarted(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = (): void => {
    stopTimer();
    setTimeLeft(seconds);
  };

  return {
    timeLeft,
    isFinished,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
