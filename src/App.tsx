import './App.css';
import TypeEnvContainer from "./components/TypeEnvContainer"
import Result from "./components/Result"
import AppContainer from "./container/AppContainer";
import {getRandomText, sentenceToWordsArray} from "./helpers/util";
import {useState} from "react";


const fixedWordsArray = sentenceToWordsArray(getRandomText());
const fixedWordsArrayWithOtherFields = fixedWordsArray.map(w => ({word: w, correct: false}))

function App() {
    const [wordsArr, setWordsArr] = useState(fixedWordsArrayWithOtherFields);
    const [time, setTime] = useState(0);
    const [currentIdx, setCurrentIdx] = useState(0);


    return (
        <AppContainer>
            <TypeEnvContainer currentIdx={currentIdx} setCurrentIdx={setCurrentIdx} wordsArr={wordsArr}
                              setWordsArr={setWordsArr} time={time} setTime={setTime}/>
            <Result time={time} wordsArr={wordsArr} wordsCompleted={currentIdx}/>
        </AppContainer>
    );
}

export default App;
