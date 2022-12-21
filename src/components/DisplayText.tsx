import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {sentenceToWordsArray} from "../helpers/Helper";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

interface DisplayTextPropTypes {
    paragraph: string;
}

const DisplayText: React.FC<DisplayTextPropTypes> = ({paragraph}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h2">
                {sentenceToWordsArray(paragraph).map(word=>{
                    return <span>{word + ' '}</span>
                })}
            </Typography>
        </div>
    );
};

export default DisplayText;
