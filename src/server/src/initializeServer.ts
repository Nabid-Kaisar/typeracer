import express, { Application } from "express";

export default function initializeServer() {
  const app: Application = express();

  return app;
}
