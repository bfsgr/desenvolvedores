import "reflect-metadata";
import "express-async-errors";
import "./database";
import express, { Express } from "express";
import { errorHandler } from "./middleware/ErrorHandler";
import { router } from "./routes";
import { Server } from "http";

export class API {
  app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(router);
    this.app.use(errorHandler);
  }

  listen(port: number = 3000, callback?: () => void): Server {
    return this.app.listen(port, callback);
  }
}
