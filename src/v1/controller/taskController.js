import connection from "../model/index.js";
import Task from "../model/task.js";

export const getAllTasks = async (req, res) => {
  try {
    await Task.getAllTasks()
      .then(([rows]) => {
        // Destructuring the rows from the result
        return res.status(200).json(rows);
      })
      .catch((err) => {
        return res.status(500).json({
          message: `Database ${err.message}`,
        });
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getTaskByUser = async (req, res) => {
  const user_id = req.params.id;

  if (!user_id) {
    return res.status(400).json({ error: "UserId does not exist" });
  }

  try {
    const taskByUser = await Task.getTaskByUser(user_id);

    if (!taskByUser || taskByUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(taskByUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "TaskId does not exist!" });
  }

  try {
    const taskById = await Task.getTaskById(id);

    if (!taskById || taskById.length === 0) {
      return res.status(400).json({ error: "TaskId not found!" });
    }
    return res.status(200).json(taskById);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postTask = async (req, res) => {
  const { taskname, description } = req.body;

  try {
    // Extract user ID from the request object (assuming it's provided)
    const user_id = req.user.id && req.user.user_id; // Adjust this according to your user ID structure

    if (!user_id) {
      return res
        .status(400)
        .json({ message: "User ID is missing in the request." });
    }

    connection.query(
      `INSERT INTO tbl_task (user_id, taskname, description) VALUES (?, ?, ?)`,
      [user_id, taskname, description],
      (err, result) => {
        if (err) {
          return res.status(400).json({ message: err.message, err: "error" });
        } else {
          return res.status(200).json({
            message: "Task added successfully",
            result,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message, err: "errors" });
  }
};
