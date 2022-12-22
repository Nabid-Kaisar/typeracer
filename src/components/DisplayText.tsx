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

interface DisplayTextPropTypes {
    wordsArray: Array<wordsArrayType>;
}

interface wordsArrayType {
    word: string;
    correct: boolean;
}

const DisplayText: React.FC<DisplayTextPropTypes> = ({wordsArray}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h6" component="h2">
                {wordsArray.map((wordData, idx) => {
                    if (wordData.correct) {
                        return <span style={{background: 'greenyellow'}} key={idx}>{wordData.word + ' '}</span>
                    } else return <span key={idx}>{wordData.word + ' '}</span>

                })}
            </Typography>
        </div>
    );
};

export default DisplayText;
