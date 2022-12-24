import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import DisplayText from "./DisplayText";
import Input from "./Input";
import Stopwatch from "./Stopwatch";

interface TypeEnvContainerTypes {
    wordsArr: {
        word: string;
        correct: boolean;
    }[];
    setWordsArr: Dispatch<SetStateAction<{ word: string; correct: boolean; }[]>>;
    time: number;
    setTime: Dispatch<SetStateAction<number>>;
}

const TypeEnvContainer: React.FC<TypeEnvContainerTypes> = ({wordsArr, setWordsArr, time, setTime,}) => {
    const [currentInput, setCurrentInput] = useState('');
    const [currentIdx, setCurrentIdx] = useState(0);

    const [isRunning, setIsRunning] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = e.target;
        if (value === " ") return;
        setCurrentInput(value);
    }

    const handleGameEnd = () => {
        setCurrentIdx(0);
        setIsRunning(false);
        setTime(0);
    }

    const handleGameStart = () =>{
        setCurrentIdx(0);
        setTime(0);
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

    useEffect(()=>{
        if(isRunning === true) handleGameStart();
        if(isRunning === false) handleGameEnd();
    },[isRunning])

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