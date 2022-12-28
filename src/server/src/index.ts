import { Request, Response } from "express";
import { Server } from "socket.io";
import initializeServer from "./initializeServer";
import * as http from "http";

//here app is an instance of express
const app = initializeServer();
const server = http.createServer(app);
const io = new Server(server);

const PORT: number = 3001;

io.on("connection", (sokcket) => {
  console.log("new user connected");
});

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!!!");
});

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});
