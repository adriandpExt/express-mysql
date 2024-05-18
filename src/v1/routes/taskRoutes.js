import express from "express";
import {
  getAllTasks,
  getTaskByUser,
  getTaskById,
  postTask,
} from "../controller/taskController.js";

const router = express.Router();

router.get("/task", getAllTasks);
router.get("/task/user/:id", getTaskByUser);
router.get("/task/:id", getTaskById);

router.post("/task", postTask);
// router.delete("/task/:id", taskDelete);

export default router;
