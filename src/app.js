import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connection from "./config/db.js";

import allRoutes from "./v2/routes/index.js";

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use("/api/v2", allRoutes);

connection.on("connect", () => {
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});
