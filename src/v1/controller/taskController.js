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
