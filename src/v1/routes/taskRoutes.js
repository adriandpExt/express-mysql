import express from "express";
import {
  getAllTasks,
  getTaskByUser,
  getTaskById,
} from "../controller/taskController.js";

const router = express.Router();

router.get("/task", getAllTasks);
router.get("/task/user/:id", getTaskByUser);
router.get("/task/:id", getTaskById);

// router.post("/task", taskPost);
// router.delete("/task/:id", taskDelete);

export default router;
