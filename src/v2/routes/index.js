import express from "express";

import authRoutes from "./authRoutes.js";
import taskRoutes from "./tasksRoutes.js";
import tokenValidation from "../middleware/tokenValidation.js";

const allRoutes = express();

allRoutes.use(authRoutes);

allRoutes.use(tokenValidation, taskRoutes);

export default allRoutes;
