import { useState } from "react";

export interface Answers {
  no: number;
  inputNumber: string;
  hit: number;
  blow: number;
}
export const useHitBlow = (numCount = 3) => {
  const [numbers, setNumbers] = useState<string[]>([]);
  const [inputs, setInputs] = useState<string[]>(Array(numCount).fill(""));
  const [hit, setHit] = useState(0);
  const [blow, setBlow] = useState(0);
  const [answers, setAnswers] = useState<Answers[]>([]);
  const isClear = numCount === hit;

  const createNumbers = () => {
    const result: string[] = [];

    while (result.length < numCount) {
      const number = String(Math.floor(Math.random() * 10));
      if (!result.includes(number)) {
        result.push(number);
      }
    }

    setNumbers(result);
  };

  const init = () => {
    createNumbers();
    setInputs(Array(numCount).fill(""));
    setHit(0);
    setBlow(0);
    setAnswers([]);
  };

  const clearInputs = () => {
    setInputs(Array(numCount).fill(""));
  };

  const inputNumber = (index: number, num: string) => {
    const newInputs = [...inputs];
    newInputs[index] = num;
    setInputs(newInputs);
  };

  const checkNumber = () => {
    let hit = 0;
    let blow = 0;
    inputs.forEach((num, index) => {
      if (num === numbers[index]) {
        hit++;
      } else if (numbers.includes(num)) {
        blow++;
      }
    });

    return { hit, blow };
  };

  const setAnswer = () => {
    if (isClear) {
      return;
    }

    if (inputs.some((v) => v === "")) {
      return;
    }

    const { hit, blow } = checkNumber();
    setHit(hit);
    setBlow(blow);
    setAnswers((prev) => [
      ...prev,
      {
        no: prev.length + 1,
        inputNumber: inputs.join(""),
        hit,
        blow,
      },
    ]);

    if (hit !== numCount) {
      clearInputs();
    }
  };

  return {
    numbers,
    inputs,
    hit,
    blow,
    isClear,
    answers,
    init,
    inputNumber,
    setAnswer,
  };
};
