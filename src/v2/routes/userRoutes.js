import express from "express";
import connection from "../../config/db.js";

const router = express.Router();

router.get("/users", (req, res) => {
  const sql = "SELECT * FROM tbl_users";
  connection.query(sql, (err, data) => {
    if (data) {
      return res.status(200).json({ data, message: "Successfully fetch!" });
    } else return res.status(400).json({ message: err.message });
  });
});

router.post("/users", (req, res) => {
  const { taskname, description } = req.body;

  const user_id = req.user.id;
  const postSQL =
    "INSERT INTO `shop`.`tbl_task` (`user_id`, `taskname`, `description`) VALUES (?, ?, ?)";

  const sqlValues = [user_id, taskname, description];

  if (!taskname || !description) {
    return res
      .status(400)
      .json({ message: "Taskname and description are required." });
  }

  connection.query(postSQL, sqlValues, (err, _) => {
    if (err) {
      console.error("Error executing SQL:", err);
      res.status(500).json({
        error: "An error occurred while adding the task.",
        task: { taskname: taskname, description: description },
      });
    } else {
      console.log("Task added successfully.");
      res.status(201).json({
        task: { id: user_id, taskname: taskname, description: description },
        message: "Task added successfully.",
      });
    }
  });
});

export default router;
