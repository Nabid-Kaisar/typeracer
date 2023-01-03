import { Request, Response } from "express";
import { Server } from "socket.io";
import initializeServer from "./initializeServer";
import { PORT } from "../utils/constants";

//here app is an instance of express
const app = initializeServer();

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!!!");
});

const server = app.listen(PORT, () => {
  console.log("SERVER IS LISTENING ON PORT: " + PORT);
});

const io = new Server(server);
io.on("connection", (socket) => {
  (socket as any).userName = socket.handshake.query.userName;
  socket.broadcast.emit("greetings", {
    userName: socket.handshake.query.userName,
  });

  socket.on("rtt", (data) => {
    socket.broadcast.emit("rtt", {
      wpm: data.wpm,
    });
  });

  socket.on("requestAllPlayers", async (data) => {
    let playerList = await io.fetchSockets();

    playerList = playerList.map((player) => (player as any).userName);
    socket.emit("getAllPlayers", { playerList: playerList });
  });

  socket.on("disconnect", (data) => {
    console.log("disconnected message");
    console.log(data);
  });
});
