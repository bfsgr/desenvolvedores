import "reflect-metadata";
import "express-async-errors";
import "./database";
import express from "express";
import { errorHandler } from "./middleware/ErrorHandler";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(3000, () => console.log("API on"));
