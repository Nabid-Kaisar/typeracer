import { Request, Response } from "express";

import initializeServer from "./initializeServer";

const app = initializeServer();

const PORT: number = 3001;

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!!!");
});

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});
