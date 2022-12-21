import {fixedText} from "../constants/constants";

export  function getRandomText(){
    return fixedText
}

export function sentenceToWordsArray(sentence:string) {
    return sentence.split(/\W+/);
}