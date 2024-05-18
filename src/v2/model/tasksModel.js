export const Task = {
  allTaskModel: (connection) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tbl_task";

      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve([]);
          } else {
            resolve(results);
          }
        }
      });
    });
  },

  postTaskModel: (connection, user_id, task) => {
    return new Promise((resolve, reject) => {
      const values = [user_id, task.taskname, task.description];
      const postSQL =
        "INSERT INTO `shop`.`tbl_task` (`user_id`, `taskname`, `description`) VALUES (?, ?, ?)";

      connection.query(postSQL, values, (err, results) => {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
