import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import DisplayText from "./DisplayText";
import Input from "./core/Input";
import Stopwatch from "./Stopwatch";
import { enterKey } from "../constants/constants";
import useKeyHandler from "../hooks/useKeyHandler";

interface TypeEnvContainerTypes {
  wordsArr: {
    word: string;
    correct: boolean;
  }[];
  setWordsArr: Dispatch<SetStateAction<{ word: string; correct: boolean }[]>>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  currentIdx: number;
  setCurrentIdx: Dispatch<SetStateAction<number>>;
  resetWordsArr: () => void;
}

const TypeEnvContainer: React.FC<TypeEnvContainerTypes> = ({
  wordsArr,
  setWordsArr,
  time,
  setTime,
  currentIdx,
  setCurrentIdx,
  resetWordsArr,
}) => {
  const [currentInput, setCurrentInput] = useState("");

  const [isRunning, setIsRunning] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (value === " ") return;
    setCurrentInput(value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === enterKey) {
      handleGameStart();
    }
  };

  useKeyHandler({
    eventName: "keydown",
    handlerCb: handleKeyDown as EventListener,
  });

  const handleGameEnd = () => {
    setIsRunning(false);
  };

  const handleGameStart = () => {
    setCurrentIdx(0);
    setTime(0);
    setIsRunning(true);
    setCurrentInput("");
    resetWordsArr();
    inputRef?.current?.focus();
  };

  const handleStartStopClick = () => {
    resetWordsArr();
    setIsRunning((isRunning) => !isRunning);
  };

  const handleResetClick = () => {
    setTime(0);
    setIsRunning(false);
    resetWordsArr();
  };

  useEffect(() => {
    if (currentIdx >= wordsArr.length) {
      return;
    }

    if (wordsArr[currentIdx].word === currentInput) {
      setCurrentInput("");
      let newWordsArr = [...wordsArr];
      newWordsArr[currentIdx].correct = true;
      setWordsArr(newWordsArr);
      setCurrentIdx(currentIdx + 1);
    }
  }, [currentInput]);

  useEffect(() => {
    if (currentIdx >= wordsArr.length) {
      handleGameEnd();
    }
  }, [currentIdx]);

  useEffect(() => {
    if (isRunning === true) handleGameStart();
    if (isRunning === false) handleGameEnd();
  }, [isRunning]);

  return (
    <div
      className={
        "w-3/4 border-2 border-[#3f51b5] flex justify-center flex-col p-8 w-auto m-[10%] my-[2%] mx-[10%]"
      }
    >
      <DisplayText wordsArray={wordsArr} />
      <div className="flex flex-row">
        <Input
          style={{ width: "50%" }}
          className={"text-left"}
          value={currentInput}
          label={"You Race Here..."}
          placeholder={""}
          handleChange={handleInputChange}
          disabled={!isRunning}
          ref={inputRef}
        />
        <Stopwatch
          handleStartStopClick={handleStartStopClick}
          handleResetClick={handleResetClick}
          time={time}
          setTime={setTime}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          containerClassName={"text-right ml-5 mt-3"}
        />
      </div>
    </div>
  );
};

export default TypeEnvContainer;
