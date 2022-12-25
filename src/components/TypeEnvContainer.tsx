import React, {ChangeEvent, Dispatch, KeyboardEventHandler, SetStateAction, useEffect, useRef, useState} from "react";
import DisplayText from "./DisplayText";
import Input from "./Input";
import Stopwatch from "./Stopwatch";
import {enterKey} from "../constants/constants";
import {log} from "util";

interface TypeEnvContainerTypes {
    wordsArr: {
        word: string;
        correct: boolean;
    }[];
    setWordsArr: Dispatch<SetStateAction<{ word: string; correct: boolean; }[]>>;
    time: number;
    setTime: Dispatch<SetStateAction<number>>;
    currentIdx: number;
    setCurrentIdx: Dispatch<SetStateAction<number>>;
}

const TypeEnvContainer: React.FC<TypeEnvContainerTypes> = ({
                                                               wordsArr,
                                                               setWordsArr,
                                                               time,
                                                               setTime,
                                                               currentIdx,
                                                               setCurrentIdx
                                                           }) => {
    const [currentInput, setCurrentInput] = useState('');

    const [isRunning, setIsRunning] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = e.target;
        if (value === " ") return;
        setCurrentInput(value);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        console.log(e)
        if (e.key === enterKey) {
            handleGameStart();
        }
    }

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown)
    }, [])

    const handleGameEnd = () => {
        setIsRunning(false);
    }

    const handleGameStart = () => {
        setCurrentIdx(0);
        setTime(0);
        setIsRunning(true);
        inputRef?.current?.focus();
    }

    useEffect(() => {
        if (currentIdx >= wordsArr.length) {
            return;
        }

        if (wordsArr[currentIdx].word === currentInput) {
            setCurrentInput('')
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
    }, [currentIdx])

    useEffect(() => {
        if (isRunning === true) handleGameStart();
        if (isRunning === false) handleGameEnd();
    }, [isRunning])

    return (
        <div className={'w-3/4 border-2 border-[#3f51b5] flex justify-center flex-col p-8 mt-10'}>
            <DisplayText wordsArray={wordsArr}/>
            <div className='flex flex-row'>

                <Input className={'text-left'} value={currentInput} label={'You Race Here...'}
                       placeholder={''}
                       handleChange={handleInputChange}
                       disabled={!isRunning}
                       ref={inputRef}

                />
                <Stopwatch
                    time={time}
                    setTime={setTime}
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                    containerClassName={'text-right ml-5 mt-3'}/>
            </div>

        </div>
    )
}

export default TypeEnvContainer