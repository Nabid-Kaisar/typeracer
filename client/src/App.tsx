import "./App.css";
import TypeEnvContainer from "./components/TypeEnvContainer";
import Result from "./components/Result";
import AppContainer from "./container/AppContainer";
import { getRandomText, sentenceToWordsArray } from "./helpers/util";
import React, { useEffect, useState } from "react";
import useConnectSocket from "./hooks/useConnetSocket";
import { PORT, snackbarAutoHideDuration } from "./constants/constants";
import io, { Socket } from "socket.io-client";
import SnackBar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import GreetingsDataType from "./constants/interfaces/GreetingsDataType";
import { DefaultEventsMap } from "@socket.io/component-emitter";

const fixedWordsArray = sentenceToWordsArray(getRandomText());
const fixedWordsArrayWithOtherFields = fixedWordsArray.map((w) => ({
  word: w,
  correct: false,
}));

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
function App() {
  const [wordsArr, setWordsArr] = useState(fixedWordsArrayWithOtherFields);
  const [time, setTime] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setsnackbarOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setMessage("");
    setsnackbarOpen(false);
  };

  useEffect(() => {
    socket = io(`http://localhost:${PORT}`, { transports: ["websocket"] });
    socket?.on("greetings", (data: GreetingsDataType) => {
      console.log(data);
      setMessage(data.message);
      setsnackbarOpen(true);
    });
    // return () => {
    //   console.log("unmounted");
    //   socket.disconnect();
    // };
  }, []);

  const resetWordsArr = () => {
    setWordsArr(fixedWordsArray.map((w) => ({ word: w, correct: false })));
  };

  return (
    <AppContainer>
      <TypeEnvContainer
        currentIdx={currentIdx}
        setCurrentIdx={setCurrentIdx}
        wordsArr={wordsArr}
        setWordsArr={setWordsArr}
        time={time}
        setTime={setTime}
        resetWordsArr={resetWordsArr}
      />
      <Result time={time} wordsArr={wordsArr} wordsCompleted={currentIdx} />
      <SnackBar
        // autoHideDuration={snackbarAutoHideDuration}
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
          message={message}
        />
      </SnackBar>
    </AppContainer>
  );
}

export default App;
