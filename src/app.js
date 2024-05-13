import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connection from "./config/db.js";

import userRoutes from "./v1/routes/userRoutes.js";
import authRoutes from "./v1/routes/authRoutes.js";
import taskRoutes from "./v1/routes/taskRoutes.js";

import validateToken from "./v1/middleware/validateToken.js";

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

app.use("/api/v1", validateToken, taskRoutes);

connection.on("connect", () => {
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});
