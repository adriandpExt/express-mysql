import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connection from "./config/db.js";

import authRoutes from "./v2/routes/authRoutes.js";
import userRoutes from "./v2/routes/userRoutes.js";
import tokenValidation from "./v2/middleware/tokenValidation.js";

// import validateToken from "./v1/middleware/validateToken.js";

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use("/api/v2", authRoutes);

app.use("/api/v2", tokenValidation, userRoutes);

connection.on("connect", () => {
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});
