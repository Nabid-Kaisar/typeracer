import React, {ChangeEvent, useEffect, useState} from "react";
import DisplayText from "../components/DisplayText";
import Input from "../components/Input";
import {getRandomText, sentenceToWordsArray} from "../helpers/util";
import Stopwatch from "../components/Stopwatch";

interface TypeEnvContainerTypes {

}

const para = getRandomText()
const fixedWordsArray = sentenceToWordsArray(getRandomText());
const fixedWordsArrayWithOtherFields = fixedWordsArray.map(w => ({word: w, correct: false}))

const TypeEnvContainer: React.FC<TypeEnvContainerTypes> = () => {
    const [currentInput, setCurrentInput] = useState('');
    const [wordsArr, setWordsArr] = useState(fixedWordsArrayWithOtherFields);
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = e.target;
        if (value === " ") return;
        setCurrentInput(value);
    }

    useEffect(() => {
        if (wordsArr[currentIdx].word === currentInput) {
            setCurrentInput('')
            let newWordsArr = [...wordsArr];
            newWordsArr[currentIdx].correct = true;
            setWordsArr(newWordsArr);
            setCurrentIdx(currentIdx + 1);
        }
    }, [currentInput])

    return (
        <div className={'w-3/4 border-2 border-[#3f51b5] flex justify-center flex-col p-8 mt-10'}>
            <DisplayText wordsArray={wordsArr}/>
            <div className='flex flex-row'>

                <Input className={'text-left'} value={currentInput} label={'You Race Here...'}
                       placeholder={''}
                       handleChange={handleInputChange}/>
                <Stopwatch containerClassName={'text-right ml-5 mt-3'}/>
            </div>

        </div>
    )
}

export default TypeEnvContainer