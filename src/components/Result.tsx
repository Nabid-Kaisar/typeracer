import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { WordsArrayType } from "./DisplayText";
import { unitOfResult } from "../constants/constants";
import { pickColorFromWpm } from "../helpers/util";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0px",
  },
});

interface ResultInfo {
  time: number;
  wordsArr: Array<WordsArrayType>;
  wordsCompleted: number;
}

const Result: React.FC<ResultInfo> = ({ time, wordsArr, wordsCompleted }) => {
  const classes = useStyles();

  if (time === 0) return null;
  const wpm = ((unitOfResult / time) * wordsCompleted).toFixed(0);

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h5">
        Your WPM is:
      </Typography>
      <WpmText wpm={Number(wpm)} />
    </div>
  );
};

const WpmText: React.FC<{ wpm: number }> = ({ wpm }) => {
  let color = pickColorFromWpm(wpm);
  let diameter = 48;
  let fontSize = 20;
  let padding = (diameter - fontSize) / 2;
  return <Avatar sx={{ background: color, ml: 2 }}>{wpm}</Avatar>;
};

export default Result;
