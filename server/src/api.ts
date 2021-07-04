import "reflect-metadata";
import "express-async-errors";
import "./database";
import express, { Express } from "express";
import { errorHandler } from "./middleware/ErrorHandler";
import { router } from "./routes";

export class Server {
  app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(router);
    this.app.use(errorHandler);
  }

  run() {
    this.app.listen(3000, () => console.log("API on"));
  }
}

const server = new Server();

server.run();
