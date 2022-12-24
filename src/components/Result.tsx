import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {WordsArrayType} from "./DisplayText"
import {unitOfResult} from "../constants/constants";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

interface ResultInfo {
    time: number;
    wordsArr: Array<WordsArrayType>;
    wordsCompleted: number;

}

const Result: React.FC<ResultInfo> = ({time, wordsArr, wordsCompleted}) => {
    const classes = useStyles();

    if(time === 0) return null;
    const wpm = ((unitOfResult / time) * wordsCompleted).toFixed(0);

    return (
        <div className={classes.root}>
            <Typography variant="h4" component="h4">
                Congratulations! your wpm is {wpm}!
            </Typography>
        </div>
    );
};

export default Result;
