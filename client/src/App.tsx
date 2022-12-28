import "./App.css";
import TypeEnvContainer from "./components/TypeEnvContainer";
import Result from "./components/Result";
import AppContainer from "./container/AppContainer";
import {getRandomText, sentenceToWordsArray} from "./helpers/util";
import {useEffect, useState} from "react";
import useConnectSocket from "./hooks/useConnetSocket";
import {PORT} from "./constants/constants";
import io, {Socket} from "socket.io-client";


const fixedWordsArray = sentenceToWordsArray(getRandomText());
const fixedWordsArrayWithOtherFields = fixedWordsArray.map((w) => ({
    word: w,
    correct: false,
}));

function App() {
    const [wordsArr, setWordsArr] = useState(fixedWordsArrayWithOtherFields);
    const [time, setTime] = useState(0);
    const [currentIdx, setCurrentIdx] = useState(0);
    useConnectSocket();

    useEffect(()=>{

    },[])

    const resetWordsArr = () => {
        setWordsArr(fixedWordsArray.map((w) => ({word: w, correct: false})));
    };

    return (
        <AppContainer>
            <TypeEnvContainer
                currentIdx={currentIdx}
                setCurrentIdx={setCurrentIdx}
                wordsArr={wordsArr}
                setWordsArr={setWordsArr}
                time={time}
                setTime={setTime}
                resetWordsArr={resetWordsArr}
            />
            <Result time={time} wordsArr={wordsArr} wordsCompleted={currentIdx}/>
        </AppContainer>
    );
}

export default App;
