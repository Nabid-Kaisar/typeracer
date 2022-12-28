import express, { Application } from "express";
import cors from "cors";

export default function initializeServer() {
  const app: Application = express();
  app.use(cors());

  return app;
}
