import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { WordsArrayType } from "./DisplayText";
import { unitOfResult } from "../constants/constants";
import { pickColorFromWpm } from "../helpers/util";
import Avatar from "@mui/material/Avatar";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import RTTDataType from "../constants/interfaces/RTTDataType";

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
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const Result: React.FC<ResultInfo> = ({ time, wordsCompleted, socket }) => {
  const classes = useStyles();
  const [otherPlayersWPM, setOtherPlayersWPM] = useState<number | null>(null);

  useEffect(() => {
    socket?.on("rtt", (data: RTTDataType) => {
      setOtherPlayersWPM(data.wpm);
    });
  }, [socket]);

  if (time === 0) return null;
  const wpm = ((unitOfResult / time) * wordsCompleted).toFixed(0);
  socket?.emit("rtt", { wpm: wpm });

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h5" component="h5">
          Your WPM is:
        </Typography>
        <WpmText wpm={Number(wpm)} />
      </div>
      {otherPlayersWPM === null ? null : (
        <div className="text-center">
          {" "}
          Other Player's WPM: <WpmText wpm={otherPlayersWPM} />{" "}
        </div>
      )}
    </>
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
