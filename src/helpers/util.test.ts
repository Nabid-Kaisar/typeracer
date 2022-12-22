import {sentenceToWordsArray} from "./util";

test('if runs',()=>{
    expect(2*2).toBe(2+2);
})

test('sentenceToWordsArray',()=>{
    const s1 = 'abc we';
    const s2 = 'abc we.';
    const s3 = 'abc, we.';
    const s4 = ',abc we.';

    expect(sentenceToWordsArray(s1)).toEqual(['abc', 'we']);
    expect(sentenceToWordsArray(s2)).toEqual(['abc', 'we.']);
    expect(sentenceToWordsArray(s3)).toEqual(['abc,', 'we.']);
    expect(sentenceToWordsArray(s4)).toEqual([',abc', 'we.']);
})