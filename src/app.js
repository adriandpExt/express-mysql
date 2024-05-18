import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connection from "./config/db.js";

import authRoutes from "./v2/routes/authRoutes.js";
import taskRoutes from "./v2/routes/tasksRoutes.js";
import tokenValidation from "./v2/middleware/tokenValidation.js";

// import validateToken from "./v1/middleware/validateToken.js";

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use("/api/v2", authRoutes);

app.use("/api/v2", tokenValidation, taskRoutes);

connection.on("connect", () => {
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});
