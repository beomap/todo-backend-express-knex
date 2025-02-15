import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

export default app;
