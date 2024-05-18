import connection from "../../config/db.js";
import { Task } from "../model/tasksModel.js";

export const getAllTask = async (req, res) => {
  const task = await Task.allTaskModel(connection);

  if (task.length === 0) {
    return res.status(200).json({ message: "No task available" });
  }

  return res
    .status(200)
    .json({ task, message: `All task display ${task.length} items` });
};

export const postTask = async (req, res) => {
  const { taskname, description } = req.body;

  const user_id = req.user.id;

  if (!taskname || !description) {
    return res
      .status(400)
      .json({ message: "Taskname and description are required." });
  }

  try {
    await Task.postTaskModel(connection, user_id, { taskname, description });

    return res.status(201).json({
      task: { taskname: taskname, description: description },
      message: "Task created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
