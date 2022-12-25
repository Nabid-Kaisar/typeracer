import React, {useState, useEffect, KeyboardEventHandler} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import DangerousIcon from '@mui/icons-material/Dangerous';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
        },
        time: {
            fontSize: 24,
            fontWeight: 'bold',
            margin: '8px',
            color: '#f50057 ',
        },
        button: {

            margin: '8px'
        },
    }),
);

interface StopwatchType {
    containerClassName: string;
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
}

const Stopwatch: React.FC<StopwatchType> = ({
                                                containerClassName,
                                                isRunning,
                                                setIsRunning,
                                                time,
                                                setTime
                                            }) => {
    const classes = useStyles();


    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStartStopClick = () => {
        setIsRunning((isRunning) => !isRunning);
    };

    const handleResetClick = () => {
        setTime(0);
        setIsRunning(false);
    };

    return (
        <div className={containerClassName}>
            <div className={classes.root}>
                <Typography variant="h4" component="h1" className={classes.time}>
                    {time}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleStartStopClick}
                >
                    <span
                        className={isRunning ? `mr-1` : `blink mr-1`}> {isRunning ? 'Stop' : 'Start'}</span><SportsScoreIcon/>
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={handleResetClick}
                >
                    Reset
                </Button>
            </div>
        </div>
    )
        ;
};

export default Stopwatch;
