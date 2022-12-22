import React, {ChangeEvent, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayText from "./components/DisplayText";
import {getRandomText} from "./helpers/util"
import Input from "./components/Input";

const para = getRandomText()
function App() {

    const [currentInput, setCurrentInput] = useState('');

    const t = "TypeRacer";

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = e.target;

        if(value === ' '){
            if(t === currentInput){
                setCurrentInput('')
            }
        }

        setCurrentInput(e.target.value);
    }

  return (
    <div className="App">
      <DisplayText paragraph={para}/>
        <Input label={'You Race Here->'} placeholder={'type here'} handleChange={handleInputChange} />
    </div>
  );
}

export default App;
