import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes.js";
import connection from "./config/db.js";

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.use(userRoutes);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  connection;
});
