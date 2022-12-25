import { fixedText, wpmColorMapping } from "../constants/constants";

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
