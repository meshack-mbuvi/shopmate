import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import "reflect-metadata";

import { Routes } from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

createConnection().then(async connection => {
  Routes.forEach(route => {
    app[route.method](route.route, async (req: Request, res: Response) => {
      const controller = new route.controller(connection);
      try {
        return await controller[route.action](req, res);
      } catch (error) {
        return error;
      }
    });
  });
});

const port = 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
