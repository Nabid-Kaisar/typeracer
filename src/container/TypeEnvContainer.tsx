import React, {ChangeEvent, useEffect, useState} from "react";
import DisplayText from "../components/DisplayText";
import Input from "../components/Input";
import {getRandomText, sentenceToWordsArray} from "../helpers/util";

interface TypeEnvContainerTypes{

}

const para = getRandomText()
const fixedWordsArray = sentenceToWordsArray(getRandomText());
const fixedWordsArrayWithOtherFields = fixedWordsArray.map(w => ({word: w, correct: false}))

const TypeEnvContainer:React.FC<TypeEnvContainerTypes>= ()=>{
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
        <div className={'w-3/4 border-2 border-blue-500 flex justify-center flex-col p-8 mt-10'}>
            <DisplayText wordsArray={wordsArr}/>
            <Input className={'text-center'} value={currentInput} label={'You Race Here->'} placeholder={'type here'}
                   handleChange={handleInputChange}/>
        </div>
    )
}

export default TypeEnvContainer