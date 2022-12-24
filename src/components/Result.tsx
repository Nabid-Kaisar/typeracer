import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

interface ResultInfo {
    time: number;
    wordsArr: Array<string>;
}

const Result: React.FC<ResultInfo> = ({time, wordsArr}) => {
    const classes = useStyles();

    const wpm = (wordsArr.length / time).toFixed(0);

    return (
        <div className={classes.root}>
            <Typography variant="h2" component="h2">
                Congratulations! your wpm is {wpm}!
            </Typography>
        </div>
    );
};

export default Result;
