import { useState } from "react";

type Counter = {
  count: number;
  increment: () => void;
};

export const useCounter = (iniValue: number): Counter => {
  const [count, setCount] = useState<number>(iniValue);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return { count, increment };
};
