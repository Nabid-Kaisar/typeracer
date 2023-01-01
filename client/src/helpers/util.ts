import {
  fixedText,
  userNameLocalStorageKey,
  wpmColorMapping,
} from "../constants/constants";

export function getRandomText() {
  return fixedText;
}

export function sentenceToWordsArray(sentence: string) {
  return sentence.split(" ");
}

export function pickColorFromWpm(wpm: number) {
  return wpmColorMapping.filter(
    (data) => wpm >= data.rangeMin && wpm <= data.rangeMax
  )[0].color;
}

export function isUserRegistered() {
  if (localStorage.getItem(userNameLocalStorageKey)) {
    return true;
  } else return false;
}

export function getUserName() {
  return localStorage.getItem(userNameLocalStorageKey);
}

export function doRegister(name: string) {
  if (localStorage.getItem(userNameLocalStorageKey)) {
    //handle already existed username
  }

  localStorage.setItem(userNameLocalStorageKey, name);
}
