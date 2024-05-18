import express from "express";

import { getAllTask, postTask } from "../controller/tasksController.js";

const router = express.Router();

router.get("/tasks", getAllTask);

router.post("/tasks", postTask);

export default router;
