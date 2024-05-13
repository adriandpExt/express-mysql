import express from "express";
import {
  deleteUserById,
  getUser,
  getUserById,
  postUser,
  updateUserById,
} from "../controller/userController.js";

const router = express.Router();

router.get("/users", getUser);
router.get("/users/:id", getUserById);
router.post("/users", postUser);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);

export default router;
