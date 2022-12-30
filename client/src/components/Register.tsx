import React, { ChangeEvent, useEffect } from "react";
import Input from "./core/Input";
import Button from "@material-ui/core/Button";

import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { PORT } from "../constants/constants";
import GreetingsDataType from "../constants/interfaces/GreetingsDataType";
import useConnectSocket from "../hooks/useConnetSocket";
import useSocketStore from "../store/socketStore";

interface Props {
  // Props for the component go here
}

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Register: React.FC<Props> = (props) => {
  const [name, setName] = React.useState("");
  const navigate = useNavigate();

  const {
    socket,
    setSocket,
    newUserConnectionMessage,
    setNewUserConnectionMessage,
    setSnackbarOpen,
  } = useSocketStore();

  useEffect(() => {
    // return () => {
    //   console.log("unmounted");
    //   socket.disconnect();
    // };
  }, []);

  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  const handleFormSubmit = () => {
    if (!name) return;
    //call api to register name on server;
    //maybe connect to websocket here...
    setSocket(io(`http://localhost:${PORT}`, { transports: ["websocket"] }));

    socket?.on("greetings", (data: GreetingsDataType) => {
      console.log(data.message);
      setNewUserConnectionMessage(data.message);
      setSnackbarOpen(true);
    });
    navigate("/race");
  };

  return (
    <Box component="div" className="flex flex-col my-[2%]">
      <Input
        value={name}
        className="w-auto"
        handleChange={handleNameChange}
        label={"Please Enter User Name:"}
      />
      <Box className="my-[5%] text-center">
        <Button variant="contained" color="primary" onClick={handleFormSubmit}>
          Race <SportsScoreIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
