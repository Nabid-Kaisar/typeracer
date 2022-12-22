import React, {ChangeEvent, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayText from "./components/DisplayText";
import {getRandomText, sentenceToWordsArray} from "./helpers/util"
import Input from "./components/Input";

const para = getRandomText()
const fixedWordsArray = sentenceToWordsArray(getRandomText());
const fixedWordsArrayWithOtherFields = fixedWordsArray.map(w => ({word: w, correct: false}))

function App() {

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
        <div className="App">
            <DisplayText wordsArray={wordsArr}/>
            <Input value={currentInput} label={'You Race Here->'} placeholder={'type here'}
                   handleChange={handleInputChange}/>
        </div>
    );
}

export default App;
