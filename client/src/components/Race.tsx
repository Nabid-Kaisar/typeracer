import TypeEnvContainer from "./TypeEnvContainer";
import Result from "./Result";
import {
  getRandomText,
  getUserName,
  isUserRegistered,
  sentenceToWordsArray,
} from "../helpers/util";
import React, { useEffect, useState } from "react";
import { PORT, snackbarAutoHideDuration } from "../constants/constants";
import io, { Socket } from "socket.io-client";
import SnackBar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import GreetingsDataType from "../constants/interfaces/GreetingsDataType";
import Box from "@material-ui/core/Box";
import useSocketStore from "../store/socketStore";
import { useNavigate } from "react-router-dom";
import { DefaultEventsMap } from "@socket.io/component-emitter";

const fixedWordsArray = sentenceToWordsArray(getRandomText());
const fixedWordsArrayWithOtherFields = fixedWordsArray.map((w) => ({
  word: w,
  correct: false,
}));

function Race() {
  const [wordsArr, setWordsArr] = useState(fixedWordsArrayWithOtherFields);
  const [time, setTime] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  const {
    setNewUserConnectionMessage,
    snackbarOpen,
    setSnackbarOpen,
    newUserConnectionMessage,
  } = useSocketStore();
  const navigate = useNavigate();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setNewUserConnectionMessage("");
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (!isUserRegistered()) {
      navigate("/");
      return;
    }

    let userName = getUserName();

    const sock = io(`http://localhost:${PORT}`, {
      transports: ["websocket"],
      query: { userName },
    });

    setSocket(sock);

    sock?.on("greetings", (data: GreetingsDataType) => {
      setNewUserConnectionMessage(`User ${data.userName} Connected`);
      setSnackbarOpen(true);
    });

    return () => {
      console.log("disconnecting");
      sock?.disconnect();
      setSocket(null);
    };
  }, []);

  const resetWordsArr = () => {
    setWordsArr(fixedWordsArray.map((w) => ({ word: w, correct: false })));
  };

  return (
    <Box className="flex-column">
      <TypeEnvContainer
        currentIdx={currentIdx}
        setCurrentIdx={setCurrentIdx}
        wordsArr={wordsArr}
        setWordsArr={setWordsArr}
        time={time}
        setTime={setTime}
        resetWordsArr={resetWordsArr}
        socket={socket}
      />
      <Result
        socket={socket}
        time={time}
        wordsArr={wordsArr}
        wordsCompleted={currentIdx}
      />
      <SnackBar
        autoHideDuration={snackbarAutoHideDuration}
        ContentProps={{
          classes: {
            root: "#2f3c87",
          },
        }}
        open={snackbarOpen}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#2f3c87",
            color: "white",
          }}
          message={newUserConnectionMessage}
        />
      </SnackBar>
    </Box>
  );
}

export default Race;
