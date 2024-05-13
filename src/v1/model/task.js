import connection from "./index.js  ";

const Task = {
  getAllTasks: async () => {
    // Return a promise to execute the SQL query
    try {
      return await connection.promise().execute("SELECT * FROM tbl_task");
    } catch (err) {
      throw err.message;
    }
  },
  getTaskByUser: async (user_id) => {
    try {
      const [userId] = await connection
        .promise()
        .execute("SELECT * FROM tbl_task WHERE user_id = ?", [user_id]);

      return userId;
    } catch (err) {
      throw err.message;
    }
  },

  getTaskById: async (id) => {
    try {
      const [taskId] = await connection
        .promise()
        .execute("SELECT * FROM tbl_task WHERE task_id = ?", [id]);

      return taskId;
    } catch (err) {
      throw err.message;
    }
  },
};

export default Task;
