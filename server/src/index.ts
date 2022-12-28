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
  let message = `User: ${socket.id} connected`;
  // debugger;
  socket.broadcast.emit("greetings", { message });
  socket.on("disconnect", (data) => {
    console.log("disconnected messsage");
    console.log(data);
  });
  console.log("Message is=>", message);
});
